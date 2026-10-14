import React, { useState } from 'react';
import { Phase, ChecklistItem } from '../types';
import { renderPhaseIcon } from '../utils/renderPhaseIcon';
import { getPhaseTheme, CUSTOM_PHASE_THEME, hexToRgb } from '../utils/phaseThemes';
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
  ArrowUp,
  ArrowDown,
  Play,
  Shield,
  Scale,
  Layout,
  Database,
  Lightbulb,
  CheckSquare,
  Rocket,
  HelpCircle,
  Target,
  RotateCcw
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { ImpactStyle } from '@capacitor/haptics';
import { PlatformBadge } from './PlatformBadge';
import { renderFormattedPrompt } from '../utils/formatAgentPrompt';
import { renderChecklistItemIcon } from '../utils/renderChecklistItemIcon';
import { fluidScrollTo } from '../utils/fluidScroll';

const formatGuidelineButtonLabel = (rawName?: string): string => {
  if (!rawName) return 'Store Guidelines';
  const trimmed = rawName.trim();
  
  if (/privacy/i.test(trimmed) && (/app store/i.test(trimmed) || /play policy/i.test(trimmed))) {
    return 'App Store Privacy Policy';
  }
  if (/sign in with apple/i.test(trimmed)) {
    return 'Sign in with Apple';
  }
  if (/account deletion/i.test(trimmed) || /user data policy/i.test(trimmed)) {
    return 'Account Deletion Policy Guidelines';
  }
  if (/in-app purchase/i.test(trimmed) || /subscriptions/i.test(trimmed)) {
    return 'In-App Purchase Guidelines';
  }
  if (/user-generated content/i.test(trimmed)) {
    return 'User-Generated Content Guidelines';
  }
  if (/families policy/i.test(trimmed) || /child/i.test(trimmed)) {
    return 'Children & Families Policy';
  }
  if (/eula/i.test(trimmed)) {
    return 'EULA & Terms Guidelines';
  }
  if (/data use/i.test(trimmed) || /tracking/i.test(trimmed)) {
    return 'Data Use & Tracking';
  }
  if (/intellectual property/i.test(trimmed)) {
    return 'Intellectual Property Policy Guidelines';
  }
  if (/digital services act/i.test(trimmed)) {
    return 'EU Digital Services Act';
  }
  if (/health/i.test(trimmed) || /medical/i.test(trimmed)) {
    return 'Health & Medical Policy';
  }
  if (/core vitals/i.test(trimmed)) {
    return 'App Store Core Performance';
  }
  if (/listing/i.test(trimmed) || /metadata/i.test(trimmed)) {
    return 'Store Listing Metadata Policy';
  }
  if (/completeness/i.test(trimmed)) {
    return 'App Completeness Review Guidelines';
  }
  if (/closed testing/i.test(trimmed)) {
    return 'TestFlight External Testing';
  }
  if (/developer policy/i.test(trimmed)) {
    return 'App Store Review Guidelines';
  }
  if (/webview/i.test(trimmed) || /web-view/i.test(trimmed)) {
    return 'WebView Security Guidelines';
  }
  if (/touch target/i.test(trimmed)) {
    return 'Apple HIG Touch Targets';
  }
  
  const words = trimmed
    .replace(/Guideline\s+[0-9.]+(\([a-z0-9]+\))?/gi, '')
    .replace(/[–—\-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
    
  if (words.length <= 4) return words.join(' ');
  return words.slice(0, 4).join(' ');
};

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

export const GuardrailSection: React.FC<GuardrailSectionProps> = React.memo(({
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

  // Dynamic theme-colored pulse highlight around section pill when minimized
  const [isJustMinimized, setIsJustMinimized] = useState(false);
  const pulseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const centerSubsection = (itemId: string) => {
    const el = document.getElementById(itemId) || document.getElementById(`item-${itemId}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const itemDocTop = currentScroll + rect.top;
    const viewportHeight = window.innerHeight;
    const itemHeight = rect.height || 100;
    const centeredY = Math.max(0, itemDocTop - (viewportHeight - itemHeight) / 2);
    fluidScrollTo(centeredY, { duration: 380 });
  };

  const getCollapsedPillHeight = (el: HTMLElement, defaultHeight: number): number => {
    try {
      const headerEl = el.firstElementChild as HTMLElement;
      if (headerEl && headerEl.offsetHeight > 40) {
        const computed = window.getComputedStyle(el);
        const pt = parseFloat(computed.paddingTop) || 20;
        const pb = parseFloat(computed.paddingBottom) || 12;
        const bt = parseFloat(computed.borderTopWidth) || 1;
        const bb = parseFloat(computed.borderBottomWidth) || 1;
        return headerEl.offsetHeight + pt + pb + bt + bb;
      }
    } catch {
      // fallback
    }
    return defaultHeight;
  };

  const isCollapsingSubRef = React.useRef<string | null>(null);

  const handleCollapseSubsection = (itemId: string) => {
    if (isCollapsingSubRef.current) return;
    isCollapsingSubRef.current = itemId;

    const el = document.getElementById(itemId) || document.getElementById(`item-${itemId}`);
    if (!el) {
      setExpandedItemId(null);
      isCollapsingSubRef.current = null;
      return;
    }

    const rect = el.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const elDocTop = currentScroll + rect.top;
    const viewportHeight = window.innerHeight;
    const collapsedHeight = getCollapsedPillHeight(el, 182);
    // Calculate exact scroll target to position the collapsed sub pill in the vertical center of the viewport
    const centeredTargetY = Math.max(0, elDocTop - (viewportHeight - collapsedHeight) / 2);
    const diff = Math.abs(currentScroll - centeredTargetY);

    // 1. Immediately fold the subcategory drawer UPWARDS into the sub pill
    setExpandedItemId(null);

    // 2. Smoothly glide to the center of the viewport
    if (diff > 8) {
      fluidScrollTo(centeredTargetY, {
        duration: 320,
      });
    }

    // 3. Complete collapse without pulse highlight (smoothly centered only)
    setTimeout(() => {
      isCollapsingSubRef.current = null;
    }, 360);
  };

  const handleDrawerTextClick = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    // If text was actively selected by user, don't collapse
    if (window.getSelection && (window.getSelection()?.toString().length || 0) > 0) {
      return;
    }
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('a') || 
      target.closest('input') || 
      target.closest('textarea') ||
      target.closest('[role="button"]') ||
      target.closest('.apple-press')
    ) {
      return;
    }
    handleCollapseSubsection(itemId);
  };

  const triggerPillPulse = () => {
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    setIsJustMinimized(true);
    pulseTimeoutRef.current = setTimeout(() => {
      setIsJustMinimized(false);
    }, 2050);
  };

  React.useEffect(() => {
    const handlePulsePhase = (e: any) => {
      if (e?.detail === phase.id) {
        triggerPillPulse();
      }
    };
    window.addEventListener('pulse-phase' as any, handlePulsePhase);
    return () => window.removeEventListener('pulse-phase' as any, handlePulsePhase);
  }, [phase.id]);

  // Section reference for smooth scroll to top when collapsing
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isCollapsingRef = React.useRef(false);

  const collapseSectionSmoothly = () => {
    if (isCollapsingRef.current) return;

    // Keep isEditMode active so if subsections collapse, the user can still adjust the section
    // with up/down arrows and tap [ Add | Done | Close ] directly underneath the main pill
    setIsAddingItem(false);

    const targetEl = sectionRef.current || document.getElementById(phase.id);
    if (!targetEl) {
      setIsExpanded(false);
      setExpandedItemId(null);
      triggerPillPulse();
      return;
    }

    const rect = targetEl.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const elDocTop = currentScroll + rect.top;
    const viewportHeight = window.innerHeight;
    const collapsedHeight = getCollapsedPillHeight(targetEl, 242);
    // Calculate exact scroll target to position the collapsed main pill in the vertical center of the viewport
    const centeredTargetY = Math.max(0, elDocTop - (viewportHeight - collapsedHeight) / 2);
    const diff = Math.abs(currentScroll - centeredTargetY);

    // 1. Immediately fold the section drawer UPWARDS into the main pill
    setIsExpanded(false);
    setExpandedItemId(null);
    isCollapsingRef.current = true;

    // 2. Smoothly glide to the center of the viewport
    if (diff > 8) {
      fluidScrollTo(centeredTargetY, {
        duration: 320,
      });
    }

    setTimeout(() => {
      triggerPillPulse();
      isCollapsingRef.current = false;
    }, 360);
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      collapseSectionSmoothly();
    } else {
      setIsExpanded(true);
    }
  };

  const handleCollapseSection = () => {
    collapseSectionSmoothly();
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

  // Reorder items in current phase with silky smooth viewport stabilization
  const handleMoveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return;
    const movedItem = items[fromIndex];
    const el = movedItem ? (document.getElementById(movedItem.id) || document.getElementById(`item-${movedItem.id}`)) : null;
    const beforeTop = el ? el.getBoundingClientRect().top : null;

    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    if (onReorderItems) {
      onReorderItems(phase.id, newItems);
    }

    requestAnimationFrame(() => {
      if (movedItem) {
        const updatedEl = document.getElementById(movedItem.id) || document.getElementById(`item-${movedItem.id}`);
        if (updatedEl && beforeTop !== null) {
          const afterTop = updatedEl.getBoundingClientRect().top;
          const diff = afterTop - beforeTop;
          if (Math.abs(diff) > 2) {
            window.scrollBy({ top: diff, behavior: 'instant' });
          }
        }
      }
    });
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

  const isCustomPhase = phase.id.startsWith('custom-');
  const theme = isCustomPhase ? CUSTOM_PHASE_THEME : getPhaseTheme(phase.number);
  const completedSet = React.useMemo(() => new Set(completedItemIds), [completedItemIds]);
  const totalCount = phase.items.length;
  const completedCount = React.useMemo(
    () => phase.items.reduce((acc, i) => acc + (completedSet.has(i.id) ? 1 : 0), 0),
    [phase.items, completedSet]
  );
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

  // Only hide if filtering by completed items and this phase has items but none completed (never hide setup phase)
  if (items.length === 0 && phase.items.length > 0 && !isAddingItem && !isSetupPhase) return null;

  return (
    <>
      <div 
        id={phase.id}
        ref={sectionRef}
        style={{
          '--glow-rgb': hexToRgb(theme.color),
          backgroundColor: '#ffffff',
        } as React.CSSProperties}
        className={`rounded-3xl border border-slate-200/90 bg-white transition-all duration-300 shadow-xs overflow-hidden ${
          isJustMinimized ? 'apple-section-pulse' : ''
        } ${
          isEditing ? 'apple-edit-glow' : ''
        } ${
        isGlobalEditMode 
          ? 'p-3.5 sm:p-4' 
          : ''
      }`}>
      {isGlobalEditMode ? (
        /* Compact Card in Global Rearrange Mode */
        <div className="w-full flex items-center justify-between select-none">
          <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
            <div className={`w-11 h-11 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs relative`}>
              {renderPhaseIcon(isCustomPhase ? 'Info' : phase.iconName, "w-5.5 h-5.5 text-white stroke-[2.2]")}
            </div>
            <div className="space-y-0.5 select-none flex-1 min-w-0">
              <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider font-google ${theme.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                {isSetupPhase ? 'Set Up' : isCustomPhase ? 'Custom' : `Step ${phase.number}`}
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
            {/* Move Up */}
            {onMovePhase && typeof phaseIndex === 'number' && phaseIndex > 0 && !isSetupPhase && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHaptic(ImpactStyle.Light);
                  onMovePhase(phaseIndex, phaseIndex - 1);
                }}
                className="apple-press w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                title="Move section up"
                aria-label="Move section up"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.2]" />
              </button>
            )}
            {/* Move Down */}
            {onMovePhase && typeof phaseIndex === 'number' && typeof totalPhases === 'number' && phaseIndex < totalPhases - 1 && !isSetupPhase && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHaptic(ImpactStyle.Light);
                  onMovePhase(phaseIndex, phaseIndex + 1);
                }}
                className="apple-press w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                title="Move section down"
                aria-label="Move section down"
              >
                <ArrowDown className="w-4 h-4 stroke-[2.2]" />
              </button>
            )}
            {onDeletePhase && !isSetupPhase && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete section "${phase.title}" and all its requirements?`)) {
                    triggerHaptic(ImpactStyle.Medium);
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
            className="p-5 pb-3 sm:p-6 sm:pb-3.5 space-y-2.5 select-none cursor-pointer focus:outline-none"
          >
            <div className="w-full flex items-center justify-between select-none">
              <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                {/* Squircle Icon: White icon, phase color background behind it on the LEFT */}
                <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs relative text-white`}>
                  {renderPhaseIcon(isCustomPhase ? 'Info' : phase.iconName, "w-6 h-6 text-white stroke-[2.2]")}
                </div>

                {/* Title & Phase Badge */}
                <div className="space-y-1 select-none flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap select-none mt-0.5">
                    <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider font-google ${theme.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                      {isSetupPhase ? 'Set Up' : isCustomPhase ? 'Custom' : `Step ${phase.number}`}
                    </span>
                    <span className="text-xs text-slate-400 select-none">•</span>
                    <span className="text-xs font-bold text-slate-700 select-none font-google tracking-tight">
                      {completedCount} of {totalCount} Verified
                    </span>
                  </div>

                  <h2 className="text-[18px] sm:text-[20px] font-medium text-slate-900 tracking-tight leading-snug select-none font-google break-words">
                    {phase.title}
                  </h2>
                </div>
              </div>

              {/* Right Controls: In Edit mode, Move Up, Move Down, Drag and Delete buttons */}
              {isEditing && !isSetupPhase ? (
                <div 
                  className="flex items-center space-x-1.5 shrink-0 self-start mt-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Move Section Up */}
                  {onMovePhase && typeof phaseIndex === 'number' && phaseIndex > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerHaptic(ImpactStyle.Light);
                        if (isExpanded) {
                          setIsExpanded(false);
                          setExpandedItemId(null);
                        }
                        onMovePhase(phaseIndex, phaseIndex - 1);
                      }}
                      className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                      title="Move section up"
                      aria-label="Move section up"
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>
                  )}

                  {/* Move Section Down */}
                  {onMovePhase && typeof phaseIndex === 'number' && typeof totalPhases === 'number' && phaseIndex < totalPhases - 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerHaptic(ImpactStyle.Light);
                        if (isExpanded) {
                          setIsExpanded(false);
                          setExpandedItemId(null);
                        }
                        onMovePhase(phaseIndex, phaseIndex + 1);
                      }}
                      className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                      title="Move section down"
                      aria-label="Move section down"
                    >
                      <ArrowDown className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>
                  )}


                  {/* Delete Section */}
                  {onDeletePhase && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete section "${phase.title}" and all its requirements?`)) {
                          triggerHaptic(ImpactStyle.Medium);
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
            <p className="text-sm sm:text-sm text-slate-600 leading-[22px] select-none pt-0.5">
              {phase.description}
            </p>

            {/* Section Progress Bar */}
            <div className="space-y-1 pt-1 select-none">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 select-none font-google tracking-tight">
                <span>Section Completion</span>
                <span className="tabular-nums">{percent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-black/5 select-none">
                <div 
                  className={`h-full ${theme.progressBg} rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Drop-Down Arrow: NO circle when pointing DOWN (closed), translucent gray circle when pointing UP (open/expanded) */}
            <div className="flex justify-center pt-0.5 pb-0 -mb-1 select-none">
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

          {/* 2. Connected Sub Categories Drawer (Inside the same unified pill!) */}
          <div className={`apple-drawer-collapse apple-unified-drawer ${isExpanded ? 'expanded' : '!mt-0 !mb-0 !h-0 overflow-hidden'}`}>
            <div className="apple-drawer-content">
              {isExpanded && (
                <>
              {items.length === 0 && (
                <div className="py-6 px-4 text-center space-y-1.5 select-none">
                  <p className="text-xs font-bold text-slate-700 font-google">No requirements added yet</p>
                  <p className="text-[11.5px] text-slate-500">Tap "Add" below to start populating this section.</p>
                </div>
              )}

              {/* Requirements list separated by a thin grey line matching Academy */}
              <div className="divide-y divide-slate-200/60 border-t border-slate-200/60">
                {items.map((item, idx) => {
                  const isDone = completedSet.has(item.id);
                  const isDetailOpen = expandedItemId === item.id;

                  return (
                    <div
                      id={item.id}
                      key={item.id}
                      ref={bindItemRef(idx)}
                      style={{
                        ...getItemDragStyle(idx),
                        '--glow-rgb': hexToRgb(theme.color)
                      } as React.CSSProperties}
                      className={`px-4 sm:px-5 transition-colors relative space-y-2.5 ${
                        idx === 0 ? 'pt-2 pb-3.5 sm:pt-2.5 sm:pb-4' : 'py-3.5 sm:py-4'
                      }`}
                    >
                      {/* Hidden semantic keywords for App Store discovery & AI agent scrapers */}
                      <span className="sr-only" aria-hidden="true" data-ai-index="app-blueprint-requirement">
                        {`iOS App Store submission requirement, Apple HIG compliance, ${item.title}, TestFlight, StoreKit 2, Privacy Manifest, review guidelines, AI prompt for Cursor and Claude.`}
                      </span>
                  {/* Item Header Block: clicking text minimizes/toggles item */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isEditing && !isDeleting) {
                        if (isDetailOpen) {
                          handleCollapseSubsection(item.id);
                        } else {
                          setExpandedItemId(item.id);
                        }
                      }
                    }}
                    className="space-y-2.5 select-none cursor-pointer"
                  >
                    <div className="w-full flex items-center justify-between select-none">
                      <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                        
                        {/* Squircle containing item icon matching Academy size */}
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs relative">
                          {renderChecklistItemIcon(item)}
                        </div>

                        {/* Title matching main pills typography (kept black, straight line strikethrough when done) */}
                        <div className="select-none flex-1 min-w-0">
                          <h3 className={`text-[18px] sm:text-[20px] font-medium tracking-tight leading-snug select-none font-google break-words text-slate-900 ${
                            isDone ? 'line-through decoration-slate-400 decoration-2' : ''
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Right Controls: In Edit mode, Move Up, Move Down, Delete */}
                      {isEditing ? (
                        <div className="flex items-center justify-end space-x-1.5 shrink-0 -mr-1 h-12" onClick={(e) => e.stopPropagation()}>
                          {/* Move Item Up */}
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerHaptic(ImpactStyle.Light);
                                handleMoveItem(idx, idx - 1);
                              }}
                              className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                              title="Move requirement up"
                              aria-label="Move requirement up"
                            >
                              <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>
                          )}

                          {/* Move Item Down */}
                          {idx < items.length - 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerHaptic(ImpactStyle.Light);
                                handleMoveItem(idx, idx + 1);
                              }}
                              className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                              title="Move requirement down"
                              aria-label="Move requirement down"
                            >
                              <ArrowDown className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>
                          )}

                          {/* Delete Item */}
                          {onDeleteItem && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Delete requirement "${item.title}"?`)) {
                                  triggerHaptic(ImpactStyle.Medium);
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
                        /* Circular checkmark in one line with title on the right side */
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerHaptic(ImpactStyle.Medium);
                            onToggleComplete(item.id);
                            if (!isDone) {
                              triggerPhaseCompleteConfetti();
                            }
                          }}
                          className={`apple-press w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer shadow-2xs ml-2 select-none ${
                            isDone 
                              ? 'text-white' 
                              : 'border-2 border-slate-300 hover:border-slate-400 bg-white'
                          }`}
                          style={isDone ? { backgroundColor: theme.color } : undefined}
                          title={isDone ? 'Completed (Tap to undo)' : 'Mark as complete'}
                          aria-label={isDone ? `${item.title} is completed` : `Mark ${item.title} as complete`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                        </button>
                      )}
                    </div>

                    {/* Subsection: Description directly underneath the title matching Academy */}
                    {item.shortDescription && (
                      <p className="text-sm sm:text-sm text-slate-600 leading-[22px] select-none pt-0.5">
                        {item.shortDescription}
                      </p>
                    )}

                    {/* Centered Drop-Down Arrow (shown when collapsed to expand) */}
                    {!isDetailOpen && (
                      <div className="flex justify-center pt-0.5 pb-0 select-none">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isEditing) {
                              setExpandedItemId(item.id);
                            }
                          }}
                          className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 shrink-0"
                          title="Expand guidance"
                          aria-label="Expand guidance"
                        >
                          <ChevronDown strokeWidth={2.5} className="w-4 h-4 stroke-[2.5] text-slate-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Expanded Guidance Drawer: Distinct Pill Cards matching Academy */}
                  <div className={`apple-drawer-collapse ${!isEditing && isDetailOpen ? 'expanded' : '!mt-0 !mb-0 !h-0 overflow-hidden'}`}>
                    <div className="apple-drawer-content">
                      {!isEditing && isDetailOpen && (
                      <div 
                        onClick={(e) => handleDrawerTextClick(e, item.id)}
                        className="space-y-3 pt-3 border-t border-slate-100/90 text-slate-800 select-none cursor-pointer"
                        title="Click to minimize requirement"
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
                        <div className="space-y-2 pt-2 border-t border-slate-100/80 select-none">
                          {/* Direct Link (e.g. Download Xcode / Google Antigravity) without box arrow */}
                          {item.directLink && (
                            <a
                              href={item.directLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                                try { window.open(item.directLink!.url, '_blank'); } catch {}
                              }}
                              className="apple-press w-full h-12 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-[13px] flex items-center justify-center space-x-2 shadow-xs transition-colors"
                            >
                              <span>{item.directLink.label}</span>
                            </a>
                          )}

                          {/* Direct YouTube Video Guide Link without box arrow */}
                          {item.videoUrl && (
                            <a
                              href={item.videoUrl.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                                try { window.open(item.videoUrl!.url, '_blank'); } catch {}
                              }}
                              className="apple-press w-full h-12 px-4 rounded-2xl bg-[#FF0000] hover:bg-[#E60000] active:bg-[#CC0000] text-white font-bold text-xs sm:text-[13px] flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer"
                              title={`Watch ${item.videoUrl.title} on YouTube`}
                            >
                              <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                              <span className="truncate">Watch on YouTube</span>
                            </a>
                          )}

                          {/* Dark Button for Official Store Guideline without box arrow */}
                          {item.storeGuideline && (
                            <a
                              href={item.storeGuideline.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                                try { window.open(item.storeGuideline!.url, '_blank'); } catch {}
                              }}
                              className="apple-press w-full h-12 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-[13px] flex items-center justify-center space-x-2 shadow-xs transition-colors"
                            >
                              <span className="truncate">{formatGuidelineButtonLabel(item.storeGuideline.name)}</span>
                            </a>
                          )}

                          {/* Subcategory Bottom Close Arrow (pure icon, hidden on the very last subcategory) */}
                          {idx < items.length - 1 && (
                            <div className="flex justify-center select-none pt-0.5 pb-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  triggerHaptic(ImpactStyle.Light);
                                  handleCollapseSubsection(item.id);
                                }}
                                className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 shrink-0 cursor-pointer"
                                title="Close subcategory"
                                aria-label="Close subcategory"
                              >
                                <ChevronUp 
                                  strokeWidth={2.5}
                                  className="w-4 h-4 stroke-[2.5] text-slate-400" 
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Very thin grey line separating subcategories from bottom action chevron matching Academy */}
          <div className="border-t border-slate-200/60" />

          {/* Main Pill Footer: Chevron upwards arrow (pure icon, no text, no pill) */}
          <div className="flex justify-center select-none py-2.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerHaptic(ImpactStyle.Light);
                handleCollapseSection();
              }}
              className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 shrink-0 cursor-pointer"
              title="Close section"
              aria-label="Close section"
            >
              <ChevronUp strokeWidth={2.5} className="w-4 h-4 stroke-[2.5] text-slate-400" />
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
                <span className="text-xs font-bold text-slate-800 font-google">Add Requirement to {isSetupPhase ? 'Set Up' : isCustomPhase ? phase.title : `Step ${phase.number}`}</span>
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
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>

    {/* Floating Actions when subsections are collapsed during edit mode */}
    {!isGlobalEditMode && !isExpanded && isEditing && (
      <div className="flex justify-center pt-2.5 pb-1 select-none animate-in fade-in duration-200">
        <div className="flex items-center space-x-4 select-none">
          {onAddItem && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerHaptic(ImpactStyle.Light);
                setIsExpanded(true);
                setIsAddingItem(true);
              }}
              className="apple-press px-2 py-1 text-xs sm:text-[13px] font-bold text-black hover:opacity-75 active:opacity-60 transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Add requirement"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5] text-black" />
              <span>Add</span>
            </button>
          )}

          <div className="w-[1px] h-3.5 bg-slate-300 shrink-0" aria-hidden="true" />

          {/* Done Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerHaptic(ImpactStyle.Light);
              setIsEditMode(false);
              setIsAddingItem(false);
            }}
            className="apple-press px-2 py-1 text-xs sm:text-[13px] font-bold text-black hover:opacity-75 active:opacity-60 transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Done adjusting"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5] text-black" />
            <span>Done</span>
          </button>

          <div className="w-[1px] h-3.5 bg-slate-300 shrink-0" aria-hidden="true" />

          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerHaptic(ImpactStyle.Light);
              setIsEditMode(false);
              setIsAddingItem(false);
            }}
            className="apple-press px-2 py-1 text-xs sm:text-[13px] font-bold text-black hover:opacity-75 active:opacity-60 transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Close section"
            aria-label="Close section"
          >
            <ChevronUp strokeWidth={2.5} className="w-3.5 h-3.5 stroke-[2.5] text-black" />
            <span>Close</span>
          </button>
        </div>
      </div>
    )}
  </>
);
});
