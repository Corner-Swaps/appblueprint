import React from 'react';
import { HabitTask, HabitIconName } from '../../types';
import { PASTEL_THEMES } from '../../data/habits';
import { ScallopedCheckBadge } from './ScallopedCheckBadge';
import { 
  Lightbulb, 
  ShieldCheck, 
  Scale, 
  Store, 
  Terminal, 
  Smartphone, 
  Rocket, 
  Code, 
  Zap, 
  Sparkles, 
  Flame, 
  Plus, 
  Activity, 
  Book
} from 'lucide-react';

interface HabitCardProps {
  habit: HabitTask;
  onIncrement: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onClickCard: (habit: HabitTask) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onIncrement,
  onToggleComplete,
  onClickCard,
}) => {
  const theme = PASTEL_THEMES[habit.colorTheme] || PASTEL_THEMES.cyan;
  const isComplete = habit.isCompleted || habit.currentValue >= habit.targetValue;
  const progressPercent = Math.min(100, Math.round((habit.currentValue / (habit.targetValue || 1)) * 100));

  const renderIcon = (name: HabitIconName) => {
    const iconProps = { className: 'w-6 h-6 stroke-white text-white stroke-[2.2]' };
    switch (name) {
      case 'lightbulb': return <Lightbulb {...iconProps} />;
      case 'shield': return <ShieldCheck {...iconProps} />;
      case 'scale': return <Scale {...iconProps} />;
      case 'store': return <Store {...iconProps} />;
      case 'terminal': return <Terminal {...iconProps} />;
      case 'smartphone': return <Smartphone {...iconProps} />;
      case 'rocket': return <Rocket {...iconProps} />;
      case 'code': return <Code {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'activity': return <Activity {...iconProps} />;
      case 'book': return <Book {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  return (
    <div
      onClick={() => onClickCard(habit)}
      className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-150 cursor-pointer ${theme.bg} border ${theme.borderColor} shadow-xl active:scale-[0.99] space-y-3.5`}
    >
      <div className="flex items-center justify-between">
        
        {/* Left: Squircle Icon & Text (CoursePal exact layout) */}
        <div className="flex items-center space-x-3.5 min-w-0 pr-2">
          
          {/* Translucent squircle icon container matching CoursePal */}
          <div className={`w-11 h-11 rounded-2xl ${theme.iconBg} border border-white/15 flex items-center justify-center shrink-0 shadow-sm`}>
            {renderIcon(habit.iconName)}
          </div>

          {/* Title & Subtitle Badge */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-white tracking-tight leading-snug truncate">
              {habit.title}
            </h3>
            
            <div className="mt-1 flex items-center space-x-2">
              {habit.badgeText && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-white/15 text-white">
                  {habit.badgeText}
                </span>
              )}
              <span className="text-xs text-white/70 truncate">
                {habit.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Phase Streak & Action Button */}
        <div className="flex flex-col items-end justify-between h-12 shrink-0">
          
          {/* Flame Phase Indicator */}
          <div className="flex items-center space-x-1 text-[11px] font-bold text-white">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{habit.streakLabel || `${habit.streakDays} Days`}</span>
          </div>

          {/* Action: Scalloped Checkmark Badge OR Plus Button */}
          {isComplete ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(habit.id);
              }}
              title="Completed! Click to toggle status"
              className="apple-press hover:scale-105 active:scale-95 transition-transform"
            >
              <ScallopedCheckBadge className="w-8 h-8" />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIncrement(habit.id);
              }}
              title="Add Progress (+1)"
              className="apple-press w-8 h-8 rounded-full bg-white/15 border border-white/25 hover:bg-white/30 text-white flex items-center justify-center transition-all active:scale-90"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}

        </div>

      </div>

      {/* Section Progress Bar - User Directive: "each esection will have a progress bar" */}
      <div className="space-y-1.5 pt-1 border-t border-white/10">
        <div className="flex items-center justify-between text-[11px] text-white/80 font-bold">
          <span>Section Progress</span>
          <span>{habit.currentValue} / {habit.targetValue} {habit.unit} ({progressPercent}%)</span>
        </div>
        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
          <div 
            className={`h-full ${theme.barColor} transition-all duration-500 rounded-full`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

    </div>
  );
};
