import { useState } from 'react';
import { FeedbackItem } from '../../types';
import { sentimentBlocks, sentimentLabelDisplay } from '../../utils/sentimentHelpers';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface FeedbackCardProps {
  item: FeedbackItem;
}

const sourceBadge: Record<string, string> = {
  support: 'bg-gray-800 text-gray-50',
  sales: 'bg-gray-600 text-gray-50',
  nps: 'bg-gray-400 text-gray-900',
};

export default function FeedbackCard({ item }: FeedbackCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      className="w-full text-left px-4 py-3 border-b border-gray-300 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase ${sourceBadge[item.source]}`}>
            {item.source}
          </span>
          <span className="text-xs font-bold">{item.customerName}</span>
          <span className="text-[10px] text-gray-500 uppercase">{item.customerSegment}</span>
        </div>
        <span className="text-[10px] text-gray-500 whitespace-nowrap">{formatDate(item.timestamp)}</span>
      </div>

      <p className={`text-xs mt-1.5 text-gray-700 ${expanded ? '' : 'line-clamp-1'}`}>
        {item.rawText}
      </p>

      {expanded && (
        <div className="mt-2 pt-2 border-t border-gray-200 text-[10px] text-gray-500 space-y-1">
          <div>Source: {item.source} | Segment: {item.customerSegment} | Sentiment: {item.sentimentScore.toFixed(2)}</div>
          {item.supportTicketPriority && <div>Ticket Priority: {item.supportTicketPriority}</div>}
          {item.npsScore !== undefined && <div>NPS Score: {item.npsScore}/10</div>}
          {item.salesDealValue !== undefined && <div>Deal Value: {formatCurrency(item.salesDealValue)}</div>}
        </div>
      )}

      <div className="flex items-center gap-3 mt-2 flex-wrap">
        <span className="text-[10px] font-mono" title={sentimentLabelDisplay(item.sentimentLabel)}>
          {sentimentBlocks(item.sentimentScore)} {item.sentimentScore.toFixed(2)}
        </span>
        {item.categories.map((c) => (
          <span key={c} className="text-[10px] border border-gray-400 px-1 py-0.5">{c}</span>
        ))}
        {item.supportTicketPriority && (
          <span className="text-[10px] text-gray-500">P:{item.supportTicketPriority}</span>
        )}
        {item.npsScore !== undefined && (
          <span className="text-[10px] text-gray-500">NPS:{item.npsScore}</span>
        )}
        {item.salesDealValue !== undefined && (
          <span className="text-[10px] text-gray-500">{formatCurrency(item.salesDealValue)}</span>
        )}
      </div>
    </button>
  );
}
