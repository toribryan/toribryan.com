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

      <div className="min-h-[7rem] w-full px-5 py-5">
        {activeTab === 0 && <p className="text-white/70">{problem ?? excerpt}</p>}
        {activeTab === 1 && <p className="text-white/70">{approach ?? excerpt}</p>}
        {activeTab === 2 && <p className="text-white/70">{process ?? excerpt}</p>}
        {activeTab === 3 && <p className="text-white/70">{outcome ?? excerpt}</p>}
      </div>
    </div>
  );
}
