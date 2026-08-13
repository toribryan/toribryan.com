import { useState } from 'react';

interface Fact {
  label: string;
  value: string;
}

interface FolderTabsProps {
  problem?: string;
  approach?: string;
  process?: string;
  facts: Fact[];
  outcome?: string;
  excerpt: string;
  accent: string;
  slug: string;
}

const TABS = [
  { key: 'problem', label: '01 Problem' },
  { key: 'approach', label: '02 Approach' },
  { key: 'process', label: '03 Process' },
  { key: 'outcome', label: '04 Outcome' },
];

export default function FolderTabs({
  problem,
  approach,
  process,
  facts,
  outcome,
  excerpt,
  accent,
  slug,
}: FolderTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {facts.length > 0 && (
        <dl className="mb-4 flex flex-wrap gap-x-5 gap-y-2 px-1">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[10px] uppercase tracking-wide text-white/40">{fact.label}</dt>
              <dd className="mt-0.5 text-xs text-white/80">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="flex w-full gap-1 rounded-full bg-white/10 p-1">
        {TABS.map((tab, index) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(index)}
            className="flex-1 rounded-full py-1.5 font-sans text-sm transition-colors"
            style={{
              backgroundColor: activeTab === index ? '#fff' : 'transparent',
              color: activeTab === index ? accent : undefined,
            }}
          >
            <span className={activeTab === index ? '' : 'text-white/60'}>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[7rem] w-full p-5">
        {activeTab === 0 && <p className="text-white/70">{problem ?? excerpt}</p>}
        {activeTab === 1 && <p className="text-white/70">{approach ?? excerpt}</p>}
        {activeTab === 2 && <p className="text-white/70">{process ?? excerpt}</p>}
        {activeTab === 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-white/70">{outcome ?? excerpt}</p>
            <a
              href={`/work/${slug}`}
              className="group inline-flex items-center gap-1.5 self-start rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85 focus-visible:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
    </div>
  );
}
