"use client"

import { Fragment, useEffect, useId, useRef, useState } from "react"
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/base/ui/tabs"
import { Badge } from "@/components/fibo/badge"
import { Button } from "@/components/fibo/button"
import {
  PROTOTYPE_ASSIGNMENT,
  PROTOTYPE_ESSAY,
  PROTOTYPE_QUESTIONS,
  PROTOTYPE_SAMPLE_ANSWERS,
  PROTOTYPE_SIMILARITY,
} from "@/features/review/data/author-proof-prototype"

type Layout = "pitched" | "built"

const ANSWERS = PROTOTYPE_SAMPLE_ANSWERS
const MATCHED = PROTOTYPE_QUESTIONS.filter(
  (question, index) => question.answer === ANSWERS[index]
).length

/** The same rule as the student-side prototype: confidence is a word. */
function confidence(correct: number, total: number) {
  const share = correct / total
  if (share >= 0.8) return "High"
  if (share >= 0.5) return "Medium"
  return "Low"
}

/**
 * The AuthorProof panel: the overview, then one row per question. In the
 * pitched layout a row points at its passage in the paper beside it; built
 * alone, the passage has nowhere to point, so the row opens it inline.
 */
function AuthorProofPanel({
  selected,
  onSelect,
  inline,
}: {
  selected: number | null
  onSelect: (index: number | null) => void
  inline: boolean
}) {
  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex flex-col gap-3 border-b border-line p-4">
        <p className="font-heading text-sm font-medium">AuthorProof</p>
        <dl className="grid grid-cols-3 gap-2">
          {[
            ["Matched", `${MATCHED} of ${PROTOTYPE_QUESTIONS.length}`],
            ["Confidence", confidence(MATCHED, PROTOTYPE_QUESTIONS.length)],
            ["Time", "4m 22s"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-0.5 rounded-lg border border-line px-2 py-1.5"
            >
              <dt className="text-[0.6875rem] text-muted-foreground">
                {label}
              </dt>
              <dd className="text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs/relaxed text-pretty text-muted-foreground">
          {inline
            ? "Select a question to read the passage it came from."
            : "Select a question to find its passage in the paper."}
        </p>
      </div>
      <ol className="flex flex-col divide-y divide-line">
        {PROTOTYPE_QUESTIONS.map((question, index) => {
          const matched = question.answer === ANSWERS[index]
          const active = selected === index
          return (
            <li key={question.question}>
              <button
                className={cn(
                  "flex w-full flex-col gap-1.5 px-4 py-3 text-left outline-none hover:bg-muted focus-visible:bg-muted",
                  active && "bg-secondary hover:bg-secondary"
                )}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(active ? null : index)}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    Question {index + 1}
                  </span>
                  <Badge variant={matched ? "success" : "warning"}>
                    {matched ? (
                      <CheckIcon aria-hidden />
                    ) : (
                      <XIcon aria-hidden />
                    )}
                    {matched ? "Matches" : "Does not match"}
                  </Badge>
                </span>
                <span className="text-sm/snug text-pretty">
                  {question.question}
                </span>
                {active && (
                  <span className="flex flex-col gap-1.5 pt-1 text-xs/relaxed text-pretty">
                    <span>
                      <span className="text-muted-foreground">Answered: </span>
                      {question.options[ANSWERS[index]]}
                    </span>
                    <span>
                      <span className="text-muted-foreground">
                        Assessment:{" "}
                      </span>
                      {matched ? question.matches : question.differs}
                    </span>
                    {inline && (
                      <span className="border-l-2 border-border pl-2 text-muted-foreground">
                        “{question.excerpt}”
                      </span>
                    )}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/**
 * The student's paper, with the passage behind the selected question marked
 * and scrolled into view inside the paper, never the page.
 */
function Paper({ selected }: { selected: number | null }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLElement>(null)
  const excerpt =
    selected === null ? null : PROTOTYPE_QUESTIONS[selected].excerpt

  useEffect(() => {
    const scroller = scrollerRef.current
    const mark = markRef.current
    if (!scroller || !mark) return
    const top =
      mark.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      scroller.clientHeight / 3
    scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  }, [selected])

  return (
    <div
      ref={scrollerRef}
      className="min-h-0 overflow-y-auto overscroll-contain bg-surface p-3 md:p-4"
    >
      <article className="mx-auto flex max-w-xl flex-col gap-3 rounded-lg border border-line bg-background px-5 py-6 shadow-xs">
        <header className="flex flex-col gap-0.5 pb-2">
          <p className="text-xs text-muted-foreground">
            {PROTOTYPE_ASSIGNMENT.student} · {PROTOTYPE_ASSIGNMENT.file}
          </p>
          <h4 className="font-heading text-lg font-medium">
            Shade as infrastructure
          </h4>
        </header>
        {PROTOTYPE_ESSAY.map((paragraph) => {
          const at = excerpt ? paragraph.indexOf(excerpt) : -1
          return (
            <p key={paragraph} className="text-sm/relaxed text-pretty">
              {at < 0 ? (
                paragraph
              ) : (
                <Fragment>
                  {paragraph.slice(0, at)}
                  <mark
                    ref={markRef}
                    className="rounded-sm bg-info-subtle px-0.5 text-foreground ring-1 ring-info/40"
                  >
                    {excerpt}
                  </mark>
                  {paragraph.slice(at + excerpt!.length)}
                </Fragment>
              )}
            </p>
          )
        })}
      </article>
    </div>
  )
}

/**
 * The grading panel that is already there, kept as it is: the similarity
 * report's badge, a grade and a comment. AuthorProof sits beside it rather
 * than replacing anything an instructor already trusts.
 */
function GradingPanel() {
  const gradeId = useId()
  const commentId = useId()
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex min-h-0 flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Similarity
        </p>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Turnitin</span>
            <span className="text-xs text-muted-foreground">
              {PROTOTYPE_SIMILARITY.band} similarity
            </span>
          </div>
          <Badge variant="success">{PROTOTYPE_SIMILARITY.score}%</Badge>
        </div>
        <p className="text-xs/relaxed text-pretty text-muted-foreground">
          Is it original? AuthorProof, on the left, answers the other question:
          did they write it?
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs tracking-wide text-muted-foreground uppercase"
          htmlFor={gradeId}
        >
          Grade
        </label>
        <div className="flex items-center gap-2">
          <input
            id={gradeId}
            className="h-8 w-20 rounded-md border border-border bg-background px-2 text-sm tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring"
            inputMode="numeric"
            defaultValue="88"
            onChange={() => setSaved(false)}
          />
          <span className="text-sm text-muted-foreground">out of 100</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs tracking-wide text-muted-foreground uppercase"
          htmlFor={commentId}
        >
          Comment
        </label>
        <textarea
          id={commentId}
          className="min-h-20 resize-none rounded-md border border-border bg-background px-2 py-1.5 text-sm/relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
          defaultValue="Strong walk-through of your own readings. Let’s talk about question 4 in office hours."
          onChange={() => setSaved(false)}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button size="sm" onClick={() => setSaved(true)}>
          Submit grade
        </Button>
        {saved && (
          <p className="text-xs text-muted-foreground" role="status">
            Saved for this sample.
          </p>
        )}
      </div>
    </div>
  )
}

/** The bar above the grader: whose submission this is, and the next one. */
function GraderBar({ title }: { title: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-background px-4 py-2">
      <div className="flex min-w-0 flex-col">
        <p className="truncate text-xs text-muted-foreground">
          {PROTOTYPE_ASSIGNMENT.course} · {PROTOTYPE_ASSIGNMENT.title}
        </p>
        <p className="text-sm font-medium">{title}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous student"
          disabled
        >
          <ChevronLeftIcon />
        </Button>
        <span className="text-xs text-muted-foreground tabular-nums">
          {PROTOTYPE_ASSIGNMENT.student} · 3 of 24
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next student"
          disabled
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}

/**
 * The reviewing side of AuthorProof, rebuilt with sample data: the grading
 * view I pitched, with the quiz results, the paper and the grading panel in
 * one place, beside the one that was built, the results panel on its own.
 */
export function AuthorProofGrader({ className }: { className?: string }) {
  const [layout, setLayout] = useState<Layout>("pitched")
  const [selected, setSelected] = useState<number | null>(0)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface",
        className
      )}
      // As in the student-side prototype, keys inside belong to it.
      onKeyDown={(event) => event.stopPropagation()}
    >
      <Tabs
        value={layout}
        onValueChange={(value) => setLayout(value as Layout)}
      >
        <TabsList className="overflow-x-auto bg-background px-4">
          <TabsTrigger value="pitched">As pitched</TabsTrigger>
          <TabsTrigger value="built">As built</TabsTrigger>
        </TabsList>

        <TabsContent value="pitched">
          <GraderBar title="SpeedGrader" />
          <div className="grid lg:h-[34rem] lg:grid-cols-[15.5rem_minmax(0,1fr)_13.5rem]">
            <div className="max-h-[28rem] overflow-y-auto overscroll-contain border-b border-line bg-background lg:max-h-none lg:border-r lg:border-b-0">
              <AuthorProofPanel
                selected={selected}
                onSelect={setSelected}
                inline={false}
              />
            </div>
            <div className="flex max-h-[28rem] min-h-0 flex-col border-b border-line lg:max-h-none lg:border-b-0">
              <Paper selected={selected} />
            </div>
            <div className="overflow-y-auto overscroll-contain bg-background lg:border-l lg:border-line">
              <GradingPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="built">
          <GraderBar title="AuthorProof results" />
          <div className="grid lg:h-[34rem] lg:grid-cols-[22rem_minmax(0,1fr)]">
            <div className="max-h-[28rem] overflow-y-auto overscroll-contain border-b border-line bg-background lg:max-h-none lg:border-r lg:border-b-0">
              <AuthorProofPanel
                selected={selected}
                onSelect={setSelected}
                inline
              />
            </div>
            <div className="flex items-center justify-center p-6">
              <p className="max-w-xs text-center text-sm/relaxed text-pretty text-muted-foreground">
                The paper and the grade live in SpeedGrader, in another tab. The
                instructor reads the results here, then goes there to grade.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <p className="border-t border-line bg-background px-4 py-2.5 text-xs text-pretty text-muted-foreground">
        Rebuilt for this portfolio with sample data. The original design files
        are under NDA, so no screen here is a Proctorio or Canvas file.
      </p>
    </div>
  )
}
