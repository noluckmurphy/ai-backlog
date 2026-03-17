import { useState, useMemo } from 'react';
import PageHeader from '../layout/PageHeader';
import MetricCard from '../shared/MetricCard';
import StoryBreakdown from './StoryBreakdown';
import { userStories, storyBreakdowns } from '../../data/storyBreakdowns';

export default function EnrichmentDashboard() {
  const [selectedStoryId, setSelectedStoryId] = useState(userStories[0]?.id ?? '');

  const metrics = useMemo(() => {
    let totalTasks = 0;
    let totalHours = 0;
    let totalEdgeCases = 0;
    const filesSet = new Set<string>();

    for (const bd of storyBreakdowns) {
      totalTasks += bd.tasks.length;
      totalEdgeCases += bd.edgeCases.length;
      for (const task of bd.tasks) {
        totalHours += task.estimatedHours;
        for (const ctx of task.codeContext) {
          filesSet.add(ctx.filePath);
        }
      }
    }

    return {
      totalTasks,
      totalHours,
      filesImpacted: filesSet.size,
      totalEdgeCases,
    };
  }, []);

  const selectedBreakdown = storyBreakdowns.find((b) => b.storyId === selectedStoryId);
  const selectedStory = userStories.find((s) => s.id === selectedStoryId);

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Work Breakdown"
        subtitle="AI-generated task decomposition with codebase context"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Metrics row */}
        <div className="grid grid-cols-4 gap-3">
          <MetricCard label="Tasks Generated" value={String(metrics.totalTasks)} />
          <MetricCard label="Estimated Hours" value={String(metrics.totalHours)} />
          <MetricCard label="Files Impacted" value={String(metrics.filesImpacted)} />
          <MetricCard label="Edge Cases Found" value={String(metrics.totalEdgeCases)} />
        </div>

        {/* Story selector */}
        <div className="border border-gray-400 p-3">
          <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
            Select User Story
          </label>
          <select
            value={selectedStoryId}
            onChange={(e) => setSelectedStoryId(e.target.value)}
            className="w-full border border-gray-400 bg-white px-2 py-1.5 text-xs font-mono"
          >
            {userStories.map((story) => (
              <option key={story.id} value={story.id}>
                {story.id}: {story.title}
              </option>
            ))}
          </select>
        </div>

        {/* Selected story breakdown */}
        {selectedBreakdown && selectedStory && (
          <StoryBreakdown breakdown={selectedBreakdown} story={selectedStory} />
        )}
      </div>
    </div>
  );
}
