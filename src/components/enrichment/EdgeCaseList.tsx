import { useState } from 'react';

interface EdgeCaseListProps {
  edgeCases: string[];
}

export default function EdgeCaseList({ edgeCases }: EdgeCaseListProps) {
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());

  const toggleReviewed = (index: number) => {
    setReviewed((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="border border-gray-400 p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold uppercase">Edge Cases (AI-suggested)</h4>
        <span className="text-[10px] text-gray-500">
          {reviewed.size}/{edgeCases.length} reviewed
        </span>
      </div>
      <ul className="space-y-1">
        {edgeCases.map((edgeCase, i) => (
          <li key={i} className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={reviewed.has(i)}
              onChange={() => toggleReviewed(i)}
              className="mt-0.5 accent-gray-600"
            />
            <span className="text-xs text-gray-700">{edgeCase}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
