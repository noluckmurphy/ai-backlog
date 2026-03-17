import { MessageSquare, TrendingDown, ListChecks, Sliders, Database } from 'lucide-react';
import { ActiveView } from '../../types';

const navItems: { view: ActiveView; label: string; icon: typeof MessageSquare }[] = [
  { view: 'feedback', label: 'Feedback Feed', icon: MessageSquare },
  { view: 'sentiment', label: 'Sentiment', icon: TrendingDown },
  { view: 'backlog', label: 'Suggested Items', icon: ListChecks },
  { view: 'rules', label: 'Value Rules', icon: Sliders },
  { view: 'sources', label: 'Data Sources', icon: Database },
];

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-56 min-h-screen border-r border-gray-400 bg-gray-100 flex flex-col">
      <div className="px-4 py-4 border-b border-gray-400">
        <h1 className="text-sm font-bold tracking-wide uppercase">AI Backlog</h1>
        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-gray-900 bg-gray-900 text-gray-50">
          Prototype
        </span>
      </div>
      <nav className="flex-1 py-2">
        {navItems.map(({ view, label, icon: Icon }) => (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs text-left transition-colors ${
              activeView === view
                ? 'bg-gray-900 text-gray-50'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-gray-400 text-[10px] text-gray-500">
        v0.1 — mock data
      </div>
    </aside>
  );
}
