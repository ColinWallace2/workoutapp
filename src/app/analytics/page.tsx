"use client";

import React from 'react';
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { ArrowLeft, TrendingUp, Target, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

const data = [
  { name: 'Week 1', weight: 60, volume: 1200 },
  { name: 'Week 2', weight: 62.5, volume: 1350 },
  { name: 'Week 3', weight: 62.5, volume: 1400 },
  { name: 'Week 4', weight: 65, volume: 1600 },
  { name: 'Week 5', weight: 67.5, volume: 1800 },
];

export default function Analytics() {
  return (
    <main className="min-h-screen bg-[#f0f2f5] p-6 space-y-8 max-w-lg mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="neumorphic" className="p-2 rounded-full w-10 h-10 flex items-center justify-center">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Intelligence</h1>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
         <Card className="p-4 space-y-1">
            <div className="flex items-center text-blue-500 space-x-1">
              <TrendingUp size={16} />
              <span className="text-[10px] font-bold uppercase">Projection</span>
            </div>
            <div className="text-2xl font-black text-gray-800">74.5kg</div>
            <div className="text-[10px] text-green-500 font-bold">+10.2% by next month</div>
         </Card>
         <Card className="p-4 space-y-1">
            <div className="flex items-center text-purple-500 space-x-1">
              <Activity size={16} />
              <span className="text-[10px] font-bold uppercase">Volume</span>
            </div>
            <div className="text-2xl font-black text-gray-800">1.8t</div>
            <div className="text-[10px] text-blue-500 font-bold">Weekly record</div>
         </Card>
      </div>

      {/* Lift Progression */}
      <Card className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Strength Trend</h2>
          <span className="text-xs font-bold text-blue-500">Chest Press (1RM)</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#3b82f6"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorWeight)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Projections Card */}
      <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-blue-500/40">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Target size={20} className="text-blue-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-100">AI PROJECTION</span>
            </div>
            <h3 className="text-xl font-bold">You are on track to hit 80kg by April 12th.</h3>
            <p className="text-sm text-blue-100/80 leading-relaxed">
              Based on your current volume acceleration and 95% consistency rate.
            </p>
          </div>
        </div>
      </Card>

      {/* Bottom Nav Spacer */}
      <div className="h-8" />
    </main>
  );
}
