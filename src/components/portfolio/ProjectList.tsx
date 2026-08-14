import { motion } from 'framer-motion';
import FolderTabs from './FolderTabs';
import { ImageCarousel, type CarouselImage } from '../ui/image-carousel';

interface Fact {
  label: string;
  value: string;
}

interface Tab {
  key: string;
  label: string;
  content: string;
}

interface Project {
  id: string;
  title: string;
  excerpt: string;
  facts: Fact[];
  tabs: Tab[];
  images: CarouselImage[];
  caseStudy: boolean;
  slug: string;
}

interface ProjectListProps {
  projects: Project[];
  accent: string;
  backgroundImage: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

// Chrome doesn't render backdrop-filter on these cards when it's applied to a
// content-heavy flex child over the page's fixed background — confirmed by
// live testing (see the glass-card-pattern project memory for the
// investigation). This fakes the same frosted-glass look with a real,
// blurred copy of the fixed background image instead, so it isn't subject to
// that bug. background-attachment: fixed keeps it aligned with the actual
// page background regardless of scroll position; the oversized inset plus
// the parent's overflow-hidden hides the blur's edge fringing.
function GlassBackdrop({ backgroundImage, className = '' }: { backgroundImage: string; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute -inset-10 bg-cover bg-center blur-2xl"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundAttachment: 'fixed' }}
      />
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}

export default function ProjectList({ projects, accent, backgroundImage }: ProjectListProps) {
  return (
    <div className="flex flex-col gap-8">
      {projects.map((project, index) => (
        <motion.section
          key={project.id}
          id={project.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: index * 0.15 }}
          className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:flex-row md:items-start md:gap-6 md:overflow-visible md:rounded-none md:border-none md:shadow-none"
        >
          <GlassBackdrop backgroundImage={backgroundImage} className="md:hidden" />

          <div className="relative aspect-[4/3] overflow-hidden md:flex-1 md:self-start md:rounded-2xl">
            <ImageCarousel images={project.images} />
          </div>

          <div className="relative flex flex-col border-t border-white/10 md:flex-1 md:overflow-hidden md:rounded-2xl md:border md:border-white/10 md:shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <GlassBackdrop backgroundImage={backgroundImage} className="hidden md:block" />

            <div className="relative flex flex-col gap-2 border-b border-white/10 p-6 sm:px-8">
              <div>
                <h2 className="font-display text-2xl text-white sm:text-[28px]">{project.title}</h2>
                <p className="mt-2 text-white/70">{project.excerpt}</p>
              </div>

              {project.facts.length > 0 && (
                <dl className="flex flex-wrap gap-x-5 gap-y-2">
                  {project.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs uppercase tracking-wide text-white/40">{fact.label}</dt>
                      <dd className="mt-0.5 text-sm text-white/80">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="relative flex flex-1 flex-col p-4">
              <FolderTabs tabs={project.tabs} accent={accent} />
            </div>

            {project.caseStudy && (
              <div className="relative border-t border-white/10 p-4">
                <a
                  href={`/work/${project.slug}`}
                  className="group flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85 focus-visible:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ backgroundColor: accent }}
                >
                  Read full case study
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
