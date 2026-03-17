import { ValueRule } from '../types';

export const defaultValueRules: ValueRule[] = [
  {
    id: 'rule-001',
    name: 'Enterprise Churn Prevention',
    description: 'Flags issues likely to cause enterprise customer churn based on negative sentiment trends and critical ticket volume.',
    isActive: true,
    conditions: {
      categories: ['billing', 'reliability', 'onboarding', 'performance'],
      sentimentThreshold: -0.4,
      minVolumePerWeek: 3,
      segmentFilter: ['enterprise'],
    },
    valuation: {
      impactType: 'churn_risk',
      estimatedValuePerIncident: 4800,
      formula: 'avg_contract_value × churn_probability × affected_accounts',
      confidenceLevel: 'high',
    },
  },
  {
    id: 'rule-002',
    name: 'Support Cost Reduction',
    description: 'Identifies high-volume support categories where fixing the root cause would reduce ticket volume and support costs.',
    isActive: true,
    conditions: {
      categories: ['billing', 'onboarding', 'documentation', 'performance', 'mobile'],
      sentimentThreshold: -0.3,
      minVolumePerWeek: 5,
    },
    valuation: {
      impactType: 'support_cost',
      estimatedValuePerIncident: 120,
      formula: 'tickets_per_month × avg_resolution_cost × 12',
      confidenceLevel: 'high',
    },
  },
  {
    id: 'rule-003',
    name: 'Lost Deal Recovery',
    description: 'Captures lost sales opportunities where specific product gaps were cited as the reason for choosing a competitor.',
    isActive: true,
    conditions: {
      categories: ['integrations', 'api', 'security'],
      sentimentThreshold: -0.5,
      minVolumePerWeek: 1,
      sourceFilter: ['sales'],
      segmentFilter: ['enterprise', 'mid-market'],
    },
    valuation: {
      impactType: 'expansion_opportunity',
      estimatedValuePerIncident: 45000,
      formula: 'lost_deal_value × win_back_probability × pipeline_multiplier',
      confidenceLevel: 'medium',
    },
  },
  {
    id: 'rule-004',
    name: 'Efficiency Gains',
    description: 'Quantifies time savings from UX improvements and automation features based on user feedback about manual workflows.',
    isActive: true,
    conditions: {
      categories: ['ui_ux', 'reporting', 'integrations', 'onboarding'],
      sentimentThreshold: -0.2,
      minVolumePerWeek: 2,
    },
    valuation: {
      impactType: 'time_saved',
      estimatedValuePerIncident: 600,
      formula: 'hours_saved_per_user × hourly_rate × affected_users × 12',
      confidenceLevel: 'low',
    },
  },
  {
    id: 'rule-005',
    name: 'Pipeline Protection',
    description: 'Monitors active sales pipeline for risk signals from existing customer feedback that could affect prospect confidence.',
    isActive: true,
    conditions: {
      categories: ['billing', 'reliability', 'security'],
      sentimentThreshold: -0.6,
      minVolumePerWeek: 2,
      sourceFilter: ['support', 'nps'],
      segmentFilter: ['enterprise'],
    },
    valuation: {
      impactType: 'expansion_opportunity',
      estimatedValuePerIncident: 7200,
      formula: 'pipeline_at_risk × reputation_impact_factor',
      confidenceLevel: 'medium',
    },
  },
  {
    id: 'rule-006',
    name: 'NPS Detractor Conversion',
    description: 'Targets specific issues raised by NPS detractors (score 0-6) that, if resolved, could convert them to promoters.',
    isActive: false,
    conditions: {
      categories: ['onboarding', 'pricing', 'ui_ux', 'mobile'],
      sentimentThreshold: -0.3,
      minVolumePerWeek: 2,
      sourceFilter: ['nps'],
    },
    valuation: {
      impactType: 'churn_risk',
      estimatedValuePerIncident: 2400,
      formula: 'detractor_count × avg_revenue × detractor_churn_rate',
      confidenceLevel: 'low',
    },
  },
];
