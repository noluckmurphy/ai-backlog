import { TeamDependency } from '../types';

export const teamDependencies: TeamDependency[] = [
  {
    id: 'dep-001',
    fromTeam: 'mobile',
    fromItemId: 'tb-mobile-005',
    toTeam: 'platform',
    toItemId: 'tb-platform-001',
    dependencyType: 'blocks',
    description:
      'Mobile app cannot migrate to the new API client until Platform ships the public REST API with OAuth2 authentication endpoints. Mobile is currently using direct database queries which will be deprecated.',
    risk: 'high',
  },
  {
    id: 'dep-002',
    fromTeam: 'payments',
    fromItemId: 'tb-payments-001',
    toTeam: 'platform',
    toItemId: 'tb-platform-002',
    dependencyType: 'shared_component',
    description:
      'Payments\u2019 duplicate charge fix depends on Platform\u2019s billing processor retry logic changes. Both teams are modifying src/services/billing/processor.ts and need to coordinate to avoid merge conflicts and ensure the idempotency key fix is consistent.',
    risk: 'high',
  },
  {
    id: 'dep-003',
    fromTeam: 'growth',
    fromItemId: 'tb-growth-001',
    toTeam: 'platform',
    toItemId: 'tb-platform-004',
    dependencyType: 'needs_api',
    description:
      'Growth\u2019s onboarding redesign needs Platform\u2019s SSO endpoint to eliminate the manual admin step at onboarding step 3. Without the SSO endpoint, the 35% drop-off rate at step 3 cannot be resolved programmatically.',
    risk: 'high',
  },
  {
    id: 'dep-004',
    fromTeam: 'growth',
    fromItemId: 'tb-growth-002',
    toTeam: 'platform',
    toItemId: 'tb-platform-005',
    dependencyType: 'shared_schema',
    description:
      'Growth wants to add onboarding fields to the user table, but Platform is planning a full user schema refactor. Growth\u2019s migration must be written against the new schema shape, so Platform\u2019s refactor must land first.',
    risk: 'medium',
  },
  {
    id: 'dep-005',
    fromTeam: 'payments',
    fromItemId: 'tb-payments-006',
    toTeam: 'platform',
    toItemId: 'tb-platform-006',
    dependencyType: 'shared_component',
    description:
      'Payments\u2019 subscription lifecycle event refactor should publish events through Platform\u2019s new webhook event bus rather than building a separate event system. Platform\u2019s event infrastructure needs to be available first.',
    risk: 'medium',
  },
  {
    id: 'dep-006',
    fromTeam: 'mobile',
    fromItemId: 'tb-mobile-003',
    toTeam: 'platform',
    toItemId: 'tb-platform-001',
    dependencyType: 'needs_api',
    description:
      'Mobile push notification preferences and subscription management require API endpoints to persist user notification settings. The platform REST API must include notification preference endpoints.',
    risk: 'low',
  },
];
