"use client"

import { useEffect, useId, useState } from "react"
import {
  CheckIcon,
  FileTextIcon,
  LoaderIcon,
  MinusIcon,
  PlusIcon,
  UploadIcon,
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
  PROTOTYPE_QUESTIONS,
  PROTOTYPE_SAMPLE_ANSWERS,
} from "@/features/review/data/author-proof-prototype"

type View = "setup" | "student" | "report"

type Settings = {
  count: number
  minutes: number
  retakes: boolean
}

type Phase = "idle" | "uploading" | "generating" | "quiz" | "submitted"

/** What a finished quiz hands the report. */
type Attempt = {
  answers: number[]
  seconds: number
}

const MIN_QUESTIONS = 3
const MAX_QUESTIONS = PROTOTYPE_QUESTIONS.length
const TIME_LIMITS = [5, 10, 15]

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`
}

/**
 * Confidence is a word, not a color: how sure the result is, from how much
 * of the quiz matched the essay. The instructor decides what to do with it.
 */
function confidence(correct: number, total: number) {
  const share = correct / total
  if (share >= 0.8) return "High"
  if (share >= 0.5) return "Medium"
  return "Low"
}

function Row({
  label,
  hint,
  children,
}: {
  label: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3.5">
      <div className="flex min-w-48 flex-1 flex-col gap-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs/relaxed text-pretty text-muted-foreground">
          {hint}
        </p>
      </div>
      {children}
    </div>
  )
}

function Setup({
  settings,
  onChange,
  onNext,
}: {
  settings: Settings
  onChange: (settings: Settings) => void
  onNext: () => void
}) {
  const retakesId = useId()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-muted-foreground">
          {PROTOTYPE_ASSIGNMENT.course}
        </p>
        <p className="font-heading text-lg font-medium">
          {PROTOTYPE_ASSIGNMENT.title}
        </p>
      </div>
      <div className="rounded-xl border border-line bg-background">
        <p className="border-b border-line px-4 py-2.5 text-xs tracking-wide text-muted-foreground uppercase">
          AuthorProof for this assignment
        </p>
        <div className="divide-y divide-line px-4">
          <Row
            label="Number of questions"
            hint="Each one is generated from the student’s own essay, so no two students get the same quiz."
          >
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Fewer questions"
                disabled={settings.count <= MIN_QUESTIONS}
                onClick={() =>
                  onChange({ ...settings, count: settings.count - 1 })
                }
              >
                <MinusIcon />
              </Button>
              <output className="w-8 text-center text-sm font-medium tabular-nums">
                {settings.count}
              </output>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="More questions"
                disabled={settings.count >= MAX_QUESTIONS}
                onClick={() =>
                  onChange({ ...settings, count: settings.count + 1 })
                }
              >
                <PlusIcon />
              </Button>
            </div>
          </Row>
          <Row
            label="Time limit"
            hint="Short on purpose. The quiz starts right after upload, before there is time to reread the essay."
          >
            <div
              className="flex rounded-lg border border-line p-0.5"
              role="radiogroup"
              aria-label="Time limit"
            >
              {TIME_LIMITS.map((minutes) => (
                <button
                  key={minutes}
                  className={cn(
                    "h-7 rounded-md px-2.5 text-xs font-medium text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    settings.minutes === minutes &&
                      "bg-secondary text-secondary-foreground"
                  )}
                  type="button"
                  role="radio"
                  aria-checked={settings.minutes === minutes}
                  onClick={() => onChange({ ...settings, minutes })}
                >
                  {minutes} min
                </button>
              ))}
            </div>
          </Row>
          <Row
            label="Allow a second attempt"
            hint="Lets a student take the quiz once more after submitting."
          >
            <label
              className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground"
              htmlFor={retakesId}
            >
              <input
                id={retakesId}
                className="size-4 accent-foreground"
                type="checkbox"
                checked={settings.retakes}
                onChange={(event) =>
                  onChange({ ...settings, retakes: event.target.checked })
                }
              />
              {settings.retakes ? "On" : "Off"}
            </label>
          </Row>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-pretty text-muted-foreground">
          Students get {settings.count} questions and {settings.minutes}{" "}
          minutes, {settings.retakes ? "with one retake" : "with no retake"}.
        </p>
        <Button size="sm" onClick={onNext}>
          Save and view as the student
        </Button>
      </div>
    </div>
  )
}

function Student({
  settings,
  onSubmit,
  onReport,
}: {
  settings: Settings
  onSubmit: (attempt: Attempt) => void
  onReport: () => void
}) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [seconds, setSeconds] = useState(0)

  const questions = PROTOTYPE_QUESTIONS.slice(0, settings.count)
  const limit = settings.minutes * 60

  // The two waits stand in for the upload and for generating the quiz. They
  // are seconds long because that is the point of the embedded flow.
  useEffect(() => {
    if (phase !== "uploading" && phase !== "generating") return
    const timer = window.setTimeout(
      () => setPhase(phase === "uploading" ? "generating" : "quiz"),
      phase === "uploading" ? 900 : 1800
    )
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== "quiz") return
    const timer = window.setInterval(
      () => setSeconds((value) => Math.min(limit, value + 1)),
      1000
    )
    return () => window.clearInterval(timer)
  }, [phase, limit])

  function start() {
    setAnswers(questions.map(() => null))
    setSeconds(0)
    setPhase("uploading")
  }

  function submit() {
    onSubmit({ answers: answers.map((answer) => answer ?? -1), seconds })
    setPhase("submitted")
  }

  const answered = answers.filter((answer) => answer !== null).length
  const remaining = limit - seconds

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-muted-foreground">
          {PROTOTYPE_ASSIGNMENT.course}
        </p>
        <p className="font-heading text-lg font-medium">
          {PROTOTYPE_ASSIGNMENT.title}
        </p>
        <p className="mt-1 max-w-xl text-sm/relaxed text-pretty text-muted-foreground">
          {PROTOTYPE_ASSIGNMENT.brief}
        </p>
      </div>

      {phase === "idle" && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-4 py-8 text-center">
          <UploadIcon className="size-5 text-muted-foreground" aria-hidden />
          <p className="max-w-sm text-sm text-pretty text-muted-foreground">
            Submit your essay here. A short quiz about what you wrote follows on
            this page.
          </p>
          <Button size="sm" onClick={start}>
            Upload {PROTOTYPE_ASSIGNMENT.file}
          </Button>
        </div>
      )}

      {(phase === "uploading" || phase === "generating") && (
        <div
          className="flex items-center gap-3 rounded-xl border border-line bg-background px-4 py-6"
          role="status"
        >
          <LoaderIcon
            className="size-4 animate-spin text-muted-foreground"
            aria-hidden
          />
          <p className="text-sm">
            {phase === "uploading"
              ? `Uploading ${PROTOTYPE_ASSIGNMENT.file}`
              : "Writing your questions from your essay"}
          </p>
        </div>
      )}

      {phase === "quiz" && (
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            submit()
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-background px-4 py-2.5">
            <p className="flex items-center gap-2 text-sm">
              <FileTextIcon
                className="size-4 text-muted-foreground"
                aria-hidden
              />
              {PROTOTYPE_ASSIGNMENT.file} received
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">
              {answered} of {questions.length} answered ·{" "}
              {formatTime(remaining)} left
            </p>
          </div>
          {questions.map((question, index) => (
            <fieldset
              key={question.question}
              className="flex flex-col gap-2 rounded-xl border border-line bg-background p-4"
            >
              <legend className="float-left mb-1 w-full text-sm/relaxed font-medium text-pretty">
                <span className="mr-2 text-muted-foreground tabular-nums">
                  {index + 1}
                </span>
                {question.question}
              </legend>
              {question.options.map((option, optionIndex) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm/relaxed hover:bg-muted has-checked:bg-secondary"
                >
                  <input
                    className="mt-1 size-3.5 accent-foreground"
                    type="radio"
                    name={`question-${index}`}
                    checked={answers[index] === optionIndex}
                    onChange={() =>
                      setAnswers((current) =>
                        current.map((value, i) =>
                          i === index ? optionIndex : value
                        )
                      )
                    }
                  />
                  {option}
                </label>
              ))}
            </fieldset>
          ))}
          <div className="flex justify-end">
            <Button size="sm" type="submit" disabled={answered === 0}>
              Submit quiz
            </Button>
          </div>
        </form>
      )}

      {phase === "submitted" && (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-line bg-background px-4 py-6">
          <p className="flex items-center gap-2 text-sm font-medium">
            <CheckIcon className="size-4" aria-hidden />
            Essay and quiz submitted
          </p>
          <p className="max-w-md text-sm/relaxed text-pretty text-muted-foreground">
            Your instructor sees the result beside your essay. It is not a
            grade, and it does not pass or fail you.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={onReport}>
              View as the instructor
            </Button>
            {settings.retakes && (
              <Button size="sm" variant="outline" onClick={start}>
                Retake
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Report({
  attempt,
  settings,
}: {
  attempt: Attempt | null
  settings: Settings
}) {
  const shown = attempt ?? {
    answers: PROTOTYPE_SAMPLE_ANSWERS.slice(0, settings.count),
    seconds: 262,
  }
  const questions = PROTOTYPE_QUESTIONS.slice(0, shown.answers.length)
  const correct = questions.filter(
    (question, index) => question.answer === shown.answers[index]
  ).length

  const overview = [
    ["Student", PROTOTYPE_ASSIGNMENT.student],
    ["Matched the essay", `${correct} of ${questions.length}`],
    ["Confidence", confidence(correct, questions.length)],
    ["Time used", formatTime(shown.seconds)],
    ["Quiz started", "Seconds after upload"],
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">
            {PROTOTYPE_ASSIGNMENT.course} · beside the submission
          </p>
          <p className="font-heading text-lg font-medium">AuthorProof result</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {attempt
            ? "Showing the quiz you just took."
            : "Showing a sample attempt. Take the quiz as the student to see your own."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-[14rem_minmax(0,1fr)]">
        <dl className="h-fit divide-y divide-line rounded-xl border border-line bg-background px-4">
          {overview.map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-3 py-2.5"
            >
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="text-right text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <ol className="flex flex-col gap-3">
          {questions.map((question, index) => {
            const given = shown.answers[index]
            const matched = given === question.answer
            return (
              <li
                key={question.question}
                className="flex flex-col gap-3 rounded-xl border border-line bg-background p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Question {index + 1}
                  </p>
                  <Badge variant={matched ? "success" : "warning"}>
                    {matched ? (
                      <CheckIcon aria-hidden />
                    ) : (
                      <XIcon aria-hidden />
                    )}
                    {matched ? "Matches the essay" : "Does not match"}
                  </Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">
                      From the essay
                    </p>
                    <blockquote className="border-l-2 border-border pl-3 text-sm/relaxed text-pretty">
                      {question.excerpt}
                    </blockquote>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">
                      Question generated from it
                    </p>
                    <p className="text-sm/relaxed text-pretty">
                      {question.question}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 border-t border-line pt-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">
                      Student answered
                    </p>
                    <p className="text-sm/relaxed text-pretty">
                      {given >= 0 ? question.options[given] : "No answer"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">Assessment</p>
                    <p className="text-sm/relaxed text-pretty">
                      {matched ? question.matches : question.differs}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

/**
 * AuthorProof rebuilt as a working prototype: the instructor's settings, the
 * student's upload-to-quiz flow, and the result the instructor reads. It is
 * drawn fresh on this site's components with sample data, because the
 * original design files are under NDA; what it keeps are the decisions.
 */
export function AuthorProofPrototype({ className }: { className?: string }) {
  const [view, setView] = useState<View>("student")
  const [settings, setSettings] = useState<Settings>({
    count: 5,
    minutes: 10,
    retakes: false,
  })
  const [attempt, setAttempt] = useState<Attempt | null>(null)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface",
        className
      )}
      // The deck turns the page on Space and the arrow keys. Inside the
      // prototype those keys belong to its own buttons, tabs and radios.
      onKeyDown={(event) => event.stopPropagation()}
    >
      <Tabs value={view} onValueChange={(value) => setView(value as View)}>
        <TabsList className="bg-background px-4">
          <TabsTrigger value="setup">1 · Setup</TabsTrigger>
          <TabsTrigger value="student">2 · Student</TabsTrigger>
          <TabsTrigger value="report">3 · Result</TabsTrigger>
        </TabsList>
        <div className="p-4 md:p-6">
          <TabsContent value="setup">
            <Setup
              settings={settings}
              onChange={(next) => {
                setSettings(next)
                setAttempt(null)
              }}
              onNext={() => setView("student")}
            />
          </TabsContent>
          {/* Kept mounted so a quiz in progress survives a look at the
              other tabs; the key starts it over when the settings change. */}
          <TabsContent value="student" keepMounted>
            <Student
              key={`${settings.count}-${settings.minutes}-${settings.retakes}`}
              settings={settings}
              onSubmit={setAttempt}
              onReport={() => setView("report")}
            />
          </TabsContent>
          <TabsContent value="report">
            <Report attempt={attempt} settings={settings} />
          </TabsContent>
        </div>
      </Tabs>
      <p className="border-t border-line bg-background px-4 py-2.5 text-xs text-pretty text-muted-foreground">
        Rebuilt for this portfolio with sample data. The original design files
        are under NDA, so no screen here is a Proctorio file.
      </p>
    </div>
  )
}
