import React, { useState, useRef } from 'react';
import { Phase } from '../types';
import { renderPhaseIcon } from '../utils/renderPhaseIcon';
import { getPhaseTheme } from '../utils/phaseThemes';
import { useFluidDragReorder } from '../hooks/useFluidDragReorder';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  SlidersHorizontal, 
  Trash2, 
  X,
  CheckCircle2,
  Check,
  ArrowUpDown
} from 'lucide-react';

interface AllPhasesPageProps {
  isOpen: boolean;
  onClose: () => void;
  phases: Phase[];
  completedItemIds: string[];
  onSelectPhase: (phaseId: string) => void;
  onReorderPhases: (phases: Phase[]) => void;
  onAddPhase: (title: string, shortTitle: string, description: string) => void;
  onDeletePhase?: (phaseId: string) => void;
}

export const AllPhasesPage: React.FC<AllPhasesPageProps> = ({
  isOpen,
  onClose,
  phases,
  completedItemIds,
  onSelectPhase,
  onReorderPhases,
  onAddPhase,
  onDeletePhase
}) => {
  const [isRearranging, setIsRearranging] = useState(false);
  const [isAddingPhase, setIsAddingPhase] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newShortTitle, setNewShortTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const {
    handleDragStart,
    getItemStyle,
    bindItemRef,
  } = useFluidDragReorder({
    items: phases,
    enabled: isRearranging,
    onReorder: onReorderPhases,
    scrollContainer: scrollContainerRef,
  });

  if (!isOpen) return null;

  const totalAll = phases.reduce((acc, p) => acc + p.items.length, 0);
  const completedAll = phases.reduce((acc, p) => acc + p.items.filter(i => completedItemIds.includes(i.id)).length, 0);
  const percentAll = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0;

  const handleMovePhase = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= phases.length) return;
    const reordered = [...phases];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    onReorderPhases(reordered);
  };

  const handleCreatePhase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddPhase(
      newTitle.trim(),
      newShortTitle.trim() || newTitle.trim(),
      newDesc.trim() || 'Custom requirements section'
    );
    setNewTitle('');
    setNewShortTitle('');
    setNewDesc('');
    setIsAddingPhase(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F6] text-[#1E2022] flex flex-col font-sans overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Navigation Bar (with iOS Safe Area - Gray/Warm background matching page) */}
      <header className="ios-safe-top bg-[#FAF8F6]/95 backdrop-blur-xl border-b border-slate-200/90 px-4 pb-2.5 pt-1 shrink-0">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          
          {/* Back Button (Grown by 10%, Scroll all the way to top) */}
          <button
            type="button"
            onClick={() => {
              onClose();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="apple-press flex items-center space-x-1 px-3.5 py-2 rounded-full bg-[#FAF8F6] border border-slate-300/80 text-slate-800 text-xs font-bold shadow-xs hover:bg-slate-200/60 shrink-0"
            aria-label="Back to main view"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back</span>
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0 text-center px-2">
            <h1 className="text-base font-semibold text-slate-900 tracking-normal font-google truncate">
              All Steps
            </h1>
            <p className="text-[11px] font-semibold text-slate-500 truncate max-w-[210px] sm:max-w-xs mx-auto">
              {phases.length} Steps • {completedAll}/{totalAll} Verified ({percentAll}%)
            </p>
          </div>

          {/* Actions: Rearrange & Add (Grown by 10%) */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsRearranging(prev => !prev);
                setIsAddingPhase(false);
              }}
              className={`apple-press px-3.5 py-2 rounded-full text-xs font-bold border transition-colors flex items-center space-x-1 ${
                isRearranging
                  ? 'bg-slate-200 text-slate-900 border-slate-300 shadow-xs'
                  : 'bg-[#FAF8F6] text-slate-700 border-slate-300/80 hover:bg-slate-200/60 shadow-xs'
              }`}
              title="Rearrange Steps"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
              <span className="hidden sm:inline">{isRearranging ? 'Done' : 'Rearrange'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAddingPhase(prev => !prev);
                setIsRearranging(false);
              }}
              className={`apple-press px-3.5 py-2 rounded-full text-xs font-bold border transition-colors flex items-center space-x-1 ${
                isAddingPhase
                  ? 'bg-slate-200 text-slate-900 border-slate-300 shadow-xs'
                  : 'bg-[#FAF8F6] text-slate-800 border border-slate-300/80 hover:bg-slate-200/60 shadow-xs'
              }`}
              title="Add New Step"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Step</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main ref={scrollContainerRef as any} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-28">
        <div className="max-w-xl mx-auto space-y-3">

          {/* Inline Add Step Form */}
          {isAddingPhase && (
            <form onSubmit={handleCreatePhase} className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 font-google">Add New Step Section</span>
                <button
                  type="button"
                  onClick={() => {
                    setNewTitle('');
                    setNewShortTitle('');
                    setNewDesc('');
                    setIsAddingPhase(false);
                  }}
                  className="apple-press p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Step Title</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Monetization & Subscriptions"
                  className="w-full px-3.5 py-2.5 rounded-xl text-[16px] sm:text-sm font-google bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:ring-1 focus:ring-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Short Name</label>
                <input
                  type="text"
                  value={newShortTitle}
                  onChange={(e) => setNewShortTitle(e.target.value)}
                  placeholder="e.g. Paywall"
                  className="w-full px-3.5 py-2.5 rounded-xl text-[16px] sm:text-sm bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:ring-1 focus:ring-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Brief overview of requirements in this step..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-[16px] sm:text-sm bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:ring-1 focus:ring-slate-800 resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setNewTitle('');
                    setNewShortTitle('');
                    setNewDesc('');
                    setIsAddingPhase(false);
                  }}
                  className="apple-press px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="apple-press px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white disabled:opacity-50 shadow-xs"
                >
                  Create Step
                </button>
              </div>
            </form>
          )}

          {/* List of All Phases */}
          {phases.map((phase, idx) => {
            const phaseTotal = phase.items.length;
            const phaseDone = phase.items.filter(i => completedItemIds.includes(i.id)).length;
            const phasePercent = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;
            const isAllDone = phaseTotal > 0 && phaseDone === phaseTotal;
            const isCustom = phase.id.startsWith('custom-');
            const isSetup = phase.id === 'phase-setup' || phase.number === 0;
            const theme = getPhaseTheme(phase.number);

            const handleSelect = () => {
              if (isRearranging) return;
              onSelectPhase(phase.id);
              onClose();
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 40);
            };

            return (
              <div
                key={phase.id}
                ref={bindItemRef(idx)}
                style={getItemStyle(idx)}
                onClick={handleSelect}
                onPointerDown={(e) => {
                  if (isRearranging) {
                    handleDragStart(idx, e);
                  }
                }}
                className={`p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs transition-colors duration-150 space-y-3 ${
                  !isRearranging 
                    ? 'cursor-pointer select-none hover:border-slate-300' 
                    : 'cursor-grab active:cursor-grabbing touch-none select-none'
                }`}
              >
                <div className="flex items-start justify-between">
                  
                  {/* Left: Squircle & Info */}
                  <div className="flex items-start space-x-3 flex-1 min-w-0 pr-2">
                    <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs relative`}>
                      {renderPhaseIcon(phase.iconName, "w-6 h-6 text-white stroke-[2.2]")}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                        <span className={`h-[20px] px-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${theme.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1.5px] leading-none`}>
                          {phase.number === 0 ? 'Set Up' : `Step ${phase.number}`}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-bold text-slate-700">
                          {phaseDone} of {phaseTotal} Verified ({phasePercent}%)
                        </span>
                      </div>

                      <h3 className="text-[15.5px] sm:text-[17.5px] font-bold text-slate-900 leading-snug line-clamp-2 font-google tracking-tight">
                        {phase.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Controls (Drag handle on top, trashcan underneath in Rearrange mode, or Chevron in normal mode) */}
                  {isRearranging ? (
                    <div 
                      className="flex flex-col items-center space-y-1.5 shrink-0 self-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!isSetup && (
                        <button
                          type="button"
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            handleDragStart(idx, e);
                          }}
                          className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xs touch-none select-none"
                          title="Drag to rearrange step"
                          aria-label="Drag to rearrange step"
                        >
                          <ArrowUpDown className="w-4 h-4 text-slate-500 stroke-[2.2]" />
                        </button>
                      )}
                      {isCustom && onDeletePhase && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePhase(phase.id);
                          }}
                          className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-300 text-slate-400 hover:text-rose-600 flex items-center justify-center shadow-2xs transition-colors"
                          title="Delete Step"
                          aria-label="Delete Step"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 shrink-0 self-center">
                      {isAllDone && (
                        <div className={`w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center shadow-xs transition-colors`}>
                          <Check strokeWidth={3} className="w-4.5 h-4.5 text-white stroke-[3]" />
                        </div>
                      )}
                      <div 
                        className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
                        title="Open step"
                      >
                        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  )}

                </div>

                {/* Progress Bar (Matching phase theme) */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${theme.progressBg} rounded-full transition-all duration-300`}
                    style={{ width: `${phasePercent}%` }}
                  />
                </div>

              </div>
            );
          })}

        </div>
      </main>

      {/* Bottom Fade Vignette Effect */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-10 bg-gradient-to-t from-[#FAF8F6] via-[#FAF8F6]/90 to-transparent" 
        aria-hidden="true" 
      />

    </div>
  );
};
