# AI Backlog Tool — Enhanced Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the AI Backlog prototype from a wireframe-fidelity demo of the sentiment-to-backlog loop into a multi-pillar interactive prototype covering cross-team scanning, codebase enrichment, and production-grade frontend polish — while keeping all data mock and all AI simulated.

**Architecture:** The existing single-page dashboard with sidebar navigation expands to 3 pillar sections. Pillar 1 (Sentiment Loop) is built and gets polish + testing. Pillar 2 (Cross-Team Scanning) and Pillar 3 (Codebase Enrichment) are new view groups added to the sidebar. State management stays local (useState + localStorage) — no state library needed at this scale.

**Tech Stack:** React 18 + TypeScript 5.5 + Vite 5.4 + Tailwind 3.4 + recharts + lucide-react + vitest + @testing-library/react

---

## Current State (v0.1 — Completed)

### What's Built
- 5 views: Feedback Feed, Sentiment Trends, Suggested Backlog, Value Rules, Data Sources
- ~80 mock feedback items with narrative arcs (billing spike, onboarding decline, API gap)
- 12 AI-suggested work items with value breakdowns
- 6 configurable value rules with localStorage persistence
- Wireframe aesthetic (monospace, grayscale, no rounded corners/shadows)
- Code review fixes applied: deterministic RNG, date range filter, standard NPS formula, corrected data narrative ($450K)

### What's Missing (from code review + brainstorming)
- No tests whatsoever
- No cross-team scanning (Pillar 2 — user stories Page 2)
- No codebase enrichment (Pillar 3 — user stories Page 3)
- Accessibility gaps (aria-expanded, toggle labels)
- No CLAUDE.md for the project
- Frontend could be elevated from wireframe to distinctive prototype

---

## Competitive Context (Informs Priorities)

| Competitor | Strength | Gap We Fill |
|------------|----------|-------------|
| Linear | Best-in-class triage, AI task breakdown | No sentiment input, no cross-team scanning |
| Jira | AI work breakdown (bolted-on) | No sentiment pipeline, no value estimation |
| Productboard | Closest to feedback-to-backlog | Requires heavy manual setup, no auto-generation |
| SentiSum/Enterpret | Standalone sentiment tools | Don't connect to backlogs or generate work items |
| Height (shut down Sep 2025) | AI-native PM vision | Never fully realized — validates market demand |

**Our 3 differentiators:** Sentiment-to-backlog loop (built), cross-team overlap detection (planned), codebase context enrichment (planned).

---

## File Structure (New + Modified)

### New Files
```
src/
├── components/
│   ├── scanning/
│   │   ├── ScanningDashboard.tsx       # Pillar 2 main view
│   │   ├── OverlapCard.tsx             # Duplicate/overlap item card
│   │   ├── DependencyGraph.tsx         # Team dependency visualization
│   │   └── TeamSidebar.tsx             # Team filter/selector
│   ├── enrichment/
│   │   ├── EnrichmentDashboard.tsx     # Pillar 3 main view
│   │   ├── StoryBreakdown.tsx          # User story → task breakdown
│   │   ├── CodeContextPanel.tsx        # Codebase context display
│   │   └── EdgeCaseList.tsx            # QA edge case suggestions
│   └── shared/
│       ├── EmptyState.tsx              # Reusable empty state component
│       └── MetricCard.tsx              # Reusable metric display card
├── data/
│   ├── teamBacklogs.ts                # Mock team backlogs for scanning
│   ├── overlaps.ts                    # Pre-computed overlap items
│   ├── dependencies.ts                # Cross-team dependency data
│   ├── storyBreakdowns.ts             # User story → task mock data
├── __tests__/
│   ├── setup.ts                       # @testing-library/jest-dom setup
│   ├── utils/
│   │   ├── filters.test.ts
│   │   ├── formatters.test.ts
│   │   └── sentimentHelpers.test.ts
│   ├── data/
│   │   └── dataIntegrity.test.ts      # Verify mock data consistency
│   └── components/
│       ├── FeedbackFeed.test.tsx
│       ├── SuggestedItemsList.test.tsx
│       └── RulesList.test.tsx
├── hooks/
│   └── useLocalStorage.ts             # Extract localStorage pattern
CLAUDE.md                              # Project-specific instructions
vitest.config.ts                       # Test configuration
```

