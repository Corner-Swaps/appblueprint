import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { PROJECT_COLORS, getProjectColor } from '../App';
import { 
  Plus, 
  Check, 
  X, 
  Pencil, 
  Trash2, 
  Folder
} from 'lucide-react';

interface ProjectsPageProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
  onRenameProject: (projectId: string, newName: string) => void;
  onDeleteProject: (projectId: string) => void;
  onCreateProject: (name: string, color: string) => void;
  totalRequirementsCount?: number;
  onBackToChecklist?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onRenameProject,
  onDeleteProject,
  onCreateProject,
  totalRequirementsCount = 62,
  onBackToChecklist,
}) => {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectName, setEditingProjectName] = useState('');
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
    onRenameProject(projId, trimmed);
    setEditingProjectId(null);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newProjectName.trim();
    if (!trimmed) return;
    onCreateProject(trimmed, selectedColor);
    setNewProjectName('');
    setIsAddingProject(false);
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
  }, [isAddingProject, newProjectName, selectedColor, onCreateProject]);

  return (
    <div className="space-y-3.5 pb-4">
      
      {/* 1. Title at the Top (Exact same style, size, and centering as in project checklist) */}
      <div className="pt-2.5 pb-3 flex items-center justify-center w-full">
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
      </div>

      {/* 2. List of Projects */}
      <div className="space-y-4 pt-1">
        {/* Selected / Active Project Pill: Exact same height and geometry as Checklist and Academy first pills */}
        {(() => {
          const activeProj = projects.find(p => p.id === activeProjectId) || projects[0];
          if (!activeProj) return null;
          const projColor = getProjectColor(activeProj, projects.indexOf(activeProj));
          const isEditingThisProj = editingProjectId === activeProj.id;
          const completedCount = (activeProj.completedItemIds || []).length;

          return (
            <div
              id="active-project-pill"
              key={activeProj.id}
              onClick={() => {
                if (editingProjectId && editingProjectId !== activeProj.id) {
                  handleSaveRename(editingProjectId);
                }
                if (editingProjectId === activeProj.id) return;
                onSelectProject(activeProj.id);
                onBackToChecklist?.();
              }}
              className="rounded-3xl border border-slate-200/90 bg-white shadow-xs p-5 pb-3 sm:p-6 sm:pb-3.5 space-y-2.5 select-none cursor-pointer"
            >
              <div className="w-full flex items-center justify-between select-none">
                <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                  {/* Squircle with project color and white folder icon */}
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs text-white"
                    style={{ backgroundColor: projColor }}
                  >
                    <Folder className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <div className="space-y-1 select-none flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap select-none mt-0.5">
                      <span className="h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none">
                        Active Project
                      </span>
                      <span className="text-xs text-slate-400 select-none">•</span>
                      <span className="text-xs font-bold text-slate-700 select-none">
                        {completedCount} of {totalRequirementsCount} Verified
                      </span>
                    </div>

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
                            handleSaveRename(activeProj.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(activeProj.id);
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
                          onClick={() => handleSaveRename(activeProj.id)}
                          className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 apple-press"
                          title="Save name"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
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
                          className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 apple-press"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug select-none font-google break-words flex-1 min-w-0">
                          {activeProj.name}
                        </h2>

                        <div className="flex items-center space-x-1 shrink-0 -my-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingProjectId(activeProj.id);
                              setEditingProjectName(activeProj.name);
                            }}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 apple-press transition-colors"
                            title="Rename Project"
                            aria-label="Rename Project"
                          >
                            <Pencil className="w-[18px] h-[18px] stroke-[2.2]" />
                          </button>

                          {projects.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteProject(activeProj.id);
                              }}
                              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 apple-press transition-colors"
                              title="Delete Project"
                              aria-label="Delete Project"
                            >
                              <Trash2 className="w-[18px] h-[18px] stroke-[2.2]" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description: Exactly matching Set Up and Academy 5-line height */}
              <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none pt-0.5">
                Your active mobile app blueprint and compliance roadmap. Track progress across all 12 mobile development phases, verify store rules, manage checklist requirements, and build your native mobile application.
              </p>

              {/* Bottom Indicator matching dropdown chevron geometry */}
              <div className="flex justify-center pt-0.5 pb-0 select-none">
                <div className="flex items-center justify-center w-7 h-7 text-slate-600">
                  <Check strokeWidth={2.5} className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                </div>
              </div>
            </div>
          );
        })()}

        {/* Other Projects (if any) */}
        {projects.filter(p => p.id !== activeProjectId).map((proj, idx) => {
          const projColor = getProjectColor(proj, idx);
          const isEditingThisProj = editingProjectId === proj.id;
          const completedCount = (proj.completedItemIds || []).length;
          const percent = totalRequirementsCount > 0 
            ? Math.round((completedCount / totalRequirementsCount) * 100) 
            : 0;

          return (
            <div
              key={proj.id}
              onClick={() => {
                if (editingProjectId && editingProjectId !== proj.id) {
                  handleSaveRename(editingProjectId);
                }
                if (editingProjectId === proj.id) return;
                onSelectProject(proj.id);
                onBackToChecklist?.();
              }}
              className="rounded-3xl border border-slate-200/90 hover:border-slate-300 bg-white p-5 sm:p-6 transition-colors duration-150 shadow-xs space-y-4 select-none cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 select-none">
                <div className="flex items-start space-x-3.5 pr-2 select-none flex-1 min-w-0">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs text-white"
                    style={{ backgroundColor: projColor }}
                  >
                    <Folder className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <div className="space-y-1 select-none flex-1 min-w-0 min-h-[48px] flex flex-col justify-center">
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
                          className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 apple-press"
                          title="Save name"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
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
                          className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 apple-press"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug select-none font-google break-words flex-1 min-w-0">
                          {proj.name}
                        </h2>

                        <div className="flex items-center space-x-1 shrink-0 -my-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingProjectId(proj.id);
                              setEditingProjectName(proj.name);
                            }}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 apple-press transition-colors"
                            title="Rename Project"
                            aria-label="Rename Project"
                          >
                            <Pencil className="w-[18px] h-[18px] stroke-[2.2]" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteProject(proj.id);
                            }}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 apple-press transition-colors"
                            title="Delete Project"
                            aria-label="Delete Project"
                          >
                            <Trash2 className="w-[18px] h-[18px] stroke-[2.2]" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
          );
        })}

        {/* + New Project Card */}
        {!isAddingProject ? (
          <div
            onClick={() => {
              if (editingProjectId) {
                handleSaveRename(editingProjectId);
              }
              setIsAddingProject(true);
              setSelectedColor(PROJECT_COLORS[projects.length % PROJECT_COLORS.length]);
            }}
            className="rounded-3xl border border-dashed border-slate-300 hover:border-slate-400 bg-white/80 hover:bg-white p-5 sm:p-6 transition-colors duration-150 shadow-xs space-y-4 select-none cursor-pointer"
            title="Create New Project"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center justify-between gap-3 select-none">
              <div className="flex items-center space-x-3.5 select-none flex-1 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/90 flex items-center justify-center shrink-0 shadow-xs text-slate-700">
                  <Plus className="w-6 h-6 stroke-[2.4]" />
                </div>

                <div className="space-y-0.5 select-none flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-snug select-none font-google">
                    New Project
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold truncate select-none">
                    Tap to add another app checklist
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-2 bg-slate-100/70 rounded-full border border-black/5 select-none" />
          </div>
        ) : (
          <form
            ref={createFormRef}
            onSubmit={handleCreateSubmit}
            onClick={(e) => e.stopPropagation()}
            className="rounded-3xl border border-slate-300 bg-white p-5 sm:p-6 transition-colors duration-150 shadow-xs space-y-4 select-none animate-in fade-in duration-150"
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

    </div>
  );
};
