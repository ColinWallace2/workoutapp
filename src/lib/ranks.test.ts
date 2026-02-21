// src/lib/ranks.test.ts
import { getRankByXp, processPromotion, isEligibleForPromotion } from './ranks';

describe('Rank Progression System', () => {
  describe('getRankByXp', () => {
    it('returns IRON for low XP', () => {
      expect(getRankByXp(500)).toBe('IRON');
    });

    it('returns SILVER for 5000 XP', () => {
      expect(getRankByXp(5000)).toBe('SILVER');
    });

    it('returns CHALLENGER for 1M XP', () => {
      expect(getRankByXp(1000000)).toBe('CHALLENGER');
    });
  });

  describe('processPromotion', () => {
    it('increments consecutive workouts on success', () => {
      const state = { consecutiveWorkouts: 0, lockoutUntil: null };
      const newState = processPromotion(state, true);
      expect(newState.consecutiveWorkouts).toBe(1);
    });

    it('locks out user on failure', () => {
      const state = { consecutiveWorkouts: 3, lockoutUntil: null };
      const newState = processPromotion(state, false);
      expect(newState.consecutiveWorkouts).toBe(0);
      expect(newState.lockoutUntil).toBeGreaterThan(Date.now());
    });

    it('does not increment during lockout', () => {
      const future = Date.now() + 100000;
      const state = { consecutiveWorkouts: 0, lockoutUntil: future };
      const newState = processPromotion(state, true);
      expect(newState.consecutiveWorkouts).toBe(0);
    });
  });

  describe('isEligibleForPromotion', () => {
    it('returns true after 5 workouts', () => {
      expect(isEligibleForPromotion({ consecutiveWorkouts: 5, lockoutUntil: null })).toBe(true);
    });

    it('returns false before 5 workouts', () => {
      expect(isEligibleForPromotion({ consecutiveWorkouts: 4, lockoutUntil: null })).toBe(false);
    });
  });
});