### Modified Files
```
src/types/index.ts                     # Add Pillar 2 + 3 types
src/App.tsx                            # Add pillar sections to sidebar routing
src/components/layout/Sidebar.tsx      # Add pillar groupings + new nav items
src/components/backlog/SuggestedItemCard.tsx  # Accessibility fixes
src/components/rules/RulesList.tsx     # Accessibility fixes (toggle labels)
src/components/feedback/FeedbackCard.tsx      # aria-expanded
src/components/shared/MetricCard.tsx   # Extract from SentimentDashboard
package.json                          # Add vitest + @testing-library
```

---

## Iteration 1: Testing Foundation + Accessibility Fixes

### Task 1: Set Up Testing Infrastructure

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/__tests__/utils/filters.test.ts`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 2: Create vitest config**

Create `vitest.config.ts`:
```typescript
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.ts',
  },
}));
```

Create `src/__tests__/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 3: Add test script to package.json**

Add `"test": "vitest run"` and `"test:watch": "vitest"` to scripts.

- [ ] **Step 4: Write first test — filters.test.ts**

```typescript
import { filterFeedback, defaultFilters } from '../../utils/filters';
import { feedbackItems } from '../../data/feedbackItems';

describe('filterFeedback', () => {
  it('returns all items with default filters', () => {
    const result = filterFeedback(feedbackItems, defaultFilters);
    expect(result.length).toBe(feedbackItems.length);
  });

  it('filters by source', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, source: 'support' });
    expect(result.every((item) => item.source === 'support')).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('filters by sentiment', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, sentiment: 'very_negative' });
    expect(result.every((item) => item.sentimentLabel === 'very_negative')).toBe(true);
  });

  it('filters by category', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, category: 'billing' });
    expect(result.every((item) => item.categories.includes('billing'))).toBe(true);
  });

  it('filters by segment', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, segment: 'enterprise' });
    expect(result.every((item) => item.customerSegment === 'enterprise')).toBe(true);
  });

  it('filters by date range', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, dateFrom: '2025-12-01', dateTo: '2025-12-31' });
    result.forEach((item) => {
      expect(item.timestamp >= '2025-12-01').toBe(true);
      expect(item.timestamp.slice(0, 10) <= '2025-12-31').toBe(true);
    });
  });

  it('filters by search text', () => {
    const result = filterFeedback(feedbackItems, { ...defaultFilters, search: 'billing' });
    expect(result.every((item) =>
      item.rawText.toLowerCase().includes('billing') ||
      item.customerName.toLowerCase().includes('billing')
    )).toBe(true);
  });

  it('combines multiple filters', () => {
    const result = filterFeedback(feedbackItems, {
      ...defaultFilters,
      source: 'support',
      sentiment: 'very_negative',
    });
    expect(result.every((item) => item.source === 'support' && item.sentimentLabel === 'very_negative')).toBe(true);
  });
});
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/utils/filters.test.ts`
Expected: All 8 tests PASS

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts src/__tests__/ package.json package-lock.json
git commit -m "test: add vitest infrastructure and filter utility tests"
```

---

### Task 2: Utility Tests + Data Integrity Tests

**Files:**
- Create: `src/__tests__/utils/formatters.test.ts`
- Create: `src/__tests__/utils/sentimentHelpers.test.ts`
- Create: `src/__tests__/data/dataIntegrity.test.ts`

- [ ] **Step 1: Write formatters tests**

```typescript
import { formatCurrency, formatDate, formatPercent, formatSentimentScore } from '../../utils/formatters';

describe('formatCurrency', () => {
  it('formats millions', () => expect(formatCurrency(1_500_000)).toBe('$1.5M'));
  it('formats thousands', () => expect(formatCurrency(57_600)).toBe('$57.6K'));
  it('formats small amounts', () => expect(formatCurrency(500)).toBe('$500'));
});

describe('formatPercent', () => {
  it('formats 0.92 as 92%', () => expect(formatPercent(0.92)).toBe('92%'));
  it('formats 0.78 as 78%', () => expect(formatPercent(0.78)).toBe('78%'));
});

