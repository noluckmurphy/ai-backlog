import { feedbackItems } from '../../data/feedbackItems';
import { suggestedWorkItems } from '../../data/suggestedWorkItems';
import { defaultValueRules } from '../../data/valueRules';
import { sentimentToLabel } from '../../utils/sentimentHelpers';

describe('data integrity', () => {
  it('feedback items have consistent sentiment labels', () => {
    feedbackItems.forEach((item) => {
      expect(item.sentimentLabel).toBe(sentimentToLabel(item.sentimentScore));
    });
  });

  it('feedback items are sorted newest-first', () => {
    for (let i = 1; i < feedbackItems.length; i++) {
      expect(new Date(feedbackItems[i - 1].timestamp).getTime())
        .toBeGreaterThanOrEqual(new Date(feedbackItems[i].timestamp).getTime());
    }
  });

  it('suggested work items reference valid feedback IDs', () => {
    const feedbackIds = new Set(feedbackItems.map((f) => f.id));
    suggestedWorkItems.forEach((item) => {
      item.linkedFeedbackIds.forEach((id) => {
        expect(feedbackIds.has(id)).toBe(true);
      });
    });
  });

  it('value breakdowns sum to estimated value', () => {
    suggestedWorkItems.forEach((item) => {
      const breakdownSum = item.estimatedValueBreakdown.reduce((s, b) => s + b.amount, 0);
      expect(breakdownSum).toBe(item.estimatedValue);
    });
  });

  it('all value rules have unique IDs', () => {
    const ids = defaultValueRules.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has at least 80 feedback items', () => {
    expect(feedbackItems.length).toBeGreaterThanOrEqual(80);
  });
});
