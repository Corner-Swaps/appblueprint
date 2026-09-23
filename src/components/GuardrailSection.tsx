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
  Play
} from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';
import { GripFour } from './GripFour';

interface GuardrailSectionProps {
  phase: Phase;
  phaseIndex?: number;
  totalPhases?: number;
  items: ChecklistItem[];
  completedItemIds: string[];
  onToggleComplete: (id: string) => void;
  defaultExpanded?: boolean;
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
  const [isExpanded, setIsExpanded] = useState(defaultExpanded ?? false);
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
    <div className={`rounded-3xl border border-slate-200/90 bg-white transition-all duration-200 shadow-xs ${
      isGlobalEditMode 
        ? 'p-3.5 sm:p-4' 
        : isExpanded 
          ? 'p-5 sm:p-6 space-y-2.5' 
          : 'p-5 pb-1 sm:p-6 sm:pb-1.5 space-y-2'
    }`}>
      {isGlobalEditMode ? (
        /* Compact Card in Global Rearrange Mode */
        <div className="w-full flex items-center justify-between select-none">
          <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
            <div className={`w-11 h-11 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs relative`}>
              {renderPhaseIcon(phase.iconName, "w-5.5 h-5.5 text-white stroke-[2.2]")}
              {isAllComplete && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
              )}
            </div>
            <div className="space-y-0.5 select-none flex-1 min-w-0">
              <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                {phase.number === 0 ? 'Set Up Steps' : `Phase ${phase.number}`}
              </span>
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug select-none font-google truncate">
                {phase.title}
              </h2>
            </div>
          </div>

          <div 
            className="flex items-center space-x-2 shrink-0 self-center"
            onClick={(e) => e.stopPropagation()}
          >
            {onDeletePhase && (
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
            onClick={() => setIsExpanded(prev => !prev)}
            className="space-y-2.5 select-none cursor-pointer"
          >
            <div className="w-full flex items-center justify-between select-none">
              <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                {/* Squircle Icon: White icon, phase color background behind it on the LEFT */}
                <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs relative text-white`}>
                  {renderPhaseIcon(phase.iconName, "w-6 h-6 text-white stroke-[2.2]")}
                  {isAllComplete && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Title & Phase Badge */}
                <div className="space-y-1 select-none flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap select-none mt-0.5">
                    <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                      {phase.number === 0 ? 'Set Up Steps' : `Phase ${phase.number}`}
                    </span>
                    <span className="text-xs text-slate-400 select-none">•</span>
                    <span className="text-xs font-bold text-slate-700 select-none">
                      {completedCount} of {totalCount} Verified
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug select-none font-google">
                    {phase.title}
                  </h2>
                </div>
              </div>

              {/* Right Controls: Only show when Edit mode is active */}
              {isEditing && !isSetupPhase && (
                <div 
                  className="flex items-center space-x-2 shrink-0 self-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {onDeletePhase && (
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
                      className="apple-press w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xs touch-none select-none transition-colors"
                      title="Hold and drag to rearrange phase, or click to minimize drop-down"
                      aria-label="Move & rearrange phase"
                    >
                      <ArrowUpDown className="w-4 h-4 text-slate-500 stroke-[2.2]" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Subtext: ALWAYS visible underneath the title! */}
            <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none pt-0.5">
              {phase.description}
            </p>

            {/* Section Progress Bar: ALWAYS visible underneath the subtext! */}
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

            {/* Drop-Down Arrow: Centered directly BELOW Section Completion with light gray circle when pointing down, no circle when pointing up */}
            <div className="flex justify-center -mt-0.5 pb-0 select-none">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(prev => !prev);
                }}
                className={`apple-press transition-colors ${
                  !isExpanded 
                    ? 'w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200/80 flex items-center justify-center text-slate-500' 
                    : 'p-0 text-slate-400 hover:text-slate-600'
                }`}
                aria-label={isExpanded ? "Collapse requirements" : "Expand requirements"}
                title={isExpanded ? "Collapse requirements" : "Expand requirements"}
              >
                <ChevronDown 
                  strokeWidth={2.5}
                  className={`w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isExpanded ? 'rotate-180 text-slate-600' : 'text-slate-500'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 2. Interactive Checklist Items ("The Little Clicks" that the user loved) */}
          <div className={`apple-drawer-collapse ${isExpanded ? 'expanded' : ''}`}>
            <div className="apple-drawer-content">
              <div className="space-y-2.5 pt-1 border-t border-black/5">
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
                  className={`rounded-2xl transition-colors duration-150 border overflow-hidden ${
                    isDone 
                      ? 'bg-white/95 border-slate-300 shadow-xs' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Main Card Row: Clicking drops down details when in normal mode */}
                  <div 
                    onClick={() => {
                      if (!isEditing && !isDeleting) {
                        setExpandedItemId(isDetailOpen ? null : item.id);
                      }
                    }}
                    className={`p-4 flex items-start justify-between select-none ${
                      !isEditing && !isDeleting ? 'cursor-pointer active:bg-slate-50/60' : ''
                    } transition-colors`}
                  >
                    <div className="pr-3 space-y-1 flex-1">
                      
                      {/* Badge Row (Apple clean gray pills) */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <PlatformBadge platform={item.platform} />
                        {item.storeGuideline && (
                          <a
                            href={item.storeGuideline.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200/80 flex items-center space-x-1 hover:bg-slate-200/60 transition-colors apple-press"
                            title={item.storeGuideline.name}
                          >
                            <ExternalLink className="w-2.5 h-2.5 text-slate-500 stroke-[2.5]" />
                            <span>Store Rule</span>
                          </a>
                        )}
                        {item.videoUrl && (
                          <a
                            href={item.videoUrl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80 flex items-center space-x-1 hover:bg-rose-100 transition-colors apple-press"
                            title={item.videoUrl.title}
                          >
                            <Play className="w-2.5 h-2.5 text-rose-600 fill-rose-600" />
                            <span>Video Guide</span>
                          </a>
                        )}
                        {item.directLink && (
                          <a
                            href={item.directLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center space-x-1 hover:bg-blue-100 transition-colors apple-press"
                            title={item.directLink.label}
                          >
                            <ExternalLink className="w-2.5 h-2.5 text-blue-600 stroke-[2.5]" />
                            <span>{item.directLink.label}</span>
                          </a>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className={`text-sm sm:text-[15px] font-bold leading-snug tracking-tight font-google ${
                        isDone ? 'text-slate-500' : 'text-slate-900'
                      }`}>
                        {item.title}
                      </h3>

                      {/* Short Description (Unselectable so tapping never highlights text) */}
                      <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* Action Controls:
                        - In Edit Mode: Trash and Double-Arrow Reorder together
                        - In Normal Mode: Circular Completion Button
                    */}
                    {isEditing ? (
                      <div className="flex items-center space-x-2 shrink-0 -mr-1" onClick={(e) => e.stopPropagation()}>
                        {onDeleteItem && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete requirement "${item.title}"?`)) {
                                onDeleteItem(phase.id, item.id);
                              }
                            }}
                            className="apple-press w-9 h-9 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center shadow-2xs transition-colors"
                            title="Delete requirement"
                            aria-label="Delete requirement"
                          >
                            <Trash2 className="w-4 h-4 stroke-[2.2]" />
                          </button>
                        )}
                        <button
                          type="button"
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            handleDragStartItem(idx, e);
                          }}
                          className="apple-press w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xs touch-none select-none"
                          title="Drag to rearrange"
                          aria-label="Drag to rearrange"
                        >
                          <ArrowUpDown className="w-4 h-4 text-slate-500 stroke-[2.2]" />
                        </button>
                      </div>
                    ) : (
                      /* Circular Toggle Button: Turns the phase's theme color with a white checkmark! */
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          try {
                            if (navigator?.vibrate) navigator.vibrate(10);
                          } catch {}
                          onToggleComplete(item.id);
                        }}
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 -mr-1 active:opacity-75 transition-opacity"
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

                  {/* Centered thick gray arrow to pop down guidance drawer:
                      Hidden/minimized during edit mode */}
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedItemId(isDetailOpen ? null : item.id);
                      }}
                      className="w-full flex items-center justify-center py-2 min-h-[34px] border-t border-slate-100/90 hover:bg-slate-50/80 active:bg-slate-100/90 transition-colors group cursor-pointer"
                      title={isDetailOpen ? 'Close guidance' : 'Expand guidance'}
                      aria-label={isDetailOpen ? 'Close guidance' : 'Expand guidance'}
                    >
                      <div className={!isDetailOpen ? 'w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200/80 transition-colors' : 'p-0 text-slate-400 group-hover:text-slate-600'}>
                        <ChevronDown 
                          strokeWidth={2.5}
                          className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                            isDetailOpen ? 'rotate-180 text-slate-600' : 'text-slate-500'
                          }`} 
                        />
                      </div>
                    </button>
                  )}

                  {/* Expanded Guidance Drawer with Separated Cards & Click-to-Copy */}
                  <div className={`apple-drawer-collapse ${!isEditing && isDetailOpen ? 'expanded' : ''}`}>
                    <div className="apple-drawer-content">
                      <div 
                        onClick={() => setExpandedItemId(null)}
                        className="px-4 pb-4 pt-2.5 border-t border-slate-100/90 bg-slate-50/70 space-y-3 text-xs cursor-pointer select-none"
                        title="Click anywhere to minimize"
                      >
                    
                        {/* 1. Architecture & Review Impact */}
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 cursor-auto select-text"
                        >
                          <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider block font-google select-none">
                            Architecture & Review Impact
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                            {item.whyItMatters}
                          </p>
                          <div className="pt-0.5 select-none">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-[10.5px] sm:text-[11px] text-slate-600 font-medium border border-slate-200/80 select-none">
                              Copy to clipboard to transfer instructions to your computer and agent
                            </span>
                          </div>
                        </div>

                        {/* 2. Step-by-Step */}
                        {item.implementationSteps && item.implementationSteps.length > 0 && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 cursor-auto select-text"
                          >
                            <div className="flex items-center justify-between select-none">
                              <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider block font-google">
                                Step-by-Step
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
                                className="apple-press px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-[11px] font-semibold flex items-center space-x-1.5 transition-colors"
                                title="Copy steps to clipboard"
                              >
                                {copiedSnippetId === `steps-all-${item.id}` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                                    <span className="text-emerald-700 font-bold">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Clean Numbered Steps */}
                            <div className="space-y-2.5 pt-1">
                              {item.implementationSteps.map((step, idx) => (
                                <div key={idx} className="flex items-start space-x-3 text-slate-700">
                                  <span className="font-bold text-slate-900 text-sm shrink-0 mt-0.5 select-none">
                                    {idx + 1}.
                                  </span>
                                  <p className="text-[13.5px] sm:text-sm leading-relaxed text-slate-800 flex-1 min-w-0">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. What Happens Once Completed (Plain-English explanation) */}
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5 cursor-auto select-text"
                        >
                          <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider block font-google select-none">
                            What Happens Once Completed
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                            {item.whatHappensNext || "Once you complete this step, this requirement is fully operational in your application, preventing store rejections and ensuring a rock-solid user experience."}
                          </p>
                        </div>

                        {/* 4. Autonomous AI Coding Agent Directive */}
                        {item.agentPrompt && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 cursor-auto select-text"
                          >
                            <div className="flex items-center justify-between select-none">
                              <div>
                                <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                  AI Coding Agent Directive
                                </span>
                                <span className="text-[11.5px] text-slate-500 font-medium block mt-0.5">
                                  For Cursor, Claude Code, Windsurf, Copilot & Antigravity
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyText(`prompt-${item.id}`, item.agentPrompt || '');
                                }}
                                className="apple-press px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-[11px] font-semibold flex items-center space-x-1.5 transition-colors shrink-0"
                                title="Copy prompt for AI coding agent"
                              >
                                {copiedSnippetId === `prompt-${item.id}` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                                    <span className="text-emerald-700 font-bold">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <p className="text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed select-none">
                              Built for AI Agents: Give this exact prompt to your AI coding agent. It contains complete architectural specs, guidelines, and verification rules so the agent writes the code and does the work for you.
                            </p>

                            <div className="text-[12.5px] sm:text-[13px] text-slate-800 font-mono select-text bg-slate-50/80 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 max-h-96 overflow-y-auto space-y-3 leading-relaxed">
                              {item.agentPrompt.split('\n\n').map((paragraph, pIdx) => (
                                <p key={pIdx} className="leading-relaxed whitespace-pre-line">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 5. Relevant Video Guide */}
                        {item.videoUrl && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 cursor-auto"
                          >
                            <div className="flex items-center justify-between select-none">
                              <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider block font-google">
                                Relevant Video Guide
                              </span>
                              <a
                                href={item.videoUrl.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="apple-press px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-semibold flex items-center space-x-1.5 transition-colors border border-rose-200/60"
                              >
                                <Play className="w-3 h-3 fill-rose-600 text-rose-600" />
                                <span>Watch Video</span>
                              </a>
                            </div>
                            <p className="text-slate-700 leading-relaxed text-[13px] sm:text-[13.5px]">
                              {item.videoUrl.title}
                            </p>
                          </div>
                        )}

                        {/* 6. Store Review Traps to Avoid (At least 3 per section) */}
                        {item.commonRejectionTraps && item.commonRejectionTraps.length > 0 && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 text-slate-900 shadow-2xs space-y-2.5 cursor-auto select-text"
                          >
                            <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider block font-google select-none">
                              Store Review Traps to Avoid
                            </span>
                            <ul className="list-disc list-inside space-y-2 text-[13.5px] sm:text-sm text-slate-700 leading-relaxed pt-0.5">
                              {item.commonRejectionTraps.map((trap, idx) => (
                                <li key={idx} className="pl-1">
                                  <span className="text-slate-800">{trap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Optional Legacy Code Snippet */}
                        {item.codeSnippet && !item.agentPrompt && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 cursor-auto select-text"
                          >
                            <div className="flex items-center justify-between select-none">
                              <span className="font-mono text-slate-600 text-[11px] flex items-center space-x-1">
                                <FileCode className="w-3.5 h-3.5" />
                                <span>{item.codeSnippet.filename} ({item.codeSnippet.language})</span>
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyText(`code-${item.id}`, item.codeSnippet?.code || '');
                                }}
                                className="apple-press px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center space-x-1 transition-colors"
                                title="Copy code snippet"
                              >
                                {copiedSnippetId === `code-${item.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                                    <span className="text-emerald-700 font-bold">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy Code</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[12px] overflow-x-auto leading-relaxed">
                              <code>{item.codeSnippet.code}</code>
                            </pre>
                          </div>
                        )}

                        {/* Bottom Centered Arrow Close Drawer Trigger */}
                        <div className="pt-2 border-t border-slate-200/60 flex flex-col items-center select-none">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedItemId(null);
                            }}
                            className="w-full flex items-center justify-center py-1.5 hover:bg-slate-200/50 active:bg-slate-200 rounded-xl transition-colors apple-press group text-slate-500 hover:text-slate-700"
                            title="Close guidance"
                            aria-label="Close guidance"
                          >
                            <ChevronUp 
                              strokeWidth={2.5}
                              className="w-4 h-4 stroke-[2.5] text-slate-400" 
                            />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* Separate Action Pills: Add, Edit */}
            <div 
              onClick={() => {
                // Minimize whole section when clicking outside buttons at the bottom
                setIsExpanded(false);
              }}
              className="pt-2.5 pb-1.5 flex flex-wrap items-center justify-center gap-2 select-none cursor-pointer"
              title="Click outside buttons to minimize section"
            >
              {onAddItem && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isAddingItem) {
                      setIsAddingItem(false);
                      setNewItemTitle('');
                      setNewItemDesc('');
                    } else {
                      setIsAddingItem(true);
                      setIsEditMode(false);
                    }
                  }}
                  className={`apple-press px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 shadow-2xs border ${
                    isAddingItem
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'bg-white border-slate-200/90 hover:bg-slate-50 text-slate-700 hover:text-slate-900'
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

              {/* Single "Edit" Button: Shows arrows and garbage cans together */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditMode(prev => {
                    const next = !prev;
                    if (next) {
                      setExpandedItemId(null);
                      setIsAddingItem(false);
                    }
                    return next;
                  });
                }}
                className={`apple-press px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 shadow-2xs border ${
                  isEditing
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200/90 hover:bg-slate-50 text-slate-700 hover:text-slate-900'
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
                <span className="text-xs font-bold text-slate-800 font-google">Add Requirement to Phase {phase.number}</span>
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
    </>
  )}
</div>
);
};