describe('formatSentimentScore', () => {
  it('prepends + for positive', () => expect(formatSentimentScore(0.5)).toBe('+0.50'));
  it('shows negative as-is', () => expect(formatSentimentScore(-0.3)).toBe('-0.30'));
});
```

- [ ] **Step 2: Write sentimentHelpers tests**

```typescript
import { sentimentToLabel, sentimentBlocks, trendArrow } from '../../utils/sentimentHelpers';

describe('sentimentToLabel', () => {
  it('maps -0.8 to very_negative', () => expect(sentimentToLabel(-0.8)).toBe('very_negative'));
  it('maps -0.3 to negative', () => expect(sentimentToLabel(-0.3)).toBe('negative'));
  it('maps 0 to neutral', () => expect(sentimentToLabel(0)).toBe('neutral'));
  it('maps 0.4 to positive', () => expect(sentimentToLabel(0.4)).toBe('positive'));
  it('maps 0.8 to very_positive', () => expect(sentimentToLabel(0.8)).toBe('very_positive'));
});

describe('sentimentBlocks', () => {
  it('returns 5 characters', () => expect(sentimentBlocks(0).length).toBe(5));
  it('returns more filled blocks for positive scores', () => {
    const pos = sentimentBlocks(0.8);
    const neg = sentimentBlocks(-0.8);
    const filledPos = (pos.match(/\u2588/g) || []).length;
    const filledNeg = (neg.match(/\u2588/g) || []).length;
    expect(filledPos).toBeGreaterThan(filledNeg);
  });
});

describe('trendArrow', () => {
  it('returns up arrow', () => expect(trendArrow('up')).toBe('\u2191'));
  it('returns down arrow', () => expect(trendArrow('down')).toBe('\u2193'));
  it('returns right arrow for flat', () => expect(trendArrow('flat')).toBe('\u2192'));
});
```

- [ ] **Step 3: Write data integrity tests**

```typescript
import { feedbackItems } from '../../data/feedbackItems';
import { suggestedWorkItems } from '../../data/suggestedWorkItems';
import { defaultValueRules } from '../../data/valueRules';
import { sentimentToLabel } from '../../utils/sentimentHelpers';

describe('data integrity', () => {
  it('feedback items have consistent sentiment labels', () => {
    feedbackItems.forEach((item) => {
      expect(item.sentimentLabel).toBe(sentimentToLabel(item.sentimentScore));
    });
  });

  it('feedback items are sorted newest-first', () => {
    for (let i = 1; i < feedbackItems.length; i++) {
      expect(new Date(feedbackItems[i - 1].timestamp).getTime())
        .toBeGreaterThanOrEqual(new Date(feedbackItems[i].timestamp).getTime());
    }
  });

  it('suggested work items reference valid feedback IDs', () => {
    const feedbackIds = new Set(feedbackItems.map((f) => f.id));
    suggestedWorkItems.forEach((item) => {
      item.linkedFeedbackIds.forEach((id) => {
        expect(feedbackIds.has(id)).toBe(true);
      });
    });
  });

  it('value breakdowns sum to estimated value', () => {
    suggestedWorkItems.forEach((item) => {
      const breakdownSum = item.estimatedValueBreakdown.reduce((s, b) => s + b.amount, 0);
      expect(breakdownSum).toBe(item.estimatedValue);
    });
  });

  it('all value rules have unique IDs', () => {
    const ids = defaultValueRules.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has at least 80 feedback items', () => {
    expect(feedbackItems.length).toBeGreaterThanOrEqual(80);
  });
});
```

- [ ] **Step 4: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS. If data integrity tests fail, fix the mock data to match.

- [ ] **Step 5: Commit**

```bash
git add src/__tests__/
git commit -m "test: add utility and data integrity test suites"
```

---

### Task 3: Accessibility Fixes

**Files:**
- Modify: `src/components/feedback/FeedbackCard.tsx`
- Modify: `src/components/rules/RulesList.tsx`
- Modify: `src/components/backlog/SuggestedItemCard.tsx`

- [ ] **Step 1: Add aria-expanded to FeedbackCard**

In `FeedbackCard.tsx`, add `aria-expanded={expanded}` to the outer `<button>` element.

- [ ] **Step 2: Add accessible labels to rule toggles**

In `RulesList.tsx`, add `aria-label={`Toggle ${rule.name}`}` and `role="switch"` and `aria-checked={rule.isActive}` to the toggle button.

- [ ] **Step 3: Add aria-expanded to SuggestedItemCard breakdown toggle**

In `SuggestedItemCard.tsx`, add `aria-expanded={showBreakdown}` to the "show/hide value breakdown" button.

- [ ] **Step 4: Build to verify no regressions**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/feedback/FeedbackCard.tsx src/components/rules/RulesList.tsx src/components/backlog/SuggestedItemCard.tsx
git commit -m "fix: add accessibility attributes (aria-expanded, role=switch)"
```

