import { useState } from 'react';
import { SuggestedWorkItem, WorkItemStatus } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import ValueBreakdown from './ValueBreakdown';
import ItemActions from './ItemActions';

interface SuggestedItemCardProps {
  item: SuggestedWorkItem;
  onStatusChange: (id: string, status: WorkItemStatus) => void;
}

const priorityWeight: Record<string, string> = {
  critical: 'border-l-4 border-l-gray-900',
  high: 'border-l-4 border-l-gray-600',
  medium: 'border-l-4 border-l-gray-400',
  low: 'border-l-4 border-l-gray-200',
};

const statusOpacity: Record<string, string> = {
  suggested: '',
  accepted: 'bg-gray-50',
  rejected: 'opacity-50',
  deferred: 'opacity-70',
};

export default function SuggestedItemCard({ item, onStatusChange }: SuggestedItemCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div
      className={`border border-gray-400 p-4 ${priorityWeight[item.suggestedPriority]} ${statusOpacity[item.status]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase border border-gray-400 px-1 py-0.5">
              {item.suggestedPriority}
            </span>
            <span className="text-[10px] border border-gray-400 px-1 py-0.5">{item.size}</span>
            <span className="text-[10px] border border-gray-400 px-1 py-0.5">{item.category}</span>
          </div>
          <h3 className="text-sm font-bold mt-1.5">{item.title}</h3>
        </div>
        <div className="text-right shrink-0">
          <div className="text-base font-bold">{formatCurrency(item.estimatedValue)}<span className="text-[10px] text-gray-500">/yr</span></div>
          <div className="text-[10px] text-gray-500">{formatPercent(item.aiConfidence)} confidence</div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-2">{item.description}</p>

      <div className="text-[10px] text-gray-500 mt-2">
        {item.linkedFeedbackIds.length} linked feedback items
      </div>

      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        aria-expanded={showBreakdown}
        className="text-[10px] underline text-gray-500 hover:text-gray-900 mt-1"
      >
        {showBreakdown ? 'hide' : 'show'} value breakdown
      </button>

      {showBreakdown && (
        <div className="mt-2 border-t border-gray-300 pt-2">
          <ValueBreakdown items={item.estimatedValueBreakdown} />
          <div className="text-[10px] text-gray-500 mt-2 italic">
            {item.sentimentDriver}
          </div>
        </div>
      )}

      <ItemActions
        status={item.status}
        onStatusChange={(status) => onStatusChange(item.id, status)}
      />
    </div>
  );
}
