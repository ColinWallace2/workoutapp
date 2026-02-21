"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, History } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { calculateSetXp } from '@/lib/engine';
import { useStore } from '@/lib/store';
import Link from 'next/link';

interface LoggedSet {
  id: string;
  weight: number;
  reps: number;
  rpe: number;
  xpGained: number;
}

export default function WorkoutLogger() {
  const [sets, setSets] = useState<LoggedSet[]>([]);
  const [showXpPopup, setShowXpPopup] = useState<number | null>(null);
  const [currentWeight, setCurrentWeight] = useState(60);
  const [currentReps, setCurrentReps] = useState(10);
  const [currentRpe, setCurrentRpe] = useState(8);
  const addXp = useStore((state) => state.addXp);
  const streak = useStore((state) => state.streak);

  const logSet = () => {
    const xp = calculateSetXp({ weight: currentWeight, reps: currentReps, rpe: currentRpe }, streak);
    const newSet = {
      id: Math.random().toString(36).substr(2, 9),
      weight: currentWeight,
      reps: currentReps,
      rpe: currentRpe,
      xpGained: xp
    };

    setSets([newSet, ...sets]);
    addXp(xp);
    setShowXpPopup(xp);
    setTimeout(() => setShowXpPopup(null), 1000);

    // Predictive Auto-fill for next set
    if (currentRpe <= 7) {
      setCurrentWeight(prev => prev + 2.5);
    } else if (currentRpe === 8) {
      setCurrentWeight(prev => prev + 1.25);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f2f5] p-6 space-y-6 max-w-lg mx-auto pb-32">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link href="/">
          <Button variant="neumorphic" className="p-2 rounded-full w-10 h-10 flex items-center justify-center">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Chest Press</h1>
        <Button variant="neumorphic" className="p-2 rounded-full w-10 h-10 flex items-center justify-center">
          <History size={20} />
        </Button>
      </div>

      {/* Input Area */}
      <Card className="space-y-6">
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Weight (kg)</label>
            <div className="flex items-center space-x-2">
               <Input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                className="text-2xl font-black w-full"
               />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Reps</label>
            <Input
              type="number"
              value={currentReps}
              onChange={(e) => setCurrentReps(Number(e.target.value))}
              className="text-2xl font-black w-full"
            />
          </div>
        </div>

        <Slider
          label={`Effort (RPE): ${currentRpe}`}
          min={5} max={10} step={0.5}
          value={currentRpe}
          onChange={(e) => setCurrentRpe(Number(e.target.value))}
        />

        <div className="relative">
          <Button
            variant="primary"
            onClick={logSet}
            className="w-full py-4 rounded-2xl flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200"
          >
            <Check size={24} />
            <span className="font-bold">LOG SET</span>
          </Button>

          <AnimatePresence>
            {showXpPopup && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="text-2xl font-black text-blue-600 drop-shadow-md">
                  +{showXpPopup} XP
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Log History */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Session History</h2>
        <AnimatePresence initial={false}>
          {sets.map((set) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-4 flex justify-between items-center shadow-sm border border-white/40"
            >
              <div>
                <span className="text-lg font-black text-gray-800 dark:text-gray-100">{set.weight}kg</span>
                <span className="mx-2 text-gray-400">×</span>
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">{set.reps}</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-blue-500">+{set.xpGained} XP</div>
                <div className="text-[10px] text-gray-400 uppercase">RPE {set.rpe}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Finish Workout */}
      <div className="fixed bottom-8 left-0 right-0 px-6 max-w-lg mx-auto">
         <Button className="w-full bg-green-500 text-white shadow-green-100 hover:bg-green-600">
           FINISH SESSION
         </Button>
      </div>
    </main>
  );
}
