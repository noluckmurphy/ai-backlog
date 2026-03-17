import { UserStory, TaskBreakdown } from '../types';

export const userStories: UserStory[] = [
  {
    id: 'us-001',
    title: 'Fix Duplicate Billing Charges',
    description:
      'As a billing administrator, I want the system to prevent duplicate charges so that customers are never billed twice for the same subscription period.',
    acceptanceCriteria: [
      'No duplicate charges are created when the payment processor retries a failed request',
      'An idempotency key is attached to every charge request and tracked in the database',
      'If a duplicate charge is detected, the system logs a warning and returns the original charge result',
      'Monitoring alerts fire when duplicate charge attempts exceed a threshold',
    ],
    category: 'billing',
  },
  {
    id: 'us-002',
    title: 'Build REST API for Integrations',
    description:
      'As an enterprise customer, I want a public REST API with OAuth2 authentication so that I can integrate your product into my existing workflows and tooling.',
    acceptanceCriteria: [
      'API supports OAuth2 client credentials and authorization code flows',
      'CRUD endpoints exist for all core resources (users, records, reports)',
      'Webhook subscriptions allow real-time event notifications',
      'Rate limiting is enforced per API key with clear 429 responses',
      'Interactive API documentation is published at /docs',
    ],
    category: 'integrations',
  },
  {
    id: 'us-003',
    title: 'Redesign Onboarding Flow',
    description:
      'As a new user, I want a guided onboarding experience with clear progress tracking so that I can get to value quickly without needing to contact support.',
    acceptanceCriteria: [
      'Onboarding wizard supports step skipping and re-entry without data loss',
      'SSO configuration step provides inline validation and troubleshooting hints',
      'Progress is persisted across sessions so users can resume where they left off',
      'Contextual help tooltips are available at every step',
    ],
    category: 'onboarding',
  },
];

