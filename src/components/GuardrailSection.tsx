import React, { useState } from 'react';
import { Phase, ChecklistItem } from '../types';
import { renderPhaseIcon } from '../utils/renderPhaseIcon';
import { getPhaseTheme } from '../utils/phaseThemes';
import { triggerPhaseCompleteConfetti } from '../utils/confetti';
import { useFluidDragReorder } from '../hooks/useFluidDragReorder';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  AlertTriangle, 
  FileCode, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  SlidersHorizontal, 
  Pencil, 
  Sparkles, 
  X, 
  Terminal, 
  ArrowUpDown, 
  Play,
  Shield,
  Scale,
  Layout,
  Database,
  Lightbulb,
  CheckSquare,
  Rocket,
  HelpCircle,
  Target
} from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';
import { renderFormattedPrompt } from '../utils/formatAgentPrompt';
import { renderChecklistItemIcon } from '../utils/renderChecklistItemIcon';
import { fluidScrollTo } from '../utils/fluidScroll';

interface GuardrailSectionProps {
  phase: Phase;
  phaseIndex?: number;
  totalPhases?: number;
  items: ChecklistItem[];
  completedItemIds: string[];
  onToggleComplete: (id: string) => void;
  defaultExpanded?: boolean;
  isExpanded?: boolean;
  onToggleExpandSection?: (phaseId: string) => void;
  onAddItem?: (phaseId: string, title: string, description: string) => void;
  onReorderItems?: (phaseId: string, items: ChecklistItem[]) => void;
  onDeleteItem?: (phaseId: string, itemId: string) => void;
  onMovePhase?: (fromIndex: number, toIndex: number) => void;
  onDeletePhase?: (phaseId: string) => void;
  isGlobalEditMode?: boolean;
  collapseSignal?: number;
  onDragStartPhase?: (phaseIndex: number, e: React.PointerEvent) => void;
  onToggleGlobalEdit?: () => void;
}

