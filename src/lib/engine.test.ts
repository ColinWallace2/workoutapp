// src/lib/engine.test.ts
import { calculateSetXp, calculateNextWeight, calculatePlates } from './engine';

describe('Training Engine', () => {
  describe('calculateSetXp', () => {
    it('calculates XP correctly for a standard set', () => {
      const set = { weight: 100, reps: 10, rpe: 8 };
      const xp = calculateSetXp(set, 0);
      // (10 + (100*10/100)) * 1.2 * 1.0 = (10 + 10) * 1.2 = 24
      expect(xp).toBe(24);
    });

    it('applies streak bonus', () => {
      const set = { weight: 100, reps: 10, rpe: 8 };
      const xp = calculateSetXp(set, 5); // 5 day streak = 25% boost
      // 24 * 1.25 = 30
      expect(xp).toBe(30);
    });

    it('applies PR bonus', () => {
      const set = { weight: 100, reps: 10, rpe: 8, isPr: true };
      const xp = calculateSetXp(set, 0);
      // 24 + 50 = 74
      expect(xp).toBe(74);
    });
  });

  describe('calculateNextWeight', () => {
    it('increases weight for low RPE', () => {
      expect(calculateNextWeight(100, 7, true)).toBe(102.5);
    });

    it('increases slightly for moderate RPE', () => {
      expect(calculateNextWeight(100, 8, true)).toBe(101.25);
    });

    it('keeps weight same for high RPE', () => {
      expect(calculateNextWeight(100, 9, true)).toBe(100);
    });

    it('deloads on failure', () => {
      expect(calculateNextWeight(100, 10, false)).toBe(90);
    });
  });

  describe('calculatePlates', () => {
    it('calculates plates correctly for 60kg (20kg bar + 2x20kg)', () => {
      expect(calculatePlates(60)).toEqual([20]);
    });

    it('calculates plates correctly for 100kg (20kg bar + 2x40kg)', () => {
      // 40kg per side = 25 + 15 or 20 + 20
      // Our algo takes largest first: 25, 15
      expect(calculatePlates(100)).toEqual([25, 15]);
    });
  });
});
