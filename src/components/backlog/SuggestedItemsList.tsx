import { useState } from 'react';
import { suggestedWorkItems } from '../../data/suggestedWorkItems';
import { SuggestedWorkItem, WorkItemStatus } from '../../types';
import SuggestedItemCard from './SuggestedItemCard';
import PageHeader from '../layout/PageHeader';
import { formatCurrency } from '../../utils/formatters';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type SortKey = 'value' | 'confidence' | 'priority' | 'feedback';

const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

export default function SuggestedItemsList() {
  const [statuses, setStatuses] = useLocalStorage<Record<string, WorkItemStatus>>('ai-backlog-item-statuses', {});
  const [sortBy, setSortBy] = useState<SortKey>('value');

  const items: SuggestedWorkItem[] = suggestedWorkItems.map((item) => ({
    ...item,
    status: statuses[item.id] || item.status,
  }));

  const sorted = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'value': return b.estimatedValue - a.estimatedValue;
      case 'confidence': return b.aiConfidence - a.aiConfidence;
      case 'priority': return (priorityOrder[a.suggestedPriority] ?? 9) - (priorityOrder[b.suggestedPriority] ?? 9);
      case 'feedback': return b.linkedFeedbackIds.length - a.linkedFeedbackIds.length;
      default: return 0;
    }
  });

  const handleStatusChange = (id: string, status: WorkItemStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const totalValue = items
    .filter((i) => i.status !== 'rejected')
    .reduce((sum, i) => sum + i.estimatedValue, 0);

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Suggested Backlog"
        subtitle={`${items.length} AI-suggested work items — ${formatCurrency(totalValue)}/yr potential value`}
      />
      <div className="px-4 py-3 border-b border-gray-400 flex items-center gap-3">
        <span className="text-[10px] text-gray-500 uppercase">Sort by:</span>
        {(['value', 'confidence', 'priority', 'feedback'] as SortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`text-[10px] px-2 py-1 border ${
              sortBy === key
                ? 'bg-gray-900 text-gray-50 border-gray-900'
                : 'border-gray-400 hover:bg-gray-200'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sorted.map((item) => (
          <SuggestedItemCard
            key={item.id}
            item={item}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
