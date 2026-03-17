import { OverlapItem } from '../types';

export const overlapItems: OverlapItem[] = [
  {
    id: 'ov-001',
    itemA: {
      teamId: 'platform',
      itemId: 'tb-platform-002',
      title: 'Fix billing processor retry logic',
    },
    itemB: {
      teamId: 'payments',
      itemId: 'tb-payments-001',
      title: 'Resolve duplicate charge bug',
    },
    overlapType: 'duplicate',
    similarity: 0.91,
    explanation:
      'Both teams are independently investigating the same root cause: the payment processor retry logic that produces duplicate charges when the gateway times out. Platform is approaching it from the retry queue side while Payments is looking at the charge validator. These should be merged into a single coordinated effort to avoid conflicting fixes.',
    suggestedAction: 'merge',
  },
  {
    id: 'ov-002',
    itemA: {
      teamId: 'growth',
      itemId: 'tb-growth-001',
      title: 'Redesign onboarding wizard',
    },
    itemB: {
      teamId: 'mobile',
      itemId: 'tb-mobile-002',
      title: 'Improve mobile onboarding flow',
    },
    overlapType: 'related',
    similarity: 0.72,
    explanation:
      'Both teams are redesigning onboarding flows for their respective platforms. While the implementations differ (web vs. mobile), the user journey, copy, step sequencing, and completion criteria should be aligned to avoid a fragmented experience. Shared design tokens and onboarding state model would benefit both.',
    suggestedAction: 'coordinate',
  },
  {
    id: 'ov-003',
    itemA: {
      teamId: 'platform',
      itemId: 'tb-platform-005',
      title: 'Refactor user schema for API consumption',
    },
    itemB: {
      teamId: 'growth',
      itemId: 'tb-growth-002',
      title: 'Add onboarding fields to user table',
    },
    overlapType: 'conflicting',
    similarity: 0.65,
    explanation:
      'Platform plans to normalize and restructure the user table while Growth wants to add new onboarding-tracking columns to the same table. If both migrations run, they will conflict. The teams need to agree on the final schema shape before either migration lands.',
    suggestedAction: 'review',
  },
  {
    id: 'ov-004',
    itemA: {
      teamId: 'platform',
      itemId: 'tb-platform-006',
      title: 'Add webhook event infrastructure',
    },
    itemB: {
      teamId: 'payments',
      itemId: 'tb-payments-006',
      title: 'Refactor subscription lifecycle events',
    },
    overlapType: 'related',
    similarity: 0.58,
    explanation:
      'Platform is building a generic event bus for webhooks while Payments is refactoring subscription lifecycle events. Payments\u2019 subscription events should be published through Platform\u2019s event bus rather than building a separate event system. Coordinating now saves rework later.',
    suggestedAction: 'coordinate',
  },
  {
    id: 'ov-005',
    itemA: {
      teamId: 'growth',
      itemId: 'tb-growth-005',
      title: 'Create interactive onboarding checklist',
    },
    itemB: {
      teamId: 'mobile',
      itemId: 'tb-mobile-002',
      title: 'Improve mobile onboarding flow',
    },
    overlapType: 'related',
    similarity: 0.68,
    explanation:
      'Growth\u2019s onboarding checklist component and Mobile\u2019s onboarding flow both track step completion and allow non-linear progress. The underlying state model (which steps are complete, which are skipped) should be shared so users who start onboarding on web can continue on mobile.',
    suggestedAction: 'coordinate',
  },
  {
    id: 'ov-006',
    itemA: {
      teamId: 'platform',
      itemId: 'tb-platform-003',
      title: 'Optimize dashboard query performance',
    },
    itemB: {
      teamId: 'mobile',
      itemId: 'tb-mobile-009',
      title: 'Add mobile reporting views',
    },
    overlapType: 'related',
    similarity: 0.52,
    explanation:
      'Platform is optimizing dashboard queries for performance while Mobile is building new reporting views that will call the same underlying data endpoints. Mobile should use Platform\u2019s optimized and paginated queries rather than building separate data-fetching logic.',
    suggestedAction: 'coordinate',
  },
  {
    id: 'ov-007',
    itemA: {
      teamId: 'payments',
      itemId: 'tb-payments-004',
      title: 'Implement mid-market pricing tier',
    },
    itemB: {
      teamId: 'growth',
      itemId: 'tb-growth-008',
      title: 'Build referral program MVP',
    },
    overlapType: 'related',
    similarity: 0.45,
    explanation:
      'The new mid-market pricing tier and the referral program both target mid-market customer acquisition. Referral rewards and pricing tier eligibility need to be aligned so referred users land on the correct tier and referrers receive appropriate credits.',
    suggestedAction: 'review',
  },
];
