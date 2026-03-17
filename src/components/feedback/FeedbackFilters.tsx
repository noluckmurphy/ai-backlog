import { FeedbackFilterState } from '../../utils/filters';
import { FeedbackSource, SentimentLabel } from '../../types';

interface FeedbackFiltersProps {
  filters: FeedbackFilterState;
  onChange: (filters: FeedbackFilterState) => void;
  categories: string[];
  resultCount: number;
}

export default function FeedbackFilters({ filters, onChange, categories, resultCount }: FeedbackFiltersProps) {
  const update = (patch: Partial<FeedbackFilterState>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="px-4 py-3 border-b border-gray-400 flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => update({ search: e.target.value })}
        className="px-2 py-1 text-xs border border-gray-400 bg-white w-40"
      />

      <select
        value={filters.source}
        onChange={(e) => update({ source: e.target.value as FeedbackSource | 'all' })}
        className="px-2 py-1 text-xs border border-gray-400 bg-white"
      >
        <option value="all">All Sources</option>
        <option value="support">Support</option>
        <option value="sales">Sales</option>
        <option value="nps">NPS</option>
      </select>

      <select
        value={filters.sentiment}
        onChange={(e) => update({ sentiment: e.target.value as SentimentLabel | 'all' })}
        className="px-2 py-1 text-xs border border-gray-400 bg-white"
      >
        <option value="all">All Sentiment</option>
        <option value="very_negative">Very Negative</option>
        <option value="negative">Negative</option>
        <option value="neutral">Neutral</option>
        <option value="positive">Positive</option>
        <option value="very_positive">Very Positive</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => update({ category: e.target.value })}
        className="px-2 py-1 text-xs border border-gray-400 bg-white"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filters.segment}
        onChange={(e) => update({ segment: e.target.value as 'enterprise' | 'mid-market' | 'smb' | 'all' })}
        className="px-2 py-1 text-xs border border-gray-400 bg-white"
      >
        <option value="all">All Segments</option>
        <option value="enterprise">Enterprise</option>
        <option value="mid-market">Mid-Market</option>
        <option value="smb">SMB</option>
      </select>

      <input
        type="date"
        value={filters.dateFrom}
        onChange={(e) => update({ dateFrom: e.target.value })}
        className="px-2 py-1 text-xs border border-gray-400 bg-white"
        title="From date"
      />
      <span className="text-[10px] text-gray-500">&ndash;</span>
      <input
        type="date"
        value={filters.dateTo}
        onChange={(e) => update({ dateTo: e.target.value })}
        className="px-2 py-1 text-xs border border-gray-400 bg-white"
        title="To date"
      />

      <span className="text-[10px] text-gray-500 ml-auto">{resultCount} items</span>
    </div>
  );
}
