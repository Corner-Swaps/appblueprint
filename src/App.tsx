import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PHASES_DATA } from './data/phases';
import { SETUP_STEPS_PHASE } from './data/setupSteps';
import { ChecklistItem, Phase, Project } from './types';
import { GuardrailSection } from './components/GuardrailSection';
import { AllPhasesPage } from './components/AllPhasesPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { SplashScreen } from './components/SplashScreen';
import { LegalConsentModal } from './components/LegalConsentModal';
import { NativeReviewPromptModal } from './components/NativeReviewPromptModal';
import { requestNativeStoreReview } from './utils/nativeReview';
import { Capacitor } from '@capacitor/core';
import { useFluidDragReorder } from './hooks/useFluidDragReorder';
import { renderPhaseIcon } from './utils/renderPhaseIcon';
import { getPhaseTheme } from './utils/phaseThemes';
import { triggerAllCompleteConfetti, triggerPhaseCompleteConfetti } from './utils/confetti';
import { triggerHaptic } from './utils/haptics';
import { ImpactStyle } from '@capacitor/haptics';
import { 
  CheckCircle2, 
  Folder, 
  SlidersHorizontal, 
  RotateCcw,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  Check,
  User
} from 'lucide-react';
import { UnifiedAppHeader } from './components/UnifiedAppHeader';
import { PhaseRoadmapSidebar } from './components/PhaseRoadmapSidebar';
import { ResourcesSidebar } from './components/ResourcesSidebar';
import { ResourceCategory } from './data/resources';
import { PhoneModal } from './components/PhoneModal';
import { PaywallModal } from './components/PaywallModal';

const TAB_KEYS: Array<'checklist' | 'resources' | 'projects' | 'profile'> = ['checklist', 'resources', 'projects', 'profile'];
const TAB_INDEX_MAP: Record<'checklist' | 'resources' | 'projects' | 'profile', number> = {
  checklist: 0,
  resources: 1,
  projects: 2,
  profile: 3,
};
const DOCK_SLOT_DISTANCE = 68; // 56px slot + 12px gap
const DOCK_PADDING = 8;

const PROJECTS_STORAGE_KEY = 'appblueprint_projects_v1';
const ACTIVE_PROJECT_STORAGE_KEY = 'appblueprint_active_proj_id_v1';

export const PROJECT_COLORS = [
  '#3B82F6', // Electric Blue
  '#8B5CF6', // Purple
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red / Coral
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
];

export const getProjectColor = (project: Project, index: number = 0): string => {
  if (project.color) return project.color;
  return PROJECT_COLORS[index % PROJECT_COLORS.length];
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'My Mobile App',
    color: '#3B82F6',
    createdAt: new Date().toISOString(),
    completedItemIds: ['p1-problem-solution', 'p1-scope-pruning', 'p4-keychain-keystore'],
  },
  {
    id: 'proj-2',
    name: 'Fitness Tracker v1',
    color: '#8B5CF6',
    createdAt: new Date().toISOString(),
    completedItemIds: [],
  }
];

