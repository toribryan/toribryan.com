"""
Builds the home header's dither: public/images/header/bunny-field.json and its
photo. The bunny builds from paper as a recorded field (pixel-studio's poster
--field); the clouds above him are a seamless tone map in the same file, which
pixel-fx.js dithers live as it drifts.

  python3 scripts/header-field.py "~/Downloads/bunny with headphones - cut.png"

Needs pixel-studio at ~/.claude/skills/design/pixel-studio.
"""

import base64
import json
import random
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

PIXEL = Path("~/.claude/skills/design/pixel-studio/scripts/pixel.py").expanduser()
OUT = Path(__file__).resolve().parent.parent / "public/images/header"

# The strip, in art pixels and dither cells.
ART = (3072, 416)
CELL = 3
COLS, ROWS = ART[0] // CELL, ART[1] // CELL
TONE = dict(gamma=0.8, levels=(70, 255), spread=0.6)

# The bunny: 70% of the cutout's size, his right edge at 70% across, sunk 12%
# below the bottom, so his ear tips stay under the clouds.
SCALE, RIGHT, SINK = 0.7, 0.70, 0.12
# How far his pink (red over green) darkens before dithering.
PINK = 1.8
# The photo window on his face and earbud, in the cutout's own pixels.
FACE = (366, 260, 1026, 508)

# The clouds fill the top 46% of rows. Their map repeats every PERIOD cells
# and is stored at half resolution; they drift SPEED cells a second.
BAND = round(ROWS * 0.46)
PERIOD = COLS * 3 // 2
SPEED = 2
# Where the loop opens, in cells along the cloud map.
START = 784


def base36(n):
    digits = "0123456789abcdefghijklmnopqrstuvwxyz"
    out = ""
    while True:
        n, r = divmod(n, 36)
        out = digits[r] + out
        if not n:
            return out


def place(bunny, size):
    """The bunny scaled down, and where he sits on an art canvas of `size`."""
    w, h = size
    b = bunny.resize((round(bunny.width * SCALE), round(bunny.height * SCALE)), Image.LANCZOS)
    return b, (round(w * RIGHT) - b.width, h - b.height + round(h * SINK))


def periodic_noise(width, height, seed):
    """Fractal noise that wraps from its right edge back to its left."""
    rng = random.Random(seed)
    out = None
    total = 0.0
    # Sized for a map half again as wide as the strip, so the clouds keep their scale.
    for cols, rows, weight in [(15, 2, 1.0), (33, 4, 0.55), (72, 8, 0.3), (150, 16, 0.16), (315, 32, 0.08)]:
        grid = Image.new("L", (cols, rows))
        grid.putdata([rng.randint(0, 255) for _ in range(cols * rows)])
        # Three copies side by side, so the middle one's edges are smooth.
        wide = Image.new("L", (cols * 3, rows))
        for k in range(3):
            wide.paste(grid, (k * cols, 0))
        layer = wide.resize((width * 3, height), Image.BICUBIC).crop((width, 0, width * 2, height))
        out = layer if out is None else Image.blend(out, layer, weight / (total + weight))
        total += weight
    return out


