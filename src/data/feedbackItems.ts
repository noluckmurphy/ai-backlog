import { FeedbackItem } from '../types';
import { sentimentToLabel } from '../utils/sentimentHelpers';

// 20 hand-written narrative items + ~60 template-generated items
const handWritten: FeedbackItem[] = [
  // --- BILLING SPIKE (narrative arc 1) ---
  {
    id: 'fb-001',
    source: 'support',
    timestamp: '2025-11-14T09:23:00Z',
    customerName: 'Acme Corp',
    customerSegment: 'enterprise',
    rawText: 'We were charged twice for our November subscription. This is the second time this quarter. Our CFO is escalating this internally and questioning whether to renew.',
    sentimentScore: -0.85,
    sentimentLabel: 'very_negative',
    categories: ['billing', 'reliability'],
    supportTicketPriority: 'critical',
  },
  {
    id: 'fb-002',
    source: 'support',
    timestamp: '2025-11-18T14:05:00Z',
    customerName: 'GlobalTech Industries',
    customerSegment: 'enterprise',
    rawText: 'Duplicate charge on invoice #GT-2025-1118. We need a credit issued immediately. This happened to us in September as well. Starting to erode trust.',
    sentimentScore: -0.78,
    sentimentLabel: 'very_negative',
    categories: ['billing'],
    supportTicketPriority: 'critical',
  },
  {
    id: 'fb-003',
    source: 'support',
    timestamp: '2025-12-02T11:30:00Z',
    customerName: 'Meridian Health',
    customerSegment: 'enterprise',
    rawText: 'Another duplicate billing issue. We are currently evaluating alternatives. Three incidents in four months is unacceptable for a vendor handling PHI.',
    sentimentScore: -0.92,
    sentimentLabel: 'very_negative',
    categories: ['billing', 'reliability'],
    supportTicketPriority: 'critical',
  },
  {
    id: 'fb-004',
    source: 'sales',
    timestamp: '2025-12-10T16:00:00Z',
    customerName: 'NovaPharma (prospect)',
    customerSegment: 'enterprise',
    rawText: 'Deal stalled — prospect heard about billing issues from Meridian Health contact. They want assurance this is resolved before signing. $180K ARR at risk.',
    sentimentScore: -0.65,
    sentimentLabel: 'very_negative',
    categories: ['billing'],
    salesDealValue: 180000,
  },
  {
    id: 'fb-005',
    source: 'nps',
    timestamp: '2025-12-15T08:00:00Z',
    customerName: 'Finley & Associates',
    customerSegment: 'mid-market',
    rawText: 'Billing errors are becoming a pattern. We like the product but cannot justify the operational overhead of auditing every invoice.',
    sentimentScore: -0.55,
    sentimentLabel: 'negative',
    categories: ['billing'],
    npsScore: 3,
  },
  // --- ONBOARDING DECLINE (narrative arc 2) ---
  {
    id: 'fb-006',
    source: 'support',
    timestamp: '2025-10-05T10:15:00Z',
    customerName: 'BrightPath Learning',
    customerSegment: 'mid-market',
    rawText: 'We are on day 14 of onboarding and still cannot get SSO configured. Documentation references deprecated endpoints. Our team is losing patience.',
    sentimentScore: -0.7,
    sentimentLabel: 'very_negative',
    categories: ['onboarding', 'documentation'],
    supportTicketPriority: 'high',
  },
  {
    id: 'fb-007',
    source: 'nps',
    timestamp: '2025-10-20T12:00:00Z',
    customerName: 'Cascade Analytics',
    customerSegment: 'smb',
    rawText: 'Setup was painful. Took 3x longer than what the sales team promised. Almost gave up twice.',
    sentimentScore: -0.6,
    sentimentLabel: 'very_negative',
    categories: ['onboarding'],
    npsScore: 4,
  },
  {
    id: 'fb-008',
    source: 'support',
    timestamp: '2025-11-08T09:45:00Z',
    customerName: 'Urban Logistics Co',
    customerSegment: 'mid-market',
    rawText: 'Onboarding wizard crashed midway through step 3. Had to restart the entire process. Ticket resolution took 5 days — unacceptable for a new customer.',
    sentimentScore: -0.75,
    sentimentLabel: 'very_negative',
    categories: ['onboarding', 'reliability'],
    supportTicketPriority: 'high',
  },
  {
    id: 'fb-009',
    source: 'nps',
    timestamp: '2025-12-01T08:00:00Z',
    customerName: 'Peak Performance Gym',
    customerSegment: 'smb',
    rawText: 'The onboarding experience was confusing. I had to watch YouTube tutorials made by other users to figure out basic setup.',
    sentimentScore: -0.5,
    sentimentLabel: 'negative',
    categories: ['onboarding', 'documentation'],
    npsScore: 5,
  },
  {
    id: 'fb-010',
    source: 'support',
    timestamp: '2025-12-20T15:30:00Z',
    customerName: 'DataVault Systems',
    customerSegment: 'enterprise',
    rawText: 'Our onboarding has been stuck for 3 weeks. Support keeps transferring us between teams. We need an assigned onboarding specialist or we will request a refund.',
    sentimentScore: -0.88,
    sentimentLabel: 'very_negative',
    categories: ['onboarding', 'support_quality'],
    supportTicketPriority: 'critical',
  },
  // --- API INTEGRATION GAP (narrative arc 3) ---
  {
    id: 'fb-011',
    source: 'sales',
    timestamp: '2025-09-15T14:00:00Z',
    customerName: 'TechForge (lost deal)',
    customerSegment: 'enterprise',
    rawText: 'Lost deal to CompetitorX — they chose them specifically because of REST API availability. Our prospect needed to integrate with their internal ERP system. $120K ARR lost.',
    sentimentScore: -0.7,
    sentimentLabel: 'very_negative',
    categories: ['integrations', 'api'],
    salesDealValue: 120000,
  },
  {
    id: 'fb-012',
    source: 'sales',
    timestamp: '2025-10-22T11:00:00Z',
    customerName: 'Pinnacle Manufacturing (lost deal)',
    customerSegment: 'enterprise',
    rawText: 'Another enterprise deal lost due to lack of API. Pinnacle needed webhook support for their warehouse automation. Went with CompetitorY. $150K ARR.',
    sentimentScore: -0.65,
    sentimentLabel: 'very_negative',
    categories: ['integrations', 'api'],
    salesDealValue: 150000,
  },
  {
    id: 'fb-013',
    source: 'sales',
    timestamp: '2025-11-30T09:00:00Z',
    customerName: 'Atlas Financial (lost deal)',
    customerSegment: 'enterprise',
    rawText: 'Atlas walked when they learned we have no public API. Their compliance team needs programmatic data export. $180K deal. This is the 3rd enterprise loss this quarter to API gap.',
    sentimentScore: -0.8,
    sentimentLabel: 'very_negative',
    categories: ['integrations', 'api'],
    salesDealValue: 180000,
  },
  {
    id: 'fb-014',
    source: 'nps',
    timestamp: '2025-12-05T08:00:00Z',
    customerName: 'Silverline Consulting',
    customerSegment: 'mid-market',
    rawText: 'Love the product but desperately need an API. We are manually exporting CSVs daily to feed our reporting tools. It is costing us hours per week.',
    sentimentScore: -0.3,
    sentimentLabel: 'negative',
    categories: ['integrations', 'api'],
    npsScore: 6,
  },
  {
    id: 'fb-015',
    source: 'sales',
    timestamp: '2025-12-12T16:30:00Z',
    customerName: 'Quantum Dynamics (at risk)',
    customerSegment: 'enterprise',
    rawText: 'Current customer threatening non-renewal unless API is on the roadmap for Q1. They are building an internal data lake and need programmatic access. $90K ARR at risk.',
    sentimentScore: -0.55,
    sentimentLabel: 'negative',
    categories: ['integrations', 'api'],
    salesDealValue: 90000,
  },
  // --- POSITIVE / MIXED ITEMS ---
  {
    id: 'fb-016',
    source: 'nps',
    timestamp: '2025-11-01T08:00:00Z',
    customerName: 'Redwood Partners',
    customerSegment: 'mid-market',
    rawText: 'Great reporting features. The dashboard improvements last quarter were exactly what we needed. Team adoption is up 40%.',
    sentimentScore: 0.85,
    sentimentLabel: 'very_positive',
    categories: ['reporting', 'ui_ux'],
    npsScore: 9,
  },
  {
    id: 'fb-017',
    source: 'nps',
    timestamp: '2025-11-15T08:00:00Z',
    customerName: 'Starlight Media',
    customerSegment: 'smb',
    rawText: 'Product is solid overall. Wish the mobile experience was better — I often need to check things on the go.',
    sentimentScore: 0.25,
    sentimentLabel: 'positive',
    categories: ['mobile', 'ui_ux'],
    npsScore: 7,
  },
  {
    id: 'fb-018',
    source: 'support',
    timestamp: '2025-12-08T13:00:00Z',
    customerName: 'Ironclad Security',
    customerSegment: 'enterprise',
    rawText: 'Page load times have degraded significantly since the November release. Our users are reporting 8-12 second load times for the main dashboard.',
    sentimentScore: -0.6,
    sentimentLabel: 'very_negative',
    categories: ['performance'],
    supportTicketPriority: 'high',
  },
  {
    id: 'fb-019',
    source: 'nps',
    timestamp: '2025-12-18T08:00:00Z',
    customerName: 'Coastal Ventures',
    customerSegment: 'mid-market',
    rawText: 'Your pricing tiers do not make sense for companies our size. We are paying for enterprise features we do not use but need the user count from that tier.',
    sentimentScore: -0.4,
    sentimentLabel: 'negative',
    categories: ['pricing'],
    npsScore: 5,
  },
  {
    id: 'fb-020',
    source: 'support',
    timestamp: '2025-12-22T10:00:00Z',
    customerName: 'Summit Education',
    customerSegment: 'smb',
    rawText: 'The help docs are really well written. Found the answer to my SAML question in under 2 minutes. More of this please!',
    sentimentScore: 0.8,
    sentimentLabel: 'very_positive',
    categories: ['documentation'],
    supportTicketPriority: 'low',
  },
];

