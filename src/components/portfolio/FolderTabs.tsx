import { useState } from 'react';

interface Tab {
  key: string;
  label: string;
  content: string;
}

interface FolderTabsProps {
  tabs: Tab[];
  accent: string;
}

export default function FolderTabs({ tabs, accent }: FolderTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex h-10 w-full gap-1 rounded-full bg-white/[0.14] p-1">
        {tabs.map((tab, index) => (
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

      <div className="min-h-[8rem] w-full px-5 py-5">
        <p className="text-[#e0e1e6]">{tabs[activeTab]?.content}</p>
      </div>
    </div>
  );
}