---

### Task 4: Extract Shared Components + useLocalStorage Hook

**Files:**
- Create: `src/hooks/useLocalStorage.ts`
- Create: `src/components/shared/MetricCard.tsx`
- Create: `src/components/shared/EmptyState.tsx`
- Modify: `src/components/backlog/SuggestedItemsList.tsx` — use `useLocalStorage`
- Modify: `src/components/rules/RulesList.tsx` — use `useLocalStorage`
- Modify: `src/components/sentiment/SentimentDashboard.tsx` — use `MetricCard`

- [ ] **Step 1: Create useLocalStorage hook**

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(stored));
  }, [key, stored]);

  return [stored, setStored];
}
```

- [ ] **Step 2: Create MetricCard component**

```typescript
interface MetricCardProps {
  label: string;
  value: string;
}

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="border border-gray-400 px-4 py-3">
      <div className="text-[10px] text-gray-500 uppercase">{label}</div>
      <div className="text-lg font-bold mt-0.5">{value}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create EmptyState component**

```typescript
interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="p-6 text-center text-xs text-gray-500">{message}</div>
  );
}
```

- [ ] **Step 4: Refactor SuggestedItemsList and RulesList to use useLocalStorage**

Replace the manual `loadStatuses`/`saveStatuses` + `useState`/`useEffect` pattern with `useLocalStorage`.

- [ ] **Step 5: Refactor SentimentDashboard to use MetricCard**

Replace the inline metric `<div>` mapping with `<MetricCard>` components.

- [ ] **Step 6: Run tests + build**

Run: `npx vitest run && npm run build`
Expected: All tests PASS, clean build.

- [ ] **Step 7: Commit**

```bash
git add src/hooks/ src/components/shared/ src/components/backlog/SuggestedItemsList.tsx src/components/rules/RulesList.tsx src/components/sentiment/SentimentDashboard.tsx
git commit -m "refactor: extract useLocalStorage hook, MetricCard, and EmptyState"
```

---

### Task 5: Create CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: Write project-specific CLAUDE.md**

Should cover: project overview, tech stack, commands (`npm run dev`, `npm run build`, `npm run test`), architecture (single-page dashboard, 5 views, state-driven routing, localStorage persistence), file structure overview, wireframe aesthetic rules, mock data narrative, and guidance for adding new views/data.

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add project-specific CLAUDE.md"
```

---

## Iteration 2: Pillar 2 — Cross-Team Scanning

### User Stories (from original brainstorming, Page 2)
- PM: Scan other teams' backlogs for overlap/duplicates
- PM: Identify cross-team dependencies
- Developer: See tickets likely to cause merge conflicts
- GTM stakeholder: Understand how teams' work connects for value storytelling

### Task 6: Define Pillar 2 Types + Mock Data

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/data/teamBacklogs.ts`
- Create: `src/data/overlaps.ts`
- Create: `src/data/dependencies.ts`

- [ ] **Step 1: Add types to index.ts**

```typescript
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
  similarity: number; // 0-1
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
```

- [ ] **Step 2: Author mock team backlogs**

Create `src/data/teamBacklogs.ts` — 4 teams, ~8-12 items each. The narrative: Platform team and Payments team both have billing-related items (overlap). Growth team and Platform team both touching the onboarding flow (conflict). Mobile team depends on Platform team's API work.

- [ ] **Step 3: Author mock overlaps**

Create `src/data/overlaps.ts` — 5-7 overlap items detected across teams. Include at least one duplicate (identical billing fix on two teams), one related (onboarding work), and one conflicting (schema migration on same table).

