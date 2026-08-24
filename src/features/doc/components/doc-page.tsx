import type { Route } from "next"
import Image from "next/image"
import Link from "next/link"
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react"

import { cleanTableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { Button } from "@/components/base/ui/button"
import { Prose } from "@/components/base/ui/typography"
import { LinkButton } from "@/components/mdx-link-button"
import { MDX } from "@/components/mdx"
import { TOCInline } from "@/components/toc-inline"
import type { Doc } from "@/features/doc/types/document"

/**
 * Shared shell for every MDX doc route — component libraries, Latest posts and
 * case studies. Callers own metadata and JSON-LD; this owns the reading layout.
 */
export async function DocPage({
  doc,
  backHref,
  backLabel,
}: {
  doc: Doc
  backHref: string
  backLabel: string
}) {
  const toc = cleanTableOfContents(await getTableOfContents(doc.content))
  const m = doc.metadata
  const liveLabel = m.liveLabel ?? "Visit site"

  const facts = [
    ["Company", m.company],
    ["Role", m.role],
    ["Team", m.team],
    ["Type", m.type],
    // `period` stays in frontmatter — the Projects card and the Latest rows
    // use it as their date, falling back to `createdAt` when it's absent.
    ["Status", m.status],
  ].filter(([, value]) => Boolean(value)) as [string, string][]

  const brief = [
    ["Problem", m.problem],
    ["Solution", m.solution],
    ["Task", m.task],
    ["Process", m.process],
    ["Outcome", m.outcome],
  ].filter(([, value]) => Boolean(value)) as [string, string][]

  return (
    <>
      <div className="screen-line-bottom flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-foreground hover:no-underline"
          variant="link"
          size="sm"
          nativeButton={false}
          render={
            <Link href={backHref as Route}>
              <ArrowLeftIcon />
              {backLabel}
            </Link>
          }
        />

        {m.liveUrl && (
          <Button
            className="h-7 gap-2"
            variant="outline"
            size="sm"
            nativeButton={false}
            render={
              <a href={m.liveUrl} target="_blank" rel="noopener">
                {liveLabel}
                <ExternalLinkIcon />
              </a>
            }
          />
        )}
      </div>

      <h1 className="screen-line-bottom overflow-x-clip px-4 py-6 font-heading text-4xl font-medium tracking-normal text-balance">
        {m.title}
      </h1>

      {m.image && (
        <div className="screen-line-bottom p-4">
          <Image
            className="w-full rounded-xl object-cover inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15"
            src={m.image}
            alt={m.title}
            width={1200}
            height={630}
            quality={100}
            priority
            // The optimizer can't reach gated images — see doc-card.tsx.
            unoptimized
          />
        </div>
      )}

      <Prose className="px-4 pt-8 pb-4">
        <p className="lead text-muted-foreground">{m.description}</p>

        {facts.length > 0 && (
          <dl
            className={cn(
              "not-prose my-6 grid grid-cols-1 gap-x-6 gap-y-3 rounded-xl bg-surface-warm p-4 text-sm sm:grid-cols-2",
              "inset-ring-1 inset-ring-border/64"
            )}
          >
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {label}
                </dt>
                <dd className="text-surface-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {m.skills && m.skills.length > 0 && (
          <ul className="not-prose mb-6 flex flex-wrap gap-1.5">
            {m.skills.map((skill) => (
              <li
                key={skill}
                className={cn(
                  "rounded-md bg-surface-warm px-2 py-0.5 font-mono text-xs text-muted-foreground",
                  "inset-ring-1 inset-ring-border/64"
                )}
              >
                {skill}
              </li>
            ))}
          </ul>
        )}

        {brief.length > 0 && (
          <div className="not-prose my-6 flex flex-col gap-4 border-l-2 border-line pl-4">
            {brief.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {label}
                </p>
                <p className="text-sm leading-relaxed text-pretty">{value}</p>
              </div>
            ))}
          </div>
        )}

        <TOCInline items={toc} />

        <div>
          <MDX code={doc.content} />
        </div>

        {m.gallery && m.gallery.length > 0 && (
          <div className="not-prose mt-8 flex flex-col gap-4">
            {m.gallery.map((src) => (
              <Image
                key={src}
                className="w-full rounded-xl inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15"
                src={src}
                alt=""
                width={1200}
                height={630}
                quality={100}
                loading="lazy"
                unoptimized
              />
            ))}
          </div>
        )}

        {/* Closing CTA for docs that send the reader to shipped work. Pages
            without a `liveUrl` can place their own <LinkButton> in the body. */}
        {m.liveUrl && <LinkButton href={m.liveUrl}>{liveLabel}</LinkButton>}
      </Prose>
    </>
  )
}
