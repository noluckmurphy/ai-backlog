import { UserStory, TaskBreakdown } from '../../types';
import CodeContextPanel from './CodeContextPanel';
import EdgeCaseList from './EdgeCaseList';

interface StoryBreakdownProps {
  breakdown: TaskBreakdown;
  story: UserStory;
}

const typeBadgeClass: Record<string, string> = {
  frontend: 'bg-gray-200 text-gray-800',
  backend: 'bg-gray-700 text-gray-50',
  database: 'bg-gray-500 text-gray-50',
  testing: 'bg-gray-300 text-gray-800',
  devops: 'bg-gray-400 text-gray-900',
};

export default function StoryBreakdown({ breakdown, story }: StoryBreakdownProps) {
  return (
    <div className="space-y-4">
      {/* Story header */}
      <div className="border border-gray-400 p-4">
        <h3 className="text-sm font-bold">{story.title}</h3>
        <p className="text-xs text-gray-600 mt-1">{story.description}</p>
        <div className="mt-2">
          <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">
            Acceptance Criteria
          </div>
          <ul className="list-disc list-inside space-y-0.5">
            {story.acceptanceCriteria.map((ac, i) => (
              <li key={i} className="text-xs text-gray-700">
                {ac}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-4">
        {breakdown.tasks.map((task) => (
          <div key={task.id} className="border border-gray-400 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                  typeBadgeClass[task.type] || 'bg-gray-200 text-gray-800'
                }`}
              >
                {task.type}
              </span>
              <span className="text-sm font-bold flex-1">{task.title}</span>
              <span className="text-[10px] text-gray-500">{task.estimatedHours}h est.</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">{task.description}</p>
            {task.codeContext.length > 0 && (
              <CodeContextPanel contexts={task.codeContext} />
            )}
          </div>
        ))}
      </div>

      {/* Edge cases */}
      <EdgeCaseList edgeCases={breakdown.edgeCases} />

      {/* AI confidence */}
      <div className="flex items-center gap-2 text-[10px] text-gray-500">
        <span className="font-bold uppercase">AI Confidence:</span>
        <span>{Math.round(breakdown.aiConfidence * 100)}%</span>
        <div className="flex-1 h-1 bg-gray-200 border border-gray-300">
          <div
            className="h-full bg-gray-600"
            style={{ width: `${breakdown.aiConfidence * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
