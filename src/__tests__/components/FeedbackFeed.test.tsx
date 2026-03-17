import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackFeed from '../../components/feedback/FeedbackFeed';

describe('FeedbackFeed', () => {
  it('renders feedback items', () => {
    render(<FeedbackFeed />);
    // Check that feedback cards are rendered (look for source badges)
    const supportBadges = screen.getAllByText('support');
    expect(supportBadges.length).toBeGreaterThan(0);
  });

  it('filters by source reduce item count', async () => {
    render(<FeedbackFeed />);
    const user = userEvent.setup();

    // Get initial count from the "X items" text
    const initialCountEl = screen.getByText(/items$/);
    const initialCount = parseInt(initialCountEl.textContent || '0');

    // Select "support" source filter
    const sourceSelect = screen.getAllByRole('combobox')[0]; // first select = source
    await user.selectOptions(sourceSelect, 'support');

    // Count should be less than initial
    const filteredCountEl = screen.getByText(/items$/);
    const filteredCount = parseInt(filteredCountEl.textContent || '0');
    expect(filteredCount).toBeLessThan(initialCount);
    expect(filteredCount).toBeGreaterThan(0);
  });

  it('search filters items', async () => {
    render(<FeedbackFeed />);
    const user = userEvent.setup();

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'billing');

    const countEl = screen.getByText(/items$/);
    const count = parseInt(countEl.textContent || '0');
    expect(count).toBeGreaterThan(0);
  });
});
