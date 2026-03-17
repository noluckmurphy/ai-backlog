import { TeamDependency } from '../../types';
import { teamBacklogItems } from '../../data/teamBacklogs';

const RISK_STYLES: Record<TeamDependency['risk'], string> = {
  high: 'bg-gray-900 text-gray-50',
  medium: 'bg-gray-400 text-gray-900',
  low: 'bg-gray-200 text-gray-700',
};

const TYPE_LABELS: Record<TeamDependency['dependencyType'], string> = {
  blocks: 'Blocks',
  needs_api: 'Needs API',
  shared_schema: 'Shared Schema',
  shared_component: 'Shared Component',
};

interface DependencyGraphProps {
  dependencies: TeamDependency[];
}

function lookupTitle(itemId: string): string {
  const item = teamBacklogItems.find((b) => b.id === itemId);
  return item ? item.title : itemId;
}

export default function DependencyGraph({ dependencies }: DependencyGraphProps) {
  if (dependencies.length === 0) {
    return (
      <div className="border border-gray-400 p-4">
        <h3 className="text-xs font-bold uppercase mb-3">Dependencies</h3>
        <p className="text-xs text-gray-500">No dependencies match the current filter.</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-400">
      <div className="px-4 py-3 border-b border-gray-400">
        <h3 className="text-xs font-bold uppercase">Dependencies</h3>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-400 bg-gray-100">
            <th className="text-left px-4 py-2 text-[10px] font-bold uppercase text-gray-500">From</th>
            <th className="text-left px-4 py-2 text-[10px] font-bold uppercase text-gray-500">To</th>
            <th className="text-left px-4 py-2 text-[10px] font-bold uppercase text-gray-500">Type</th>
            <th className="text-left px-4 py-2 text-[10px] font-bold uppercase text-gray-500">Risk</th>
            <th className="text-left px-4 py-2 text-[10px] font-bold uppercase text-gray-500">Description</th>
          </tr>
        </thead>
        <tbody>
          {dependencies.map((dep) => (
            <tr key={dep.id} className="border-b border-gray-300 hover:bg-gray-50">
              <td className="px-4 py-3 align-top">
                <div className="text-[10px] text-gray-500 uppercase">{dep.fromTeam}</div>
                <div className="text-xs mt-0.5">{lookupTitle(dep.fromItemId)}</div>
              </td>
              <td className="px-4 py-3 align-top">
                <div className="text-[10px] text-gray-500 uppercase">{dep.toTeam}</div>
                <div className="text-xs mt-0.5">{lookupTitle(dep.toItemId)}</div>
              </td>
              <td className="px-4 py-3 align-top">
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase border border-gray-400">
                  {TYPE_LABELS[dep.dependencyType]}
                </span>
              </td>
              <td className="px-4 py-3 align-top">
                <span
                  className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${RISK_STYLES[dep.risk]}`}
                >
                  {dep.risk}
                </span>
              </td>
              <td className="px-4 py-3 align-top text-xs text-gray-600 max-w-xs">
                {dep.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
