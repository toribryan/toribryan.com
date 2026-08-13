import { useState } from 'react';

interface Fact {
  label: string;
  value: string;
}

interface FolderTabsProps {
  problem?: string;
  approach?: string;
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

export default function FolderTabs({ problem, approach, facts, outcome, excerpt, accent, slug }: FolderTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
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
        {activeTab === 2 && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs uppercase tracking-wide text-white/50">{fact.label}</dt>
                <dd className="mt-1 text-sm text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {activeTab === 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-white/70">{outcome ?? excerpt}</p>
            <a
              href={`/work/${slug}`}
              className="inline-flex items-center gap-1.5 self-start text-sm transition-colors hover:opacity-70"
              style={{ color: accent }}
            >
              Read full case study
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
