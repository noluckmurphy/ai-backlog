import { OverlapItem } from '../../types';

const TYPE_STYLES: Record<OverlapItem['overlapType'], string> = {
  duplicate: 'bg-gray-900 text-gray-50',
  related: 'bg-gray-300 text-gray-900',
  conflicting: 'border border-gray-900 bg-gray-50 text-gray-900',
};

const ACTION_LABELS: Record<OverlapItem['suggestedAction'], string> = {
  merge: 'Merge Items',
  coordinate: 'Coordinate',
  review: 'Review',
};

interface OverlapCardProps {
  overlap: OverlapItem;
}

export default function OverlapCard({ overlap }: OverlapCardProps) {
  return (
    <div className="border border-gray-400 p-4">
      {/* Header row: type badge + similarity */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${TYPE_STYLES[overlap.overlapType]}`}
        >
          {overlap.overlapType}
        </span>
        <span className="text-[10px] text-gray-500 uppercase">
          {Math.round(overlap.similarity * 100)}% similar
        </span>
      </div>

      {/* Two items side by side */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="border border-gray-300 p-3">
          <div className="text-[10px] text-gray-500 uppercase mb-1">
            {overlap.itemA.teamId}
          </div>
          <div className="text-xs">{overlap.itemA.title}</div>
        </div>
        <div className="border border-gray-300 p-3">
          <div className="text-[10px] text-gray-500 uppercase mb-1">
            {overlap.itemB.teamId}
          </div>
          <div className="text-xs">{overlap.itemB.title}</div>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs text-gray-600 leading-relaxed mb-3">{overlap.explanation}</p>

      {/* Action button */}
      <button className="px-3 py-1.5 text-[10px] font-bold uppercase border border-gray-400 text-gray-700 hover:bg-gray-200 transition-colors">
        {ACTION_LABELS[overlap.suggestedAction]}
      </button>
    </div>
  );
}