export const storyBreakdowns: TaskBreakdown[] = [
  // --- Story 1: Fix Duplicate Billing Charges (connects to wi-001) ---
  {
    id: 'tb-001',
    storyId: 'us-001',
    aiConfidence: 0.91,
    edgeCases: [
      'Concurrent charge attempts for the same customer within the same millisecond',
      'Partial payment processor failure where charge succeeds but confirmation times out',
      'Refund flow for a duplicate charge that was already partially refunded',
      'Charges initiated exactly at timezone boundary during billing cycle rollover',
      'Payment processor timeout during idempotency key validation causing retry storm',
    ],
    tasks: [
      {
        id: 'gt-001',
        title: 'Investigate payment processor retry logic',
        description:
          'Audit the current retry mechanism in the billing processor to identify where duplicate charges originate. The September release introduced an aggressive retry policy without idempotency guards.',
        type: 'backend',
        estimatedHours: 6,
        codeContext: [
          {
            filePath: 'src/services/billing/processor.ts',
            lineRange: '142-168',
            relevance: 'Contains the retry loop that fires without checking for prior successful charges',
            snippet:
              '// Current retry logic - no idempotency check\nasync function processCharge(customerId: string, amount: number) {\n  const result = await stripe.charges.create({ customer: customerId, amount });\n  return result;\n}',
          },
        ],
      },
      {
        id: 'gt-002',
        title: 'Add idempotency key to charge requests',
        description:
          'Generate and attach a deterministic idempotency key to every charge request based on customer ID, amount, and billing period. Ensures the payment processor deduplicates retries.',
        type: 'backend',
        estimatedHours: 8,
        codeContext: [
          {
            filePath: 'src/services/billing/chargeService.ts',
            lineRange: '55-80',
            relevance: 'The createCharge function where idempotency key generation should be added',
            snippet:
              'export async function createCharge(params: ChargeParams): Promise<ChargeResult> {\n  const charge = await processor.processCharge(params.customerId, params.amount);\n  await db.charges.insert({ ...charge, createdAt: new Date() });\n  return charge;\n}',
          },
        ],
      },
      {
        id: 'gt-003',
        title: 'Add idempotency tracking table',
        description:
          'Create a database migration that adds an idempotency_keys table to track charge request keys, their status, and expiration timestamps.',
        type: 'database',
        estimatedHours: 4,
        codeContext: [
          {
            filePath: 'src/db/migrations/20250115_add_idempotency.sql',
            lineRange: '1-22',
            relevance: 'New migration file for the idempotency tracking schema',
            snippet:
              'CREATE TABLE idempotency_keys (\n  key VARCHAR(255) PRIMARY KEY,\n  charge_id VARCHAR(255) REFERENCES charges(id),\n  status VARCHAR(20) DEFAULT \'pending\',\n  expires_at TIMESTAMP NOT NULL\n);',
          },
        ],
      },
      {
        id: 'gt-004',
        title: 'Write integration tests for duplicate charge prevention',
        description:
          'Add integration tests that simulate concurrent charge requests, processor timeouts, and retry storms to verify duplicate charges are prevented end-to-end.',
        type: 'testing',
        estimatedHours: 10,
        codeContext: [
          {
            filePath: 'tests/integration/billing/duplicateCharge.test.ts',
            lineRange: '1-40',
            relevance: 'New test file for duplicate charge scenarios',
            snippet:
              'describe(\'duplicate charge prevention\', () => {\n  it(\'should return existing charge on retry with same idempotency key\', async () => {\n    const key = generateIdempotencyKey(customerId, amount, period);\n    const first = await createCharge({ ...params, idempotencyKey: key });\n    const second = await createCharge({ ...params, idempotencyKey: key });\n    expect(second.id).toBe(first.id);\n  });\n});',
          },
        ],
      },
      {
        id: 'gt-005',
        title: 'Add payment processor monitoring alerts',
        description:
          'Configure alerting rules that fire when duplicate charge attempts exceed normal thresholds, enabling proactive detection before customers notice.',
        type: 'devops',
        estimatedHours: 4,
        codeContext: [
          {
            filePath: 'infra/alerts/billing.yaml',
            lineRange: '1-25',
            relevance: 'Alert configuration for billing anomaly detection',
            snippet:
              'alerts:\n  - name: duplicate_charge_attempts\n    condition: count(charge_attempts{status="duplicate"}) > 5\n    window: 5m\n    severity: critical\n    notify: "#billing-oncall"',
          },
        ],
      },
    ],
  },

  // --- Story 2: Build REST API for Integrations (connects to wi-002) ---
  {
    id: 'tb-002',
    storyId: 'us-002',
    aiConfidence: 0.82,
    edgeCases: [
      'OAuth2 token refresh race condition when multiple concurrent requests use the same refresh token',
      'Pagination cursor invalidation when underlying data is modified between page requests',
      'Webhook delivery retry backoff when the subscriber endpoint is intermittently failing',
      'Rate limit window reset timing when client sends burst exactly at window boundary',
      'API versioning backward compatibility when deprecated fields are still referenced by existing integrations',
      'Large payload handling when bulk CRUD operations exceed memory limits',
    ],
    tasks: [
      {
        id: 'gt-006',
        title: 'Set up API framework and routing',
        description:
          'Initialize the Express router for the public API with versioned route prefixes, request validation middleware, and standardized error response formatting.',
        type: 'backend',
        estimatedHours: 12,
        codeContext: [
          {
            filePath: 'src/api/v1/router.ts',
            lineRange: '1-35',
            relevance: 'New API router with versioned prefix and middleware chain',
            snippet:
              'const apiRouter = express.Router();\napiRouter.use(\'/v1\', authMiddleware, rateLimiter, requestValidator);\napiRouter.use(\'/v1/users\', usersRouter);\napiRouter.use(\'/v1/records\', recordsRouter);\nexport default apiRouter;',
          },
        ],
      },
      {
        id: 'gt-007',
        title: 'Implement OAuth2 authentication',
        description:
          'Build OAuth2 provider supporting client credentials and authorization code grant types with JWT access tokens, refresh token rotation, and scope-based permissions.',
        type: 'backend',
        estimatedHours: 16,
        codeContext: [
          {
            filePath: 'src/api/auth/oauth2Provider.ts',
            lineRange: '22-65',
            relevance: 'Core OAuth2 token issuance and validation logic',
            snippet:
              'export async function issueAccessToken(clientId: string, scopes: string[]): Promise<TokenPair> {\n  const accessToken = jwt.sign({ sub: clientId, scopes }, SECRET, { expiresIn: \'1h\' });\n  const refreshToken = crypto.randomBytes(32).toString(\'hex\');\n  await tokenStore.save({ clientId, refreshToken, expiresAt: addDays(30) });\n  return { accessToken, refreshToken };\n}',
          },
          {
            filePath: 'src/api/middleware/authMiddleware.ts',
            lineRange: '10-30',
            relevance: 'Middleware that validates Bearer tokens on every API request',
            snippet:
              'export function authMiddleware(req: Request, res: Response, next: NextFunction) {\n  const token = req.headers.authorization?.replace(\'Bearer \', \'\');\n  if (!token) return res.status(401).json({ error: \'missing_token\' });\n  const decoded = jwt.verify(token, SECRET);\n  req.apiClient = decoded;\n  next();\n}',
          },
        ],
      },
      {
        id: 'gt-008',
        title: 'Build CRUD endpoints for core resources',
        description:
          'Implement RESTful CRUD endpoints for users, records, and reports with cursor-based pagination, field filtering, and bulk operations support.',
        type: 'backend',
        estimatedHours: 20,
        codeContext: [
          {
            filePath: 'src/api/v1/controllers/recordsController.ts',
            lineRange: '15-50',
            relevance: 'Records CRUD controller with pagination and filtering',
            snippet:
              'export async function listRecords(req: Request, res: Response) {\n  const { cursor, limit = 50, fields } = req.query;\n  const results = await recordsService.list({ cursor, limit: Math.min(limit, 100), fields });\n  res.json({ data: results.items, nextCursor: results.nextCursor });\n}',
          },
        ],
      },
      {
        id: 'gt-009',
        title: 'Implement webhook subscription system',
        description:
          'Build a webhook subscription manager that lets API clients register endpoints for event types, handles delivery with exponential backoff retry, and provides delivery logs.',
        type: 'backend',
        estimatedHours: 14,
        codeContext: [
          {
            filePath: 'src/api/v1/webhooks/subscriptionManager.ts',
            lineRange: '1-40',
            relevance: 'Webhook subscription CRUD and event dispatch logic',
            snippet:
              'export async function dispatchEvent(event: WebhookEvent): Promise<void> {\n  const subs = await db.webhookSubscriptions.findByEvent(event.type);\n  for (const sub of subs) {\n    await deliveryQueue.enqueue({ subscriptionId: sub.id, payload: event, attempt: 1 });\n  }\n}',
          },
        ],
      },
      {
        id: 'gt-010',
        title: 'Add rate limiting per API key',
        description:
          'Implement sliding window rate limiting using Redis, with configurable limits per API key tier and clear rate limit headers in responses.',
        type: 'backend',
        estimatedHours: 8,
        codeContext: [
          {
            filePath: 'src/api/middleware/rateLimiter.ts',
            lineRange: '1-30',
            relevance: 'Sliding window rate limiter middleware',
            snippet:
              'export function rateLimiter(req: Request, res: Response, next: NextFunction) {\n  const key = `ratelimit:${req.apiClient.clientId}`;\n  const { remaining, resetAt } = await slidingWindow.check(key, LIMITS[req.apiClient.tier]);\n  res.set(\'X-RateLimit-Remaining\', remaining.toString());\n  if (remaining <= 0) return res.status(429).json({ error: \'rate_limit_exceeded\', resetAt });\n  next();\n}',
          },
        ],
      },
      {
        id: 'gt-011',
        title: 'Generate interactive API documentation',
        description:
          'Set up OpenAPI 3.0 spec generation from route definitions and serve interactive Swagger UI at /docs with try-it-out functionality.',
        type: 'devops',
        estimatedHours: 6,
        codeContext: [
          {
            filePath: 'src/api/docs/openapi.ts',
            lineRange: '1-25',
            relevance: 'OpenAPI spec generation and Swagger UI setup',
            snippet:
              'const spec = generateOpenApiSpec({\n  title: \'Platform API\',\n  version: \'1.0.0\',\n  routes: allRoutes,\n});\napp.use(\'/docs\', swaggerUi.serve, swaggerUi.setup(spec));',
          },
        ],
      },
    ],
  },

  // --- Story 3: Redesign Onboarding Flow (connects to wi-003) ---
  {
    id: 'tb-003',
    storyId: 'us-003',
    aiConfidence: 0.76,
    edgeCases: [
      'User closes browser mid-step and resumes on a different device with stale cached state',
      'SSO provider returns an unexpected error format not covered by inline validation',
      'Admin changes organization SSO settings while another user is mid-onboarding',
      'User with screen reader navigates the wizard — all steps must be ARIA-compliant',
      'Onboarding progress data migration for users who started on the old flow',
    ],
    tasks: [
      {
        id: 'gt-012',
        title: 'Build new onboarding wizard component',
        description:
          'Create a multi-step wizard component with progressive disclosure, step skipping, and animated transitions. Replace the current linear flow that has a 35% drop-off at step 3.',
        type: 'frontend',
        estimatedHours: 16,
        codeContext: [
          {
            filePath: 'src/components/onboarding/OnboardingWizard.tsx',
            lineRange: '1-45',
            relevance: 'New wizard component replacing the legacy linear stepper',
            snippet:
              'export function OnboardingWizard({ steps, onComplete }: WizardProps) {\n  const [currentStep, setCurrentStep] = useState(0);\n  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());\n  const canSkip = steps[currentStep].optional;\n  return <WizardShell steps={steps} current={currentStep} completed={completedSteps} />;\n}',
          },
        ],
      },
      {
        id: 'gt-013',
        title: 'Add SSO configuration step with inline validation',
        description:
          'Build the SSO configuration step with real-time endpoint validation, connection testing, and inline troubleshooting guidance when common errors are detected.',
        type: 'frontend',
        estimatedHours: 12,
        codeContext: [
          {
            filePath: 'src/components/onboarding/steps/SSOConfigStep.tsx',
            lineRange: '20-55',
            relevance: 'SSO step component with inline validation and error hints',
            snippet:
              'async function validateSSOEndpoint(url: string): Promise<ValidationResult> {\n  const response = await fetch(url + \'/.well-known/openid-configuration\');\n  if (!response.ok) return { valid: false, hint: \'Endpoint did not return OpenID config\' };\n  const config = await response.json();\n  return { valid: true, issuer: config.issuer };\n}',
          },
        ],
      },
      {
        id: 'gt-014',
        title: 'Implement onboarding progress persistence',
        description:
          'Add server-side persistence of onboarding progress so users can resume across sessions and devices. Include migration logic for users mid-onboarding on the old flow.',
        type: 'backend',
        estimatedHours: 10,
        codeContext: [
          {
            filePath: 'src/services/onboarding/progressService.ts',
            lineRange: '1-35',
            relevance: 'Service for saving and restoring onboarding state',
            snippet:
              'export async function saveProgress(userId: string, state: OnboardingState): Promise<void> {\n  await db.onboardingProgress.upsert({\n    userId,\n    currentStep: state.currentStep,\n    completedSteps: JSON.stringify([...state.completedSteps]),\n    updatedAt: new Date(),\n  });\n}',
          },
        ],
      },
      {
        id: 'gt-015',
        title: 'Build inline help system',
        description:
          'Create a contextual help tooltip system that provides step-specific guidance, links to documentation, and common troubleshooting tips without leaving the wizard.',
        type: 'frontend',
        estimatedHours: 8,
        codeContext: [
          {
            filePath: 'src/components/onboarding/InlineHelp.tsx',
            lineRange: '1-30',
            relevance: 'Tooltip-based help component with contextual content loading',
            snippet:
              'export function InlineHelp({ stepId }: { stepId: string }) {\n  const helpContent = useHelpContent(stepId);\n  return (\n    <Tooltip content={helpContent.summary}>\n      <HelpIcon className="w-4 h-4 text-gray-500 cursor-help" />\n    </Tooltip>\n  );\n}',
          },
        ],
      },
      {
        id: 'gt-016',
        title: 'Add onboarding analytics tracking',
        description:
          'Instrument the new onboarding flow with analytics events for step completion, drop-off, time-per-step, and help tooltip usage to measure improvement over the old flow.',
        type: 'testing',
        estimatedHours: 6,
        codeContext: [
          {
            filePath: 'src/services/onboarding/analyticsTracker.ts',
            lineRange: '1-25',
            relevance: 'Analytics event emitter for onboarding funnel tracking',
            snippet:
              'export function trackOnboardingEvent(event: OnboardingEvent): void {\n  analytics.track(\'onboarding_step\', {\n    step: event.stepId,\n    action: event.action,\n    durationMs: event.durationMs,\n    helpViewed: event.helpViewed,\n  });\n}',
          },
        ],
      },
    ],
  },
];
