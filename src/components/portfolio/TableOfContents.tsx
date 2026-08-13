import { useEffect, useRef, useState } from 'react';

interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: TocHeading[];
}

const RING_RADIUS = 9;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 -rotate-90">
      <circle cx="12" cy="12" r={RING_RADIUS} fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={2} />
      <circle
        cx="12"
        cy="12"
        r={RING_RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={RING_CIRCUMFERENCE}
        strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
      />
    </svg>
  );
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const offsets = elements.map((el) => el.getBoundingClientRect().top + scrollY);

      // A section becomes "active" once its heading crosses a reference line
      // partway down the viewport, not a fixed pixel offset — case studies
      // have short sections, so a fixed threshold (e.g. 120px) can require
      // scrolling well past a heading before it registers, leaving the
      // indicator stuck a section behind what's actually on screen.
      const reference = window.innerHeight * 0.35;
      let index = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (scrollY >= offsets[i] - reference) index = i;
      }

      // Short pages can hit the bottom of the scrollable area before the
      // last heading ever crosses the reference line above — once there's
      // nowhere further to scroll, the last section is necessarily active.
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollY >= maxScrollY - 1) index = offsets.length - 1;

      const sectionStart = offsets[index];
      const sectionEnd = index < offsets.length - 1 ? offsets[index + 1] : document.body.scrollHeight;
      const span = Math.max(1, sectionEnd - sectionStart);
      const withinSection = Math.min(1, Math.max(0, (scrollY - sectionStart) / span));

      setActiveIndex(index);
      setProgress(withinSection);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headings]);

  useEffect(() => {
    if (!expanded) return;
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('mousedown', onClickOutside);
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('keydown', onKeydown);
    };
  }, [expanded]);

  if (headings.length === 0) return null;

  const active = headings[activeIndex];

  return (
    <div ref={rootRef} className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      {expanded ? (
        <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
          <div className="flex items-center justify-between px-5 pb-2 pt-4">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-ink-tertiary">
              Table of contents
            </p>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close table of contents"
              className="flex h-6 w-6 items-center justify-center rounded-full text-ink-tertiary transition-colors hover:bg-surface-muted hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto px-2 pb-2">
            {headings.map((heading, i) => (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  onClick={() => setExpanded(false)}
                  style={{ paddingLeft: `${16 + (heading.depth - 2) * 16}px` }}
                  className={`flex items-center gap-2 rounded-lg py-2.5 pr-4 text-sm transition-colors ${
                    i === activeIndex
                      ? 'bg-surface-muted font-medium text-ink'
                      : 'text-ink-secondary hover:bg-surface-muted/60 hover:text-ink'
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate">{heading.text}</span>
                  {i === activeIndex && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex items-center gap-3 rounded-full bg-ink/90 py-2 pl-4 pr-3 text-white shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur transition-colors hover:bg-ink"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className="max-w-[45vw] truncate text-left font-sans text-sm sm:max-w-[280px]">
            {active?.text}
          </span>
          <ProgressRing progress={progress} />
        </button>
      )}
    </div>
  );
}
