// src/lib/ranks.ts

export type Rank =
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER';

export const RANK_ORDER: Rank[] = [
  'IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'
];

export const XP_THRESHOLDS: Record<Rank, number> = {
  'IRON': 0,
  'BRONZE': 1000,
  'SILVER': 5000,
  'GOLD': 15000,
  'PLATINUM': 30000,
  'DIAMOND': 60000,
  'MASTER': 120000,
  'GRANDMASTER': 300000,
  'CHALLENGER': 1000000,
};

export interface PromotionState {
  consecutiveWorkouts: number;
  lockoutUntil: number | null;
}

/**
 * Determines the rank based on XP.
 */
export function getRankByXp(xp: number): Rank {
  let currentRank: Rank = 'IRON';
  for (const rank of RANK_ORDER) {
    if (xp >= XP_THRESHOLDS[rank]) {
      currentRank = rank;
    } else {
      break;
    }
  }
  return currentRank;
}

/**
 * Processes a workout for promotion eligibility.
 * Returns the new promotion state.
 */
export function processPromotion(
  state: PromotionState,
  success: boolean
): PromotionState {
  const now = Date.now();

  if (state.lockoutUntil && now < state.lockoutUntil) {
    return state;
  }

  if (!success) {
    return {
      consecutiveWorkouts: 0,
      lockoutUntil: now + (7 * 24 * 60 * 60 * 1000) // 1 week lockout
    };
  }

  return {
    consecutiveWorkouts: state.consecutiveWorkouts + 1,
    lockoutUntil: null
  };
}

/**
 * Checks if user is eligible for promotion to next rank.
 */
export function isEligibleForPromotion(state: PromotionState): boolean {
  return state.consecutiveWorkouts >= 5;
}
