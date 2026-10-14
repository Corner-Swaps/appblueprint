import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { PROJECT_COLORS, getProjectColor } from '../App';
import { 
  Plus, 
  Check, 
  X, 
  Pencil, 
  Trash2, 
  Folder,
  Lock,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Info,
  Layers,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { 
  canCreateNewProject, 
  isUnlimitedUnlocked, 
  PRO_PRICE_DISPLAY,
  isTrialActive,
  getTrialDaysRemaining,
  getTrialRemainingMs,
  isProjectUnlocked,
  getPaidProjectIds
} from '../utils/paywall';
import { restoreWithStoreKit } from '../utils/nativeStoreKit';
import { triggerHaptic, ImpactStyle } from '../utils/haptics';

interface ProjectsPageProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
  onRenameProject: (projectId: string, newName: string, markLocked?: boolean) => void;
  onDeleteProject: (projectId: string) => void;
  onCreateProject: (name: string, color: string) => void;
  totalRequirementsCount?: number;
  onBackToChecklist?: () => void;
  isPro?: boolean;
  onOpenPaywall?: (targetProjectId?: string) => void;
}

const formatTrialCountdownFromMs = (ms: number): string => {
  if (ms <= 0) return 'Tap to unlock';

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);

  // If there are days left
  if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} left`;
  }

  // If there are hours left
  if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} left`;
  }

  // Minutes left
  const mins = Math.max(1, Math.ceil(ms / 60000));
  return `${mins} ${mins === 1 ? 'minute' : 'minutes'} left`;
};

