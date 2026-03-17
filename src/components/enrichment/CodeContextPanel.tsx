import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { CodeContext } from '../../types';

interface CodeContextPanelProps {
  contexts: CodeContext[];
}

export default function CodeContextPanel({ contexts }: CodeContextPanelProps) {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (contexts.length === 0) return null;

  return (
    <div className="space-y-1">
      {contexts.map((ctx, i) => {
        const isExpanded = expandedIndices.has(i);
        return (
          <div key={i} className="border border-gray-300">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-1 px-2 py-1 text-[10px] text-left bg-gray-50 hover:bg-gray-200"
            >
              {isExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
              <span className="font-bold">{ctx.filePath}</span>
              <span className="text-gray-500 ml-1">L{ctx.lineRange}</span>
            </button>
            {isExpanded && (
              <div className="px-2 pb-2">
                <pre className="bg-gray-100 border border-gray-300 p-2 text-[10px] overflow-x-auto whitespace-pre-wrap">
                  {ctx.snippet}
                </pre>
                <p className="text-[10px] text-gray-500 mt-1">{ctx.relevance}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
