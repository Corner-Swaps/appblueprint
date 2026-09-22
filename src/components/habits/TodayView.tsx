import React from 'react';
import { HabitTask } from '../../types';
import { HabitCard } from './HabitCard';
import { CheckCircle2, Sparkles, User } from 'lucide-react';

interface TodayViewProps {
  habits: HabitTask[];
  onIncrement: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onClickCard: (habit: HabitTask) => void;
  onOpenAddModal: () => void;
  onOpenAdvisor?: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  habits,
  onIncrement,
  onToggleComplete,
  onClickCard,
  onOpenAdvisor,
}) => {
  const totalTasks = habits.length;
  const completedTasks = habits.filter(h => h.isCompleted || h.currentValue >= h.targetValue).length;
  const totalPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="max-w-md mx-auto w-full pb-36 select-none ios-safe-top bg-black text-white relative">
      
      {/* 1. CoursePal Top Header (Pink capsule pill left, 'Today' center, avatar right) */}
      <div className="px-5 py-3 flex items-center justify-between">
        
        {/* Pink CoursePal Pill Badge */}
        <div className="px-3.5 py-1 rounded-full bg-[#FF4D6D] text-white font-bold text-xs shadow-md tracking-tight">
          CoursePal
        </div>

        {/* Center Title */}
        <h1 className="text-xl font-black text-white tracking-tight">
          Today
        </h1>

        {/* Smiling Avatar Icon on Right */}
        <div className="w-8 h-8 rounded-full bg-[#FFE27D] border border-amber-300 flex items-center justify-center shadow-xs">
          <User className="w-4 h-4 text-amber-900 stroke-[2.5]" />
        </div>

      </div>

      {/* NO CALENDAR: Completely removed per directive "minusa the calander" */}

      {/* 2. Overall Checklist Progress Bar */}
      <div className="px-5 mt-2">
        <div className="p-4 rounded-2xl bg-[#141418] border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF4D6D]" />
              <span>Overall Checklist Progress</span>
            </span>
            <span className="text-[#FF4D6D] font-mono">{completedTasks} of {totalTasks} Satisfied ({totalPercent}%)</span>
          </div>

          <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF4D6D] to-[#FF758F] transition-all duration-500 rounded-full"
              style={{ width: `${totalPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. CoursePal Section Cards List - Each with its own Section Progress Bar */}
      <div className="px-4 mt-4 space-y-3.5">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onIncrement={onIncrement}
            onToggleComplete={onToggleComplete}
            onClickCard={onClickCard}
          />
        ))}

        {habits.length === 0 && (
          <div className="p-8 text-center bg-[#16161A] rounded-2xl border border-white/10 text-white/60 text-xs">
            No sections found. Tap the + button to add one!
          </div>
        )}
      </div>

      {/* 4. Floating Golden Sparkle Advisor Button in Bottom Right Corner (CoursePal exact feature) */}
      {onOpenAdvisor && (
        <button
          onClick={onOpenAdvisor}
          className="apple-press fixed bottom-24 right-5 z-40 w-12 h-12 rounded-full bg-[#E5A93C] hover:bg-[#D4982B] text-black shadow-[0_8px_24px_rgba(229,169,60,0.4)] border border-amber-300 flex items-center justify-center active:scale-95 transition-transform"
          title="App Launch Advisor"
        >
          <Sparkles className="w-6 h-6 stroke-black text-black" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF4D6D] border border-white" />
        </button>
      )}

    </div>
  );
};