// Template-generated items
const customerNames = [
  'Apex Dynamics', 'BlueShift Labs', 'Condor Systems', 'Drift Analytics',
  'Echo Health', 'FrostByte Inc', 'GreenLeaf Energy', 'HyperLoop Tech',
  'Ionic Solutions', 'JetStream Media', 'Keystone Partners', 'LunarEdge',
  'MapleSoft', 'NorthStar Ventures', 'Orbis Financial', 'PulsePoint',
  'QuickSilver Ops', 'Ridgeline Data', 'SolarFlare Systems', 'TrueNorth AI',
  'Uplift Robotics', 'Vertex Cloud', 'WaveForm Audio', 'Xenith Corp',
  'Yukon Analytics', 'Zenith Logistics', 'Amberwave Tech', 'BoltLine',
  'CrestView', 'DawnBreak', 'Ember Solutions', 'FluxCapital',
  'Granite Systems', 'Halcyon Group', 'IndigoStar', 'JadePath',
  'KineticFlow', 'LatticeWorks', 'MonolithAI', 'NexGen Platform',
  'OmegaBridge', 'PrismView', 'Quartex', 'ReefPoint',
  'Strata Holdings', 'Tidewater Digital', 'UniCore', 'VoltEdge',
  'WindRose', 'XeroPoint', 'YellowBrick', 'ZephyrNet',
  'ArcLight Systems', 'BaseLayer', 'Cirrus Health', 'DeltaForce IT',
  'EverGreen Corp', 'FocalPoint AI', 'GridIron Data', 'HelixBio',
];

