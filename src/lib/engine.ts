// src/lib/engine.ts

export interface SetData {
  weight: number;
  reps: number;
  rpe?: number;
  isPr?: boolean;
}

export const XP_CONSTANTS = {
  BASE_PER_SET: 10,
  VOLUME_DIVISOR: 100,
  PR_BONUS: 50,
  RPE_MULTIPLIER: {
    10: 1.5,
    9: 1.3,
    8: 1.2,
    7: 1.1,
    default: 1.0,
  } as Record<number | string, number>,
};

/**
 * Calculates XP gained for a single set.
 */
export function calculateSetXp(set: SetData, streak: number = 0): number {
  const volumeScore = (set.weight * set.reps) / XP_CONSTANTS.VOLUME_DIVISOR;
  const effortMultiplier = XP_CONSTANTS.RPE_MULTIPLIER[set.rpe || 0] || XP_CONSTANTS.RPE_MULTIPLIER.default;
  const streakMultiplier = 1 + (streak * 0.05); // 5% boost per day streak

  let xp = (XP_CONSTANTS.BASE_PER_SET + volumeScore) * effortMultiplier * streakMultiplier;

  if (set.isPr) {
    xp += XP_CONSTANTS.PR_BONUS;
  }

  return Math.round(xp);
}

/**
 * Predicts the next weight for an exercise based on progressive overload rules.
 */
export function calculateNextWeight(currentWeight: number, rpe: number, success: boolean): number {
  if (!success) {
    return Math.max(0, currentWeight * 0.9); // 10% deload on failure
  }

  if (rpe <= 7) {
    return currentWeight + 2.5;
  } else if (rpe === 8) {
    return currentWeight + 1.25;
  }

  return currentWeight;
}

/**
 * Returns the plates needed for a given weight (assuming 20kg barbell).
 */
export function calculatePlates(targetWeight: number, barbellWeight: number = 20): number[] {
  const platesAvailable = [25, 20, 15, 10, 5, 2.5, 1.25];
  let weightNeeded = (targetWeight - barbellWeight) / 2;
  const result: number[] = [];

  if (weightNeeded <= 0) return [];

  for (const plate of platesAvailable) {
    while (weightNeeded >= plate) {
      result.push(plate);
      weightNeeded -= plate;
    }
  }

  return result;
}
