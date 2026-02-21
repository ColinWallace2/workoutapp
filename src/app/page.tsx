"use client";

import React, { useEffect, useState } from 'react';
import { Trophy, Battery, Flame, Play, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, GlassCard } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useStore } from '@/lib/store';
import { getRandomQuote, Quote } from '@/lib/quotes';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

export default function Dashboard() {
  const user = useStore();
  const { theme, toggleTheme } = useTheme();
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setQuote(getRandomQuote());
  }, []);

  if (!quote) return null;

  return (
    <main className="min-h-screen bg-[#f0f2f5] p-6 space-y-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hello, {user.name}</h1>
          <p className="text-gray-500 text-sm">Welcome back to your peak.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="neumorphic" onClick={toggleTheme} className="p-2 w-10 h-10 flex items-center justify-center rounded-full">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shadow-sm">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center space-y-2 py-8">
          <Trophy className="text-yellow-500" size={32} />
          <span className="text-sm font-medium text-gray-500 uppercase">Rank</span>
          <span className="text-xl font-bold text-gray-800">{user.rank}</span>
        </Card>
        <Card className="flex flex-col items-center justify-center space-y-2 py-8">
          <Flame className="text-orange-500" size={32} />
          <span className="text-sm font-medium text-gray-500 uppercase">Streak</span>
          <span className="text-xl font-bold text-gray-800">{user.streak} Days</span>
        </Card>
      </div>

      {/* Body Battery */}
      <Card className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Battery className="text-blue-500" size={20} />
            <span className="font-bold text-gray-700 uppercase tracking-wider text-sm">Body Battery 2.0</span>
          </div>
          <span className="text-xl font-black text-blue-600">{user.bodyBattery}%</span>
        </div>
        <ProgressBar value={user.bodyBattery} color="bg-gradient-to-r from-blue-400 to-cyan-300" />
        <p className="text-xs text-gray-400 italic">
          {user.bodyBattery > 70 ? "Optimal state for high-intensity training." : "Moderate fatigue detected. Focus on form."}
        </p>
      </Card>

      {/* Quote of the Day */}
      <GlassCard className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-200">
        <p className="text-lg font-medium text-indigo-900 leading-relaxed italic">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="mt-2 text-sm text-indigo-600 font-semibold">— {quote.author}</p>
      </GlassCard>

      {/* Action CTA */}
      <div className="fixed bottom-8 left-0 right-0 px-6 max-w-lg mx-auto">
        <Link href="/workout" className="block">
          <Button variant="primary" className="w-full h-16 rounded-2xl flex items-center justify-center space-x-3 text-lg shadow-xl shadow-blue-500/30">
            <Play fill="currentColor" size={24} />
            <span>START WORKOUT</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