const templates: { text: string; categories: string[]; sentimentScore: number }[] = [
  { text: 'Billing discrepancy on our latest invoice. Need clarification on the line items.', categories: ['billing'], sentimentScore: -0.4 },
  { text: 'The new search feature is a huge improvement. Finding records is much faster now.', categories: ['ui_ux', 'performance'], sentimentScore: 0.7 },
  { text: 'Would really like to see better CSV export options. Current format breaks in Excel.', categories: ['reporting', 'integrations'], sentimentScore: -0.2 },
  { text: 'Onboarding our second team and running into the same SSO issues we had before.', categories: ['onboarding'], sentimentScore: -0.55 },
  { text: 'Dashboard performance has been great lately. No complaints from the team.', categories: ['performance', 'ui_ux'], sentimentScore: 0.6 },
  { text: 'Need API access for our automation workflows. This is becoming a blocker.', categories: ['api', 'integrations'], sentimentScore: -0.45 },
  { text: 'Support response was fast and helpful. Issue resolved in under an hour.', categories: ['support_quality'], sentimentScore: 0.75 },
  { text: 'The pricing jump from mid-tier to enterprise is too steep for our use case.', categories: ['pricing'], sentimentScore: -0.35 },
  { text: 'Mobile app crashes frequently on Android. Makes field work difficult.', categories: ['mobile', 'reliability'], sentimentScore: -0.65 },
  { text: 'Documentation for the webhook setup is outdated. Wasted a full day on this.', categories: ['documentation', 'integrations'], sentimentScore: -0.5 },
  { text: 'Renewed for another year. Product keeps getting better. Happy customer here.', categories: ['general'], sentimentScore: 0.85 },
  { text: 'Reporting filters are confusing. Hard to build the views our managers need.', categories: ['reporting', 'ui_ux'], sentimentScore: -0.3 },
  { text: 'Page loads are noticeably slower this month. Is something going on?', categories: ['performance'], sentimentScore: -0.4 },
  { text: 'Love the new notification system. Much better than email alerts.', categories: ['ui_ux'], sentimentScore: 0.65 },
  { text: 'Duplicate charge showed up again this month. Third time this quarter.', categories: ['billing', 'reliability'], sentimentScore: -0.8 },
  { text: 'Our team found the training videos very helpful during onboarding.', categories: ['onboarding', 'documentation'], sentimentScore: 0.5 },
  { text: 'Considering switching to a competitor that offers a public API and webhooks.', categories: ['api', 'integrations'], sentimentScore: -0.6 },
  { text: 'The admin panel needs better user management. Adding users in bulk is painful.', categories: ['ui_ux'], sentimentScore: -0.25 },
  { text: 'Security audit passed with no issues. Your SOC 2 compliance is appreciated.', categories: ['security'], sentimentScore: 0.7 },
  { text: 'Invoice format changed without notice. Our AP system could not parse the new format.', categories: ['billing', 'integrations'], sentimentScore: -0.5 },
];

