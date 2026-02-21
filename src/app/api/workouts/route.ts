// src/app/api/workouts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SetInput {
  exerciseId: string;
  weight: number;
  reps: number;
  rpe: number;
  xpGained: number;
  isPr?: boolean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, totalVolume, totalXp, sets } = body;

    const workout = await prisma.workout.create({
      data: {
        userId,
        name,
        totalVolume,
        totalXp,
        sets: {
          create: sets.map((set: SetInput) => ({
            exerciseId: set.exerciseId,
            weight: set.weight,
            reps: set.reps,
            rpe: set.rpe,
            xpGained: set.xpGained,
            isPr: set.isPr || false,
          })),
        },
      },
      include: {
        sets: true,
      },
    });

    // Update user stats
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: totalXp },
        totalVolume: { increment: totalVolume },
        lastWorkoutAt: new Date(),
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    console.error('Failed to save workout:', error);
    return NextResponse.json({ error: 'Failed to save workout' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const workouts = await prisma.workout.findMany({
    where: { userId },
    include: { sets: true },
    orderBy: { startTime: 'desc' },
  });

  return NextResponse.json(workouts);
}