- [ ] **Step 4: Author mock dependencies**

Create `src/data/dependencies.ts` — 4-6 cross-team dependencies. Mobile team blocked by Platform API. Payments team needs Growth's customer segmentation.

- [ ] **Step 5: Write data integrity tests for new mock data**

```typescript
import { teamBacklogItems } from '../../data/teamBacklogs';
import { overlapItems } from '../../data/overlaps';
import { teamDependencies } from '../../data/dependencies';

describe('Pillar 2 data integrity', () => {
  const backlogIds = new Set(teamBacklogItems.map((b) => b.id));

  it('all overlap items reference valid backlog IDs', () => {
    overlapItems.forEach((overlap) => {
      expect(backlogIds.has(overlap.itemA.itemId)).toBe(true);
      expect(backlogIds.has(overlap.itemB.itemId)).toBe(true);
    });
  });

  it('overlap items reference different teams', () => {
    overlapItems.forEach((overlap) => {
      expect(overlap.itemA.teamId).not.toBe(overlap.itemB.teamId);
    });
  });

  it('all dependency items reference valid backlog IDs', () => {
    teamDependencies.forEach((dep) => {
      expect(backlogIds.has(dep.fromItemId)).toBe(true);
      expect(backlogIds.has(dep.toItemId)).toBe(true);
    });
  });

  it('dependencies connect different teams', () => {
    teamDependencies.forEach((dep) => {
      expect(dep.fromTeam).not.toBe(dep.toTeam);
    });
  });

  it('all teams have at least one backlog item', () => {
    const teams = new Set(teamBacklogItems.map((b) => b.teamId));
    expect(teams.size).toBeGreaterThanOrEqual(4);
  });
});
```

- [ ] **Step 6: Run tests, commit**

```bash
git add src/types/index.ts src/data/teamBacklogs.ts src/data/overlaps.ts src/data/dependencies.ts src/__tests__/
git commit -m "feat: add Pillar 2 types and mock data (cross-team scanning)"
```

---

### Task 7: Build Scanning Dashboard View

**Files:**
- Create: `src/components/scanning/ScanningDashboard.tsx`
- Create: `src/components/scanning/OverlapCard.tsx`
- Create: `src/components/scanning/DependencyGraph.tsx`
- Create: `src/components/scanning/TeamSidebar.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Sidebar.tsx`
- Modify: `src/types/index.ts` — add `'scanning'` to `ActiveView`

- [ ] **Step 1: Add 'scanning' to ActiveView type**

- [ ] **Step 2: Build TeamSidebar**

Vertical list of 4 team names with item counts. Click to filter overlaps/deps by team.

- [ ] **Step 3: Build OverlapCard**

Displays two items side-by-side with similarity %, overlap type badge, explanation text, and suggested action button (merge/coordinate/review — decorative).

- [ ] **Step 4: Build DependencyGraph**

Simple table/list view (not a graph library — keep it wireframe). Columns: From Team → To Team, Type, Risk, Description.

- [ ] **Step 5: Build ScanningDashboard**

Layout: metrics row (total overlaps, duplicates found, cross-team deps, high-risk items) + overlap list + dependency table. Filter by team via TeamSidebar.

- [ ] **Step 6: Restructure Sidebar with pillar groupings + wire into App.tsx**

Restructure `Sidebar.tsx` to group nav items under pillar headers. This happens now (when the first non-Pillar-1 view is added) to avoid rework later:

```
SENTIMENT LOOP
  > Feedback Feed
  > Sentiment Trends
  > Suggested Items
  > Value Rules
  > Data Sources
CROSS-TEAM
  > Scanning Dashboard
```

Pillar headers are non-clickable, uppercase `text-[10px]`, top border separator, `text-gray-500`. Add `'scanning'` case to `App.tsx` switch statement.

- [ ] **Step 7: Verify wireframe aesthetic**

Confirm: no rounded corners, no shadows, monospace, grayscale, visible borders.

- [ ] **Step 8: Build + run tests**

Run: `npm run build && npx vitest run`

- [ ] **Step 9: Commit**

