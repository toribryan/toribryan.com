import { AnnotatedTextChip } from "@/components/fibo/annotated-text"

const DIR = "/case-studies/home-activation/care"

/**
 * A text chip stuck with one of the care yard's own figures, die-cut like a
 * sticker. `figure` names the file in the care folder ("bathing", "money"),
 * since MDX here passes strings only.
 */
export function CareChip({
  figure,
  tilt,
  children,
}: {
  figure: string
  tilt?: number | string
  children: React.ReactNode
}) {
  return (
    <AnnotatedTextChip
      icon={<img src={`${DIR}/${figure}.webp`} alt="" draggable={false} />}
      tilt={tilt === undefined ? undefined : Number(tilt)}
      // The figures are detailed, so the sticker runs larger than an emoji
      // would and overhangs the pill without opening up the line.
      className="ps-[0.2em] [&_[data-slot=annotated-text-chip-icon]]:-my-[0.4em] [&_[data-slot=annotated-text-chip-icon]]:me-[0.25em] [&_[data-slot=annotated-text-chip-icon]]:size-[1.8em] [&_[data-slot=annotated-text-chip-icon]]:align-[-0.55em]"
    >
      {children}
    </AnnotatedTextChip>
  )
}
