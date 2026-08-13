import LogoCarousel from './LogoCarousel';

interface CategoryRow {
  slug: string;
  name: string;
  tags: string[];
}

interface WorkListSectionProps {
  categories: CategoryRow[];
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7 shrink-0 text-ink-tertiary transition-colors group-hover:text-ink sm:h-8 sm:w-8"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WorkListSection({ categories }: WorkListSectionProps) {
  return (
    <div className="flex h-full w-full items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-6xl">
        <div className="rounded-[28px] border border-white/10 bg-black/35 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center md:p-12">
            <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
              Explore my work
            </h2>
            <p className="max-w-[280px] text-right text-sm text-white/70">
              Five years across EdTech, AI &amp; Security, Bridal, and Assisted Living Care —
              solving real problems for real users.
            </p>
          </div>

          <div className="flex flex-col gap-2 px-3 pb-3 md:px-6">
            {categories.map((category, index) => (
              <a
                key={category.slug}
                href={`/work/category/${category.slug}`}
                className="group flex flex-col gap-4 rounded-lg bg-surface-muted py-5 pl-4 pr-4 transition-colors hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:py-6 sm:pl-10 sm:pr-6"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-lg tracking-wide text-ink-tertiary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-sans text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl">
                    {category.name}
                  </h3>
                </div>
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="flex flex-wrap items-center gap-2">
                    {category.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#ece1e7] px-3 py-1 text-[11px] text-ink tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowIcon />
                </div>
              </a>
            ))}
          </div>

          <LogoCarousel />
        </div>
      </div>
    </div>
  );
}