export const App: React.FC = () => {
  // Multi-Project State
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(PROJECTS_STORAGE_KEY) || localStorage.getItem('launchready_projects_v7') || localStorage.getItem('launchready_projects_v6') || localStorage.getItem('launchready_projects_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Project) => ({
            ...p,
            phaseOrder: p.phaseOrder,
            deletedPhaseIds: p.deletedPhaseIds || [],
            completedItemIds: (p.completedItemIds || []).map(id => id === 'p4-keychain' ? 'p4-keychain-keystore' : id)
          }));
        }
      }
    } catch (e) {
      console.warn('Failed to load saved projects', e);
    }
    return DEFAULT_PROJECTS;
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_PROJECT_STORAGE_KEY) || localStorage.getItem('launchready_active_proj_id_v7') || localStorage.getItem('launchready_active_proj_id_v6') || localStorage.getItem('launchready_active_proj_id_v5');
      if (saved) return saved;
    } catch (e) {
      console.warn('Failed to load active project id', e);
    }
    return 'proj-1';
  });

  // Pages & Navigation
  const [activeTab, setActiveTab] = useState<'checklist' | 'projects' | 'resources'>('checklist');
  const [displayedTab, setDisplayedTab] = useState<'checklist' | 'projects' | 'resources'>('checklist');
  const [previousTab, setPreviousTab] = useState<'checklist' | 'projects' | 'resources'>('checklist');
  const [isAllPhasesPageOpen, setIsAllPhasesPageOpen] = useState(false);
  const [isGlobalEditMode, setIsGlobalEditMode] = useState(false);
  const [collapseSignal, setCollapseSignal] = useState(0);
  const [resourcesCollapseSignal, setResourcesCollapseSignal] = useState(0);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  // Single-Accordion Mode: Only ONE phase is open at a time (defaults to Set Up)
  const [openPhaseId, setOpenPhaseId] = useState<string | null>(SETUP_STEPS_PHASE.id);

  // Academy Resources 2-Column: Active category (defaults to AI Models)
  const [activeResourceCategoryId, setActiveResourceCategoryId] = useState<ResourceCategory>('ai_models');

  // Platform Filter State (All / iOS / Android)
  const [activePlatform, setActivePlatform] = useState<'all' | 'ios' | 'android'>('all');
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  // Splash Loading Screen: Only shown on initial cold start on native mobile platforms
  const [showSplash, setShowSplash] = useState(() => Capacitor.isNativePlatform());

  // Set body background to cream once splash is completed (or on web)
  useEffect(() => {
    if (!showSplash) {
      document.documentElement.style.backgroundColor = '#FAF8F6';
      document.body.style.backgroundColor = '#FAF8F6';
    }
  }, [showSplash]);

  // Legal Consent State (On native mobile; web visitors can explore immediately)
  const [showLegalModal, setShowLegalModal] = useState<boolean>(() => {
    if (!Capacitor.isNativePlatform()) return false;
    try {
      return !localStorage.getItem('appblueprint_legal_agreed_v1') && !localStorage.getItem('launchready_legal_agreed_v1');
    } catch {
      return false;
    }
  });

  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleCloseReview = () => {
    setShowReviewModal(false);
  };

  const handleSubmitReview = (rating: number) => {
    setShowReviewModal(false);
    if (rating >= 4) {
      triggerPhaseCompleteConfetti();
    }
  };

  // Track session visit count for authentic native App Store / Google Play review prompt (at 15 and 30 visits, never > 30)
  useEffect(() => {
    try {
      const sessionCounted = sessionStorage.getItem('appblueprint_session_counted') || sessionStorage.getItem('launchready_session_counted');
      let currentVisits = parseInt(localStorage.getItem('appblueprint_visits_count') || localStorage.getItem('launchready_visits_count') || '0', 10);

      if (!sessionCounted) {
        currentVisits += 1;
        localStorage.setItem('appblueprint_visits_count', currentVisits.toString());
        sessionStorage.setItem('appblueprint_session_counted', 'true');
      }

      if (showSplash || showLegalModal) return;

      const hasReviewed15 = localStorage.getItem('appblueprint_review_prompted_15') || localStorage.getItem('launchready_review_prompted_15');
      const hasReviewed30 = localStorage.getItem('appblueprint_review_prompted_30') || localStorage.getItem('launchready_review_prompted_30');

      if (currentVisits === 15 && !hasReviewed15) {
        localStorage.setItem('appblueprint_review_prompted_15', 'true');
        localStorage.setItem('launchready_review_prompted_15', 'true');
        const timer = setTimeout(() => {
          if (Capacitor.isNativePlatform()) {
            requestNativeStoreReview();
          } else {
            setShowReviewModal(true);
          }
        }, 1500);
        return () => clearTimeout(timer);
      } else if (currentVisits === 30 && !hasReviewed30) {
        localStorage.setItem('appblueprint_review_prompted_30', 'true');
        localStorage.setItem('launchready_review_prompted_30', 'true');
        const timer = setTimeout(() => {
          if (Capacitor.isNativePlatform()) {
            requestNativeStoreReview();
          } else {
            setShowReviewModal(true);
          }
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Failed to compute visit count', e);
    }
  }, [showSplash, showLegalModal]);

  const handleAcceptLegal = () => {
    try {
      localStorage.setItem('appblueprint_legal_agreed_v1', 'true');
      localStorage.setItem('launchready_legal_agreed_v1', 'true');
    } catch (e) {
      console.warn('Failed to save legal agreement', e);
    }
    setShowLegalModal(false);
  };

  // Page Horizontal Swipe Tracking
  const pageTouchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleSelectTab = (tab: 'checklist' | 'projects' | 'resources') => {
    if (tab === 'checklist') {
      setCollapseSignal(prev => prev + 1);
      window.dispatchEvent(new CustomEvent('collapse-all'));
      window.dispatchEvent(new CustomEvent('collapse-subsections'));
    } else if (tab === 'resources') {
      setResourcesCollapseSignal(prev => prev + 1);
      window.dispatchEvent(new CustomEvent('collapse-resources'));
      window.dispatchEvent(new CustomEvent('collapse-all'));
      window.dispatchEvent(new CustomEvent('collapse-subsections'));
    } else {
      window.dispatchEvent(new CustomEvent('collapse-subsections'));
    }

    if (tab === activeTab) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      triggerHaptic(ImpactStyle.Light);
      return;
    }
    setIsGlobalEditMode(false);
    setIsAllPhasesPageOpen(false);
    setPreviousTab(activeTab);
    setActiveTab(tab);
    triggerHaptic(ImpactStyle.Light);
    React.startTransition(() => {
      setDisplayedTab(tab);
    });
  };

  const handlePageTouchStart = (e: React.TouchEvent) => {
    if (window.innerHeight - e.touches[0].clientY < 115) return;
    pageTouchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handlePageTouchEnd = (e: React.TouchEvent) => {
    if (!pageTouchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - pageTouchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - pageTouchStartRef.current.y;
    const dt = Date.now() - pageTouchStartRef.current.time;
    pageTouchStartRef.current = null;

    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.8 && dt < 600) {
      const MAIN_TABS: Array<'checklist' | 'resources' | 'projects'> = ['checklist', 'resources', 'projects'];
      const currentIdx = TAB_INDEX_MAP[activeTab];
      if (dx < 0 && currentIdx < 2) {
        handleSelectTab(MAIN_TABS[currentIdx + 1]);
      } else if (dx > 0 && currentIdx > 0) {
        handleSelectTab(MAIN_TABS[currentIdx - 1]);
      }
    }
  };

  const currentSlotIndex = isPaywallOpen ? 3 : TAB_INDEX_MAP[activeTab];
  const targetLensX = currentSlotIndex * DOCK_SLOT_DISTANCE;

  // Filter State - One Phase at a time (defaults to Setup)
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(SETUP_STEPS_PHASE.id);
  const [filterMode, setFilterMode] = useState<'all' | 'completed'>('all');

  // Active Project Reference
  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || projects[0] || DEFAULT_PROJECTS[0];
  }, [projects, activeProjectId]);

  const activeProjectColor = useMemo(() => {
    const idx = projects.findIndex(p => p.id === activeProject.id);
    return getProjectColor(activeProject, idx >= 0 ? idx : 0);
  }, [projects, activeProject]);

  // Deleted Phases for the Active Project
  const deletedPhases = useMemo<Phase[]>(() => {
    const deletedIds = activeProject.deletedPhaseIds || [];
    if (deletedIds.length === 0) return [];
    const allAvailablePhases: Phase[] = [
      ...PHASES_DATA,
      ...(activeProject.customPhases || [])
    ];
    return allAvailablePhases.filter(p => deletedIds.includes(p.id));
  }, [activeProject.deletedPhaseIds, activeProject.customPhases]);

  // Dynamic Phases for the Active Project (Includes Set Up as foundational step)
  const currentProjectPhases = useMemo<Phase[]>(() => {
    const allAvailablePhases: Phase[] = [
      SETUP_STEPS_PHASE,
      ...PHASES_DATA,
      ...(activeProject.customPhases || [])
    ].filter(p => !(activeProject.deletedPhaseIds || []).includes(p.id));

    const phasesWithCustomItems = allAvailablePhases.map(phase => {
      const customItemsForPhase = activeProject.customItems?.[phase.id];
      return {
        ...phase,
        items: customItemsForPhase ? customItemsForPhase : phase.items
      };
    });

    if (activeProject.phaseOrder && activeProject.phaseOrder.length > 0) {
      const phaseMap = new Map(phasesWithCustomItems.map(p => [p.id, p]));
      const ordered: Phase[] = [];

      // If legacy phaseOrder didn't include phase-setup, ensure phase-setup stays at the beginning
      if (!activeProject.phaseOrder.includes(SETUP_STEPS_PHASE.id)) {
        const setupP = phaseMap.get(SETUP_STEPS_PHASE.id);
        if (setupP) {
          ordered.push(setupP);
          phaseMap.delete(SETUP_STEPS_PHASE.id);
        }
      }

      activeProject.phaseOrder.forEach(id => {
        const p = phaseMap.get(id);
        if (p) {
          ordered.push(p);
          phaseMap.delete(id);
        }
      });
      phaseMap.forEach(p => ordered.push(p));
      return ordered.map((p, idx) => ({
        ...p,
        number: p.id === SETUP_STEPS_PHASE.id ? 0 : (p.number || idx + 1)
      }));
    }

    return phasesWithCustomItems.map((p, idx) => ({
      ...p,
      number: p.id === SETUP_STEPS_PHASE.id ? 0 : (p.number || idx + 1)
    }));
  }, [activeProject]);

  // Flattened Checklist Items across all current project phases (including Set Up)
  const allItems = useMemo(() => {
    return currentProjectPhases.flatMap(p => p.items);
  }, [currentProjectPhases]);

  const validItemIdsSet = useMemo(() => new Set(allItems.map(i => i.id)), [allItems]);

  const completedItemIds = useMemo(() => {
    return (activeProject.completedItemIds || []).filter(id => validItemIdsSet.has(id));
  }, [activeProject.completedItemIds, validItemIdsSet]);

  // Sync Projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
      localStorage.setItem(ACTIVE_PROJECT_STORAGE_KEY, activeProjectId);
    } catch (e) {
      console.warn('Failed to persist projects state', e);
    }
  }, [projects, activeProjectId]);

  // Ensure activeProjectId is never orphaned
  useEffect(() => {
    if (!projects.some(p => p.id === activeProjectId) && projects.length > 0) {
      setActiveProjectId(projects[0].id);
    }
  }, [projects, activeProjectId]);

  // Ensure Light Mode (No pitch black)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('launchready_theme');
    localStorage.removeItem('appblueprint_theme');
  }, []);

  // Whenever switching tabs away from checklist, guarantee edit mode is dismissed
  useEffect(() => {
    if (activeTab !== 'checklist') {
      setIsGlobalEditMode(false);
    }
  }, [activeTab]);

  // Prevent background scroll when full modal pages are open
  useEffect(() => {
    if (isAllPhasesPageOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAllPhasesPageOpen]);

  // Toggle Item Completion for active project
  const handleToggleComplete = (itemId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          const exists = proj.completedItemIds.includes(itemId);
          const updated = exists
            ? proj.completedItemIds.filter(id => id !== itemId)
            : [...proj.completedItemIds, itemId];
          return { ...proj, completedItemIds: updated };
        }
        return proj;
      })
    );
  };

  // Add Item to a Phase
  const handleAddItem = (phaseId: string, title: string, description: string) => {
    const newItem: ChecklistItem = {
      id: `item-${Date.now()}`,
      phaseId,
      title,
      shortDescription: description || title,
      category: 'functionality',
      platform: 'both',
      priority: 'high',
      whyItMatters: description || 'Required for production launch quality and platform compliance.',
      implementationSteps: [description || 'Implement requirement according to platform specifications and test locally.'],
      commonRejectionTraps: ['Missing runtime permissions or crash on physical devices.'],
      verificationQuestions: ['Is this feature verified on both iOS and Android?'],
      agentPrompt: `You are the autonomous senior mobile software engineer and architect responsible for building this application. Do NOT ask the user to write code, configure settings, or perform manual research—implement this requirement completely and autonomously in our codebase.

TASK:
Implement "${title}" thoroughly and completely.

CONTEXT:
${description || 'Production quality and compliance requirement for store submission.'}

EXECUTION PROTOCOL FOR THE AGENT:
1. Identify all relevant files, configuration targets, and API endpoints across the codebase.
2. Write complete, production-ready, clean TypeScript/JavaScript or native code.
3. Verify type correctness, error handling, and offline resilience.
4. Confirm no compiler errors or unresolved dependencies remain.`,
    };

    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          const existingItems = proj.customItems?.[phaseId] || 
            (currentProjectPhases.find(p => p.id === phaseId)?.items || []);
          return {
            ...proj,
            customItems: {
              ...(proj.customItems || {}),
              [phaseId]: [...existingItems, newItem]
            }
          };
        }
        return proj;
      })
    );
  };

  // Reorder Items in a Phase
  const handleReorderItems = (phaseId: string, newItems: ChecklistItem[]) => {
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          return {
            ...proj,
            customItems: {
              ...(proj.customItems || {}),
              [phaseId]: newItems
            }
          };
        }
        return proj;
      })
    );
  };

  // Delete an Item from a Phase
  const handleDeleteItem = (phaseId: string, itemId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          const existingItems = proj.customItems?.[phaseId] || 
            (currentProjectPhases.find(p => p.id === phaseId)?.items || []);
          const updatedItems = existingItems.filter(i => i.id !== itemId);
          return {
            ...proj,
            completedItemIds: (proj.completedItemIds || []).filter(id => id !== itemId),
            customItems: {
              ...(proj.customItems || {}),
              [phaseId]: updatedItems
            }
          };
        }
        return proj;
      })
    );
  };

  // Add New Custom Phase
  const handleAddPhase = (title: string, shortTitle: string, description: string) => {
    const newPhaseId = `custom-phase-${Date.now()}`;
    const newPhase: Phase = {
      id: newPhaseId,
      number: currentProjectPhases.length + 1,
      title,
      shortTitle: shortTitle || title,
      description: description || 'Custom checklist phase section',
      iconName: 'ShieldCheck',
      items: []
    };

    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          const customPhases = [...(proj.customPhases || []), newPhase];
          const currentOrder = proj.phaseOrder || currentProjectPhases.map(p => p.id);
          return {
            ...proj,
            customPhases,
            phaseOrder: [...currentOrder, newPhaseId]
          };
        }
        return proj;
      })
    );
  };

  // Reorder Phases
  const handleReorderPhases = (reordered: Phase[]) => {
    const newOrder = reordered.map(p => p.id);
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          return {
            ...proj,
            phaseOrder: newOrder
          };
        }
        return proj;
      })
    );
  };

  // Fresh Restart
  const handleFreshRestartPhases = () => {
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          return {
            ...proj,
            phaseOrder: undefined,
            deletedPhaseIds: []
          };
        }
        return proj;
      })
    );
    setIsGlobalEditMode(false);
    setCollapseSignal(prev => prev + 1);
    setSelectedPhaseId(SETUP_STEPS_PHASE.id);
    setOpenPhaseId(SETUP_STEPS_PHASE.id);
    triggerHaptic(ImpactStyle.Medium);
  };

  // Toggle Global Rearrange
  const handleToggleGlobalRearrange = () => {
    setCollapseSignal(prev => prev + 1);
    setIsGlobalEditMode(prev => {
      const next = !prev;
      triggerHaptic(ImpactStyle.Light);
      return next;
    });
  };

  // Move Phase Up or Down
  const handleMovePhase = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= currentProjectPhases.length) return;
    const reordered = [...currentProjectPhases];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    handleReorderPhases(reordered);
  };

  // Delete a Phase Section
  const handleDeletePhase = (phaseId: string) => {
    const targetPhase = currentProjectPhases.find(p => p.id === phaseId);
    const title = targetPhase ? `"${targetPhase.title}"` : 'this section';
    if (!window.confirm(`Delete step section ${title}? You can restore it later from the bottom of the page.`)) {
      return;
    }
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          const currentDeleted = proj.deletedPhaseIds || [];
          const updatedDeleted = currentDeleted.includes(phaseId) ? currentDeleted : [...currentDeleted, phaseId];
          return {
            ...proj,
            customPhases: (proj.customPhases || []).filter(p => p.id !== phaseId),
            phaseOrder: (proj.phaseOrder || []).filter(id => id !== phaseId),
            deletedPhaseIds: updatedDeleted
          };
        }
        return proj;
      })
    );
    if (selectedPhaseId === phaseId) {
      setSelectedPhaseId(SETUP_STEPS_PHASE.id);
      setOpenPhaseId(SETUP_STEPS_PHASE.id);
    }
  };

  // Delete a Project
  const handleDeleteProject = (projId: string) => {
    if (projects.length <= 1) {
      alert('You must have at least one project.');
      return;
    }

    const projToDelete = projects.find(p => p.id === projId);
    const projName = projToDelete ? `"${projToDelete.name}"` : 'this project';

    if (window.confirm(`Are you sure you want to delete ${projName}?`)) {
      const remaining = projects.filter(p => p.id !== projId);
      setProjects(remaining);
      if (activeProjectId === projId) {
        setActiveProjectId(remaining[0].id);
      }
    }
  };

  // Restore a Deleted Phase back to the active checklist
  const handleRestorePhase = (phaseId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          const currentDeleted = proj.deletedPhaseIds || [];
          const currentOrder = proj.phaseOrder || [];
          const updatedOrder = currentOrder.includes(phaseId) ? currentOrder : [...currentOrder, phaseId];
          return {
            ...proj,
            deletedPhaseIds: currentDeleted.filter(id => id !== phaseId),
            phaseOrder: updatedOrder
          };
        }
        return proj;
      })
    );
  };

  // Restore All Deleted Phases
  const handleRestoreAllPhases = () => {
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          return {
            ...proj,
            deletedPhaseIds: [],
            phaseOrder: undefined
          };
        }
        return proj;
      })
    );
  };

  // Overall Statistics for Active Project
  const totalAll = allItems.length;
  const completedAll = completedItemIds.length;
  const overallPercent = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0;

  // Celebrate when 100%
  const wasOverall100Ref = useRef(overallPercent === 100 && totalAll > 0);

  useEffect(() => {
    wasOverall100Ref.current = overallPercent === 100 && totalAll > 0;
  }, [activeProjectId]);

  useEffect(() => {
    if (!wasOverall100Ref.current && overallPercent === 100 && totalAll > 0) {
      triggerAllCompleteConfetti();
    }
    wasOverall100Ref.current = overallPercent === 100 && totalAll > 0;
  }, [overallPercent, totalAll]);

  // Filter items for each phase (all or completed, and platform)
  const getFilteredItemsForPhase = (items: ChecklistItem[]) => {
    return items.filter(item => {
      // Platform filter
      if (activePlatform === 'ios' && item.platform === 'android') return false;
      if (activePlatform === 'android' && item.platform === 'ios') return false;

      // Completion filter
      const isDone = completedItemIds.includes(item.id);
      if (filterMode === 'completed' && !isDone) return false;
      return true;
    });
  };

  const handleTogglePhase = (phaseId: string) => {
    setOpenPhaseId(prev => (prev === phaseId ? null : phaseId));
  };

  const handleSelectPhaseFromSidebar = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    setActiveTab('checklist');
    setDisplayedTab('checklist');
    setOpenPhaseId(phaseId);
    setTimeout(() => {
      const el = document.getElementById(phaseId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  // Visible Phases based on selected filter: Shows ONLY the selected phase (one thing at a time)
  const visiblePhases = useMemo(() => {
    return currentProjectPhases.filter(p => p.id === selectedPhaseId);
  }, [selectedPhaseId, currentProjectPhases]);

  // Active Phase Filtered Items (for checking empty states cleanly)
  const activePhaseFilteredItems = useMemo(() => {
    if (selectedPhaseId === SETUP_STEPS_PHASE.id) {
      return getFilteredItemsForPhase(
        activeProject.customItems?.[SETUP_STEPS_PHASE.id] || SETUP_STEPS_PHASE.items
      );
    }
    const currentPhase = currentProjectPhases.find(p => p.id === selectedPhaseId);
    return currentPhase ? getFilteredItemsForPhase(currentPhase.items) : [];
  }, [selectedPhaseId, activeProject.customItems, currentProjectPhases, filterMode, activePlatform, completedItemIds]);

  // Fluid drag-and-drop reordering for phases in main feed
  const {
    handleDragStart: handleDragStartPhase,
    getItemStyle: getPhaseDragStyle,
    bindItemRef: bindPhaseRef,
  } = useFluidDragReorder({
    items: visiblePhases,
    enabled: isGlobalEditMode,
    onReorder: handleReorderPhases,
  });

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#1E2022] flex flex-col font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
      
      {/* 1. Unified App Header at top: Centered, widened progress bar, Academy indicator for resources, no refresh button */}
      <UnifiedAppHeader
        overallPercent={overallPercent}
        totalItems={allItems.length}
        completedItems={completedItemIds.length}
        activeTab={displayedTab}
      />

      {/* Launch Loading Animation Overlay for Native Mobile */}
      {showSplash && Capacitor.isNativePlatform() && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Top Fade Vignette Effect (Only for Native Mobile Status Bar) */}
      {Capacitor.isNativePlatform() && (
        <div 
          className="fixed top-0 left-0 right-0 pointer-events-none z-30 bg-gradient-to-b from-[#FAF8F6] via-[#FAF8F6]/80 to-transparent"
          style={{ height: 'max(calc(env(safe-area-inset-top, 0px) + 8px), 48px)' }}
          aria-hidden="true" 
        />
      )}

      {/* Bottom Fade Vignette Effect */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-28 pointer-events-none z-30 bg-gradient-to-t from-[#FAF8F6] via-[#FAF8F6]/90 to-transparent" 
        aria-hidden="true" 
      />

      {/* 2. Main Content Container: Widened 2-column desktop grid (col-span-5 left, col-span-7 right) */}
      <main 
        onTouchStart={handlePageTouchStart}
        onTouchEnd={handlePageTouchEnd}
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32 lg:pb-20 overflow-x-hidden"
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left Column (Desktop lg+): col-span-5 moved to the right for wider titles without ellipsis */}
          {displayedTab === 'checklist' && (
            <div className="hidden lg:block lg:col-span-5 self-start">
              <PhaseRoadmapSidebar
                activeProjectName={activeProject.name}
                onSelectProject={() => handleSelectTab('projects')}
                phases={currentProjectPhases}
                setupPhase={SETUP_STEPS_PHASE}
                completedItemIds={completedItemIds}
                activePhaseId={selectedPhaseId}
                activePlatform={activePlatform}
                onSelectPlatform={setActivePlatform}
                onSelectPhase={handleSelectPhaseFromSidebar}
                onOpenManagePhases={() => setIsAllPhasesPageOpen(true)}
                onMovePhase={handleMovePhase}
              />
            </div>
          )}

          {displayedTab === 'resources' && (
            <div className="hidden lg:block lg:col-span-5 self-start">
              <ResourcesSidebar
                activeCategoryId={activeResourceCategoryId}
                onSelectCategory={setActiveResourceCategoryId}
              />
            </div>
          )}

          {/* Right Column: The App housed in the big panel containing everything together (col-span-7) */}
          <div className={`${displayedTab === 'projects' ? 'lg:col-span-12' : 'lg:col-span-7'} w-full min-w-0`}>
            {/* 1. Checklist Tab */}
            <div className={displayedTab === 'checklist' ? '' : 'hidden'}>
              {/* Mobile Project & Platform Controls (< lg) */}
              <div className="lg:hidden space-y-2.5 pb-1 mb-4">
                <button
                  type="button"
                  onClick={() => handleSelectTab('projects')}
                  className="w-full apple-press flex items-center justify-between p-3 rounded-2xl bg-white/95 border border-black/8 shadow-xs"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <Folder className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Project</div>
                      <div className="text-xs font-black text-slate-900 truncate font-google">{activeProject.name}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <div className="bg-white/95 rounded-2xl border border-black/8 shadow-xs p-1 flex items-center justify-between gap-1 select-none">
                  <button
                    type="button"
                    onClick={() => setActivePlatform('all')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                      activePlatform === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    All (101)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePlatform('ios')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center space-x-1 ${
                      activePlatform === 'ios' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    <span>iOS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePlatform('android')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center space-x-1 ${
                      activePlatform === 'android' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    <span>Android</span>
                  </button>
                </div>

                {/* Mobile Phase Switcher Pills (< lg): Smooth horizontal scroll */}
                <div className="-mx-4 px-4 overflow-x-auto no-scrollbar flex items-center space-x-2 select-none pt-1">
                  {currentProjectPhases.map(phase => {
                    const isActive = selectedPhaseId === phase.id;
                    const isSetup = phase.id === SETUP_STEPS_PHASE.id || phase.number === 0;
                    return (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => handleSelectPhaseFromSidebar(phase.id)}
                        className={`apple-press px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center space-x-1.5 transition-all border ${
                          isActive
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 shadow-2xs'
                        }`}
                      >
                        <span>{isSetup ? 'Set Up' : `Phase ${phase.number}: ${phase.shortTitle || phase.title}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* The Big Panel containing everything together */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-black/8 shadow-xl p-4 sm:p-6 lg:p-7 space-y-4 lg:mt-0">
                {/* Panel Top Header Bar: Clean Filter Mode (All / Completed), NO 'iOS HIG Only' badge, NO duplicate project button */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-black/5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-700 font-google uppercase tracking-wider">
                      Requirements Checklist
                    </span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {activePlatform === 'ios' ? 'Apple iOS Guardrails' : activePlatform === 'android' ? 'Google Play Guardrails' : 'All Platform Guardrails'}
                    </span>
                  </div>

                  {/* Filter Mode Pills: All vs Completed & Edit Mode Toggle */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60 text-xs select-none">
                      <button
                        type="button"
                        onClick={() => setFilterMode('all')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                          filterMode === 'all'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => setFilterMode('completed')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                          filterMode === 'completed'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Completed ({completedItemIds.length})
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsGlobalEditMode(!isGlobalEditMode)}
                      className={`apple-press inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                        isGlobalEditMode
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/60'
                      }`}
                      title={isGlobalEditMode ? "Done editing" : "Edit and reorder"}
                    >
                      {isGlobalEditMode ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Done</span>
                        </>
                      ) : (
                        <>
                          <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.2]" />
                          <span>Edit</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Main Feed: The Interactive Sections with Single-Accordion Mode */}
                <div className="space-y-4 pt-1">
                  {visiblePhases.map((phase) => (
                    <div 
                      key={phase.id}
                      id={phase.id}
                    >
                      <GuardrailSection
                        phase={phase}
                        phaseIndex={currentProjectPhases.findIndex(p => p.id === phase.id)}
                        totalPhases={currentProjectPhases.length}
                        items={getFilteredItemsForPhase(phase.items)}
                        completedItemIds={completedItemIds}
                        onToggleComplete={handleToggleComplete}
                        isExpanded={openPhaseId === phase.id}
                        onToggleExpandSection={handleTogglePhase}
                        onAddItem={handleAddItem}
                        onReorderItems={handleReorderItems}
                        onDeleteItem={handleDeleteItem}
                        onMovePhase={handleMovePhase}
                        onDeletePhase={handleDeletePhase}
                        isGlobalEditMode={isGlobalEditMode}
                        collapseSignal={collapseSignal}
                        onDragStartPhase={handleDragStartPhase}
                        onToggleGlobalEdit={handleToggleGlobalRearrange}
                      />
                    </div>
                  ))}

                  {/* Empty State when no items match filter in this section */}
                  {activePhaseFilteredItems.length === 0 && (
                    <div className="p-8 rounded-3xl bg-white border border-slate-200/90 text-center space-y-3 shadow-xs">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900 font-google">
                          {filterMode === 'completed' ? 'No Completed Requirements Yet' : 'All Requirements Verified!'}
                        </h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">
                          {filterMode === 'completed'
                            ? `You haven't marked any requirements as completed yet in this section. Tap the circle checkmark on any requirement to mark it done!`
                            : `Great job! All items in this section are verified for ${activeProject.name}.`}
                        </p>
                      </div>
                      {filterMode === 'completed' && (
                        <button
                          onClick={() => setFilterMode('all')}
                          className="apple-press px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs shadow-xs border border-slate-300"
                        >
                          View All Requirements
                        </button>
                      )}
                    </div>
                  )}

                  {/* Deleted Sections Pill */}
                  {deletedPhases.length > 0 && (
                    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-colors duration-150 shadow-xs space-y-4">
                      <div className="w-full flex items-start justify-between select-none">
                        <div className="flex items-start space-x-3.5 pr-2 select-none flex-1">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs text-slate-700">
                            <RotateCcw className="w-6 h-6 stroke-[2.2]" />
                          </div>

                          <div className="space-y-1 select-none flex-1">
                            <div className="flex items-center space-x-2 select-none mt-0.5">
                              <span className="h-[20px] px-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200/80 shadow-xs select-none inline-flex items-center justify-center pt-[1.5px] leading-none">
                                Deleted ({deletedPhases.length})
                              </span>
                              <span className="text-xs text-slate-400 select-none">•</span>
                              <span className="text-xs font-bold text-slate-600 select-none">
                                Tap Restore to Re-add
                              </span>
                            </div>

                            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug select-none font-google">
                              Deleted Sections
                            </h2>
                          </div>
                        </div>

                        {deletedPhases.length > 1 && (
                          <button
                            type="button"
                            onClick={handleRestoreAllPhases}
                            className="apple-press text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shrink-0 transition-colors"
                            title="Restore All Deleted Sections"
                          >
                            Restore All
                          </button>
                        )}
                      </div>

                      <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none">
                        Sections you have removed are kept here so you can restore them at any time.
                      </p>

                      <div className="space-y-2.5 pt-1">
                        {deletedPhases.map((delPhase) => {
                          const delTheme = getPhaseTheme(delPhase.number);
                          return (
                            <div 
                              key={delPhase.id} 
                              className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 flex items-center justify-between transition-colors duration-150"
                            >
                              <div className="flex items-center space-x-3 min-w-0 pr-2">
                                <div className={`w-9 h-9 rounded-xl ${delTheme.iconBg} flex items-center justify-center text-white shrink-0 shadow-2xs`}>
                                  {renderPhaseIcon(delPhase.iconName, "w-4 h-4 text-white stroke-[2.2]")}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center space-x-1.5 mt-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                      Step {delPhase.number}
                                    </span>
                                    <span className="text-xs text-slate-300">•</span>
                                    <span className="text-xs text-slate-500">
                                      {delPhase.items.length} items
                                    </span>
                                  </div>
                                  <h3 className="text-sm font-bold text-slate-900 truncate font-google">
                                    {delPhase.title}
                                  </h3>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRestorePhase(delPhase.id)}
                                className="apple-press px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs shrink-0 transition-colors"
                                title={`Restore Step ${delPhase.number}`}
                              >
                                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Restore</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Projects Tab */}
            <div className={displayedTab === 'projects' ? 'block' : 'hidden'}>
              <ProjectsPage
                projects={projects}
                activeProjectId={activeProject.id}
                totalRequirementsCount={allItems.length}
                onSelectProject={(projId) => {
                  setIsGlobalEditMode(false);
                  setActiveProjectId(projId);
                  setSelectedPhaseId('all');
                  setFilterMode('all');
                  handleSelectTab('checklist');
                  window.dispatchEvent(new CustomEvent('collapse-all'));
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                onRenameProject={(projId, newName) => {
                  setProjects(prev => prev.map(p => p.id === projId ? { ...p, name: newName } : p));
                }}
                onDeleteProject={(projId) => {
                  handleDeleteProject(projId);
                }}
                onCreateProject={(name, color) => {
                  const newProj: Project = {
                    id: `proj-${Date.now()}`,
                    name: name,
                    color: color,
                    createdAt: new Date().toISOString(),
                    completedItemIds: [],
                    deletedPhaseIds: [],
                    phaseOrder: undefined,
                    customPhases: [],
                    customItems: {},
                  };
                  setProjects(prev => [...prev, newProj]);
                  setActiveProjectId(newProj.id);
                  setSelectedPhaseId('all');
                  setFilterMode('all');
                  handleSelectTab('checklist');
                  window.dispatchEvent(new CustomEvent('collapse-all'));
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                onBackToChecklist={() => {
                  handleSelectTab('checklist');
                }}
              />
            </div>

            {/* 3. Resources Tab */}
            <div className={displayedTab === 'resources' ? 'block' : 'hidden'}>
              <ResourcesPage 
                activeCategoryId={activeResourceCategoryId}
                onSelectCategory={setActiveResourceCategoryId}
                collapseSignal={resourcesCollapseSignal}
                onBackToChecklist={() => {
                  handleSelectTab('checklist');
                }} 
              />
            </div>
          </div>
        </div>
      </main>

      {/* 3. Floating Bottom Navigation Menu (iPhone Liquid Glass Interactive Dock) */}
      <div className="fixed ios-dock-bottom left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto relative select-none bg-white/80 dark:bg-black/70 backdrop-blur-2xl border border-white/70 dark:border-white/20 rounded-full p-[8px] flex items-center shadow-[0_16px_40px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)]"
        >
          {/* Dynamic Sliding Liquid Glass Pill */}
          <div
            className="absolute top-[8px] left-[8px] w-[56px] h-[56px] rounded-full border pointer-events-none transition-transform duration-[200ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform transform-gpu"
            style={{
              transform: `translate3d(${targetLensX}px, 0, 0)`,
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.88) 100%)',
              borderColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 6px 18px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.05), inset 0 1.5px 2px #fff, inset 0 -1px 1.5px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Top specular refraction sheen */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-white/70 pointer-events-none" />
          </div>

          {/* Interactive Menu Icon Buttons on Top of Glass Pill */}
          <div className="relative z-10 flex items-center space-x-[12px]">
            {/* 1. Sections / Checklist Button (56px) - Percent Counter with Edge-Forming Circular Progress Ring */}
            <button
              type="button"
              onClick={() => handleSelectTab('checklist')}
              className="apple-press w-[56px] h-[56px] rounded-full bg-transparent flex items-center justify-center relative shrink-0 cursor-pointer select-none"
              title={`Checklist Progress (${overallPercent}% complete)`}
              aria-label={`Checklist Progress ${overallPercent}%`}
            >
              {/* Circular Progress Ring that forms the outer edge of the button circle itself */}
              <svg className="absolute inset-0 w-[56px] h-[56px] -rotate-90 pointer-events-none" viewBox="0 0 56 56">
                <defs>
                  <linearGradient id="dockProgressGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />  {/* Royal Purple */}
                    <stop offset="50%" stopColor="#6366F1" /> {/* Indigo */}
                    <stop offset="100%" stopColor="#3B82F6" /> {/* Electric Blue */}
                  </linearGradient>
                </defs>
                <circle
                  cx="28"
                  cy="28"
                  r="26.75"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2.5"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="26.75"
                  fill="none"
                  stroke="url(#dockProgressGradient)"
                  strokeWidth="2.5"
                  strokeDasharray={168.08}
                  strokeDashoffset={168.08 - (overallPercent / 100) * 168.08}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                  style={{ opacity: activeTab === 'checklist' ? 1 : 0.6 }}
                />
              </svg>

              {/* Percentage Counter in Center */}
              <span
                className={`text-[13px] tracking-tight font-google relative z-10 select-none transition-colors duration-200 ${
                  activeTab === 'checklist' 
                    ? 'font-black text-slate-900' 
                    : 'font-bold text-slate-500'
                }`}
              >
                {overallPercent}%
              </span>
            </button>

            {/* 2. Graduation Cap / Developer Academy & Resources Button */}
            <button
              type="button"
              onClick={() => handleSelectTab('resources')}
              className="apple-press w-[56px] h-[56px] rounded-full bg-transparent flex items-center justify-center shrink-0 cursor-pointer select-none"
              title="Developer Academy & Resources"
              aria-label="Academy and Resources"
            >
              <GraduationCap 
                className={`w-[24px] h-[24px] stroke-[2.2] transition-colors duration-200 ${
                  activeTab === 'resources' 
                    ? 'text-purple-600' 
                    : 'text-slate-500'
                }`} 
              />
            </button>

            {/* 3. Folder / Projects Icon Button */}
            <button
              type="button"
              onClick={() => handleSelectTab('projects')}
              className="apple-press w-[56px] h-[56px] rounded-full bg-transparent flex items-center justify-center shrink-0 cursor-pointer select-none"
              title={`Switch Project (${activeProject.name})`}
              aria-label="Projects"
            >
              <Folder 
                className={`w-[24px] h-[24px] stroke-[2.2] transition-colors duration-200 ${
                  activeTab === 'projects' && !isPaywallOpen
                    ? 'text-blue-600' 
                    : 'text-slate-500'
                }`} 
              />
            </button>

            {/* 4. User / Account & Pro Paywall Icon Button */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic(ImpactStyle.Light);
                setIsPaywallOpen(true);
              }}
              className="apple-press w-[56px] h-[56px] rounded-full bg-transparent flex items-center justify-center shrink-0 cursor-pointer select-none"
              title="Account & Pro Membership"
              aria-label="Account & Pro Membership"
            >
              <User 
                className={`w-[24px] h-[24px] stroke-[2.2] transition-colors duration-200 ${
                  isPaywallOpen 
                    ? 'text-purple-600' 
                    : 'text-slate-500 hover:text-purple-600'
                }`} 
              />
            </button>
          </div>
        </nav>
      </div>

      {/* 5. Dedicated All Phases Page */}
      <AllPhasesPage
        isOpen={isAllPhasesPageOpen}
        onClose={() => {
          setIsGlobalEditMode(false);
          setIsAllPhasesPageOpen(false);
        }}
        phases={currentProjectPhases}
        completedItemIds={completedItemIds}
        onSelectPhase={(phaseId) => {
          setIsGlobalEditMode(false);
          setSelectedPhaseId('all');
          setPreviousTab(activeTab);
          setActiveTab('checklist');
          setIsAllPhasesPageOpen(false);
          window.dispatchEvent(new CustomEvent('expand-phase', { detail: phaseId }));
          setTimeout(() => {
            const el = document.getElementById(phaseId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 80);
        }}
        onReorderPhases={handleReorderPhases}
        onAddPhase={handleAddPhase}
        onDeletePhase={handleDeletePhase}
      />

      {/* Phone QR Code Modal */}
      <PhoneModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />

      {/* Mandatory First-Launch Terms of Service & Legal Disclaimer Modal */}
      {!showSplash && (
        <LegalConsentModal
          isOpen={showLegalModal}
          onAccept={handleAcceptLegal}
        />
      )}

      {/* Native Store Review Prompt */}
      {!showSplash && (
        <NativeReviewPromptModal
          isOpen={showReviewModal}
          onClose={handleCloseReview}
          onSubmit={handleSubmitReview}
        />
      )}

      {/* Website Stripe Paywall Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onUnlocked={() => {
          setIsPaywallOpen(false);
        }}
        targetProjectId={activeProject.id}
        targetProjectName={activeProject.name}
      />
    </div>
  );
};
