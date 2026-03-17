import { formatCurrency, formatDate, formatPercent, formatSentimentScore } from '../../utils/formatters';

describe('formatCurrency', () => {
  it('formats millions', () => expect(formatCurrency(1_500_000)).toBe('$1.5M'));
  it('formats thousands', () => expect(formatCurrency(57_600)).toBe('$57.6K'));
  it('formats small amounts', () => expect(formatCurrency(500)).toBe('$500'));
});

describe('formatPercent', () => {
  it('formats 0.92 as 92%', () => expect(formatPercent(0.92)).toBe('92%'));
  it('formats 0.78 as 78%', () => expect(formatPercent(0.78)).toBe('78%'));
});

describe('formatSentimentScore', () => {
  it('prepends + for positive', () => expect(formatSentimentScore(0.5)).toBe('+0.50'));
  it('shows negative as-is', () => expect(formatSentimentScore(-0.3)).toBe('-0.30'));
});
