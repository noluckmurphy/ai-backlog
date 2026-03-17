import { TeamBacklogItem } from '../types';

export const teamBacklogItems: TeamBacklogItem[] = [
  // --- PLATFORM TEAM (10 items) ---
  {
    id: 'tb-platform-001',
    teamId: 'platform',
    title: 'Build public REST API with OAuth2',
    description:
      'Design and ship a public REST API covering core CRUD operations, data export, and webhook subscriptions. OAuth2 authentication required. Three enterprise deals ($450K total) were lost due to lack of API access.',
    status: 'in_progress',
    category: 'integrations',
    filesLikelyTouched: [
      'src/services/api/router.ts',
      'src/services/api/middleware/auth.ts',
      'src/services/api/controllers/crud.ts',
      'src/services/api/openapi-spec.yaml',
    ],
    createdAt: '2025-11-15T08:00:00Z',
  },
  {
    id: 'tb-platform-002',
    teamId: 'platform',
    title: 'Fix billing processor retry logic',
    description:
      'The payment processor retry logic introduced in the September release causes duplicate charges. Retry queue does not deduplicate idempotency keys when the processor returns a timeout.',
    status: 'in_progress',
    category: 'billing',
    filesLikelyTouched: [
      'src/services/billing/processor.ts',
      'src/services/billing/retry-queue.ts',
      'src/services/billing/idempotency.ts',
    ],
    createdAt: '2025-12-01T08:00:00Z',
  },
  {
    id: 'tb-platform-003',
    teamId: 'platform',
    title: 'Optimize dashboard query performance',
    description:
      'Main dashboard queries take 8-12 seconds for enterprise accounts with large datasets. Add pagination, query caching, and loading skeletons.',
    status: 'planned',
    category: 'performance',
    filesLikelyTouched: [
      'src/services/dashboard/queries.ts',
      'src/services/cache/redis-client.ts',
      'src/components/dashboard/DataTable.tsx',
    ],
    createdAt: '2025-12-10T08:00:00Z',
  },
  {
    id: 'tb-platform-004',
    teamId: 'platform',
    title: 'Implement SSO endpoint for onboarding',
    description:
      'Create a dedicated SSO configuration endpoint that the onboarding wizard can call. Current SSO setup requires manual admin intervention causing 35% drop-off at onboarding step 3.',
    status: 'planned',
    category: 'auth',
    filesLikelyTouched: [
      'src/services/auth/sso-provider.ts',
      'src/services/auth/saml-handler.ts',
      'src/api/routes/sso.ts',
    ],
    createdAt: '2025-12-12T08:00:00Z',
  },
  {
    id: 'tb-platform-005',
    teamId: 'platform',
    title: 'Refactor user schema for API consumption',
    description:
      'Normalize the user table schema to support API-first access patterns. Add versioned fields, remove deprecated columns, and introduce a user_profiles junction table.',
    status: 'planned',
    category: 'database',
    filesLikelyTouched: [
      'src/db/schema/users.ts',
      'src/db/migrations/024-user-schema-refactor.sql',
      'src/services/users/repository.ts',
    ],
    createdAt: '2025-12-15T08:00:00Z',
  },
  {
    id: 'tb-platform-006',
    teamId: 'platform',
    title: 'Add webhook event infrastructure',
    description:
      'Build the event bus and webhook delivery system. Customers can subscribe to record-level events (create, update, delete, status change).',
    status: 'planned',
    category: 'integrations',
    filesLikelyTouched: [
      'src/services/webhooks/event-bus.ts',
      'src/services/webhooks/delivery.ts',
      'src/services/webhooks/subscription-manager.ts',
    ],
    createdAt: '2025-12-18T08:00:00Z',
  },
  {
    id: 'tb-platform-007',
    teamId: 'platform',
    title: 'Implement rate limiting for API',
    description:
      'Add per-customer rate limiting with configurable tiers. Platform API needs rate limiting before public launch to prevent abuse.',
    status: 'planned',
    category: 'infrastructure',
    filesLikelyTouched: [
      'src/services/api/middleware/rate-limiter.ts',
      'src/services/api/config/rate-limits.ts',
    ],
    createdAt: '2025-12-20T08:00:00Z',
  },
  {
    id: 'tb-platform-008',
    teamId: 'platform',
    title: 'Database connection pool optimization',
    description:
      'Current connection pool settings cause timeouts under load. Tune pool size, add connection health checks, and implement graceful degradation.',
    status: 'done',
    category: 'performance',
    filesLikelyTouched: [
      'src/db/pool.ts',
      'src/db/health-check.ts',
      'src/config/database.ts',
    ],
    createdAt: '2025-11-01T08:00:00Z',
  },
  {
    id: 'tb-platform-009',
    teamId: 'platform',
    title: 'Migrate logging to structured JSON format',
    description:
      'Replace text-based logging with structured JSON logs. Enables better log aggregation and alerting in production.',
    status: 'done',
    category: 'infrastructure',
    filesLikelyTouched: [
      'src/utils/logger.ts',
      'src/config/logging.ts',
    ],
    createdAt: '2025-10-20T08:00:00Z',
  },
  {
    id: 'tb-platform-010',
    teamId: 'platform',
    title: 'Add bulk user provisioning API',
    description:
      'Expose a CSV upload endpoint for bulk user creation. Enterprise admins currently must add users one at a time through the UI.',
    status: 'planned',
    category: 'integrations',
    filesLikelyTouched: [
      'src/services/api/controllers/users-bulk.ts',
      'src/services/users/csv-parser.ts',
      'src/services/users/batch-creator.ts',
    ],
    createdAt: '2025-12-22T08:00:00Z',
  },

  // --- PAYMENTS TEAM (9 items) ---
  {
    id: 'tb-payments-001',
    teamId: 'payments',
    title: 'Resolve duplicate charge bug',
    description:
      'Multiple enterprise customers report being charged twice in a billing cycle. Root cause appears to be in the retry logic when the payment gateway times out. Need to add idempotency key validation before retry.',
    status: 'in_progress',
    category: 'billing',
    filesLikelyTouched: [
      'src/services/billing/processor.ts',
      'src/services/billing/charge-validator.ts',
      'src/services/billing/gateway-client.ts',
    ],
    createdAt: '2025-12-02T08:00:00Z',
  },
  {
    id: 'tb-payments-002',
    teamId: 'payments',
    title: 'Add payment processor monitoring dashboard',
    description:
      'Implement real-time monitoring and alerting for payment processor responses. Track success rates, latency, and error codes. Would have caught the duplicate billing issue before customers noticed.',
    status: 'planned',
    category: 'monitoring',
    filesLikelyTouched: [
      'src/services/billing/metrics-collector.ts',
      'src/components/admin/PaymentMonitor.tsx',
      'src/services/alerts/billing-alerts.ts',
    ],
    createdAt: '2025-12-08T08:00:00Z',
  },
  {
    id: 'tb-payments-003',
    teamId: 'payments',
    title: 'Rebuild invoicing template engine',
    description:
      'Replace the legacy PDF invoice generator with a modern template engine. Support customizable branding, multi-currency formatting, and tax calculation plugins.',
    status: 'planned',
    category: 'invoicing',
    filesLikelyTouched: [
      'src/services/invoicing/template-engine.ts',
      'src/services/invoicing/pdf-renderer.ts',
      'src/services/invoicing/tax-calculator.ts',
    ],
    createdAt: '2025-12-05T08:00:00Z',
  },
  {
    id: 'tb-payments-004',
    teamId: 'payments',
    title: 'Implement mid-market pricing tier',
    description:
      'Create a new pricing tier between current mid-tier and enterprise. Multiple mid-market customers report paying for enterprise features they do not use.',
    status: 'planned',
    category: 'pricing',
    filesLikelyTouched: [
      'src/services/billing/pricing-tiers.ts',
      'src/services/billing/subscription-manager.ts',
      'src/db/schema/plans.ts',
    ],
    createdAt: '2025-12-14T08:00:00Z',
  },
  {
    id: 'tb-payments-005',
    teamId: 'payments',
    title: 'Add Stripe Connect support for marketplace payouts',
    description:
      'Integrate Stripe Connect to enable marketplace-style payouts to vendors and partners. Several enterprise customers have requested this for their internal marketplaces.',
    status: 'planned',
    category: 'payments',
    filesLikelyTouched: [
      'src/services/billing/stripe-connect.ts',
      'src/services/billing/payout-manager.ts',
    ],
    createdAt: '2025-12-16T08:00:00Z',
  },
  {
    id: 'tb-payments-006',
    teamId: 'payments',
    title: 'Refactor subscription lifecycle events',
    description:
      'Standardize how subscription create, upgrade, downgrade, and cancel events are handled. Current logic is spread across multiple services with inconsistent behavior.',
    status: 'in_progress',
    category: 'billing',
    filesLikelyTouched: [
      'src/services/billing/subscription-lifecycle.ts',
      'src/services/billing/event-handlers.ts',
      'src/services/notifications/subscription-emails.ts',
    ],
    createdAt: '2025-11-20T08:00:00Z',
  },
  {
    id: 'tb-payments-007',
    teamId: 'payments',
    title: 'Add automated dunning for failed payments',
    description:
      'Implement automated retry schedule and customer notification flow for failed payment attempts. Reduce involuntary churn from expired cards.',
    status: 'done',
    category: 'billing',
    filesLikelyTouched: [
      'src/services/billing/dunning-manager.ts',
      'src/services/notifications/payment-reminders.ts',
    ],
    createdAt: '2025-10-15T08:00:00Z',
  },
  {
    id: 'tb-payments-008',
    teamId: 'payments',
    title: 'PCI compliance audit remediation',
    description:
      'Address findings from the latest PCI DSS audit. Update encryption at rest, rotate API keys, and improve access logging for cardholder data.',
    status: 'done',
    category: 'security',
    filesLikelyTouched: [
      'src/services/billing/encryption.ts',
      'src/services/billing/key-rotation.ts',
      'src/config/pci-compliance.ts',
    ],
    createdAt: '2025-09-01T08:00:00Z',
  },
  {
    id: 'tb-payments-009',
    teamId: 'payments',
    title: 'Add revenue recognition reporting',
    description:
      'Build ASC 606-compliant revenue recognition reports. Finance team currently uses spreadsheets to reconcile subscription revenue.',
    status: 'planned',
    category: 'reporting',
    filesLikelyTouched: [
      'src/services/billing/revenue-recognition.ts',
      'src/components/admin/RevenueReport.tsx',
    ],
    createdAt: '2025-12-19T08:00:00Z',
  },

  // --- GROWTH TEAM (10 items) ---
  {
    id: 'tb-growth-001',
    teamId: 'growth',
    title: 'Redesign onboarding wizard',
    description:
      'Rebuild the onboarding flow with progressive disclosure, inline documentation, and real-time validation. Current flow has a 35% drop-off rate at step 3 (SSO configuration).',
    status: 'in_progress',
    category: 'onboarding',
    filesLikelyTouched: [
      'src/components/onboarding/Wizard.tsx',
      'src/components/onboarding/StepProgress.tsx',
      'src/components/onboarding/SSOConfig.tsx',
      'src/hooks/useOnboarding.ts',
    ],
    createdAt: '2025-11-25T08:00:00Z',
  },
  {
    id: 'tb-growth-002',
    teamId: 'growth',
    title: 'Add onboarding fields to user table',
    description:
      'Extend the user table with onboarding-specific columns: onboarding_step, onboarding_completed_at, onboarding_skipped_steps, and time_to_first_value. Needed for funnel analytics.',
    status: 'planned',
    category: 'database',
    filesLikelyTouched: [
      'src/db/schema/users.ts',
      'src/db/migrations/025-onboarding-fields.sql',
      'src/services/onboarding/tracker.ts',
    ],
    createdAt: '2025-12-10T08:00:00Z',
  },
  {
    id: 'tb-growth-003',
    teamId: 'growth',
    title: 'Implement NPS survey improvements',
    description:
      'Redesign the in-app NPS survey with better timing logic (not during critical workflows), follow-up questions for detractors, and A/B test different prompts.',
    status: 'planned',
    category: 'analytics',
    filesLikelyTouched: [
      'src/components/surveys/NPSSurvey.tsx',
      'src/services/analytics/nps-scheduler.ts',
      'src/services/analytics/survey-ab-test.ts',
    ],
    createdAt: '2025-12-08T08:00:00Z',
  },
  {
    id: 'tb-growth-004',
    teamId: 'growth',
    title: 'Build user activation scoring model',
    description:
      'Define and implement an activation score based on feature usage milestones. Track which features correlate with long-term retention.',
    status: 'planned',
    category: 'analytics',
    filesLikelyTouched: [
      'src/services/analytics/activation-score.ts',
      'src/services/analytics/feature-usage-tracker.ts',
    ],
    createdAt: '2025-12-12T08:00:00Z',
  },
  {
    id: 'tb-growth-005',
    teamId: 'growth',
    title: 'Create interactive onboarding checklist',
    description:
      'Replace linear wizard with a flexible checklist that tracks progress, allows skipping optional steps, and provides contextual help at each stage.',
    status: 'planned',
    category: 'onboarding',
    filesLikelyTouched: [
      'src/components/onboarding/Checklist.tsx',
      'src/components/onboarding/ChecklistItem.tsx',
      'src/hooks/useOnboardingProgress.ts',
    ],
    createdAt: '2025-12-14T08:00:00Z',
  },
  {
    id: 'tb-growth-006',
    teamId: 'growth',
    title: 'A/B test signup page variations',
    description:
      'Set up A/B testing framework and test 3 signup page variations with different value propositions and social proof elements.',
    status: 'in_progress',
    category: 'conversion',
    filesLikelyTouched: [
      'src/components/signup/SignupPage.tsx',
      'src/services/analytics/ab-test-framework.ts',
      'src/services/analytics/conversion-tracker.ts',
    ],
    createdAt: '2025-11-28T08:00:00Z',
  },
  {
    id: 'tb-growth-007',
    teamId: 'growth',
    title: 'Implement in-app feature announcements',
    description:
      'Build a lightweight announcement system for new features. Show contextual tooltips and banners when users first encounter new functionality.',
    status: 'done',
    category: 'engagement',
    filesLikelyTouched: [
      'src/components/shared/FeatureAnnouncement.tsx',
      'src/services/announcements/manager.ts',
    ],
    createdAt: '2025-10-25T08:00:00Z',
  },
  {
    id: 'tb-growth-008',
    teamId: 'growth',
    title: 'Build referral program MVP',
    description:
      'Implement a basic referral program with unique invite links, tracking, and reward credits. Target mid-market segment for viral growth.',
    status: 'planned',
    category: 'conversion',
    filesLikelyTouched: [
      'src/services/referral/invite-generator.ts',
      'src/services/referral/reward-tracker.ts',
      'src/components/referral/InvitePage.tsx',
    ],
    createdAt: '2025-12-20T08:00:00Z',
  },
  {
    id: 'tb-growth-009',
    teamId: 'growth',
    title: 'Improve trial-to-paid conversion emails',
    description:
      'Redesign the trial expiration email sequence. Add usage-based personalization showing which features the user has adopted and what they would lose.',
    status: 'done',
    category: 'conversion',
    filesLikelyTouched: [
      'src/services/notifications/trial-emails.ts',
      'src/services/analytics/usage-summarizer.ts',
    ],
    createdAt: '2025-10-10T08:00:00Z',
  },
  {
    id: 'tb-growth-010',
    teamId: 'growth',
    title: 'Add onboarding analytics dashboard',
    description:
      'Build an internal dashboard showing onboarding funnel metrics: step completion rates, drop-off points, time per step, and segment-level breakdowns.',
    status: 'planned',
    category: 'analytics',
    filesLikelyTouched: [
      'src/components/admin/OnboardingDashboard.tsx',
      'src/services/analytics/onboarding-metrics.ts',
    ],
    createdAt: '2025-12-16T08:00:00Z',
  },

  // --- MOBILE TEAM (9 items) ---
  {
    id: 'tb-mobile-001',
    teamId: 'mobile',
    title: 'Fix Android crash-on-launch bug',
    description:
      'Debug and resolve crash-on-launch affecting Android 12+ devices. Stack traces point to a null pointer in the auth token refresh flow. Affects field workers who rely on mobile access.',
    status: 'in_progress',
    category: 'stability',
    filesLikelyTouched: [
      'mobile/android/src/auth/TokenRefresh.kt',
      'mobile/android/src/auth/SessionManager.kt',
    ],
    createdAt: '2025-12-01T08:00:00Z',
  },
  {
    id: 'tb-mobile-002',
    teamId: 'mobile',
    title: 'Improve mobile onboarding flow',
    description:
      'Redesign the mobile-specific onboarding experience. Current flow mirrors desktop and does not work well on small screens. Add swipeable tutorial cards and simplified SSO setup.',
    status: 'planned',
    category: 'onboarding',
    filesLikelyTouched: [
      'mobile/shared/src/onboarding/MobileWizard.tsx',
      'mobile/shared/src/onboarding/TutorialCards.tsx',
      'mobile/shared/src/onboarding/MobileSSOSetup.tsx',
    ],
    createdAt: '2025-12-10T08:00:00Z',
  },
  {
    id: 'tb-mobile-003',
    teamId: 'mobile',
    title: 'Implement push notification system',
    description:
      'Add push notification support for iOS and Android. Support transactional notifications (assignment changes, mentions) and optional marketing notifications.',
    status: 'planned',
    category: 'notifications',
    filesLikelyTouched: [
      'mobile/shared/src/notifications/PushManager.ts',
      'mobile/ios/src/notifications/APNSHandler.swift',
      'mobile/android/src/notifications/FCMHandler.kt',
    ],
    createdAt: '2025-12-05T08:00:00Z',
  },
  {
    id: 'tb-mobile-004',
    teamId: 'mobile',
    title: 'Build offline mode for field workers',
    description:
      'Implement offline data caching and sync for mobile users in areas with poor connectivity. Queue mutations locally and sync when connection is restored.',
    status: 'planned',
    category: 'offline',
    filesLikelyTouched: [
      'mobile/shared/src/sync/OfflineCache.ts',
      'mobile/shared/src/sync/MutationQueue.ts',
      'mobile/shared/src/sync/ConflictResolver.ts',
    ],
    createdAt: '2025-12-08T08:00:00Z',
  },
  {
    id: 'tb-mobile-005',
    teamId: 'mobile',
    title: 'Integrate with platform REST API',
    description:
      'Replace direct database queries in the mobile app with calls to the new platform REST API. Requires API to be available with auth endpoints.',
    status: 'planned',
    category: 'integrations',
    filesLikelyTouched: [
      'mobile/shared/src/api/ApiClient.ts',
      'mobile/shared/src/api/AuthInterceptor.ts',
      'mobile/shared/src/api/endpoints.ts',
    ],
    createdAt: '2025-12-12T08:00:00Z',
  },
  {
    id: 'tb-mobile-006',
    teamId: 'mobile',
    title: 'Fix iOS background sync reliability',
    description:
      'Background sync on iOS frequently fails due to aggressive OS task killing. Implement BGTaskScheduler properly and add retry logic.',
    status: 'in_progress',
    category: 'stability',
    filesLikelyTouched: [
      'mobile/ios/src/sync/BackgroundSync.swift',
      'mobile/ios/src/sync/BGTaskHandler.swift',
    ],
    createdAt: '2025-11-18T08:00:00Z',
  },
  {
    id: 'tb-mobile-007',
    teamId: 'mobile',
    title: 'Add biometric authentication',
    description:
      'Support Face ID, Touch ID, and Android fingerprint for app unlock. Reduce friction for users who access the app frequently throughout the day.',
    status: 'done',
    category: 'auth',
    filesLikelyTouched: [
      'mobile/ios/src/auth/BiometricAuth.swift',
      'mobile/android/src/auth/BiometricAuth.kt',
    ],
    createdAt: '2025-10-15T08:00:00Z',
  },
  {
    id: 'tb-mobile-008',
    teamId: 'mobile',
    title: 'Optimize mobile app bundle size',
    description:
      'Current Android APK is 45MB and iOS bundle is 62MB. Implement code splitting, lazy loading for non-critical screens, and asset optimization.',
    status: 'planned',
    category: 'performance',
    filesLikelyTouched: [
      'mobile/shared/src/config/bundler.ts',
      'mobile/android/build.gradle',
      'mobile/ios/Podfile',
    ],
    createdAt: '2025-12-18T08:00:00Z',
  },
  {
    id: 'tb-mobile-009',
    teamId: 'mobile',
    title: 'Add mobile reporting views',
    description:
      'Build mobile-optimized report viewing with swipeable charts, pinch-to-zoom on data tables, and shareable report snapshots.',
    status: 'planned',
    category: 'reporting',
    filesLikelyTouched: [
      'mobile/shared/src/reports/MobileReportView.tsx',
      'mobile/shared/src/reports/ChartSwiper.tsx',
      'mobile/shared/src/reports/ShareSnapshot.ts',
    ],
    createdAt: '2025-12-20T08:00:00Z',
  },
];
