import { filterFeedback, defaultFilters } from '../../utils/filters';
import { feedbackItems } from '../../data/feedbackItems';

describe('filterFeedback', () => {
  it('returns all items with default filters', () => {
    const result = filterFeedback(feedbackItems, defaultFilters);
    expect(result.length).toBe(feedbackItems.length);
  });

  it('filters by source', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, source: 'support' });
    expect(result.every((item) => item.source === 'support')).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('filters by sentiment', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, sentiment: 'very_negative' });
    expect(result.every((item) => item.sentimentLabel === 'very_negative')).toBe(true);
  });

  it('filters by category', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, category: 'billing' });
    expect(result.every((item) => item.categories.includes('billing'))).toBe(true);
  });

  it('filters by segment', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, segment: 'enterprise' });
    expect(result.every((item) => item.customerSegment === 'enterprise')).toBe(true);
  });

  it('filters by date range', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, dateFrom: '2025-12-01', dateTo: '2025-12-31' });
    result.forEach((item) => {
      expect(item.timestamp >= '2025-12-01').toBe(true);
      expect(item.timestamp.slice(0, 10) <= '2025-12-31').toBe(true);
    });
  });

  it('filters by search text', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, search: 'billing' });
    expect(result.every((item) =>
      item.rawText.toLowerCase().includes('billing') ||
      item.customerName.toLowerCase().includes('billing')
    )).toBe(true);
  });

  it('combines multiple filters', () => {
    const result = filterFeedback(feedbackItems, {
      ...defaultFilters,
      source: 'support',
      sentiment: 'very_negative',
    });
    expect(result.every((item) => item.source === 'support' && item.sentimentLabel === 'very_negative')).toBe(true);
  });
});
