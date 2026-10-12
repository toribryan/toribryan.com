import { differenceInYears, parse } from "date-fns"

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import {
  DESIGN_CAREER_START,
  EXPERIENCES,
} from "@/features/portfolio/data/experiences"
import type { Experience } from "@/features/portfolio/types/experiences"

import { ExperienceItem } from "./experience-item"
import { MoreExperiences } from "./more-experiences"

const ID = "experience"
const MAX = 3

export function Experiences() {
  const yearsDesigning = differenceInYears(
    new Date(),
    parse(DESIGN_CAREER_START, "MM.yyyy", new Date())
  )

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Experience</a>
          <PanelTitleSup>({yearsDesigning} yrs)</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        <ExperienceList experiences={EXPERIENCES.slice(0, MAX)} />
      </div>

      {EXPERIENCES.length > MAX && (
        <MoreExperiences>
          <ExperienceList experiences={EXPERIENCES.slice(MAX)} />
        </MoreExperiences>
      )}
    </Panel>
  )
}

function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </>
  )
}
