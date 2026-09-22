import React from 'react';
import { HabitTask } from '../../types';
import { PASTEL_THEMES } from '../../data/habits';
import { 
  X, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  Plus, 
  Trash2,
  HelpCircle,
  Sparkles,
  Check
} from 'lucide-react';

interface TaskDetailModalProps {
  task: HabitTask | null;
  isOpen: boolean;
  onClose: () => void;
  onIncrement: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onDelete?: (id: string) => void;
  onOpenBlueprintPhase?: (phaseId: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onIncrement,
  onToggleComplete,
  onDelete,
  onOpenBlueprintPhase,
}) => {
  if (!isOpen || !task) return null;

  const theme = PASTEL_THEMES[task.colorTheme] || PASTEL_THEMES.cyan;
  const isComplete = task.isCompleted || task.currentValue >= task.targetValue;
  const progressPercent = Math.min(100, Math.round((task.currentValue / (task.targetValue || 1)) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-lg bg-[#121216] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/15 z-10 max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-200 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner with Task Dark Theme */}
        <div 
          className="p-6 border-b border-white/10 relative flex items-start justify-between"
          style={{ backgroundColor: theme.bg }}
        >
          <div className="pr-8 space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/15 border border-white/20 text-white">
                {task.category}
              </span>
              {task.streakLabel && (
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-white/90">
                  <Flame className="w-3.5 h-3.5 stroke-white text-white" />
                  <span>{task.streakLabel}</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {task.title}
            </h2>
            {task.subtitle && (
              <p className="text-xs text-white/80 font-medium">
                {task.subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="apple-press p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15"
          >
            <X className="w-5 h-5 stroke-white" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-white/90">
          
          {/* Why It Matters */}
          {task.whyItMatters && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center space-x-2 font-bold text-white">
                <ShieldCheck className="w-4 h-4 stroke-white text-white" />
                <span>Store Compliance Impact</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                {task.whyItMatters}
              </p>
            </div>
          )}

          {/* Section Progress Bar */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span>Section Progress</span>
              <span>{task.currentValue} / {task.targetValue} {task.unit} ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Implementation Steps */}
          {task.implementationSteps && task.implementationSteps.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 stroke-white text-white" />
                <span>Actionable Implementation Steps</span>
              </h4>
              <div className="space-y-2">
                {task.implementationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="w-5 h-5 rounded-full bg-white/15 border border-white/20 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 text-white">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-white/90 leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Rejection Traps */}
          {task.commonRejectionTraps && task.commonRejectionTraps.length > 0 && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-white">
                <AlertTriangle className="w-4 h-4 stroke-white text-white" />
                <span>Store Rejection Warning</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-white/80">
                {task.commonRejectionTraps.map((trap, idx) => (
                  <li key={idx}>{trap}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Store Guideline Reference */}
          {task.storeGuidelineRef && (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 stroke-white text-white" />
                <span className="text-xs font-semibold text-white">
                  {task.storeGuidelineRef}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Delete this task?')) {
                    onDelete(task.id);
                    onClose();
                  }
                }}
                className="apple-press p-2.5 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4 stroke-white" />
              </button>
            )}

            {task.phaseId && onOpenBlueprintPhase && (
              <button
                type="button"
                onClick={() => {
                  onOpenBlueprintPhase(task.phaseId!);
                  onClose();
                }}
                className="apple-press px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold flex items-center space-x-1.5"
              >
                <span>Full Checklist</span>
                <ExternalLink className="w-3 h-3 stroke-white" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onIncrement(task.id)}
              className="apple-press px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-white" />
              <span>+1 Progress</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onToggleComplete(task.id);
              }}
              className={`apple-press px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 transition-all ${
                isComplete
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'bg-white text-black shadow-md'
              }`}
            >
              {isComplete ? (
                <span>Mark Incomplete</span>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