```bash
git add src/components/scanning/ src/App.tsx src/components/layout/Sidebar.tsx src/types/index.ts
git commit -m "feat: add cross-team scanning dashboard (Pillar 2)"
```

---

## Iteration 3: Pillar 3 — Codebase Enrichment

### User Stories (from original brainstorming, Page 3)
- Developer: Auto-break user stories into tasks
- Developer: See suggested technical tasks from user stories
- Developer: Dev tasks enriched with codebase context
- QA: Edge cases called out in acceptance criteria
- Developer: Add own context before AI splits tasks
- PM: Prevent redundant work items

### Task 8: Define Pillar 3 Types + Mock Data

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/data/storyBreakdowns.ts`

- [ ] **Step 1: Add types**

```typescript
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
  filePath: string;      // e.g., "src/services/billing/processor.ts"
  lineRange: string;     // e.g., "142-168"
  relevance: string;     // Why this file is relevant to the task
  snippet: string;       // Code snippet from the file
}
```

- [ ] **Step 2: Author mock story breakdowns with inline code contexts**

Create `src/data/storyBreakdowns.ts` — 3-4 user stories that connect back to the Pillar 1 suggested items (e.g., "Fix Duplicate Billing" breaks into 5 tasks: investigate payment processor, add idempotency key, write integration test, add monitoring alert, update runbook). Include edge cases QA would care about. Each `GeneratedTask` includes inline `codeContext` entries with realistic file paths and mock snippets — no separate data file needed.

- [ ] **Step 3: Write data integrity tests**

```typescript
import { storyBreakdowns } from '../../data/storyBreakdowns';

describe('Pillar 3 data integrity', () => {
  it('all story breakdowns have at least one task', () => {
    storyBreakdowns.forEach((breakdown) => {
      expect(breakdown.tasks.length).toBeGreaterThan(0);
    });
  });

  it('all tasks have at least one code context entry', () => {
    storyBreakdowns.forEach((breakdown) => {
      breakdown.tasks.forEach((task) => {
        expect(task.codeContext.length).toBeGreaterThan(0);
      });
    });
  });

  it('all code context entries have non-empty fields', () => {
    storyBreakdowns.forEach((breakdown) => {
      breakdown.tasks.forEach((task) => {
        task.codeContext.forEach((ctx) => {
          expect(ctx.filePath).toBeTruthy();
          expect(ctx.lineRange).toBeTruthy();
          expect(ctx.snippet).toBeTruthy();
        });
      });
    });
  });

  it('all breakdowns have edge cases', () => {
    storyBreakdowns.forEach((breakdown) => {
      expect(breakdown.edgeCases.length).toBeGreaterThan(0);
    });
  });
});
```

- [ ] **Step 4: Run tests, commit**

```bash
git add src/types/index.ts src/data/storyBreakdowns.ts src/__tests__/
git commit -m "feat: add Pillar 3 types and mock data (codebase enrichment)"
```

---

### Task 9: Build Enrichment Dashboard View

**Files:**
- Create: `src/components/enrichment/EnrichmentDashboard.tsx`
- Create: `src/components/enrichment/StoryBreakdown.tsx`
- Create: `src/components/enrichment/CodeContextPanel.tsx`
- Create: `src/components/enrichment/EdgeCaseList.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Sidebar.tsx`
- Modify: `src/types/index.ts` — add `'enrichment'` to `ActiveView`

- [ ] **Step 1: Add 'enrichment' to ActiveView type**

- [ ] **Step 2: Build StoryBreakdown**

Shows a user story with its generated tasks in a vertical timeline. Each task shows type badge, title, estimated hours, and expandable code context.

- [ ] **Step 3: Build CodeContextPanel**

Expandable panel showing file path, relevant lines, code snippet (monospace, grayscale syntax highlighting via CSS classes — no library), and relevance explanation.

- [ ] **Step 4: Build EdgeCaseList**

Simple list of AI-suggested edge cases with checkboxes (decorative — track which ones PM has reviewed).

- [ ] **Step 5: Build EnrichmentDashboard**

Layout: story selector dropdown + selected story breakdown + edge cases sidebar. Metrics row: total tasks generated, estimated hours, files impacted, edge cases found.

- [ ] **Step 6: Wire into App.tsx and Sidebar**

Add "Work Breakdown" nav item under a new "ENRICHMENT" pillar header in the sidebar (following the pattern established in Task 7). Add `'enrichment'` case to `App.tsx` switch.

- [ ] **Step 7: Verify wireframe aesthetic + build + test**

- [ ] **Step 8: Commit**

```bash
git add src/components/enrichment/ src/App.tsx src/components/layout/Sidebar.tsx src/types/index.ts
git commit -m "feat: add codebase enrichment dashboard (Pillar 3)"
```

---

## Iteration 4: Frontend Polish

### Task 10: Frontend Design Enhancement (use frontend-design skill)

> **Note:** Sidebar pillar grouping was consolidated into Task 7 (when the first new pillar was added) to avoid rework.

**Files:** Multiple component files

- [ ] **Step 1: Invoke `frontend-design` skill for design direction**

Focus areas:
- Visual hierarchy: heading sizes, border weight differentiation, data density
- Interaction feedback: hover states on all interactive elements, focus-visible outlines
- Typography scale: establish clear size steps (10px labels, 12px body, 14px headings, 18px metrics)
- Whitespace rhythm: consistent padding/margin scale (4, 8, 12, 16, 24, 32)
- Data visualization clarity: chart axis labeling, legend placement, data point density

- [ ] **Step 2: Apply hover state improvements**

Add consistent `hover:bg-gray-200` / `hover:bg-gray-100` to all clickable elements. Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900 focus-visible:outline-offset-2` to all interactive elements.

