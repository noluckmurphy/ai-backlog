import { sentimentToLabel, sentimentBlocks, trendArrow } from '../../utils/sentimentHelpers';

describe('sentimentToLabel', () => {
  it('maps -0.8 to very_negative', () => expect(sentimentToLabel(-0.8)).toBe('very_negative'));
  it('maps -0.3 to negative', () => expect(sentimentToLabel(-0.3)).toBe('negative'));
  it('maps 0 to neutral', () => expect(sentimentToLabel(0)).toBe('neutral'));
  it('maps 0.4 to positive', () => expect(sentimentToLabel(0.4)).toBe('positive'));
  it('maps 0.8 to very_positive', () => expect(sentimentToLabel(0.8)).toBe('very_positive'));
});

describe('sentimentBlocks', () => {
  it('returns 5 characters', () => expect(sentimentBlocks(0).length).toBe(5));
  it('returns more filled blocks for positive scores', () => {
    const pos = sentimentBlocks(0.8);
    const neg = sentimentBlocks(-0.8);
    const filledPos = (pos.match(/\u2588/g) || []).length;
    const filledNeg = (neg.match(/\u2588/g) || []).length;
    expect(filledPos).toBeGreaterThan(filledNeg);
  });
});

describe('trendArrow', () => {
  it('returns up arrow', () => expect(trendArrow('up')).toBe('\u2191'));
  it('returns down arrow', () => expect(trendArrow('down')).toBe('\u2193'));
  it('returns right arrow for flat', () => expect(trendArrow('flat')).toBe('\u2192'));
});
