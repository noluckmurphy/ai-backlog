import { TeamId } from '../../types';
import { teamBacklogItems } from '../../data/teamBacklogs';

const TEAM_LABELS: Record<TeamId, string> = {
  platform: 'Platform',
  growth: 'Growth',
  payments: 'Payments',
  mobile: 'Mobile',
};

const TEAM_IDS: TeamId[] = ['platform', 'growth', 'payments', 'mobile'];

interface TeamSidebarProps {
  selectedTeam: TeamId | 'all';
  onTeamChange: (team: TeamId | 'all') => void;
}

export default function TeamSidebar({ selectedTeam, onTeamChange }: TeamSidebarProps) {
  const countsByTeam = TEAM_IDS.reduce<Record<TeamId, number>>(
    (acc, teamId) => {
      acc[teamId] = teamBacklogItems.filter((item) => item.teamId === teamId).length;
      return acc;
    },
    {} as Record<TeamId, number>,
  );

  const totalCount = teamBacklogItems.length;

  return (
    <div className="border border-gray-400 p-3">
      <div className="text-[10px] font-bold uppercase text-gray-500 mb-2">Filter by Team</div>
      <button
        onClick={() => onTeamChange('all')}
        className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase text-left transition-colors ${
          selectedTeam === 'all'
            ? 'bg-gray-900 text-gray-50'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <span>All Teams</span>
        <span>{totalCount}</span>
      </button>
      {TEAM_IDS.map((teamId) => (
        <button
          key={teamId}
          onClick={() => onTeamChange(teamId)}
          className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase text-left transition-colors ${
            selectedTeam === teamId
              ? 'bg-gray-900 text-gray-50'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{TEAM_LABELS[teamId]}</span>
          <span>{countsByTeam[teamId]}</span>
        </button>
      ))}
    </div>
  );
}
