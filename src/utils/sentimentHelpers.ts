import { SentimentLabel } from '../types';

export function sentimentToLabel(score: number): SentimentLabel {
  if (score <= -0.6) return 'very_negative';
  if (score <= -0.2) return 'negative';
  if (score <= 0.2) return 'neutral';
  if (score <= 0.6) return 'positive';
  return 'very_positive';
}

export function sentimentLabelDisplay(label: SentimentLabel): string {
  const map: Record<SentimentLabel, string> = {
    very_negative: 'Very Negative',
    negative: 'Negative',
    neutral: 'Neutral',
    positive: 'Positive',
    very_positive: 'Very Positive',
  };
  return map[label];
}

export function sentimentBlocks(score: number): string {
  // -1 to 1 mapped to 1-5 filled blocks out of 5
  const normalized = Math.round(((score + 1) / 2) * 4); // 0-4
  const filled = normalized + 1; // 1-5
  return '\u2588'.repeat(filled) + '\u2591'.repeat(5 - filled);
}

export function sentimentShade(score: number): string {
  if (score <= -0.6) return 'text-gray-900';
  if (score <= -0.2) return 'text-gray-700';
  if (score <= 0.2) return 'text-gray-500';
  if (score <= 0.6) return 'text-gray-400';
  return 'text-gray-300';
}

export function trendArrow(trend: 'up' | 'down' | 'flat'): string {
  if (trend === 'up') return '\u2191';
  if (trend === 'down') return '\u2193';
  return '\u2192';
}