def cloud_map():
    """Cloud tones, sky dark and clouds light, already through the strip's tone curve.

    Each cloud is a cumulus: a row of overlapping domes on a flat base, lit
    from above and shaded toward its base, with fine noise over it for texture.
    Drawn four times larger, wrapping at the map's edges, then scaled down.
    """
    w, h = PERIOD // 2, (BAND + 1) // 2
    k = 4
    W, H = w * k, h * k
    rng = random.Random(11)
    sky = Image.new("L", (W, H), 0)

    def cumulus(cx, cw, ch, base, glow, puffs):
        shape = Image.new("L", (W, H), 0)
        draw = ImageDraw.Draw(shape)
        for j in range(puffs):
            t = (j + 0.5) / puffs * 2 - 1  # -1..1 across the cloud
            r = ch * rng.uniform(0.4, 0.62) * (1 - 0.45 * abs(t))
            x = cx + t * cw / 2 + rng.uniform(-0.06, 0.06) * cw
            # Sunk into the base, so the base cuts every puff flat.
            y = base - r * rng.uniform(0.3, 0.6)
            for dx in (-W, 0, W):
                draw.ellipse((x + dx - r, y - r, x + dx + r, y + r), fill=255)
        draw.rectangle((0, base, W, H), fill=0)  # the flat base
        # Lit from above: full at its top, a little over half at its base.
        light = Image.new("L", (1, H), 0)
        top = base - ch
        for y in range(H):
            f = min(1, max(0, (y - top) / max(1, base - top)))
            light.putpixel((0, y), round(255 * glow * (1 - 0.45 * f)))
        return ImageChops.multiply(shape.filter(ImageFilter.GaussianBlur(k * 1.2)), light.resize((W, H)))

    def add(cx, cw, heights, bases, glow, puffs):
        nonlocal sky
        ch = min(cw * rng.uniform(*heights), H * 0.6)
        # Kept whole inside the band, never clipped at its top.
        lo = max(bases[0] * H, ch * 1.1 + H * 0.04)
        base = rng.uniform(lo, max(lo, bases[1] * H))
        sky = ImageChops.lighter(sky, cumulus(cx, cw, ch, base, glow, rng.randint(*puffs)))

    # Small, dim clouds further off, scattered first.
    for i in range(12):
        add((i + rng.uniform(0.1, 0.9)) / 12 * W, rng.uniform(0.03, 0.06) * W,
            (0.22, 0.32), (0.25, 0.6), 0.7, (4, 6))
    # The big ones in front, laid end to end round the loop with only small
    # gaps between, so the sky never opens into a hole.
    x = 0.0
    while x < W * 0.97:
        cw = rng.uniform(0.05, 0.14) * W
        add(x + cw / 2, cw, (0.3, 0.42), (0.5, 0.95), 1.0, (5, 9))
        x += cw + rng.uniform(0.008, 0.035) * W
    # A few small ones dotted in front, up in the open sky: two inside the
    # opening view, the rest wherever they land.
    view = [((COLS // 8 + START) / 2 * k) % W, ((COLS * 7 // 8 + START) / 2 * k) % W]
    for i in range(5):
        cx = rng.uniform(*sorted(view)) if i < 2 else rng.uniform(0, W)
        add(cx, rng.uniform(0.028, 0.045) * W, (0.42, 0.55), (0.35, 0.55), 1.0, (4, 6))
    texture = periodic_noise(W, H, seed=7).point(lambda v: round(205 + v * 50 / 255))
    sky = ImageChops.multiply(sky, texture).resize((w, h), Image.LANCZOS)

    px = sky.load()
    tones = Image.new("L", (w, h))
    out = tones.load()
    lo, hi = TONE["levels"]
    for y in range(h):
        for x in range(w):
            v = px[x, y] * 235 / 255
            v = 255 * (v / 255) ** TONE["gamma"]
            out[x, y] = round(min(max((v - lo) * 255 / (hi - lo), 0), 255))
    return tones


def main(bunny_path):
    bunny = Image.open(Path(bunny_path).expanduser()).convert("RGBA")
    big = (round(993 * ART[0] / ART[1]), 993)
    b, at = place(bunny, big)
    fx0, fy0, fx1, fy1 = (v * SCALE for v in FACE)
    window = ",".join(f"{v:.4f}" for v in (
        (at[0] + fx0) / big[0], (at[1] + fy0) / big[1], (fx1 - fx0) / big[0], (fy1 - fy0) / big[1]))

    # The recorded field: the bunny alone on dark sky.
    plain = Image.new("RGB", big, (0, 0, 0))
    plain.paste(b, at, b)
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / "src.jpg"
        # Dithered from gray darkened where he's pink, so the inside of his ear
        # keeps its tone instead of going solid white like his fur.
        r, g, _ = plain.split()
        pink = ImageChops.subtract(r, g).point(lambda v: min(255, round(v * PINK)))
        gray = ImageChops.subtract(plain.convert("L"), pink)
        Image.merge("RGB", (gray, gray, gray)).save(src, quality=95)
        field_path = Path(tmp) / "field.json"
        subprocess.run([
            sys.executable, str(PIXEL), "poster", str(src), "-o", str(Path(tmp) / "anim.png"),
            "--treatment", "dither", "--no-frame", "--art-size", f"{ART[0]},{ART[1]}",
            "--cell", str(CELL), "--gap", "1", "--spread", str(TONE["spread"]), "--detail", "2",
            "--levels", ",".join(map(str, TONE["levels"])), "--gamma", str(TONE["gamma"]),
            "--soften", "0.3", "--wash", "0", "--window", window,
            "--frames", "44", "--fps", "40", "--field", str(field_path),
        ], check=True, capture_output=True)
        field = json.loads(field_path.read_text())

    # The clouds never draw on him.
    alpha = Image.new("L", big, 0)
    alpha.paste(b.getchannel("A"), at)
    alpha = alpha.resize((COLS, ROWS), Image.BOX).filter(ImageFilter.MaxFilter(3))
    a = alpha.load()
    hold = []
    for y in range(BAND):
        xs = [x for x in range(COLS) if a[x, y] > 16]
        if xs:
            hold.append([y, xs[0], xs[-1] + 1])

    tones = cloud_map()
    # Start where the clouds on screen are most varied: small, middling and
    # large ones, as many as fit, across the part of the strip most screens show.
    tp = tones.load()

    def variety(offset):
        lit = [any(tp[((x + offset) // 2) % tones.width, y] > 140 for y in range(tones.height))
               for x in range(COLS // 8, COLS * 7 // 8)]
        runs, n = [], 0
        for on in lit + [False]:
            if on:
                n += 1
            elif n:
                runs.append(n)
                n = 0
        sizes = {"small": any(r < 25 for r in runs), "middling": any(25 <= r < 70 for r in runs),
                 "large": any(r >= 70 for r in runs)}
        gaps, n = [], 0
        for on in lit + [True]:
            if not on:
                n += 1
            elif n:
                gaps.append(n)
                n = 0
        return sum(sizes.values()) * 10 + len(runs) - max(gaps, default=0) / 8

    # Pinned once it opened on a frame we liked; the search finds a new one if
    # START is set back to None.
    start = START if START is not None else max(range(0, PERIOD, 8), key=variety)
    # The strip keeps this span of the art on screen, the bunny, wherever it can.
    left = (at[0] + b.getchannel("A").getbbox()[0]) / big[0]
    right = (at[0] + b.getchannel("A").getbbox()[2]) / big[0]
    field["keep"] = [round(left, 4), round(right, 4)]
    field["drift"] = {
        "rows": BAND, "period": PERIOD, "scale": 2, "speed": SPEED, "start": start,
        "map": base64.b64encode(tones.tobytes()).decode(), "mapCols": tones.width, "mapRows": tones.height,
        "spread": TONE["spread"], "mid": 128, "hold": hold,
    }
    field["photo"] = "bunny-field-photo.jpg"
    # The build as gaps between flipped cells, in base 36: a few times smaller than the indices.
    field["flipGaps"] = [",".join(base36(i - p - 1) for p, i in zip([-1] + f[:-1], f))
                         for f in (sorted(frame) for frame in field.pop("flips"))]

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "bunny-field.json").write_text(json.dumps(field, separators=(",", ":")))
    plain.resize(ART, Image.LANCZOS).save(OUT / "bunny-field-photo.jpg", quality=88)
    print(OUT / "bunny-field.json")


if __name__ == "__main__":
    main(sys.argv[1])