export const ProjectsPage: React.FC<ProjectsPageProps> = React.memo(({
  projects,
  activeProjectId,
  onSelectProject,
  onRenameProject,
  onDeleteProject,
  onCreateProject,
  totalRequirementsCount = 62,
  onBackToChecklist,
  isPro = false,
  onOpenPaywall,
}) => {
  const [trialDaysRemaining, setTrialDaysRemaining] = useState<number>(getTrialDaysRemaining());
  const [trialCountdownText, setTrialCountdownText] = useState<string>(() => formatTrialCountdownFromMs(getTrialRemainingMs()));
  const [trialActive, setTrialActive] = useState<boolean>(isTrialActive());
  const [unlimitedUnlocked, setUnlimitedUnlocked] = useState<boolean>(isUnlimitedUnlocked());
  const [paidProjectsKey, setPaidProjectsKey] = useState<string>(() => getPaidProjectIds().join(','));
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreNotice, setRestoreNotice] = useState<string | null>(null);

  const isUnlocked = isPro || unlimitedUnlocked || (trialActive && canCreateNewProject(projects.length));
  const isLocked = !isUnlocked;

  const handleRestorePurchases = async () => {
    triggerHaptic(ImpactStyle.Light);
    setIsRestoring(true);
    setRestoreNotice(null);
    const res = await restoreWithStoreKit();
    setIsRestoring(false);
    if (res.isUnlimited || res.restoredCount > 0) {
      triggerHaptic(ImpactStyle.Heavy);
      setUnlimitedUnlocked(isUnlimitedUnlocked());
      setPaidProjectsKey(getPaidProjectIds().join(','));
      setRestoreNotice('Purchases restored successfully!');
      setTimeout(() => setRestoreNotice(null), 3500);
    } else {
      setRestoreNotice('No previous purchases found for this Apple ID.');
      setTimeout(() => setRestoreNotice(null), 3500);
    }
  };

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectName, setEditingProjectName] = useState('');
  const [lockedNameModal, setLockedNameModal] = useState<{ type: 'created' | 'attempted_rename'; projectName: string } | null>(null);
  const isCancellingRenameRef = useRef(false);
  const createFormRef = useRef<HTMLFormElement>(null);
  const isCancellingCreateRef = useRef(false);

  const handleSaveRename = (projId: string) => {
    if (isCancellingRenameRef.current) {
      isCancellingRenameRef.current = false;
      return;
    }
    const trimmed = editingProjectName.trim();
    if (!trimmed) {
      setEditingProjectId(null);
      return;
    }
    const willLock = !isPro && !isUnlimitedUnlocked();
    onRenameProject(projId, trimmed, willLock);
    setEditingProjectId(null);
    triggerHaptic(ImpactStyle.Light);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newProjectName.trim();
    if (!trimmed) return;
    if (isLocked) {
      setIsAddingProject(false);
      onOpenPaywall?.();
      return;
    }
    triggerHaptic(ImpactStyle.Medium);
    setIsAddingProject(false);
    setNewProjectName('');
    onCreateProject(trimmed, selectedColor);
  };

  useEffect(() => {
    if (!isAddingProject) return;

    const handlePointerDownOutside = (e: PointerEvent) => {
      if (createFormRef.current && !createFormRef.current.contains(e.target as Node)) {
        if (isCancellingCreateRef.current) {
          isCancellingCreateRef.current = false;
          return;
        }
        const trimmed = newProjectName.trim();
        if (trimmed) {
          if (isLocked) {
            setIsAddingProject(false);
            setNewProjectName('');
            onOpenPaywall?.();
            return;
          }
          onCreateProject(trimmed, selectedColor);
          setNewProjectName('');
          setIsAddingProject(false);
        } else {
          setIsAddingProject(false);
          setNewProjectName('');
        }
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside);
    };
  }, [isAddingProject, newProjectName, selectedColor, onCreateProject, isLocked, onOpenPaywall]);

  // Seamlessly transition into project creation when Pro is activated
  useEffect(() => {
    const handleProStatus = (e: any) => {
      setTrialDaysRemaining(getTrialDaysRemaining());
      setTrialActive(isTrialActive());
      setUnlimitedUnlocked(isUnlimitedUnlocked());
      setPaidProjectsKey(getPaidProjectIds().join(','));
      if (e?.detail?.isPro || isUnlimitedUnlocked()) {
        setIsAddingProject(true);
        setSelectedColor(PROJECT_COLORS[projects.length % PROJECT_COLORS.length]);
      }
    };
    window.addEventListener('appblueprint-pro-status-changed' as any, handleProStatus);
    return () => window.removeEventListener('appblueprint-pro-status-changed' as any, handleProStatus);
  }, [projects.length]);

  // Live real-time ticking countdown clock (updates every 1s)
  useEffect(() => {
    let wasActive = trialActive;
    const updateCountdown = () => {
      const ms = getTrialRemainingMs();
      setTrialCountdownText(formatTrialCountdownFromMs(ms));
      const active = ms > 0;
      setTrialActive(active);
      setTrialDaysRemaining(getTrialDaysRemaining());
      setUnlimitedUnlocked(isUnlimitedUnlocked());
      setPaidProjectsKey(getPaidProjectIds().join(','));

      // If trial expires right on this screen, open paywall modal automatically!
      if (wasActive && !active && !isUnlimitedUnlocked()) {
        wasActive = false;
        triggerHaptic(ImpactStyle.Heavy);
        onOpenPaywall?.(activeProjectId);
      }
      wasActive = active;
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [trialActive, activeProjectId, onOpenPaywall]);

  const formatTrialCountdown = () => trialCountdownText;

  const paidProjectIdsSet = new Set(paidProjectsKey ? paidProjectsKey.split(',') : []);

  return (
    <div className="space-y-3.5 pb-4">
      
      {/* 1. Title at the Top (Exact same style, size, and centering as in project checklist) */}
      <div className="pt-2.5 pb-2 flex flex-col items-center justify-center w-full space-y-2">
        <button
          type="button"
          onClick={() => {
            if (editingProjectId) {
              handleSaveRename(editingProjectId);
            }
            onBackToChecklist?.();
          }}
          className="active:opacity-75 transition-opacity flex items-center justify-center space-x-1.5 px-3 py-1 rounded-2xl hover:bg-black/5 group max-w-full min-h-[42px]"
          title="Back to Checklist"
        >
          <h1 className="text-[28px] sm:text-[29px] font-medium tracking-normal text-center select-none text-black font-google leading-tight truncate">
            Select Project
          </h1>
        </button>

        {/* Distinct Restore Purchases Button (Guideline 3.1.1) */}
        <button
          type="button"
          onClick={handleRestorePurchases}
          disabled={isRestoring}
          className="apple-press inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 text-slate-600 hover:text-slate-900 text-xs font-semibold shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          title="Restore previously purchased items"
        >
          {isRestoring ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
          ) : (
            <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
          )}
          <span>Restore Purchases</span>
        </button>

        {restoreNotice && (
          <div className="text-xs font-medium text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200/70 animate-in fade-in duration-200">
            {restoreNotice}
          </div>
        )}
      </div>

      {/* 2. List of Projects */}
      <div className="space-y-4 pt-1">

        {projects.map((proj, idx) => {
          const projColor = getProjectColor(proj, idx);
          const isEditingThisProj = editingProjectId === proj.id;
          const isActive = proj.id === activeProjectId;
          const completedCount = (proj.completedItemIds || []).length;
          const percent = totalRequirementsCount > 0 
            ? Math.round((completedCount / totalRequirementsCount) * 100) 
            : 0;
          const isPaidProject = paidProjectIdsSet.has(proj.id);
          const isCardUnlocked = isPro || unlimitedUnlocked || trialActive || isPaidProject;

          return (
            <div
              id={isActive ? "active-project-pill" : undefined}
              key={proj.id}
              onClick={() => {
                if (editingProjectId && editingProjectId !== proj.id) {
                  handleSaveRename(editingProjectId);
                }
                if (editingProjectId === proj.id) return;
                if (!isCardUnlocked) {
                  triggerHaptic(ImpactStyle.Light);
                  onOpenPaywall?.(proj.id);
                  return;
                }
                onSelectProject(proj.id);
                onBackToChecklist?.();
              }}
              style={isActive ? { borderColor: projColor } : undefined}
              className={`rounded-3xl border bg-white p-5 sm:p-6 transition-all duration-150 shadow-xs space-y-3 select-none cursor-pointer ${
                isActive ? 'border-2 ring-1 ring-black/5' : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3 select-none">
                <div className="flex items-center space-x-3.5 select-none flex-1 min-w-0">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs text-white"
                    style={{ backgroundColor: projColor }}
                  >
                    <Folder className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <div className="space-y-1 select-none flex-1 min-w-0">
                    {/* Trial / Tier Pill and subtext above the title like Step 1 - Hidden in Host Mode */}
                    {!isPro && (
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 select-none mt-0.5">
                        <span 
                          className="h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider font-google text-white shadow-2xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none"
                          style={{ backgroundColor: projColor }}
                        >
                          {unlimitedUnlocked 
                            ? 'Unlimited' 
                            : isPaidProject
                            ? 'Unlocked'
                            : trialActive 
                            ? 'One Week Trial' 
                            : 'Trial Ended'}
                        </span>
                        <div className="text-xs font-bold text-slate-600 select-none inline-flex items-center space-x-1 shrink-0 font-google tracking-tight">
                          <span className="text-slate-300 select-none mr-0.5">•</span>
                          {unlimitedUnlocked ? (
                            <span>Lifetime Access</span>
                          ) : isPaidProject ? (
                            <span>Lifetime Access</span>
                          ) : trialActive ? (
                            <span className="tabular-nums">{formatTrialCountdown()}</span>
                          ) : (
                            <span>Tap to unlock</span>
                          )}
                        </div>
                      </div>
                    )}

                    {isEditingThisProj ? (
                      <div 
                        data-rename-controls
                        className="flex items-center space-x-1.5 pt-0.5" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={editingProjectName}
                          onChange={(e) => setEditingProjectName(e.target.value)}
                          onBlur={(e) => {
                            if (isCancellingRenameRef.current) {
                              isCancellingRenameRef.current = false;
                              return;
                            }
                            const nextTarget = e.relatedTarget as HTMLElement | null;
                            if (nextTarget && nextTarget.closest('[data-rename-controls]')) {
                              return;
                            }
                            handleSaveRename(proj.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(proj.id);
                            if (e.key === 'Escape') {
                              isCancellingRenameRef.current = true;
                              setEditingProjectId(null);
                            }
                          }}
                          className="px-2.5 py-1 text-[16px] sm:text-[17.5px] font-bold text-slate-900 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-slate-900 flex-1 min-w-0 font-google tracking-tight"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(proj.id)}
                          className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 apple-press shadow-xs"
                          title="Save name"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </button>
                        <button
                          type="button"
                          onPointerDown={() => {
                            isCancellingRenameRef.current = true;
                          }}
                          onClick={() => {
                            isCancellingRenameRef.current = true;
                            setEditingProjectId(null);
                          }}
                          className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shrink-0 apple-press transition-colors shadow-xs"
                          title="Cancel"
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    ) : (
                      <h2 className="text-[18px] sm:text-[20px] font-medium text-slate-900 tracking-tight leading-snug select-none font-google break-words">
                        {proj.name}
                      </h2>
                    )}
                  </div>
                </div>

                {!isEditingThisProj && (
                  <div className="flex items-center space-x-1.5 shrink-0 self-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isCardUnlocked) {
                          triggerHaptic(ImpactStyle.Light);
                          onOpenPaywall?.(proj.id);
                          return;
                        }
                        const isNameLocked = !isPro && !isUnlimitedUnlocked() && proj.isNameLocked;
                        if (isNameLocked) {
                          triggerHaptic(ImpactStyle.Light);
                          setLockedNameModal({
                            type: 'attempted_rename',
                            projectName: proj.name
                          });
                          return;
                        }
                        setEditingProjectId(proj.id);
                        setEditingProjectName(proj.name);
                      }}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center shrink-0 apple-press shadow-xs transition-colors"
                      title={!isCardUnlocked ? "Unlock Project" : (!isPro && !isUnlimitedUnlocked() && proj.isNameLocked ? "Project Name Locked" : "Rename Project")}
                      aria-label="Rename Project"
                    >
                      <Pencil className="w-4 h-4 stroke-[2.2] fill-white" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(proj.id);
                      }}
                      className="w-8 h-8 rounded-xl bg-slate-100 text-rose-500 hover:text-rose-600 flex items-center justify-center shrink-0 apple-press transition-colors shadow-xs"
                      title="Delete Project"
                      aria-label="Delete Project"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.2] text-rose-500" />
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Bar with Labels (matching other sections) */}
              <div className="space-y-1 pt-1 select-none">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 select-none font-google tracking-tight">
                  <span>Project Completion</span>
                  <span className="tabular-nums">{percent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-black/5 select-none">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${percent}%`,
                      backgroundColor: projColor
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* + Add a New Project Card: Clean layout without PRO badge, subtext, or sideways arrow */}
        {!isAddingProject ? (
          <div
            onClick={() => {
              if (editingProjectId) {
                handleSaveRename(editingProjectId);
              }
              if (isLocked) {
                triggerHaptic(ImpactStyle.Light);
                onOpenPaywall?.();
                return;
              }
              setIsAddingProject(true);
              setSelectedColor(PROJECT_COLORS[projects.length % PROJECT_COLORS.length]);
            }}
            className={`rounded-3xl border transition-all duration-200 shadow-xs select-none cursor-pointer ${
              isLocked
                ? 'border-slate-200/90 bg-white hover:border-slate-300'
                : 'border-dashed border-slate-300 hover:border-slate-400 bg-white/90 hover:bg-white'
            } p-5 sm:p-6`}
            title={isLocked ? "Unlock with Pro" : "Create New Project"}
            role="button"
            tabIndex={0}
          >
            <div className="w-full flex items-center justify-between select-none">
              <div className="flex items-center space-x-3.5 select-none flex-1 min-w-0">
                {/* Squircle Icon: Vibrant Purple background with white plus (or lock when locked) */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs relative text-white bg-purple-600 shadow-purple-500/25">
                  {isLocked ? (
                    <Lock className="w-6 h-6 stroke-[2.2] text-white" />
                  ) : (
                    <Plus className="w-6 h-6 stroke-[2.4] text-white" />
                  )}
                </div>

                {/* Clean Title & Subtitle */}
                <div className="select-none flex-1 min-w-0">
                  <h2 className="text-[18px] sm:text-[20px] font-medium text-slate-900 tracking-tight leading-snug select-none font-google break-words">
                    Add a New Project
                  </h2>
                  <p className="text-xs text-slate-500 font-medium leading-normal mt-0.5 select-none">
                    {isLocked ? 'Unlock another project blueprint or go unlimited' : 'Create a new app blueprint with developer guidance'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form
            ref={createFormRef}
            onSubmit={handleCreateSubmit}
            onClick={(e) => e.stopPropagation()}
            className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-colors duration-150 shadow-xs space-y-4 select-none animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between gap-3 select-none">
              <div className="flex items-center space-x-3.5 select-none flex-1 min-w-0">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs text-white transition-colors duration-200"
                  style={{ backgroundColor: selectedColor }}
                >
                  <Folder className="w-6 h-6 stroke-[2.2]" />
                </div>

                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        isCancellingCreateRef.current = true;
                        setIsAddingProject(false);
                        setNewProjectName('');
                      }
                    }}
                    placeholder="Project Name..."
                    className="w-full px-3 py-1.5 text-base sm:text-lg font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 font-google tracking-tight"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-1.5 shrink-0 self-center">
                <button
                  type="submit"
                  disabled={!newProjectName.trim()}
                  className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 apple-press disabled:opacity-40 transition-opacity"
                  title="Create Project"
                  aria-label="Create Project"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
                <button
                  type="button"
                  onPointerDown={() => {
                    isCancellingCreateRef.current = true;
                  }}
                  onClick={() => {
                    isCancellingCreateRef.current = true;
                    setIsAddingProject(false);
                    setNewProjectName('');
                  }}
                  className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shrink-0 apple-press transition-colors"
                  title="Cancel"
                  aria-label="Cancel"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:space-x-3 pt-0.5">
              {PROJECT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform apple-press shrink-0 ${
                    selectedColor === color 
                      ? 'scale-115 ring-2 ring-slate-900/40 shadow-xs' 
                      : 'opacity-65 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                  aria-label={`Select color ${color}`}
                >
                  {selectedColor === color && (
                    <Check className="w-3 h-3 text-white stroke-[3.5]" />
                  )}
                </button>
              ))}
            </div>
          </form>
        )}
      </div>

      {/* Clearance space underneath the last project card for floating dock */}
      <div 
        className="w-full shrink-0 pointer-events-none" 
        style={{ height: 'max(calc(env(safe-area-inset-bottom, 0px) + 94px), 112px)' }} 
        aria-hidden="true" 
      />

      {/* 4. Project Name Locked / Setup Pop-Up Modal */}
      {lockedNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-5 select-none overflow-y-auto">
          {/* Fullscreen Backdrop overlay - guaranteed 1-tap dismiss */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
            aria-hidden="true"
            onClick={() => setLockedNameModal(null)}
          />

          <div 
            className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-[32px] border border-slate-200/90 shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center space-y-4 my-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="locked-name-modal-title"
          >
            {/* Top Icon: Vibrant Purple squircle with white lock */}
            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30 shrink-0">
              <Lock className="w-7 h-7 stroke-[2.2] text-white" />
            </div>

            {/* Title & Body */}
            <div className="space-y-2 px-1">
              <h3 id="locked-name-modal-title" className="text-lg sm:text-xl font-black text-slate-900 font-google tracking-tight">
                {lockedNameModal.type === 'created' 
                  ? 'Project Setup Complete' 
                  : 'Project Name Locked'}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lockedNameModal.type === 'created' ? (
                  <>
                    Your free project <strong className="font-bold text-slate-900">"{lockedNameModal.projectName}"</strong> is ready! In the free tier, project names are locked once set to keep your blueprint dedicated to your app. Any future projects will be protected by Pro.
                  </>
                ) : (
                  <>
                    In the free tier, project names are locked once set to keep your production blueprint dedicated to your app. Upgrade to Pro to rename projects anytime, add new projects, or unlock unlimited access.
                  </>
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="w-full space-y-2 pt-1">
              {lockedNameModal.type === 'attempted_rename' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setLockedNameModal(null);
                      onOpenPaywall?.();
                    }}
                    className="apple-press w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-md shadow-purple-500/25 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <span>Upgrade with Pro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLockedNameModal(null)}
                    className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Keep "{lockedNameModal.projectName}"
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setLockedNameModal(null);
                    onBackToChecklist?.();
                  }}
                  className="apple-press w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-md shadow-purple-500/25 transition-all flex items-center justify-center cursor-pointer"
                >
                  <span>Continue to Checklist</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clearance space underneath the last project card for floating dock */}
      <div 
        className="w-full shrink-0 pointer-events-none" 
        style={{ height: 'max(calc(env(safe-area-inset-bottom, 0px) + 140px), 164px)' }} 
        aria-hidden="true" 
      />
    </div>
  );
});
