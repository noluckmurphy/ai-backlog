import { userStories, storyBreakdowns } from '../../data/storyBreakdowns';

describe('Pillar 3 data integrity', () => {
  it('all story breakdowns reference valid story IDs', () => {
    const storyIds = new Set(userStories.map((s) => s.id));
    storyBreakdowns.forEach((breakdown) => {
      expect(storyIds.has(breakdown.storyId)).toBe(true);
    });
  });

  it('all story breakdowns have at least one task', () => {
    storyBreakdowns.forEach((breakdown) => {
      expect(breakdown.tasks.length).toBeGreaterThan(0);
    });
  });

  it('all tasks have at least one code context entry', () => {
    storyBreakdowns.forEach((breakdown) => {
      breakdown.tasks.forEach((task) => {
        expect(task.codeContext.length).toBeGreaterThan(0);
      });
    });
  });

  it('all code context entries have non-empty fields', () => {
    storyBreakdowns.forEach((breakdown) => {
      breakdown.tasks.forEach((task) => {
        task.codeContext.forEach((ctx) => {
          expect(ctx.filePath).toBeTruthy();
          expect(ctx.lineRange).toBeTruthy();
          expect(ctx.snippet).toBeTruthy();
        });
      });
    });
  });

  it('all breakdowns have edge cases', () => {
    storyBreakdowns.forEach((breakdown) => {
      expect(breakdown.edgeCases.length).toBeGreaterThan(0);
    });
  });
});
