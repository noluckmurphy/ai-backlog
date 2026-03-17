import { WorkItemStatus } from '../../types';

interface ItemActionsProps {
  status: WorkItemStatus;
  onStatusChange: (status: WorkItemStatus) => void;
}

export default function ItemActions({ status, onStatusChange }: ItemActionsProps) {
  if (status !== 'suggested') {
    return (
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] uppercase font-bold border border-gray-400 px-2 py-1">
          {status}
        </span>
        <button
          onClick={() => onStatusChange('suggested')}
          className="text-[10px] underline text-gray-500 hover:text-gray-900 transition-colors"
        >
          undo
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mt-3">
      <button
        onClick={() => onStatusChange('accepted')}
        className="px-3 py-1 text-[10px] font-bold uppercase bg-gray-900 text-gray-50 border border-gray-900 hover:bg-gray-700 transition-colors"
      >
        Accept
      </button>
      <button
        onClick={() => onStatusChange('rejected')}
        className="px-3 py-1 text-[10px] font-bold uppercase border border-gray-400 hover:bg-gray-200 transition-colors"
      >
        Reject
      </button>
      <button
        onClick={() => onStatusChange('deferred')}
        className="px-3 py-1 text-[10px] font-bold uppercase border border-gray-400 hover:bg-gray-200 transition-colors"
      >
        Defer
      </button>
    </div>
  );
}
