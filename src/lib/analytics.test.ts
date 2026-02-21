// src/lib/analytics.test.ts
import { calculateBodyBattery, projectStrength, calculateStrengthRatios } from './analytics';

describe('Analytics Logic', () => {
  describe('calculateBodyBattery', () => {
    it('returns 100 for no recent volume', () => {
      expect(calculateBodyBattery([], 0, 0)).toBe(100);
    });

    it('decreases battery with high acute load', () => {
      const battery = calculateBodyBattery([1000, 1000, 1000], 500, 0);
      expect(battery).toBeLessThan(100);
    });

    it('recovers battery with rest days', () => {
      const lowBattery = calculateBodyBattery([1000], 500, 0);
      const recoveredBattery = calculateBodyBattery([1000], 500, 2);
      expect(recoveredBattery).toBeGreaterThan(lowBattery);
    });
  });

  describe('projectStrength', () => {
    it('returns null for insufficient data', () => {
      expect(projectStrength([{ date: 1, weight: 100 }])).toBeNull();
    });

    it('projects future weight for linear growth', () => {
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;
      const history = [
        { date: now - 10 * day, weight: 100 },
        { date: now - 5 * day, weight: 105 },
        { date: now, weight: 110 },
      ];
      const projection = projectStrength(history);
      // Growth is 1kg/day. In 30 days from 'now', it should be 110 + 30 = 140
      expect(projection).toBeCloseTo(140, 0);
    });
  });

  describe('calculateStrengthRatios', () => {
    it('calculates correct proportions', () => {
      const volumes = { push: 100, pull: 100, legs: 200 };
      const ratios = calculateStrengthRatios(volumes);
      expect(ratios.push).toBe(0.25);
      expect(ratios.pull).toBe(0.25);
      expect(ratios.legs).toBe(0.5);
    });
  });
});
