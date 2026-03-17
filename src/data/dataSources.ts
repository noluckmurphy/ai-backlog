import { DataSource } from '../types';

export const defaultDataSources: DataSource[] = [
  {
    id: 'ds-001',
    name: 'Zendesk Support',
    type: 'support',
    status: 'connected',
    lastSyncAt: '2025-12-23T07:45:00Z',
    itemCount: 1247,
    description: 'Customer support tickets from Zendesk. Includes ticket priority, resolution time, and full conversation threads. Syncs every 15 minutes.',
  },
  {
    id: 'ds-002',
    name: 'Salesforce CRM',
    type: 'sales',
    status: 'connected',
    lastSyncAt: '2025-12-23T06:30:00Z',
    itemCount: 389,
    description: 'Sales opportunity notes, lost deal reasons, and prospect feedback from Salesforce. Includes deal value and stage information. Syncs every hour.',
  },
  {
    id: 'ds-003',
    name: 'Delighted NPS',
    type: 'nps',
    status: 'syncing',
    lastSyncAt: '2025-12-23T08:00:00Z',
    itemCount: 862,
    description: 'NPS survey responses from Delighted. Includes numeric score (0-10) and open-ended feedback. Syncs daily at 8:00 AM UTC.',
  },
];
