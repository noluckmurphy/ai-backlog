import { useState } from 'react';
import { TeamId } from '../../types';
import { overlapItems } from '../../data/overlaps';
import { teamDependencies } from '../../data/dependencies';
import PageHeader from '../layout/PageHeader';
import MetricCard from '../shared/MetricCard';
import TeamSidebar from './TeamSidebar';
import OverlapCard from './OverlapCard';
import DependencyGraph from './DependencyGraph';

export default function ScanningDashboard() {
  const [selectedTeam, setSelectedTeam] = useState<TeamId | 'all'>('all');

  // Filter overlaps by selected team
  const filteredOverlaps =
    selectedTeam === 'all'
      ? overlapItems
      : overlapItems.filter(
          (o) => o.itemA.teamId === selectedTeam || o.itemB.teamId === selectedTeam,
        );

  // Filter dependencies by selected team
  const filteredDependencies =
    selectedTeam === 'all'
      ? teamDependencies
      : teamDependencies.filter(
          (d) => d.fromTeam === selectedTeam || d.toTeam === selectedTeam,
        );

  // Compute metrics
  const totalOverlaps = overlapItems.length;
  const duplicatesFound = overlapItems.filter((o) => o.overlapType === 'duplicate').length;
  const crossTeamDeps = teamDependencies.length;
  const highRiskItems = teamDependencies.filter((d) => d.risk === 'high').length;

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Cross-Team Scanning"
        subtitle="Detect overlaps, duplicates, and dependencies across team backlogs"
      />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Metrics row */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Total Overlaps" value={String(totalOverlaps)} />
          <MetricCard label="Duplicates Found" value={String(duplicatesFound)} />
          <MetricCard label="Cross-Team Deps" value={String(crossTeamDeps)} />
          <MetricCard label="High-Risk Items" value={String(highRiskItems)} />
        </div>

        {/* Team filter */}
        <TeamSidebar selectedTeam={selectedTeam} onTeamChange={setSelectedTeam} />

        {/* Overlaps section */}
        <div>
          <h3 className="text-xs font-bold uppercase mb-3">
            Overlaps{' '}
            <span className="text-gray-500 font-normal">({filteredOverlaps.length})</span>
          </h3>
          {filteredOverlaps.length === 0 ? (
            <div className="border border-gray-400 p-4">
              <p className="text-xs text-gray-500">No overlaps match the current filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOverlaps.map((overlap) => (
                <OverlapCard key={overlap.id} overlap={overlap} />
              ))}
            </div>
          )}
        </div>

        {/* Dependencies section */}
        <DependencyGraph dependencies={filteredDependencies} />
      </div>
    </div>
  );
}
