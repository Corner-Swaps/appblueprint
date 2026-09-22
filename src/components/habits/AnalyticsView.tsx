import React from 'react';
import { HabitTask } from '../../types';
import { 
  TrendingUp, 
  Flame, 
  CheckCircle, 
  Target, 
  Award, 
  Calendar,
  Activity
} from 'lucide-react';

interface AnalyticsViewProps {
  habits: HabitTask[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ habits }) => {
  const total = habits.length;
  const completed = habits.filter(h => h.isCompleted || h.currentValue >= h.targetValue).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const longestStreak = habits.reduce((max, h) => Math.max(max, h.streakDays), 0);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="max-w-md mx-auto w-full pb-28 px-4 pt-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-apple-gray-900 dark:text-white tracking-tight">
            Habit Analytics
          </h1>
          <p className="text-xs text-apple-gray-500">
            Track streaks, consistency, and weekly progress
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-apple-blue/10 text-apple-blue flex items-center justify-center">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm text-center">
          <div className="flex justify-center text-apple-green mb-1">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span className="text-lg font-black text-apple-gray-900 dark:text-white block">
            {completionRate}%
          </span>
          <span className="text-[10px] text-apple-gray-400 font-semibold uppercase">
            Completed
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm text-center">
          <div className="flex justify-center text-amber-500 mb-1">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <span className="text-lg font-black text-apple-gray-900 dark:text-white block">
            {longestStreak}d
          </span>
          <span className="text-[10px] text-apple-gray-400 font-semibold uppercase">
            Best Streak
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm text-center">
          <div className="flex justify-center text-apple-blue mb-1">
            <Target className="w-5 h-5" />
          </div>
          <span className="text-lg font-black text-apple-gray-900 dark:text-white block">
            {completed}/{total}
          </span>
          <span className="text-[10px] text-apple-gray-400 font-semibold uppercase">
            Today
          </span>
        </div>
      </div>

      {/* Weekly Activity Grid */}
      <div className="p-5 rounded-2xl bg-white dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-apple-gray-900 dark:text-white">
            7-Day Consistency Rate
          </span>
          <span className="text-xs text-apple-green font-bold">
            92% Average
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {daysOfWeek.map((day, idx) => {
            const isHigh = idx !== 2;
            return (
              <div key={day} className="flex flex-col items-center space-y-1.5">
                <div 
                  className={`w-full h-16 rounded-xl flex items-end justify-center p-1 transition-all ${
                    isHigh ? 'bg-[#D7F7BE] dark:bg-[#1D3517]' : 'bg-apple-gray-100 dark:bg-apple-gray-800'
                  }`}
                >
                  <div 
                    className={`w-full rounded-lg ${isHigh ? 'bg-apple-green h-4/5' : 'bg-apple-gray-300 dark:bg-apple-gray-700 h-2/5'}`} 
                  />
                </div>
                <span className="text-[10px] font-medium text-apple-gray-400">
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Habit Streaks */}
      <div className="p-5 rounded-2xl bg-white dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-apple-gray-400">
          Habit Breakdown & Streak Records
        </h3>

        <div className="space-y-2.5">
          {habits.map((habit) => {
            const pct = Math.min(100, Math.round((habit.currentValue / habit.targetValue) * 100));
            return (
              <div key={habit.id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-apple-gray-900 dark:text-apple-100">
                    {habit.title}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-apple-gray-400">
                      {habit.currentValue}/{habit.targetValue} {habit.unit}
                    </span>
                    <span className="text-amber-600 font-bold text-[11px] flex items-center space-x-0.5">
                      <Flame className="w-3 h-3 fill-amber-500" />
                      <span>{habit.streakDays}d</span>
                    </span>
                  </div>
                </div>
                <div className="w-full bg-apple-gray-100 dark:bg-apple-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#FF4B72] h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
