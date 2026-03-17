import { SentimentDataPoint } from '../types';

// 26 weeks of data (Jul 2025 - Dec 2025)
// Narrative: billing sentiment craters, onboarding declines, API frustration builds

function weekDate(weekNum: number): string {
  const d = new Date(2025, 6, 7); // Mon Jul 7, 2025
  d.setDate(d.getDate() + weekNum * 7);
  return d.toISOString().slice(0, 10);
}

function lerp(a: number, b: number, t: number): number {
  return Math.round((a + (b - a) * t) * 100) / 100;
}

const weeks = Array.from({ length: 26 }, (_, i) => i);

// Generate per-source sentiment trend
function generateSourceTrend(
  source: 'support' | 'sales' | 'nps',
  startSentiment: number,
  endSentiment: number,
  noise: number[]
): SentimentDataPoint[] {
  return weeks.map((w, i) => ({
    weekOf: weekDate(w),
    source,
    category: 'all',
    avgSentiment: lerp(startSentiment, endSentiment, i / 25) + (noise[i] || 0),
    volume: Math.floor(8 + Math.random() * 12),
  }));
}

// Category-specific trends
function generateCategoryTrend(
  category: string,
  startSentiment: number,
  endSentiment: number,
  baseVolume: number,
  volumeGrowth: number
): SentimentDataPoint[] {
  return weeks.map((_, i) => ({
    weekOf: weekDate(i),
    source: 'support' as const,
    category,
    avgSentiment: lerp(startSentiment, endSentiment, i / 25) + (((i * 7) % 13) - 6) * 0.02,
    volume: Math.floor(baseVolume + volumeGrowth * (i / 25)),
  }));
}

const supportNoise = [0, 0.02, -0.01, 0.03, -0.02, 0, 0.01, -0.03, 0.02, -0.01, 0.03, -0.04, -0.02, 0.01, -0.05, -0.03, -0.06, -0.04, -0.08, -0.05, -0.1, -0.08, -0.12, -0.1, -0.15, -0.12];
const salesNoise = [0, 0.01, -0.02, 0, 0.02, -0.01, 0.01, -0.03, 0, -0.02, -0.01, -0.03, -0.02, -0.04, -0.03, -0.05, -0.04, -0.06, -0.05, -0.08, -0.06, -0.1, -0.08, -0.1, -0.12, -0.1];
const npsNoise = [0, 0.01, 0.02, 0, -0.01, 0.01, -0.02, 0, 0.01, -0.01, -0.02, -0.01, -0.03, -0.02, -0.04, -0.03, -0.05, -0.04, -0.06, -0.05, -0.07, -0.06, -0.08, -0.07, -0.1, -0.08];

export const sentimentTimeSeries: SentimentDataPoint[] = [
  // Source-level trends (declining overall)
  ...generateSourceTrend('support', 0.1, -0.45, supportNoise),
  ...generateSourceTrend('sales', 0.05, -0.35, salesNoise),
  ...generateSourceTrend('nps', 0.15, -0.25, npsNoise),
  // Category-level trends
  ...generateCategoryTrend('billing', -0.2, -0.7, 3, 12),
  ...generateCategoryTrend('onboarding', 0.1, -0.4, 4, 8),
  ...generateCategoryTrend('api', -0.1, -0.5, 2, 6),
  ...generateCategoryTrend('performance', 0.2, -0.1, 3, 4),
  ...generateCategoryTrend('ui_ux', 0.4, 0.3, 5, 2),
  ...generateCategoryTrend('documentation', 0.1, -0.15, 2, 3),
  ...generateCategoryTrend('pricing', -0.1, -0.25, 2, 2),
  ...generateCategoryTrend('reporting', 0.3, 0.2, 3, 1),
];

// Aggregated weekly volume for the volume bar chart
export interface WeeklyVolume {
  weekOf: string;
  support: number;
  sales: number;
  nps: number;
  total: number;
}

export const weeklyVolumes: WeeklyVolume[] = weeks.map((w) => {
  const support = Math.floor(6 + Math.sin(w * 0.5) * 3 + w * 0.3);
  const sales = Math.floor(3 + Math.cos(w * 0.7) * 2 + w * 0.15);
  const nps = Math.floor(4 + Math.sin(w * 0.3 + 1) * 2 + w * 0.2);
  return {
    weekOf: weekDate(w),
    support,
    sales,
    nps,
    total: support + sales + nps,
  };
});