export const GuardrailSection: React.FC<GuardrailSectionProps> = ({
  phase,
  phaseIndex,
  totalPhases,
  items,
  completedItemIds,
  onToggleComplete,
  defaultExpanded = false,
  isExpanded: isExpandedProp,
  onToggleExpandSection,
  onAddItem,
  onReorderItems,
  onDeleteItem,
  onMovePhase,
  onDeletePhase,
  isGlobalEditMode = false,
  collapseSignal,
  onDragStartPhase,
  onToggleGlobalEdit,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded ?? false);
  const isControlled = isExpandedProp !== undefined;
  const isExpanded = isControlled ? isExpandedProp : internalExpanded;

  const setIsExpanded = (newVal: boolean | ((prev: boolean) => boolean)) => {
    const nextVal = typeof newVal === 'function' ? newVal(isExpanded) : newVal;
    if (isControlled && onToggleExpandSection) {
      if (nextVal !== isExpanded) {
        onToggleExpandSection(phase.id);
      }
    } else {
      setInternalExpanded(nextVal);
    }
  };

  // Automatically clear expanded sub-items whenever this section is collapsed
  React.useEffect(() => {
    if (!isExpanded) {
      setExpandedItemId(null);
    }
  }, [isExpanded]);

  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const isEditing = isEditMode || isGlobalEditMode;
  const isDeleting = isDeleteMode;
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const isSetupPhase = phase.number === 0 || phase.id === 'phase-setup';

  // Blue pulse highlight around section pill when minimized
  const [isJustMinimized, setIsJustMinimized] = useState(false);
  const pulseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const triggerPillPulse = () => {
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    setIsJustMinimized(true);
    pulseTimeoutRef.current = setTimeout(() => {
      setIsJustMinimized(false);
    }, 1550);
  };

  // Section reference for smooth scroll to top when collapsing
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isCollapsingRef = React.useRef(false);

  const collapseSectionSmoothly = (centerInViewport = false) => {
    if (isCollapsingRef.current) return;

    setIsEditMode(false);
    setIsAddingItem(false);

    const targetEl = sectionRef.current || document.getElementById(phase.number === 0 ? 'phase-setup' : `phase-${phase.number}`);
    if (!targetEl) {
      setIsExpanded(false);
      setExpandedItemId(null);
      triggerPillPulse();
      return;
    }

    const rect = targetEl.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const sectionDocTop = currentScroll + rect.top;
    const viewportHeight = window.innerHeight;

    if (centerInViewport) {
      isCollapsingRef.current = true;
      // Vertically center the collapsed pill (~100px tall) in the viewport
      const collapsedPillHeight = 100;
      const centeredY = Math.max(0, sectionDocTop - (viewportHeight - collapsedPillHeight) / 2);
      const diff = Math.abs(currentScroll - centeredY);

      if (diff < 20) {
        // Already centered in viewport, fold closed directly
        setIsExpanded(false);
        setExpandedItemId(null);
        setTimeout(() => {
          triggerPillPulse();
          isCollapsingRef.current = false;
        }, 320);
        return;
      }

      // Step 1: Smoothly scroll up FIRST while keeping drawer open (zero jumping/glitching)
      // Step 2: Once scroll is back at top/centered, fold the drawer closed
      // Step 3: Once folded, do the gentle ambient glow!
      const scrollDuration = Math.min(520, Math.max(400, Math.round(diff * 0.28 + 260)));

      fluidScrollTo(centeredY, {
        duration: scrollDuration,
        onComplete: () => {
          // Viewport is now smoothly centered on the section header.
          // Now fold closed with scroll stationary:
          setIsExpanded(false);
          setExpandedItemId(null);

          // Once drawer has finished folding up into the pill, trigger the gentle glow!
          setTimeout(() => {
            triggerPillPulse();
            isCollapsingRef.current = false;
          }, 320);
        },
      });
      return;
    }

    // Default header toggle collapse: glide up if scrolled past, then fold closed
    const targetY = Math.max(0, currentScroll + rect.top - 72);
    const isScrolledPast = rect.top < 60;

    if (isScrolledPast) {
      isCollapsingRef.current = true;
      const diff = Math.abs(currentScroll - targetY);
      const scrollDuration = Math.min(520, Math.max(400, Math.round(diff * 0.28 + 260)));

      fluidScrollTo(targetY, {
        duration: scrollDuration,
        onComplete: () => {
          setIsExpanded(false);
          setExpandedItemId(null);
          setTimeout(() => {
            triggerPillPulse();
            isCollapsingRef.current = false;
          }, 320);
        },
      });
    } else {
      setIsExpanded(false);
      setExpandedItemId(null);
      setTimeout(() => {
        triggerPillPulse();
      }, 320);
    }
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      collapseSectionSmoothly(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleCollapseSection = () => {
    collapseSectionSmoothly(true);
  };

  // Fluid drag-and-drop reordering for requirement items
  const {
    handleDragStart: handleDragStartItem,
    getItemStyle: getItemDragStyle,
    bindItemRef: bindItemRef,
  } = useFluidDragReorder({
    items,
    enabled: isEditing,
    onReorder: (newItems) => {
      if (onReorderItems) {
        onReorderItems(phase.id, newItems);
      }
    },
  });

  // Reorder items in current phase
  const handleMoveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return;
    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    if (onReorderItems) {
      onReorderItems(phase.id, newItems);
    }
  };

  // Close when global collapse signal fires
  React.useEffect(() => {
    if (collapseSignal) {
      setIsExpanded(false);
      setExpandedItemId(null);
      setIsAddingItem(false);
      setIsEditMode(false);
      setIsDeleteMode(false);
    }
  }, [collapseSignal]);

  // Minimize into compact reorder cards when isGlobalEditMode is activated
  React.useEffect(() => {
    if (isGlobalEditMode) {
      setIsExpanded(false);
      setExpandedItemId(null);
    }
  }, [isGlobalEditMode]);

  // Listen for collapse-all event (e.g. when clicking progress toggle)
  React.useEffect(() => {
    const handleCollapse = () => {
      setIsExpanded(false);
      setExpandedItemId(null);
      setIsAddingItem(false);
      setIsEditMode(false);
      setIsDeleteMode(false);
    };
    window.addEventListener('collapse-all' as any, handleCollapse);
    return () => window.removeEventListener('collapse-all' as any, handleCollapse);
  }, []);

  // Reset open subsections when switching tabs, keeping the main pill active
  React.useEffect(() => {
    const handleCollapseSubsections = () => {
      setExpandedItemId(null);
      setIsAddingItem(false);
    };
    window.addEventListener('collapse-subsections' as any, handleCollapseSubsections);
    return () => window.removeEventListener('collapse-subsections' as any, handleCollapseSubsections);
  }, []);

  // Listen for external expand events (e.g. when jumping to next incomplete item)
  React.useEffect(() => {
    const handleExpand = (e: CustomEvent<string>) => {
      if (e.detail === phase.id || e.detail === 'all') {
        setIsExpanded(true);
      }
    };
    window.addEventListener('expand-phase' as any, handleExpand);
    return () => window.removeEventListener('expand-phase' as any, handleExpand);
  }, [phase.id]);

  const handleCopyText = (id: string, text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          setCopiedSnippetId(id);
          setTimeout(() => setCopiedSnippetId(null), 2000);
        }).catch(() => {
          fallbackCopy(id, text);
        });
      } else {
        fallbackCopy(id, text);
      }
    } catch {
      fallbackCopy(id, text);
    }
  };

  const handleCopyCode = handleCopyText;

  const fallbackCopy = (id: string, text: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedSnippetId(id);
      setTimeout(() => setCopiedSnippetId(null), 2000);
    } catch (err) {
      console.warn('Fallback copy failed', err);
    }
  };

  const theme = getPhaseTheme(phase.number);
  const totalCount = phase.items.length;
  const completedCount = phase.items.filter(i => completedItemIds.includes(i.id)).length;
  const isAllComplete = totalCount > 0 && completedCount === totalCount;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Track previous completion state to detect when this phase newly transitions to 100% complete
  const wasCompleteRef = React.useRef(isAllComplete);

  // Sync completion state if phase changes
  React.useEffect(() => {
    wasCompleteRef.current = isAllComplete;
  }, [phase.id]);

  // When a section reaches 100% completion: fire celebratory confetti (do not auto-collapse to avoid layout jump)
  React.useEffect(() => {
    if (!wasCompleteRef.current && isAllComplete && totalCount > 0) {
      triggerPhaseCompleteConfetti();
    }
    wasCompleteRef.current = isAllComplete;
  }, [isAllComplete, totalCount]);

  // Only hide if filtering by completed items and this phase has items but none completed
  if (items.length === 0 && phase.items.length > 0 && !isAddingItem) return null;

  return (
    <>
      <div 
        id={phase.number === 0 ? 'phase-setup' : `phase-${phase.number}`}
        ref={sectionRef}
        className={`rounded-3xl border border-slate-200/90 bg-white transition-all duration-200 shadow-xs ${
          isJustMinimized ? 'apple-section-pulse' : ''
        } ${
        isGlobalEditMode 
          ? 'p-3.5 sm:p-4' 
          : 'p-5 pb-3 sm:p-6 sm:pb-3.5 space-y-2.5'
      }`}>
      {isGlobalEditMode ? (
        /* Compact Card in Global Rearrange Mode */
        <div className="w-full flex items-center justify-between select-none">
          <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
            <div className={`w-11 h-11 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs relative`}>
              {renderPhaseIcon(phase.iconName, "w-5.5 h-5.5 text-white stroke-[2.2]")}
            </div>
            <div className="space-y-0.5 select-none flex-1 min-w-0">
              <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                {phase.number === 0 ? 'Set Up' : `Step ${phase.number}`}
              </span>
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug select-none font-google break-words">
                {phase.title}
              </h2>
            </div>
          </div>

          <div 
            className="flex items-center space-x-2 shrink-0 self-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isAllComplete && (
              <div className={`w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center shadow-xs transition-colors mr-0.5`}>
                <Check strokeWidth={3} className="w-4.5 h-4.5 text-white stroke-[3]" />
              </div>
            )}
            {onDeletePhase && !isSetupPhase && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete section "${phase.title}" and all its requirements?`)) {
                    onDeletePhase(phase.id);
                  }
                }}
                className="apple-press w-9 h-9 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center shadow-2xs transition-colors"
                title="Delete Section"
                aria-label="Delete Section"
              >
                <Trash2 className="w-4 h-4 stroke-[2.2]" />
              </button>
            )}
            {onDragStartPhase && typeof phaseIndex === 'number' && !isSetupPhase && (
              <button
                type="button"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  if (isExpanded) {
                    setIsExpanded(false);
                  }
                  onDragStartPhase(phaseIndex, e);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="apple-press w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xs touch-none select-none"
                title="Hold and drag to rearrange section"
                aria-label="Hold and drag to rearrange section"
              >
                <ArrowUpDown className="w-4 h-4 text-slate-500 stroke-[2.2]" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* 1. Full Phase Header Block: Title -> Subtext -> Section Completion -> Drop-down arrow below */}
          <div 
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onClick={handleToggleExpand}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleExpand();
              }
            }}
            className="space-y-2.5 select-none cursor-pointer focus:outline-none"
          >
            <div className="w-full flex items-center justify-between select-none">
              <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                {/* Squircle Icon: White icon, phase color background behind it on the LEFT */}
                <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs relative text-white`}>
                  {renderPhaseIcon(phase.iconName, "w-6 h-6 text-white stroke-[2.2]")}
                </div>

                {/* Title & Phase Badge */}
                <div className="space-y-1 select-none flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap select-none mt-0.5">
                    <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                      {phase.number === 0 ? 'Set Up' : `Step ${phase.number}`}
                    </span>
                    <span className="text-xs text-slate-400 select-none">•</span>
                    <span className="text-xs font-bold text-slate-700 select-none">
                      {completedCount} of {totalCount} Verified
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug select-none font-google break-words">
                    {phase.title}
                  </h2>
                </div>
              </div>

              {/* Right Controls: Only show when Edit mode is active, or 100% completion circle on top right */}
              {isEditing && !isSetupPhase ? (
                <div 
                  className="flex flex-col items-center space-y-1.5 shrink-0 self-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {onDragStartPhase && typeof phaseIndex === 'number' && (
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        if (isExpanded) {
                          setIsExpanded(false);
                        }
                        onDragStartPhase(phaseIndex, e);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                      }}
                      className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xs touch-none select-none transition-colors"
                      title="Hold and drag to rearrange phase, or click to minimize drop-down"
                      aria-label="Move & rearrange phase"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
                    </button>
                  )}
                  {onDeletePhase && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete section "${phase.title}" and all its requirements?`)) {
                          onDeletePhase(phase.id);
                        }
                      }}
                      className="apple-press w-8 h-8 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center shadow-2xs transition-colors"
                      title="Delete Section"
                      aria-label="Delete Section"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>
                  )}
                </div>
              ) : isAllComplete ? (
                <div className="shrink-0 self-center pl-2 -mr-1">
                  <div className={`w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center shadow-xs transition-colors`}>
                    <Check strokeWidth={3} className="w-4.5 h-4.5 text-white stroke-[3]" />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Subtext: ALWAYS visible underneath the title! */}
            <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none pt-0.5">
              {phase.description}
            </p>

            {/* Section Progress Bar: Only for steps 1-12, matching Academy on Setup pill */}
            {!isSetupPhase && (
              <div className="space-y-1 pt-1 select-none">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 select-none">
                  <span>Section Completion</span>
                  <span>{percent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-black/5 select-none">
                  <div 
                    className={`h-full ${theme.progressBg} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Drop-Down Arrow: NO circle when pointing DOWN (closed), translucent gray circle when pointing UP (open/expanded) */}
            <div className="flex justify-center pt-0.5 pb-0 select-none">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleExpand();
                }}
                className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 shrink-0 text-slate-400 hover:text-slate-700"
                aria-label={isExpanded ? "Collapse requirements" : "Expand requirements"}
                title={isExpanded ? "Collapse requirements" : "Expand requirements"}
              >
                <ChevronDown 
                  strokeWidth={2.5}
                  className={`w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isExpanded ? 'rotate-180 text-slate-800' : 'text-slate-400'
                  }`} 
                />
              </button>
            </div>
          </div>
        </>
      )}
    </div>

    {/* 2. Interactive Checklist Items in standalone pills matching Academy style */}
    {!isGlobalEditMode && (
      <div className={`apple-drawer-collapse ${isExpanded ? 'expanded' : ''}`}>
            <div className="apple-drawer-content">
              <div className="space-y-3 pt-3">
            {items.length === 0 && (
              <div className="py-6 px-4 text-center rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 select-none">
                <p className="text-xs font-bold text-slate-700 font-google">No requirements added yet</p>
                <p className="text-[11.5px] text-slate-500">Tap "Add Requirement" below to start populating this section.</p>
              </div>
            )}
            {items.map((item, idx) => {
              const isDone = completedItemIds.includes(item.id);
              const isDetailOpen = expandedItemId === item.id;

              return (
                <div
                  id={item.id}
                  key={item.id}
                  ref={bindItemRef(idx)}
                  style={getItemDragStyle(idx)}
                  className={`rounded-3xl border transition-all duration-200 shadow-xs p-5 pb-3 sm:p-6 sm:pb-3.5 space-y-2 ${
                    isDetailOpen 
                      ? 'bg-white border-slate-300' 
                      : isDone
                        ? 'bg-white/95 border-slate-200/90 hover:border-slate-300'
                        : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  {/* Item Header Block: clicking text minimizes/toggles item */}
                  <div 
                    onClick={() => {
                      if (!isEditing && !isDeleting) {
                        setExpandedItemId(isDetailOpen ? null : item.id);
                      }
                    }}
                    className="space-y-2 select-none cursor-pointer"
                  >
                    <div className="w-full flex items-center justify-between select-none">
                      <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                        
                        {/* Squircle containing item icon matching Academy size */}
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs relative">
                          {renderChecklistItemIcon(item)}
                        </div>

                        {/* Title matching Academy typography */}
                        <div className="select-none flex-1 min-w-0">
                          <h3 className={`text-base sm:text-lg font-black tracking-tight leading-snug select-none font-google break-words ${
                            isDone ? 'text-slate-500' : 'text-slate-900'
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Action Controls: Edit handles or Checkmark Toggle vertically centered on the right side */}
                      {isEditing ? (
                        <div className="flex items-center justify-end space-x-1.5 shrink-0 -mr-1 h-12" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              handleDragStartItem(idx, e);
                            }}
                            className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xs touch-none select-none"
                            title="Drag to rearrange"
                            aria-label="Drag to rearrange"
                          >
                            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
                          </button>
                          {onDeleteItem && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Delete requirement "${item.title}"?`)) {
                                  onDeleteItem(phase.id, item.id);
                                }
                              }}
                              className="apple-press w-8 h-8 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center shadow-2xs transition-colors"
                              title="Delete requirement"
                              aria-label="Delete requirement"
                            >
                              <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            try {
                              if (navigator?.vibrate) navigator.vibrate(10);
                            } catch {}
                            onToggleComplete(item.id);
                          }}
                          className="w-10 sm:w-12 h-12 rounded-full flex items-center justify-center shrink-0 -mr-1 active:opacity-75 transition-opacity self-center"
                          aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {isDone ? (
                            <div className={`w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center shadow-xs transition-colors`}>
                              <Check strokeWidth={3} className="w-4.5 h-4.5 text-white stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full border-2 border-slate-300 hover:border-slate-400 transition-colors bg-white" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Short Description matching Academy subtext */}
                    <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none pt-0.5">
                      {item.shortDescription}
                    </p>

                    {/* Centered Drop-Down Arrow */}
                    <div className="flex justify-center pt-0.5 pb-0 select-none">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isEditing) {
                            setExpandedItemId(isDetailOpen ? null : item.id);
                          }
                        }}
                        className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 shrink-0"
                        title={isDetailOpen ? 'Close guidance' : 'Expand guidance'}
                        aria-label={isDetailOpen ? 'Close guidance' : 'Expand guidance'}
                      >
                        <ChevronDown 
                          strokeWidth={2.5}
                          className={`w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                            isDetailOpen ? 'rotate-180 text-slate-800' : 'text-slate-400'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Guidance Drawer: Distinct Pill Cards matching Academy */}
                  <div className={`apple-drawer-collapse ${!isEditing && isDetailOpen ? 'expanded' : ''}`}>
                    <div className="apple-drawer-content">
                      <div 
                        onClick={() => setExpandedItemId(null)}
                        className="space-y-3 pt-3 border-t border-slate-100/90 text-slate-800 select-none cursor-pointer"
                        title="Click anywhere to minimize"
                      >
                        {/* Subsection 1: Architecture & Review Impact Pill */}
                        {item.whyItMatters && (
                          <div 
                            className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-2.5 shadow-2xs cursor-pointer transition-colors"
                          >
                            <div className="select-none">
                              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                Architecture &amp; Review Impact
                              </span>
                            </div>
                            <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                              {item.whyItMatters}
                            </p>
                          </div>
                        )}

                        {/* Subsection 2: Simple Step-by-Step Guide Pill */}
                        {item.implementationSteps && item.implementationSteps.length > 0 && (
                          <div 
                            className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-2 shadow-2xs cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between select-none">
                              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                Simple Step-by-Step Guide
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const allStepsText = item.implementationSteps
                                    .map((step, idx) => `Step ${idx + 1}: ${step}`)
                                    .join('\n');
                                  handleCopyText(`steps-all-${item.id}`, allStepsText);
                                }}
                                className="apple-press px-2.5 py-1 rounded-full text-[11px] font-bold bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center space-x-1 shrink-0 shadow-2xs transition-colors cursor-pointer"
                                title="Copy steps to clipboard"
                              >
                                {copiedSnippetId === `steps-all-${item.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                                    <span className="text-emerald-700 font-bold">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-slate-500" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="space-y-2 pt-0.5">
                              {item.implementationSteps.map((step, idx) => (
                                <div key={idx} className="flex items-start space-x-2.5 text-slate-700">
                                  <span className="font-bold text-slate-900 text-xs shrink-0 mt-0.5 select-none">
                                    {idx + 1}.
                                  </span>
                                  <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm flex-1 min-w-0">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Subsection 3: What This Achieves Pill */}
                        {item.whatHappensNext && (
                          <div 
                            className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-1.5 shadow-2xs cursor-pointer transition-colors"
                          >
                            <div className="select-none">
                              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                What This Achieves
                              </span>
                            </div>
                            <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                              {item.whatHappensNext}
                            </p>
                          </div>
                        )}

                        {/* Subsection 4: AI Agent Prompt (Copy & Paste) Pill */}
                        {item.agentPrompt && (
                          <div 
                            className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-2.5 shadow-2xs cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between select-none">
                              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                AI Agent Prompt (Copy &amp; Paste)
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyText(`prompt-${item.id}`, item.agentPrompt || '');
                                }}
                                className="apple-press px-2.5 py-1 rounded-full text-[11px] font-bold bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center space-x-1 shrink-0 shadow-2xs transition-colors cursor-pointer"
                                title="Copy prompt for AI coding agent"
                              >
                                {copiedSnippetId === `prompt-${item.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                                    <span className="text-emerald-700 font-bold">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-slate-500" />
                                    <span>Copy Prompt</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="pt-0.5 select-text font-google">
                              {renderFormattedPrompt(item.agentPrompt)}
                            </div>
                          </div>
                        )}

                        {/* Subsection 5: Common Store Traps to Avoid Pill */}
                        {item.commonRejectionTraps && item.commonRejectionTraps.length > 0 && (
                          <div 
                            className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-2 shadow-2xs cursor-pointer transition-colors"
                          >
                            <div className="select-none">
                              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                Common Store Traps to Avoid
                              </span>
                            </div>
                            <div className="space-y-2 pt-0.5">
                              {item.commonRejectionTraps.map((trap, idx) => (
                                <p key={idx} className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                  {trap}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Subsection 6: How to Verify on Your Phone Pill */}
                        {item.verificationQuestions && item.verificationQuestions.length > 0 && (
                          <div 
                            className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-2 shadow-2xs cursor-pointer transition-colors"
                          >
                            <div className="select-none">
                              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                How to Verify on Your Phone
                              </span>
                            </div>
                            <div className="space-y-2 pt-0.5">
                              {item.verificationQuestions.map((q, idx) => (
                                <p key={idx} className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                  {q}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Resource Buttons at the bottom of the drawer */}
                        {(item.directLink || item.videoUrl || item.storeGuideline) && (
                          <div className="space-y-2 pt-2 border-t border-slate-100/80">
                            {/* Blue Button for Direct Link (e.g. Google Antigravity & AI Developer Tools) */}
                            {item.directLink && (
                              <a
                                href={item.directLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  try { window.open(item.directLink!.url, '_blank'); } catch {}
                                }}
                                className="apple-press w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-[13px] flex items-center justify-center space-x-2 shadow-xs transition-colors"
                              >
                                <span>{item.directLink.label}</span>
                                <ExternalLink className="w-3.5 h-3.5 stroke-[2.2] text-white/90" />
                              </a>
                            )}

                            {/* Direct YouTube Video Guide Link */}
                            {item.videoUrl && (
                              <a
                                href={item.videoUrl.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  try { window.open(item.videoUrl!.url, '_blank'); } catch {}
                                }}
                                className="apple-press w-full py-3 px-4 rounded-2xl bg-[#FF0000] hover:bg-[#E60000] active:bg-[#CC0000] text-white font-bold text-xs sm:text-[13px] flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer"
                                title={`Watch ${item.videoUrl.title} on YouTube`}
                              >
                                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span className="truncate">Watch on YouTube · {item.videoUrl.title}</span>
                                <ExternalLink className="w-3.5 h-3.5 stroke-[2.2] text-white/90 shrink-0 ml-1" />
                              </a>
                            )}

                            {/* Dark Button for Official Store Guideline */}
                            {item.storeGuideline && (
                              <a
                                href={item.storeGuideline.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  try { window.open(item.storeGuideline!.url, '_blank'); } catch {}
                                }}
                                className="apple-press w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-[13px] flex items-center justify-center space-x-2 shadow-xs transition-colors"
                              >
                                <span className="truncate">Official Store Guideline: {item.storeGuideline.name}</span>
                                <ExternalLink className="w-3.5 h-3.5 stroke-[2.2] text-white/90 shrink-0" />
                              </a>
                            )}
                          </div>
                        )}

                        {/* Bottom Close Button */}
                        <div className="pt-2 border-t border-slate-100/80 flex justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedItemId(null);
                            }}
                            className="apple-press w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                            title="Close guidance"
                            aria-label="Close guidance"
                          >
                            <ChevronUp 
                              strokeWidth={2.5}
                              className="w-4 h-4 stroke-[2.5] text-slate-500 hover:text-slate-700" 
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* Unified Action Capsule: [ Add | Edit | Close ] */}
            <div 
              className="py-3 px-4 flex items-center justify-center select-none"
            >
              <div className="inline-flex items-center p-1 rounded-full bg-white border border-slate-200/90 shadow-2xs space-x-1">
                {onAddItem && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddingItem(prev => !prev);
                    }}
                    className={`apple-press px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                      isAddingItem
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 active:bg-slate-200/60'
                    }`}
                    title={isAddingItem ? 'Done adding' : 'Add requirement'}
                  >
                    {isAddingItem ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                    <span>{isAddingItem ? 'Done' : 'Add'}</span>
                  </button>
                )}

                <div className="w-[1px] h-3.5 bg-slate-200 shrink-0" aria-hidden="true" />

                {/* Single "Edit" Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditMode(prev => !prev);
                  }}
                  className={`apple-press px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                    isEditing
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 active:bg-slate-200/60'
                  }`}
                  title={isEditing ? 'Done Editing' : 'Edit: Rearrange or delete requirements'}
                >
                  {isEditing ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Pencil className="w-3.5 h-3.5 stroke-[2.2]" />
                  )}
                  <span>{isEditing ? 'Done' : 'Edit'}</span>
                </button>

                <div className="w-[1px] h-3.5 bg-slate-200 shrink-0" aria-hidden="true" />

                {/* Close Section Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCollapseSection();
                  }}
                  className="apple-press px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 active:bg-slate-200/60 cursor-pointer"
                  title="Close section"
                >
                  <ChevronUp strokeWidth={2.5} className="w-3.5 h-3.5 text-slate-500" />
                  <span>Close</span>
                </button>
              </div>
            </div>

          {/* Inline Add Item Form */}
          {isAddingItem && (
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => {
                e.preventDefault();
                if (!newItemTitle.trim()) return;
                if (onAddItem) {
                  onAddItem(phase.id, newItemTitle.trim(), newItemDesc.trim());
                }
                setNewItemTitle('');
                setNewItemDesc('');
                setIsAddingItem(false);
              }}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200 mt-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 font-google">Add Requirement to {isSetupPhase ? 'Set Up' : `Step ${phase.number}`}</span>
                <button
                  type="button"
                  onClick={() => {
                    setNewItemTitle('');
                    setNewItemDesc('');
                    setIsAddingItem(false);
                  }}
                  className="apple-press p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                required
                autoFocus
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="e.g. Implement Biometric Authentication"
                className="w-full px-3.5 py-2.5 rounded-xl text-[16px] sm:text-sm font-google bg-white border border-slate-200 text-slate-900 outline-none focus:ring-1 focus:ring-slate-800 shadow-xs"
              />
              <textarea
                rows={2}
                value={newItemDesc}
                onChange={(e) => setNewItemDesc(e.target.value)}
                placeholder="Brief explanation / architectural impact..."
                className="w-full px-3.5 py-2 rounded-xl text-[16px] sm:text-sm bg-white border border-slate-200 text-slate-900 outline-none focus:ring-1 focus:ring-slate-800 resize-none shadow-xs"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewItemTitle('');
                    setNewItemDesc('');
                    setIsAddingItem(false);
                  }}
                  className="apple-press px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newItemTitle.trim()}
                  className="apple-press px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white disabled:opacity-50 shadow-xs"
                >
                  Add Requirement
                </button>
              </div>
            </form>
          )}
            </div>
          </div>
        </div>
      )}

    </>
  );
};
