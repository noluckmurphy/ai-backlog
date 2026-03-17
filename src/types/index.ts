export type FeedbackSource = 'support' | 'sales' | 'nps';
export type SentimentLabel = 'very_negative' | 'negative' | 'neutral' | 'positive' | 'very_positive';
export type ImpactType = 'churn_risk' | 'expansion_opportunity' | 'support_cost' | 'time_saved';
export type WorkItemStatus = 'suggested' | 'accepted' | 'rejected' | 'deferred';
export type ActiveView = 'feedback' | 'sentiment' | 'backlog' | 'rules' | 'sources' | 'scanning';

export interface FeedbackItem {
  id: string;
  source: FeedbackSource;
  timestamp: string;
  customerName: string;
  customerSegment: 'enterprise' | 'mid-market' | 'smb';
  rawText: string;
  sentimentScore: number; // -1 to 1
  sentimentLabel: SentimentLabel;
  categories: string[];
  npsScore?: number;
  supportTicketPriority?: 'low' | 'medium' | 'high' | 'critical';
  salesDealValue?: number;
}

export interface SentimentDataPoint {
  weekOf: string;
  source: FeedbackSource;
  category: string;
  avgSentiment: number;
  volume: number;
}

export interface CategoryBreakdown {
  category: string;
  totalMentions: number;
  avgSentiment: number;
  trend: 'up' | 'down' | 'flat';
  topKeywords: string[];
}

export interface ValueRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  conditions: {
    categories: string[];
    sentimentThreshold: number;
    minVolumePerWeek: number;
    sourceFilter?: FeedbackSource[];
    segmentFilter?: ('enterprise' | 'mid-market' | 'smb')[];
  };
  valuation: {
    impactType: ImpactType;
    estimatedValuePerIncident: number;
    formula: string;
    confidenceLevel: 'high' | 'medium' | 'low';
  };
}

export interface ValueBreakdownItem {
  ruleName: string;
  impactType: ImpactType;
  amount: number;
}

export interface SuggestedWorkItem {
  id: string;
  title: string;
  description: string;
  status: WorkItemStatus;
  aiConfidence: number;
  estimatedValue: number;
  estimatedValueBreakdown: ValueBreakdownItem[];
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  category: string;
  sentimentDriver: string;
  linkedFeedbackIds: string[];
  suggestedPriority: 'critical' | 'high' | 'medium' | 'low';
  createdAt: string;
}

export interface WeeklyVolume {
  weekOf: string;
  support: number;
  sales: number;
  nps: number;
  total: number;
}

export interface DataSource {
  id: string;
  name: string;
  type: FeedbackSource;
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSyncAt: string;
  itemCount: number;
  description: string;
}

// --- Pillar 2: Cross-Team Scanning ---

export type TeamId = 'platform' | 'growth' | 'payments' | 'mobile';

export interface TeamBacklogItem {
  id: string;
  teamId: TeamId;
  title: string;
  description: string;
  status: 'planned' | 'in_progress' | 'done';
  category: string;
  filesLikelyTouched: string[];
  createdAt: string;
}

export interface OverlapItem {
  id: string;
  itemA: { teamId: TeamId; itemId: string; title: string };
  itemB: { teamId: TeamId; itemId: string; title: string };
  overlapType: 'duplicate' | 'related' | 'conflicting';
  similarity: number;
  explanation: string;
  suggestedAction: 'merge' | 'coordinate' | 'review';
}

export interface TeamDependency {
  id: string;
  fromTeam: TeamId;
  fromItemId: string;
  toTeam: TeamId;
  toItemId: string;
  dependencyType: 'blocks' | 'needs_api' | 'shared_schema' | 'shared_component';
  description: string;
  risk: 'high' | 'medium' | 'low';
}

// --- Pillar 3: Codebase Enrichment ---

export interface UserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  category: string;
}

export interface TaskBreakdown {
  id: string;
  storyId: string;
  tasks: GeneratedTask[];
  edgeCases: string[];
  aiConfidence: number;
}

export interface GeneratedTask {
  id: string;
  title: string;
  description: string;
  type: 'frontend' | 'backend' | 'database' | 'testing' | 'devops';
  estimatedHours: number;
  codeContext: CodeContext[];
}

export interface CodeContext {
  filePath: string;
  lineRange: string;
  relevance: string;
  snippet: string;
}
