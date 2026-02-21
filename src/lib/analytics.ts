// src/lib/analytics.ts

/**
 * Calculates Body Battery based on volume and recovery.
 * Battery = 100 - (Acute Fatigue * Factor)
 * Acute Fatigue can be estimated by the volume of the last 7 days compared to the last 28 days.
 */
export function calculateBodyBattery(
  recentVolume: number[], // volume of last 7 sessions
  averageVolume: number,   // average volume of last 28 days
  daysSinceLastWorkout: number
): number {
  if (recentVolume.length === 0) return 100;

  const acuteLoad = recentVolume.reduce((a, b) => a + b, 0) / recentVolume.length;
  const chronicLoad = averageVolume || acuteLoad;

  // Acute:Chronic Workload Ratio (ACWR)
  const acwr = acuteLoad / chronicLoad;

  // Fatigue component: ACWR > 1.5 indicates high fatigue
  // Recovery component: +5 points per day of rest
  let battery = 100 - (acwr * 20);
  battery += daysSinceLastWorkout * 5;

  return Math.max(0, Math.min(100, Math.round(battery)));
}

/**
 * Simple Linear Regression for strength projection.
 * y = mx + b
 */
export function projectStrength(history: { date: number; weight: number }[]): number | null {
  if (history.length < 3) return null;

  const n = history.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

  for (const point of history) {
    sumX += point.date;
    sumY += point.weight;
    sumXY += point.date * point.weight;
    sumXX += point.date * point.date;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Project 30 days into the future from the last date
  const lastDate = history[history.length - 1].date;
  const futureDate = lastDate + (30 * 24 * 60 * 60 * 1000);

  return Math.round(slope * futureDate + intercept);
}

/**
 * Detects strength imbalances based on Push/Pull/Legs ratios.
 * Ideal roughly: Push 1, Pull 1, Legs 1.5
 */
export function calculateStrengthRatios(volumes: { push: number; pull: number; legs: number }) {
  const total = volumes.push + volumes.pull + volumes.legs;
  if (total === 0) return { push: 0, pull: 0, legs: 0 };

  return {
    push: volumes.push / total,
    pull: volumes.pull / total,
    legs: volumes.legs / total,
  };
}
