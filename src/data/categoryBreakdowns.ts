import { CategoryBreakdown } from '../types';

export const categoryBreakdowns: CategoryBreakdown[] = [
  {
    category: 'billing',
    totalMentions: 47,
    avgSentiment: -0.58,
    trend: 'down',
    topKeywords: ['duplicate charge', 'invoice', 'credit', 'overcharged', 'refund'],
  },
  {
    category: 'onboarding',
    totalMentions: 34,
    avgSentiment: -0.42,
    trend: 'down',
    topKeywords: ['SSO', 'setup wizard', 'documentation', 'slow', 'confusing'],
  },
  {
    category: 'integrations',
    totalMentions: 28,
    avgSentiment: -0.45,
    trend: 'down',
    topKeywords: ['API', 'webhook', 'REST', 'export', 'automation'],
  },
  {
    category: 'api',
    totalMentions: 22,
    avgSentiment: -0.48,
    trend: 'down',
    topKeywords: ['REST API', 'programmatic', 'endpoints', 'public API', 'developer'],
  },
  {
    category: 'performance',
    totalMentions: 19,
    avgSentiment: -0.15,
    trend: 'down',
    topKeywords: ['slow', 'load time', 'latency', 'timeout', 'dashboard'],
  },
  {
    category: 'ui_ux',
    totalMentions: 31,
    avgSentiment: 0.32,
    trend: 'flat',
    topKeywords: ['dashboard', 'filters', 'navigation', 'notifications', 'search'],
  },
  {
    category: 'documentation',
    totalMentions: 15,
    avgSentiment: -0.05,
    trend: 'flat',
    topKeywords: ['outdated', 'helpful', 'SAML', 'setup guide', 'tutorials'],
  },
  {
    category: 'pricing',
    totalMentions: 12,
    avgSentiment: -0.28,
    trend: 'down',
    topKeywords: ['tier', 'enterprise', 'too expensive', 'user count', 'value'],
  },
];