- [ ] **Step 3: Apply typography scale and whitespace improvements**

Audit all components for consistent heading sizes, padding, and margin using the established scale.

- [ ] **Step 4: Build + verify**

Run: `npm run build`
Confirm visually: consistent spacing, clear hover feedback, maintained wireframe constraints.

- [ ] **Step 5: Commit**

```bash
git add src/components/ src/index.css
git commit -m "style: frontend polish — hover states, typography scale, whitespace rhythm"
```

---

## Iteration 5: Component Tests

### Task 11: Component Tests for Critical Views

**Files:**
- Create: `src/__tests__/components/FeedbackFeed.test.tsx`
- Create: `src/__tests__/components/SuggestedItemsList.test.tsx`
- Create: `src/__tests__/components/RulesList.test.tsx`

- [ ] **Step 1: Write FeedbackFeed test**

Test: renders feedback items, filters reduce count, search works, date range works.

- [ ] **Step 2: Write SuggestedItemsList test**

Test: renders items sorted by value, Accept changes status, sort controls change order, localStorage persists.

- [ ] **Step 3: Write RulesList test**

Test: renders rules, toggle changes active state, editor expands on click.

- [ ] **Step 4: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/__tests__/components/
git commit -m "test: add component tests for Feedback, Backlog, and Rules views"
```

---

## Summary of Iterations

| Iteration | Focus | Tasks | What it Delivers |
|-----------|-------|-------|-----------------|
| 1 | Testing + Accessibility + Refactoring | 1-5 | Test foundation, a11y fixes, shared components, CLAUDE.md |
| 2 | Pillar 2 — Cross-Team Scanning | 6-7 | Overlap detection, dependency mapping, team filtering, sidebar pillar grouping |
| 3 | Pillar 3 — Codebase Enrichment | 8-9 | Story breakdown, code context, edge case suggestions |
| 4 | Frontend Polish | 10 | Hover states, typography scale, whitespace rhythm, focus indicators |
| 5 | Component Tests | 11 | Component-level test coverage for critical views |

---

## Verification Checklist

After all iterations:

1. `npm run test` — all unit + component tests pass
2. `npm run build` — clean build, no errors
3. `npm run dev` — app loads, all 7 views navigate correctly
4. Pillar 1: feedback filters, sentiment charts, backlog actions, rule editing, source toggling
5. Pillar 2: overlap cards render, dependency table shows risks, team filter works
6. Pillar 3: story breakdown displays tasks, code context expands, edge cases list
7. localStorage: rule edits + item statuses persist across page refresh
8. Visual: monospace font, no rounded corners, no shadows, all borders visible, grayscale only
9. Accessibility: aria-expanded on toggles, role=switch on rule toggles, focus indicators
