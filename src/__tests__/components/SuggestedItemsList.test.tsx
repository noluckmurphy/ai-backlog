import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuggestedItemsList from '../../components/backlog/SuggestedItemsList';

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('SuggestedItemsList', () => {
  it('renders suggested work items', () => {
    render(<SuggestedItemsList />);
    expect(screen.getByText('Fix Duplicate Billing Charges')).toBeInTheDocument();
    expect(screen.getByText('Build REST API for Integrations')).toBeInTheDocument();
  });

  it('items are sorted by value by default', () => {
    render(<SuggestedItemsList />);
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    // Build REST API ($162K) should come before Fix Billing ($57.6K)
    const apiIndex = titles.indexOf('Build REST API for Integrations');
    const billingIndex = titles.indexOf('Fix Duplicate Billing Charges');
    expect(apiIndex).toBeLessThan(billingIndex);
  });

  it('Accept button changes status', async () => {
    render(<SuggestedItemsList />);
    const user = userEvent.setup();

    // Find first Accept button and click it
    const acceptButtons = screen.getAllByText('Accept');
    await user.click(acceptButtons[0]);

    // Should now show "accepted" status and an "undo" link
    expect(screen.getByText('accepted')).toBeInTheDocument();
  });

  it('sort controls change order', async () => {
    render(<SuggestedItemsList />);
    const user = userEvent.setup();

    // Click "confidence" sort button
    const confidenceBtn = screen.getByRole('button', { name: 'confidence' });
    await user.click(confidenceBtn);

    // After sorting by confidence, first item should have highest confidence
    // Fix Duplicate Billing has 92% confidence, should be first
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles[0]).toBe('Fix Duplicate Billing Charges');
  });
});
