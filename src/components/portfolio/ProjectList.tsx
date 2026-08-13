import { motion } from 'framer-motion';
import FolderTabs from './FolderTabs';
import { ImageCarousel, type CarouselImage } from '../ui/image-carousel';

interface Fact {
  label: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  excerpt: string;
  problem?: string;
  task?: string;
  process?: string;
  outcome?: string;
  facts: Fact[];
  images: CarouselImage[];
  slug: string;
}

interface ProjectListProps {
  projects: Project[];
  accent: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProjectList({ projects, accent }: ProjectListProps) {
  return (
    <div className="flex flex-col gap-8">
      {projects.map((project) => (
        <motion.section
          key={project.id}
          id={project.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          viewport={{ once: true, amount: 0.2, margin: '0px 0px -10% 0px' }}
          className="flex flex-col overflow-hidden rounded-[28px] bg-black/35 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:flex-row md:items-start md:gap-6 md:overflow-visible md:rounded-none md:bg-transparent md:shadow-none md:backdrop-blur-none"
        >
          <div className="flex flex-col gap-4 pb-6 md:flex-1 md:self-start md:pb-0">
            <div className="aspect-[4/3] overflow-hidden md:rounded-[28px]">
              <ImageCarousel images={project.images} />
            </div>
            <a
              href={`/work/${project.slug}`}
              className="group mx-6 inline-flex items-center gap-1.5 self-start rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85 focus-visible:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mx-8 md:mx-0"
              style={{ backgroundColor: accent }}
            >
              Read full case study
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          <div className="flex flex-col border-t border-white/10 md:flex-1 md:overflow-hidden md:rounded-[28px] md:border-t-0 md:bg-black/35 md:shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 pb-6 pt-8 sm:px-8">
              <h2 className="font-display text-2xl text-white sm:text-[32px]">{project.title}</h2>
              <p className="mt-2 text-white/70">{project.excerpt}</p>
            </div>

            <div className="px-2 py-4 sm:px-4">
              <FolderTabs
                problem={project.problem}
                approach={project.task}
                process={project.process}
                facts={project.facts}
                outcome={project.outcome}
                excerpt={project.excerpt}
                accent={accent}
              />
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}
