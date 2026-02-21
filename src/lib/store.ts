// src/lib/store.ts
import { create } from 'zustand';

export interface UserState {
  name: string;
  xp: number;
  rank: string;
  bodyBattery: number;
  streak: number;
  lastWorkoutAt: string | null;
  addXp: (amount: number) => void;
  updateBattery: (amount: number) => void;
}

export const useStore = create<UserState>((set) => ({
  name: 'Elite Lifter',
  xp: 1250,
  rank: 'SILVER',
  bodyBattery: 85,
  streak: 5,
  lastWorkoutAt: null,
  addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
  updateBattery: (amount) => set((state) => ({ bodyBattery: Math.max(0, Math.min(100, state.bodyBattery + amount)) })),
}));
