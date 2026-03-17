import { DataSource } from '../../types';
import { formatRelativeDate } from '../../utils/formatters';
import { Database, ShoppingCart, BarChart3 } from 'lucide-react';

interface SourceCardProps {
  source: DataSource;
  onToggle: (id: string) => void;
}

const typeIcons = {
  support: Database,
  sales: ShoppingCart,
  nps: BarChart3,
};

const statusDisplay: Record<string, { label: string; indicator: string }> = {
  connected: { label: 'Connected', indicator: '\u2588 \u2588 \u2588' },
  syncing: { label: 'Syncing...', indicator: '\u2588 \u2588 \u2591' },
  error: { label: 'Error', indicator: '\u2588 \u2591 \u2591' },
  disconnected: { label: 'Disconnected', indicator: '\u2591 \u2591 \u2591' },
};

export default function SourceCard({ source, onToggle }: SourceCardProps) {
  const Icon = typeIcons[source.type];
  const status = statusDisplay[source.status] || statusDisplay.disconnected;

  return (
    <div className="border border-gray-400 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} />
          <h3 className="text-sm font-bold">{source.name}</h3>
        </div>
        <span className="text-[10px] font-mono">{status.indicator}</span>
      </div>

      <p className="text-[10px] text-gray-500 mt-2">{source.description}</p>

      <div className="flex items-center gap-4 mt-3">
        <span className="text-[10px] text-gray-500">
          Status: <span className="font-bold">{status.label}</span>
        </span>
        <span className="text-[10px] text-gray-500">
          Items: <span className="font-bold">{source.itemCount.toLocaleString()}</span>
        </span>
        <span className="text-[10px] text-gray-500">
          Last sync: <span className="font-bold">{formatRelativeDate(source.lastSyncAt)}</span>
        </span>
      </div>

      <button
        onClick={() => onToggle(source.id)}
        className={`mt-3 px-3 py-1 text-[10px] font-bold uppercase border ${
          source.status === 'disconnected'
            ? 'bg-gray-900 text-gray-50 border-gray-900 hover:bg-gray-700'
            : 'border-gray-400 hover:bg-gray-200'
        }`}
      >
        {source.status === 'disconnected' ? 'Connect' : 'Disconnect'}
      </button>
    </div>
  );
}
