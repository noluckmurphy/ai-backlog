import { ValueBreakdownItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';

const impactLabels: Record<string, string> = {
  churn_risk: 'Churn Risk',
  expansion_opportunity: 'Expansion',
  support_cost: 'Support Cost',
  time_saved: 'Time Saved',
};

interface ValueBreakdownProps {
  items: ValueBreakdownItem[];
}

export default function ValueBreakdown({ items }: ValueBreakdownProps) {
  return (
    <div className="mt-2 space-y-1">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-[10px]">
          <span className="border border-gray-400 px-1 py-0.5 uppercase">
            {impactLabels[item.impactType] || item.impactType}
          </span>
          <span className="text-gray-500">{item.ruleName}</span>
          <span className="ml-auto font-bold">{formatCurrency(item.amount)}</span>
        </div>
      ))}
    </div>
  );
}
