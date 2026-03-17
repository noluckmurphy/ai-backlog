import { useState } from 'react';
import { feedbackItems } from '../../data/feedbackItems';
import { FeedbackFilterState, defaultFilters, filterFeedback, getAllCategories } from '../../utils/filters';
import FeedbackFilters from './FeedbackFilters';
import FeedbackCard from './FeedbackCard';
import PageHeader from '../layout/PageHeader';

export default function FeedbackFeed() {
  const [filters, setFilters] = useState<FeedbackFilterState>(defaultFilters);
  const categories = getAllCategories(feedbackItems);
  const filtered = filterFeedback(feedbackItems, filters);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Feedback Feed" subtitle={`${feedbackItems.length} items from 3 sources`} />
      <FeedbackFilters
        filters={filters}
        onChange={setFilters}
        categories={categories}
        resultCount={filtered.length}
      />
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-xs text-gray-500">No feedback matches your filters.</div>
        ) : (
          filtered.map((item) => <FeedbackCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
