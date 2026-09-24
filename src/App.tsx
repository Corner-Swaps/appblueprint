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
import { PaywallModal } from './components/PaywallModal';
import { requestNativeStoreReview } from './utils/nativeReview';
import { isProUnlocked, canCreateNewProject, markFreeQuotaClaimed, recordProjectCreated } from './utils/paywall';
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
  Plus,
  X
} from 'lucide-react';
import { Website } from './components/Website/Website';
import { AppLauncherBar } from './components/Website/AppLauncherBar';

const TAB_KEYS: Array<'checklist' | 'resources' | 'projects'> = ['checklist', 'resources', 'projects'];
const TAB_INDEX_MAP: Record<'checklist' | 'resources' | 'projects', number> = {
  checklist: 0,
  resources: 1,
  projects: 2,
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
  }
];

export const App: React.FC = () => {
  // Multi-Project State (Fresh restart: phaseOrder resets so Idea, Audience & Project Setup is strictly Phase 1)
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(PROJECTS_STORAGE_KEY) || localStorage.getItem('launchready_projects_v7') || localStorage.getItem('launchready_projects_v6') || localStorage.getItem('launchready_projects_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Project) => ({
            ...p,
            phaseOrder: p.phaseOrder,
            deletedPhaseIds: (p.deletedPhaseIds || []).filter(
              id => id !== SETUP_STEPS_PHASE.id && id !== 'phase-setup' && id !== 'phase-0' && id !== 'setup'
            ),
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
  const [isAddingCustomPhase, setIsAddingCustomPhase] = useState(false);
  const [customPhaseTitle, setCustomPhaseTitle] = useState('');
  const [customPhaseDesc, setCustomPhaseDesc] = useState('');

  // Pro Creator Pass & Paywall
  const [isPro, setIsPro] = useState<boolean>(() => isProUnlocked());
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  // Fresh brand new user reset: ensure Pro / Unlimited pass is revoked and user has 1 project
  useEffect(() => {
    const FRESH_USER_KEY = 'appblueprint_fresh_brand_new_user_v7';
    if (!localStorage.getItem(FRESH_USER_KEY)) {
      localStorage.removeItem('appblueprint_unlimited_unlocked_v2');
      localStorage.removeItem('appblueprint_pro_unlocked_v1');
      localStorage.removeItem('appblueprint_purchased_slots_v2');
      localStorage.removeItem('appblueprint_creator_profile_v1');
      
      // Set to 1 creation used (the 1 free project)
      localStorage.setItem('appblueprint_creations_ever_v2', '1');
      localStorage.setItem('appblueprint_free_project_claimed_v1', 'true');
      
      // Reset projects list to 1 default project
      const initialProjects: Project[] = [
        {
          id: 'proj-1',
          name: 'My Mobile App',
          color: '#3B82F6',
          createdAt: new Date().toISOString(),
          completedItemIds: ['p1-problem-solution', 'p1-scope-pruning', 'p4-keychain-keystore'],
        }
      ];
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(initialProjects));
      setProjects(initialProjects);
      setActiveProjectId('proj-1');

      localStorage.setItem(FRESH_USER_KEY, 'true');
      setIsPro(false);
      window.dispatchEvent(new CustomEvent('appblueprint-pro-status-changed', { detail: { isPro: false } }));
    }
  }, []);

  useEffect(() => {
    const handleProChange = (e: any) => {
      setIsPro(e.detail?.isPro ?? isProUnlocked());
    };
    window.addEventListener('appblueprint-pro-status-changed', handleProChange);
    return () => window.removeEventListener('appblueprint-pro-status-changed', handleProChange);
  }, []);

  // View Mode: 'website' by default on web, 'app' if native platform or URL has #app or ?mode=app
  const [viewMode, setViewMode] = useState<'website' | 'app'>(() => {
    if (Capacitor.isNativePlatform()) return 'app';
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'app' || params.get('app') === 'true' || window.location.hash === '#app') {
        return 'app';
      }
    } catch {
      // fallback
    }
    return 'website';
  });

  // Hash and history navigation synchronization so back/forward buttons work smoothly
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    const handleNavigation = () => {
      if (window.location.hash === '#app') {
        setViewMode('app');
        setShowSplash(false);
      } else {
        setViewMode('website');
      }
    };
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

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
  // In compliance with Apple Guideline 5.6.1 and Google Play Policy, triggers official native SKStoreReviewController
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
    // When clicking the percentage icon (checklist tab), close all subcategories & phases
    if (tab === 'checklist') {
      setCollapseSignal(prev => prev + 1);
      window.dispatchEvent(new CustomEvent('collapse-all'));
      window.dispatchEvent(new CustomEvent('collapse-subsections'));
    } else if (tab === 'resources') {
      // When clicking the Academy & Resources icon, close all open sections & subcategories
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
      const currentIdx = TAB_INDEX_MAP[activeTab];
      if (dx < 0 && currentIdx < 2) {
        handleSelectTab(TAB_KEYS[currentIdx + 1]);
      } else if (dx > 0 && currentIdx > 0) {
        handleSelectTab(TAB_KEYS[currentIdx - 1]);
      }
    }
  };

  const currentSlotIndex = TAB_INDEX_MAP[activeTab];
  const targetLensX = currentSlotIndex * DOCK_SLOT_DISTANCE;

  // Filter State
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'completed'>('all');

  // Active Project Reference
  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || projects[0] || DEFAULT_PROJECTS[0];
  }, [projects, activeProjectId]);

  const activeProjectColor = useMemo(() => {
    const idx = projects.findIndex(p => p.id === activeProject.id);
    return getProjectColor(activeProject, idx >= 0 ? idx : 0);
  }, [projects, activeProject]);

  // Deleted Phases for the Active Project (shown in deleted pill at the bottom with restore capability)
  const deletedPhases = useMemo<Phase[]>(() => {
    const deletedIds = activeProject.deletedPhaseIds || [];
    if (deletedIds.length === 0) return [];
    const allAvailablePhases: Phase[] = [
      ...PHASES_DATA,
      ...(activeProject.customPhases || [])
    ];
    return allAvailablePhases.filter(p => deletedIds.includes(p.id));
  }, [activeProject.deletedPhaseIds, activeProject.customPhases]);

  // Dynamic Phases for the Active Project (incorporating customPhases, customItems, phaseOrder, and deletedPhaseIds)
  const currentProjectPhases = useMemo<Phase[]>(() => {
    const allAvailablePhases: Phase[] = [
      ...PHASES_DATA,
      ...(activeProject.customPhases || []).map(p => ({ ...p, iconName: 'Info' }))
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
      activeProject.phaseOrder.forEach(id => {
        const p = phaseMap.get(id);
        if (p) {
          ordered.push(p);
          phaseMap.delete(id);
        }
      });
      phaseMap.forEach(p => ordered.push(p));
      return ordered;
    }

    return phasesWithCustomItems;
  }, [activeProject]);

  // Flattened Checklist Items across Set Up Steps and all current project phases
  const allItems = useMemo(() => {
    const customSetupItems = activeProject.customItems?.[SETUP_STEPS_PHASE.id];
    const setupItems = (customSetupItems && customSetupItems.length > 0) ? customSetupItems : SETUP_STEPS_PHASE.items;
    return [
      ...setupItems,
      ...currentProjectPhases.flatMap(p => p.items)
    ];
  }, [activeProject.customItems, currentProjectPhases]);

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
    if (isAllPhasesPageOpen || isPaywallOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAllPhasesPageOpen, isPaywallOpen]);

  // Toggle Item Completion ("The Little Click") for active project
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
      agentPrompt: `You are the autonomous senior mobile software engineer and architect responsible for building this application. Do NOT ask the user to write code, configure settings, or perform manual research—implement this requirement completely and autonomously in our codebase.

REQUIREMENT TO IMPLEMENT:
"${title}"

SPECIFICATION & DETAILS:
"${description || title}"

EXECUTION PROTOCOL FOR THE CODING AGENT:
1. ARCHITECTURE & CODEBASE SCAN: Locate existing components, state management stores, utilities, and configuration files in the codebase. Understand the project layout and dependencies before modifying files.
2. FULL PRODUCTION IMPLEMENTATION: Write complete, bug-free, production-grade code. Never leave "TODO", "FIXME", stub methods, or fake placeholder mock data. Fully integrate all UI components, state bindings, controllers, and database/API connectors.
3. PLATFORM & STORE COMPLIANCE: Adhere strictly to Apple Human Interface Guidelines and Google Play developer policies. Implement safe-area padding for notches and gesture bars, ensure minimum touch targets (44x44pt on Apple, 48x48dp on Android), support Dynamic Type text scaling without layout truncation, and support both Dark and Light themes.
4. DEFENSIVE ERROR & OFFLINE HANDLING: Implement resilient network retry logic, offline data caching or fallback states, loading spinners/skeletons, descriptive user-facing error messages, and sanitize all user inputs.
5. VERIFICATION & ZERO REGRESSIONS: Run TypeScript compilation ("npx tsc --noEmit"), resolve any type errors or warnings, ensure no unused imports remain, and verify that all surrounding features remain functional without requiring manual coding from the user.`,
      implementationSteps: [
        'Define requirements and architecture.',
        'Implement and integrate into application workflow.',
        'Verify behavior on real iOS device.'
      ],
      commonRejectionTraps: [
        'Missing edge-case validation or offline state handling.'
      ],
      verificationQuestions: [
        'Does this requirement operate smoothly without crashing?'
      ]
    };

    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          const existingItems = proj.customItems?.[phaseId] || 
            (currentProjectPhases.find(p => p.id === phaseId)?.items || []);
          const updatedItems = [...existingItems, newItem];
          return {
            ...proj,
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

  // Reorder Items within a Phase
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
      iconName: 'Info',
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

    // Blur active input to trigger keyboard dismissal on mobile
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const centerTarget = () => {
      const el = document.getElementById(newPhaseId);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const docTop = currentScroll + rect.top;
      const viewportHeight = window.innerHeight;
      const pillHeight = rect.height || 100;
      const targetY = Math.max(0, docTop - (viewportHeight - pillHeight) / 2);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      return true;
    };

    // Staged scroll ensures that even after iOS virtual keyboard collapse finishes (~350ms),
    // the newly created section is locked directly in the middle of the screen
    setTimeout(() => {
      centerTarget();
      window.dispatchEvent(new CustomEvent('pulse-phase', { detail: newPhaseId }));
    }, 120);

    setTimeout(() => {
      centerTarget();
    }, 420);
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

  // Fresh Restart: restore default canonical order with Idea & Audience as Phase 1
  const handleFreshRestartPhases = () => {
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          return {
            ...proj,
            phaseOrder: undefined, // Clears custom reordering, restores default PHASES_DATA order
            deletedPhaseIds: []    // Restores any deleted phases
          };
        }
        return proj;
      })
    );
    setIsGlobalEditMode(false);
    setCollapseSignal(prev => prev + 1); // Minimizes all drop-downs
    setSelectedPhaseId('all');
    triggerHaptic(ImpactStyle.Medium);
  };

  // Toggle Global Rearrange: minimize all drop-downs & make phases moveable
  const handleToggleGlobalRearrange = () => {
    // 1. Always minimize drop-down menus
    setCollapseSignal(prev => prev + 1);
    // 2. Toggle global edit mode
    setIsGlobalEditMode(prev => {
      const next = !prev;
      triggerHaptic(ImpactStyle.Light);
      return next;
    });
  };

  // Move Phase Up or Down with silky smooth viewport stabilization (zero jump or off-screen scroll)
  const handleMovePhase = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= currentProjectPhases.length) return;
    const movedPhase = currentProjectPhases[fromIdx];
    if (!movedPhase) return;

    // Capture element's current position relative to viewport before DOM update
    const el = document.getElementById(movedPhase.id);
    const beforeTop = el ? el.getBoundingClientRect().top : null;

    const reordered = [...currentProjectPhases];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    handleReorderPhases(reordered);

    // After state updates and DOM paints, preserve the header position relative to viewport
    requestAnimationFrame(() => {
      const updatedEl = document.getElementById(moved.id);
      if (updatedEl && beforeTop !== null) {
        const afterTop = updatedEl.getBoundingClientRect().top;
        const diff = afterTop - beforeTop;
        if (Math.abs(diff) > 2) {
          window.scrollBy({ top: diff, behavior: 'instant' });
        }
      }
    });
  };

  // Delete a Phase Section (Custom or Built-in)
  const handleDeletePhase = (phaseId: string) => {
    if (phaseId === SETUP_STEPS_PHASE.id || phaseId === 'phase-setup') {
      return;
    }
    const targetPhase = currentProjectPhases.find(p => p.id === phaseId);
    const title = targetPhase ? `"${targetPhase.title}"` : 'this section';
    if (!window.confirm(`Delete step section ${title}? You can restore it later from the bottom of the page.`)) {
      return;
    }
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === activeProject.id) {
          const isCustom = phaseId.startsWith('custom-');
          const currentDeleted = proj.deletedPhaseIds || [];
          const updatedDeleted = isCustom 
            ? currentDeleted 
            : (currentDeleted.includes(phaseId) ? currentDeleted : [...currentDeleted, phaseId]);
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
      setSelectedPhaseId('all');
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

    if (window.confirm(`Are you sure you want to delete ${projName}? Note: Deleting a project does not reset your 1 free project allowance.`)) {
      markFreeQuotaClaimed();
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
          return {
            ...proj,
            deletedPhaseIds: currentDeleted.filter(id => id !== phaseId)
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

  // Celebrate with grand dual-cannon confetti when the entire project hits 100%!
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

  // Filter items for each phase (all or completed)
  const getFilteredItemsForPhase = (items: ChecklistItem[]) => {
    return items.filter(item => {
      const isDone = completedItemIds.includes(item.id);
      if (filterMode === 'completed' && !isDone) return false;
      return true;
    });
  };

  // Visible Phases based on selected filter
  const visiblePhases = useMemo(() => {
    if (selectedPhaseId === 'all') {
      return currentProjectPhases;
    }
    return currentProjectPhases.filter(p => p.id === selectedPhaseId);
  }, [selectedPhaseId, currentProjectPhases]);

  const activePhase = useMemo(() => {
    return currentProjectPhases.find(p => p.id === selectedPhaseId);
  }, [selectedPhaseId, currentProjectPhases]);

  const currentPhaseIndex = useMemo(() => {
    return currentProjectPhases.findIndex(p => p.id === selectedPhaseId);
  }, [selectedPhaseId, currentProjectPhases]);

  const prevPhase = currentPhaseIndex > 0 ? currentProjectPhases[currentPhaseIndex - 1] : null;
  const nextPhase = currentPhaseIndex >= 0 && currentPhaseIndex < currentProjectPhases.length - 1 ? currentProjectPhases[currentPhaseIndex + 1] : null;

  // Fluid drag-and-drop reordering for phases in main feed
  const {
    handleDragStart: handleDragStartPhase,
    getItemStyle: getPhaseDragStyle,
    bindItemRef: bindPhaseRef,
  } = useFluidDragReorder({
    items: visiblePhases,
    enabled: selectedPhaseId === 'all',
    onReorder: handleReorderPhases,
  });

  // On web, if viewMode is 'website', render the product marketing website
  if (viewMode === 'website' && !Capacitor.isNativePlatform()) {
    return (
      <Website 
        onLaunchApp={() => {
          setViewMode('app');
          setShowSplash(false);
          window.location.hash = '#app';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#1E2022] flex flex-col font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
      
      {/* Top Banner when running Interactive Suite on Web */}
      {!Capacitor.isNativePlatform() && (
        <AppLauncherBar 
          onBackToWebsite={() => {
            setViewMode('website');
            history.pushState(null, '', window.location.pathname + window.location.search);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

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

      {/* 1. Main Content Container (Starts right below iOS safe area with safe bottom clearance for the bottom menu) */}
      <main 
        onTouchStart={handlePageTouchStart}
        onTouchEnd={handlePageTouchEnd}
        className="flex-1 w-full max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-6 pt-1 space-y-3 ios-safe-top overflow-x-hidden"
      >
        <div className="relative w-full">
          {/* 1. Checklist Tab */}
          <div className={displayedTab === 'checklist' ? 'space-y-3.5 pb-4' : 'hidden'}>
              {/* Project Header at the Top: Centered, tapping opens Projects Page */}
              <div className="pt-2.5 pb-3 flex items-center justify-center w-full">
                <button
                  type="button"
                  onClick={() => {
                    handleSelectTab('projects');
                  }}
                  className="active:opacity-75 transition-opacity flex items-center justify-center space-x-1.5 px-3 py-1 rounded-2xl hover:bg-black/5 group max-w-full min-h-[42px]"
                  title="Switch or manage projects"
                >
                  <h1 
                    className="text-[28px] sm:text-[29px] font-medium tracking-normal text-center select-none text-black font-google leading-tight truncate"
                  >
                    {activeProject.name}
                  </h1>
                </button>
              </div>

            {/* Main Feed: All Project Phases */}
            <div className="space-y-4 pt-1">
              {/* Set Up Section (Foundational setup before Phase 1) - ALWAYS rendered as the First Pill */}
              <div key={SETUP_STEPS_PHASE.id}>
                <GuardrailSection
                  phase={SETUP_STEPS_PHASE}
                  phaseIndex={0}
                  totalPhases={visiblePhases.length + 1}
                  items={getFilteredItemsForPhase(
                    (activeProject.customItems?.[SETUP_STEPS_PHASE.id] && activeProject.customItems[SETUP_STEPS_PHASE.id].length > 0)
                      ? activeProject.customItems[SETUP_STEPS_PHASE.id]
                      : SETUP_STEPS_PHASE.items
                  )}
                  completedItemIds={completedItemIds}
                  onToggleComplete={handleToggleComplete}
                  defaultExpanded={false}
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



              {visiblePhases.map((phase, phaseIdx) => (
                <div 
                  key={phase.id}
                  ref={bindPhaseRef(phaseIdx)}
                  style={getPhaseDragStyle(phaseIdx)}
                >
                  <GuardrailSection
                    phase={phase}
                    phaseIndex={phaseIdx}
                    totalPhases={visiblePhases.length}
                    items={getFilteredItemsForPhase(phase.items)}
                    completedItemIds={completedItemIds}
                    onToggleComplete={handleToggleComplete}
                    defaultExpanded={false}
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

              {/* Add Custom Section Action Button & Inline Form */}
              <div className="pt-2 pb-1 flex flex-col items-center">
                {isAddingCustomPhase ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!customPhaseTitle.trim()) return;
                      handleAddPhase(customPhaseTitle.trim(), customPhaseTitle.trim(), customPhaseDesc.trim());
                      setCustomPhaseTitle('');
                      setCustomPhaseDesc('');
                      setIsAddingCustomPhase(false);
                    }}
                    className="w-full p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 animate-in fade-in duration-200"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-800 font-google">New Custom Section</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomPhaseTitle('');
                          setCustomPhaseDesc('');
                          setIsAddingCustomPhase(false);
                        }}
                        className="apple-press p-1 rounded-full text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. In-App Purchases, Apple Watch, Notifications"
                        value={customPhaseTitle}
                        onChange={(e) => setCustomPhaseTitle(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 bg-white"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Description (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Brief summary of requirements in this section"
                        value={customPhaseDesc}
                        onChange={(e) => setCustomPhaseDesc(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 bg-white"
                      />
                    </div>
                    <div className="flex items-center justify-end space-x-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomPhaseTitle('');
                          setCustomPhaseDesc('');
                          setIsAddingCustomPhase(false);
                        }}
                        className="apple-press px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!customPhaseTitle.trim()}
                        className="apple-press px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white disabled:opacity-50 shadow-xs"
                      >
                        Create Section
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingCustomPhase(true)}
                    className="apple-press inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold text-xs cursor-pointer transition-all"
                    title="Add a custom section"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5] text-slate-500" />
                    <span>Add Section</span>
                  </button>
                )}
              </div>

              {/* Empty State when no items match filter */}
              {visiblePhases.every(phase => getFilteredItemsForPhase(phase.items).length === 0) && (
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
                        ? `You haven't marked any requirements as completed yet. Tap the circle checkmark on any requirement to mark it done!`
                        : `Great job! All items in ${selectedPhaseId === 'all' ? 'the entire checklist' : 'this section'} are verified for ${activeProject.name}.`}
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

              {/* Deleted Sections Pill (Same style as phase cards with Restore capability) */}
              {deletedPhases.length > 0 && (
                <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-colors duration-150 shadow-xs space-y-4">
                  <div className="w-full flex items-start justify-between select-none">
                    <div className="flex items-start space-x-3.5 pr-2 select-none flex-1">
                      {/* Squircle Icon: Clean slate background with RotateCcw restore icon */}
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs text-slate-700">
                        <RotateCcw className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      {/* Title & Badge */}
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

                  {/* Description */}
                  <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none">
                    Sections you have removed are kept here so you can restore them at any time.
                  </p>

                  {/* List of Deleted Sections with Individual Restore Buttons */}
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

            {/* Bottom Spacing clearance above the fixed bottom navigation dock */}
            <div 
              className="w-full pointer-events-none select-none transition-all duration-300"
              style={{ height: 'max(calc(env(safe-area-inset-bottom, 0px) + 96px), 120px)' }}
              aria-hidden="true" 
            />
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
              isPro={isPro}
              onOpenPaywall={() => setIsPaywallOpen(true)}
              onCreateProject={(name, color) => {
                if (!canCreateNewProject(projects.length)) {
                  setIsPaywallOpen(true);
                  return;
                }
                recordProjectCreated();
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
              collapseSignal={resourcesCollapseSignal}
              onBackToChecklist={() => {
                handleSelectTab('checklist');
              }} 
            />
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
                  activeTab === 'projects' 
                    ? 'text-blue-600' 
                    : 'text-slate-500'
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
        phases={[SETUP_STEPS_PHASE, ...currentProjectPhases]}
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
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }}
        onReorderPhases={(newPhases) => handleReorderPhases(newPhases.filter(p => p.id !== SETUP_STEPS_PHASE.id))}
        onAddPhase={handleAddPhase}
        onDeletePhase={handleDeletePhase}
      />

      {/* Mandatory First-Launch Terms of Service & Legal Disclaimer Modal */}
      {!showSplash && (
        <LegalConsentModal
          isOpen={showLegalModal}
          onAccept={handleAcceptLegal}
        />
      )}

      {/* Native Store Review Prompt (Shown at visit 15 and 30, never > 30) */}
      {!showSplash && (
        <NativeReviewPromptModal
          isOpen={showReviewModal}
          onClose={handleCloseReview}
          onSubmit={handleSubmitReview}
        />
      )}

      {/* Pro Creator Pass Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onUnlocked={() => {
          setIsPro(true);
        }}
      />
    </div>
  );
};
