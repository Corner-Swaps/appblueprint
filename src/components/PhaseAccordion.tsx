import React, { useState } from 'react';
import { Phase, ChecklistItem, ItemStatus } from '../types';
import { ChecklistCard } from './ChecklistCard';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles,
  Lightbulb,
  Palette,
  Cpu,
  ShieldCheck,
  Scale,
  FlaskConical,
  Image,
  Wrench,
  Send,
  Activity,
  Layers
} from 'lucide-react';

interface PhaseAccordionProps {
  phase: Phase;
  filteredItems: ChecklistItem[];
  completedItemIds: string[];
  itemNotes: Record<string, string>;
  itemStatus: Record<string, ItemStatus>;
  onToggleComplete: (id: string) => void;
  onOpenDetail: (item: ChecklistItem) => void;
  onBatchTogglePhase: (itemIds: string[], targetState: boolean) => void;
  defaultExpanded?: boolean;
}

// First-page matching rich dark OLED card tints
const PHASE_THEME_BACKGROUNDS = [
  '#0E243A', // Cyan / Deep Ocean
  '#33161C', // Coral / Deep Crimson
  '#1F1938', // Periwinkle / Deep Violet
  '#2A1625', // Blush / Deep Magenta
  '#0E2C22', // Mint / Deep Emerald
  '#2B1D12', // Peach / Deep Amber
  '#112338', // Sky / Deep Azure
  '#241834', // Lavender / Deep Purple
  '#0D282E', // Teal / Deep Sea
  '#1C1E24', // Titanium Slate
];

export const PhaseAccordion: React.FC<PhaseAccordionProps> = ({
  phase,
  filteredItems,
  completedItemIds,
  itemNotes,
  itemStatus,
  onToggleComplete,
  onOpenDetail,
  onBatchTogglePhase,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded ?? false);

  // Pick theme background matching first page
  const bgColor = PHASE_THEME_BACKGROUNDS[(phase.number - 1) % PHASE_THEME_BACKGROUNDS.length];

  // Pure white vector icon mapping
  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 stroke-white text-white" };
    switch (name) {
      case 'Lightbulb': return <Lightbulb {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'FlaskConical': return <FlaskConical {...props} />;
      case 'Image': return <Image {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'Send': return <Send {...props} />;
      case 'Activity': return <Activity {...props} />;
      default: return <Layers {...props} />;
    }
  };

  const totalPhaseItems = phase.items.length;
  const completedInPhase = phase.items.filter(i => completedItemIds.includes(i.id)).length;
  const isPhaseFullyComplete = totalPhaseItems > 0 && completedInPhase === totalPhaseItems;
  const phasePercent = totalPhaseItems > 0 ? Math.round((completedInPhase / totalPhaseItems) * 100) : 0;

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div 
      className="rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 shadow-2xl"
      style={{ backgroundColor: bgColor }}
    >
      
      {/* Header Bar - First Page Card Structure */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 cursor-pointer space-y-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3.5">
            {/* White Vector Icon */}
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white shadow-sm">
              {isPhaseFullyComplete ? (
                <CheckCircle2 className="w-6 h-6 stroke-white fill-white/20 text-white" />
              ) : (
                renderIcon(phase.iconName)
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/20 inline-flex items-center justify-center">
                  Phase {phase.number}
                </span>
                <span className="text-xs text-white/60">•</span>
                <span className="text-xs font-semibold text-white/90">
                  {completedInPhase}/{totalPhaseItems} Completed
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                {phase.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {phase.description}
              </p>
            </div>
          </div>

          {/* Expand / Collapse Chevron */}
          <button 
            type="button"
            className="apple-press p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 shrink-0"
            aria-label={isExpanded ? "Collapse phase" : "Expand phase"}
          >
            {isExpanded ? <ChevronUp strokeWidth={2.5} className="w-4 h-4 stroke-white stroke-[2.5]" /> : <ChevronDown strokeWidth={2.5} className="w-4 h-4 stroke-white stroke-[2.5]" />}
          </button>
        </div>

        {/* Section Progress Bar - User Directive: "give me progress bars for each section" */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs text-white/80 font-semibold">
            <span>Section Progress</span>
            <span>{phasePercent}%</span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${phasePercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* Expanded Items */}
      {isExpanded && (
        <div className="px-4 pb-5 sm:px-6 sm:pb-6 border-t border-white/10 pt-4 space-y-3 bg-black/40">
          
          {/* Quick phase batch tools */}
          <div className="flex justify-between items-center text-xs text-white/70 pb-1">
            <span>Showing {filteredItems.length} requirements</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBatchTogglePhase(phase.items.map(i => i.id), true);
                }}
                className="apple-press px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold transition-colors"
              >
                Mark All Done
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBatchTogglePhase(phase.items.map(i => i.id), false);
                }}
                className="apple-press px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-semibold transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Cards styled identically to First Page */}
          <div className="space-y-2.5">
            {filteredItems.map(item => (
              <ChecklistCard
                key={item.id}
                item={item}
                isCompleted={completedItemIds.includes(item.id)}
                status={itemStatus[item.id] || 'not_started'}
                note={itemNotes[item.id]}
                onToggleComplete={onToggleComplete}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
