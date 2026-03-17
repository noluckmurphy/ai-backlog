import { teamBacklogItems } from '../../data/teamBacklogs';
import { overlapItems } from '../../data/overlaps';
import { teamDependencies } from '../../data/dependencies';

describe('Pillar 2 data integrity', () => {
  const backlogIds = new Set(teamBacklogItems.map((b) => b.id));

  it('all overlap items reference valid backlog IDs', () => {
    overlapItems.forEach((overlap) => {
      expect(backlogIds.has(overlap.itemA.itemId)).toBe(true);
      expect(backlogIds.has(overlap.itemB.itemId)).toBe(true);
    });
  });

  it('overlap items reference different teams', () => {
    overlapItems.forEach((overlap) => {
      expect(overlap.itemA.teamId).not.toBe(overlap.itemB.teamId);
    });
  });

  it('all dependency items reference valid backlog IDs', () => {
    teamDependencies.forEach((dep) => {
      expect(backlogIds.has(dep.fromItemId)).toBe(true);
      expect(backlogIds.has(dep.toItemId)).toBe(true);
    });
  });

  it('dependencies connect different teams', () => {
    teamDependencies.forEach((dep) => {
      expect(dep.fromTeam).not.toBe(dep.toTeam);
    });
  });

  it('all teams have at least one backlog item', () => {
    const teams = new Set(teamBacklogItems.map((b) => b.teamId));
    expect(teams.size).toBeGreaterThanOrEqual(4);
  });
});
