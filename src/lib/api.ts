// src/lib/api.ts

export interface WorkoutData {
  userId: string;
  name: string;
  totalVolume: number;
  totalXp: number;
  sets: {
    exerciseId: string;
    weight: number;
    reps: number;
    rpe: number;
    xpGained: number;
    isPr?: boolean;
  }[];
}

export async function saveWorkout(workoutData: WorkoutData) {
  const response = await fetch('/api/workouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workoutData),
  });

  if (!response.ok) {
    throw new Error('Failed to save workout');
  }

  return response.json();
}

export async function getWorkouts(userId: string) {
  const response = await fetch(`/api/workouts?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch workouts');
  }
  return response.json();
}
