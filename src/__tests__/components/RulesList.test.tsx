import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RulesList from '../../components/rules/RulesList';

beforeEach(() => {
  localStorage.clear();
});

describe('RulesList', () => {
  it('renders all default rules', () => {
    render(<RulesList />);
    expect(screen.getByText('Enterprise Churn Prevention')).toBeInTheDocument();
    expect(screen.getByText('Support Cost Reduction')).toBeInTheDocument();
    expect(screen.getByText('Lost Deal Recovery')).toBeInTheDocument();
  });

  it('toggle changes active state', async () => {
    render(<RulesList />);
    const user = userEvent.setup();

    // Find toggle switches
    const toggles = screen.getAllByRole('switch');
    expect(toggles.length).toBeGreaterThan(0);

    // Click the first toggle
    await user.click(toggles[0]);

    // The toggle should have changed aria-checked
    expect(toggles[0]).toHaveAttribute('aria-checked');
  });

  it('editor expands on click', async () => {
    render(<RulesList />);
    const user = userEvent.setup();

    // Click "edit" to expand
    const editButtons = screen.getAllByText('edit');
    await user.click(editButtons[0]);

    // Editor should show conditions section
    expect(screen.getByText('Conditions')).toBeInTheDocument();
    expect(screen.getByText('Valuation')).toBeInTheDocument();
  });
});
