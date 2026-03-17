import { FeedbackItem, FeedbackSource, SentimentLabel } from '../types';

export interface FeedbackFilterState {
  source: FeedbackSource | 'all';
  sentiment: SentimentLabel | 'all';
  category: string;
  segment: 'enterprise' | 'mid-market' | 'smb' | 'all';
  search: string;
}

export const defaultFilters: FeedbackFilterState = {
  source: 'all',
  sentiment: 'all',
  category: 'all',
  segment: 'all',
  search: '',
};

export function filterFeedback(
  items: FeedbackItem[],
  filters: FeedbackFilterState
): FeedbackItem[] {
  return items.filter((item) => {
    if (filters.source !== 'all' && item.source !== filters.source) return false;
    if (filters.sentiment !== 'all' && item.sentimentLabel !== filters.sentiment) return false;
    if (filters.category !== 'all' && !item.categories.includes(filters.category)) return false;
    if (filters.segment !== 'all' && item.customerSegment !== filters.segment) return false;
    if (
      filters.search &&
      !item.rawText.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.customerName.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });
}

export function getAllCategories(items: FeedbackItem[]): string[] {
  const cats = new Set<string>();
  items.forEach((item) => item.categories.forEach((c) => cats.add(c)));
  return Array.from(cats).sort();
}
