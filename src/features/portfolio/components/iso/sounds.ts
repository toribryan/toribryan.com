import { getAudioContext } from "@/lib/soundcn/sound-engine"

/*
 * Rabbit run's chiptune sounds, synthesized so there is nothing to load. They
 * play on the site's shared audio context, which the first key press or tap
 * on the board wakes. Like the site's other sounds they stay quiet under
 * reduced motion, and the player can switch them off.
 */
let enabled = true

export function setSoundEnabled(on: boolean) {
  enabled = on
}

type Tone = {
  from: number
  to?: number
  ms: number
  volume: number
  wave?: OscillatorType
  /** Seconds from now. */
  at?: number
}

// One oscillator sliding between two pitches and fading out.
function tone({ from, to = from, ms, volume, wave = "square", at = 0 }: Tone) {
  if (!enabled || matchMedia("(prefers-reduced-motion: reduce)").matches) return
  const audio = getAudioContext()
  if (audio.state === "suspended") audio.resume().catch(() => {})
  const start = audio.currentTime + at
  const end = start + ms / 1000
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = wave
  osc.frequency.setValueAtTime(from, start)
  osc.frequency.exponentialRampToValueAtTime(to, end)
  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.0001, end)
  osc.connect(gain).connect(audio.destination)
  osc.start(start)
  osc.stop(end)
}

/* A major pentatonic run from C5, one step up for each month. */
const SCALE = [523, 587, 659, 784, 880, 1047, 1175, 1319, 1568, 1760]

export const sfx = {
  /** A soft tick on every hop, alternating so a run has a gait. */
  hop: (tick: number) =>
    tone({
      from: tick % 2 ? 300 : 360,
      to: 240,
      ms: 35,
      volume: 0.012,
      wave: "triangle",
    }),
  /** Changing direction. */
  turn: () =>
    tone({ from: 520, to: 680, ms: 40, volume: 0.015, wave: "triangle" }),
  /** A carrot: two notes that sit higher each month. */
  carrot: (month: number) => {
    const n = Math.min(month, SCALE.length - 1)
    tone({ from: SCALE[n - 1], ms: 70, volume: 0.035 })
    tone({ from: SCALE[n], ms: 110, volume: 0.035, at: 0.07 })
  },
  /** A new rabbit joining the line, a little higher the longer it gets. */
  pop: (length: number) =>
    tone({
      from: 400 + Math.min(length, 34) * 14,
      to: 900 + Math.min(length, 34) * 14,
      ms: 50,
      volume: 0.018,
      wave: "triangle",
    }),
  /** Running into the edge or the family. */
  crash: () => {
    tone({ from: 330, to: 70, ms: 380, volume: 0.04, wave: "sawtooth" })
    tone({ from: 160, to: 60, ms: 300, volume: 0.03, at: 0.06 })
  },
  /** 34 pairs: a fanfare up to φ. */
  win: () =>
    [523, 659, 784, 1047, 1319].forEach((from, i) =>
      tone({
        from,
        ms: i === 4 ? 360 : 110,
        volume: 0.035,
        wave: "triangle",
        at: i * 0.1,
      })
    ),
  /** Starting or resuming a run. */
  start: () => {
    tone({ from: 392, ms: 60, volume: 0.03, wave: "triangle" })
    tone({ from: 587, ms: 90, volume: 0.03, wave: "triangle", at: 0.07 })
  },
  /** Pausing. */
  pause: () => {
    tone({ from: 587, ms: 60, volume: 0.03, wave: "triangle" })
    tone({ from: 392, ms: 90, volume: 0.03, wave: "triangle", at: 0.07 })
  },
  /** A speed or sound key. */
  click: () => tone({ from: 880, to: 660, ms: 45, volume: 0.02 }),
}
