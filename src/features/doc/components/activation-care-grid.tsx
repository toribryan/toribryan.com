const DIR = "/case-studies/home-activation/care"

type Item = {
  src: string
  label: string
  /** The figure's size as drawn in the care yard, so every tile shares one scale. */
  w: number
  h: number
}
type Axis = { name: string; items: Item[] }

/*
 * Capture pixels per tile width. The figures keep the scale they have in the
 * yard, so a rubber duck stays smaller than a hospital bed; the few that would
 * overflow shrink to fit.
 */
const SCALE = 880
const MAX_W = 0.86
const MAX_H = 0.5

function figureSize({ w, h }: Item) {
  const fit = Math.min(1, (MAX_W * SCALE) / w, (MAX_H * SCALE) / h)
  return {
    width: `${((w * fit) / SCALE) * 100}%`,
    height: `${((h * fit) / SCALE) * 100}%`,
  }
}

/* One figure per care attribute, grouped by axis in the order the care step asks. */
const AXES: Axis[] = [
  {
    name: "ADL support",
    items: [
      { src: "bathing", label: "Bathing", w: 377, h: 357 },
      { src: "dressing", label: "Dressing", w: 520, h: 760 },
      { src: "toileting", label: "Toileting", w: 526, h: 638 },
      { src: "continence", label: "Continence care", w: 492, h: 515 },
      { src: "eating", label: "Eating", w: 580, h: 634 },
      { src: "grooming", label: "Grooming and oral hygiene", w: 462, h: 804 },
    ],
  },
  {
    name: "IADL support",
    items: [
      { src: "medication", label: "Medication management", w: 432, h: 344 },
      { src: "meals", label: "Meals", w: 485, h: 619 },
      { src: "housekeeping", label: "Housekeeping", w: 445, h: 858 },
      { src: "laundry", label: "Laundry service", w: 586, h: 485 },
      { src: "transportation", label: "Transportation", w: 850, h: 768 },
      { src: "shopping", label: "Shopping and errands", w: 500, h: 440 },
      { src: "communication", label: "Communication support", w: 537, h: 463 },
      { src: "money", label: "Money management", w: 507, h: 502 },
    ],
  },
  {
    name: "Mobility support",
    items: [
      { src: "one-person", label: "One-person assist", w: 241, h: 370 },
      { src: "two-person", label: "Two-person assist", w: 227, h: 587 },
      { src: "transfers", label: "Transfers", w: 433, h: 601 },
      { src: "walking", label: "Walking", w: 458, h: 603 },
      { src: "wheelchair", label: "Wheelchair mobility", w: 643, h: 408 },
      { src: "bed", label: "Bed mobility and bedbound care", w: 853, h: 1029 },
      { src: "lift", label: "Mechanical lift", w: 653, h: 913 },
    ],
  },
  {
    name: "Clinical services",
    items: [
      { src: "tube-feeding", label: "Tube feeding", w: 290, h: 852 },
      { src: "catheter", label: "Catheter care", w: 413, h: 394 },
      { src: "ostomy", label: "Ostomy care", w: 404, h: 465 },
      { src: "diabetes", label: "Diabetes management", w: 503, h: 342 },
      { src: "injections", label: "Injections", w: 426, h: 343 },
      { src: "oxygen", label: "Oxygen therapy", w: 305, h: 612 },
      { src: "wound", label: "Wound care", w: 498, h: 429 },
      { src: "bowel", label: "Bowel care", w: 376, h: 494 },
      { src: "diets", label: "Therapeutic diets", w: 556, h: 314 },
      { src: "tracheostomy", label: "Tracheostomy care", w: 501, h: 537 },
      { src: "ventilator", label: "Ventilator care", w: 389, h: 720 },
      { src: "coordination", label: "Care coordination", w: 328, h: 468 },
      { src: "home-health", label: "Home health", w: 393, h: 459 },
      { src: "hospice", label: "Hospice care", w: 311, h: 721 },
    ],
  },
  {
    name: "Therapy services",
    items: [
      { src: "physical", label: "Physical therapy", w: 453, h: 615 },
      { src: "occupational", label: "Occupational therapy", w: 733, h: 532 },
      { src: "speech", label: "Speech therapy", w: 495, h: 827 },
      { src: "respiratory", label: "Respiratory therapy", w: 555, h: 541 },
      { src: "rehabilitation", label: "Rehabilitation", w: 729, h: 500 },
    ],
  },
  {
    name: "Lifestyle and engagement",
    items: [
      { src: "social", label: "Social activities", w: 534, h: 595 },
      { src: "companionship", label: "Companionship", w: 763, h: 754 },
      { src: "music", label: "Music therapy", w: 718, h: 1049 },
    ],
  },
  {
    name: "Conditions",
    items: [
      { src: "dementia", label: "Dementia", w: 518, h: 758 },
      { src: "parkinsons", label: "Parkinson's disease", w: 501, h: 456 },
      {
        src: "mental-health",
        label: "Mental health conditions",
        w: 679,
        h: 554,
      },
      { src: "brain-injury", label: "Traumatic brain injury", w: 448, h: 472 },
    ],
  },
  {
    name: "Supervision",
    items: [
      {
        src: "around-the-clock",
        label: "24-hour supervision",
        w: 1711,
        h: 1360,
      },
    ],
  },
]

const TAGS: Record<string, string> = {
  "ADL support": "ADL",
  "IADL support": "IADL",
  "Mobility support": "Mobility",
  "Clinical services": "Clinical",
  "Therapy services": "Therapy",
  "Lifestyle and engagement": "Lifestyle",
  Conditions: "Conditions",
  Supervision: "Supervision",
}

/**
 * Every care attribute's figure from the care yard, on its own, with the
 * attribute it stands for, in one grid tagged by axis in the order the care
 * step asks them.
 */
export function ActivationCareGrid() {
  return (
    <ul className="not-prose my-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
      {AXES.flatMap((axis) =>
        axis.items.map((item) => (
          <li
            key={item.src}
            className="group relative aspect-[4/5] bg-white transition-colors duration-300 hover:bg-[#f5f7fd] dark:bg-[#0f1320] dark:hover:bg-[#151b2c]"
          >
            <span
              className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.08em] text-muted-foreground/80 uppercase"
              title={axis.name}
            >
              {TAGS[axis.name]}
            </span>
            <span className="absolute bottom-[23%] left-1/2 h-[5%] w-[52%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(23,40,100,.12),transparent)]" />
            <img
              src={`${DIR}/${item.src}.webp`}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute bottom-[25%] left-1/2 -translate-x-1/2 object-contain object-bottom transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
              style={figureSize(item)}
            />
            <p className="absolute inset-x-3 bottom-3 text-[13px] leading-snug text-pretty">
              {item.label}
            </p>
          </li>
        ))
      )}
    </ul>
  )
}
