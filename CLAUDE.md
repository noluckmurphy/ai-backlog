# CLAUDE.md

## Project Overview

AI-powered backlog tool prototype that maps customer feedback sentiment to value-estimated work items. Demonstrates how qualitative feedback signals (billing complaints, onboarding friction, API gaps) can surface and prioritize engineering work with dollar-value estimates.

This is a frontend-only prototype — all data is mocked. No backend, no API calls.

## Tech Stack

- React 18 + TypeScript 5.5
- Vite 5.4 (dev server + build)
- Tailwind CSS 3.4 (utility-first styling, wireframe aesthetic)
- recharts (charts — grayscale, no animations)
- lucide-react (icons)
- vitest (unit testing)

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at http://localhost:5173 |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run test` | Run vitest once |
| `npm run test:watch` | Run vitest in watch mode |
| `npm run lint` | ESLint check |

## Architecture

Single-page dashboard. No router — view switching is state-driven via `activeView` in `App.tsx`.

```
App.tsx
  AppShell (layout wrapper)
    Sidebar        <- nav items, sets activeView
    MainContent    <- renders view based on activeView
      switch(activeView):
        "feedback"   -> FeedbackView
        "sentiment"  -> SentimentView
        "backlog"    -> BacklogView
        "rules"      -> RulesView
        "sources"    -> SourcesView
```

**State management:** React `useState` + `useLocalStorage` hook. No Redux, no Zustand.

**Persistence:** `localStorage` — filter selections and user preferences only. Mock data is never mutated.

**5 views:**
- `feedback` — raw feedback items with sentiment tags
- `sentiment` — trend charts by category over time
- `backlog` — value-estimated work items derived from feedback
- `rules` — configurable mapping rules (sentiment -> backlog item)
- `sources` — data source connections (all mock)

## File Structure

```
src/
  types/          # TypeScript interfaces and union types (ActiveView, etc.)
  data/           # 6 mock data files (feedback, backlog items, rules, etc.)
  utils/          # 3 utility files (value estimation, sentiment scoring, formatting)
  hooks/          # Custom hooks (useLocalStorage, etc.)
  components/
    layout/       # AppShell, Sidebar, MainContent
    feedback/     # FeedbackView and sub-components
    sentiment/    # SentimentView and sub-components
    backlog/      # BacklogView and sub-components
    rules/        # RulesView and sub-components
    sources/      # SourcesView and sub-components
    shared/       # Reusable components (Badge, Table, PrototypeBanner, etc.)
  __tests__/      # vitest unit tests
```

## Wireframe Aesthetic Rules

The UI deliberately looks like a lo-fi wireframe. All styling must respect these constraints:

- **Font:** monospace — `SF Mono`, `Fira Code`, `Courier New` (set on `body`)
- **Color:** grayscale only — `gray-50` through `gray-900`. No color classes (no blue, red, green, etc.)
- **Border radius:** 0 — no `rounded-*` classes
- **Box shadow:** none — no `shadow-*` classes
- **Borders:** always visible — use `border border-gray-400` on cards and panels
- **PROTOTYPE badge:** rendered in the top bar via `PrototypeBanner` component
- **recharts config:** use `gray` stroke colors, set `isAnimationActive={false}` on all series

## Mock Data Narrative

The mock data tells a specific story to demonstrate the tool's value:

- **Billing complaints spike** — duplicate charge reports rising over 3 months
- **Onboarding satisfaction declines** — CSAT scores dropping for new users
- **API integration gap** — enterprise prospects churn because no REST API exists, causing $450K in lost deals

**Top 3 suggested backlog items:**

| Item | Estimated Value |
|---|---|
| Fix Duplicate Billing | $57,600 / yr |
| Build REST API | $162,000 / yr |
| Redesign Onboarding | $28,800 / yr |

Value estimates are calculated in `src/utils/` based on mock churn rate, ticket volume, and deal size inputs.

## Adding a New View

1. Add the view name to the `ActiveView` union type in `src/types/`
2. Create a view component in `src/components/<viewname>/`
3. Add a `case` to the switch in `App.tsx` (or `MainContent`)
4. Add a nav item to `Sidebar.tsx`