const sources: ('support' | 'sales' | 'nps')[] = ['support', 'sales', 'nps'];
const segments: ('enterprise' | 'mid-market' | 'smb')[] = ['enterprise', 'mid-market', 'smb'];
const priorities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateTemplateItems(): FeedbackItem[] {
  const rand = seededRandom(42);
  const items: FeedbackItem[] = [];

  for (let i = 0; i < 60; i++) {
    const tpl = templates[i % templates.length];
    const src = sources[Math.floor(rand() * sources.length)];
    const seg = segments[Math.floor(rand() * segments.length)];
    const name = customerNames[i % customerNames.length];
    // Spread timestamps over 6 months (Jul 2025 - Dec 2025)
    const dayOffset = Math.floor(rand() * 180);
    const date = new Date(2025, 6, 1);
    date.setDate(date.getDate() + dayOffset);
    const jitter = (rand() - 0.5) * 0.2;
    const score = Math.max(-1, Math.min(1, tpl.sentimentScore + jitter));

    const item: FeedbackItem = {
      id: `fb-t${String(i + 1).padStart(3, '0')}`,
      source: src,
      timestamp: date.toISOString(),
      customerName: name,
      customerSegment: seg,
      rawText: tpl.text,
      sentimentScore: Math.round(score * 100) / 100,
      sentimentLabel: sentimentToLabel(score),
      categories: tpl.categories,
    };

    if (src === 'support') {
      item.supportTicketPriority = priorities[Math.floor(rand() * priorities.length)];
    }
    if (src === 'nps') {
      item.npsScore = Math.round(rand() * 10);
    }
    if (src === 'sales') {
      item.salesDealValue = Math.round(rand() * 200000);
    }

    items.push(item);
  }

  return items;
}

export const feedbackItems: FeedbackItem[] = [
  ...handWritten,
  ...generateTemplateItems(),
].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
