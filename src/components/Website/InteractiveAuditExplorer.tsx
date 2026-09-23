import React, { useState, useMemo, useEffect } from 'react';
import { PHASES_DATA } from '../../data/phases';
import { SETUP_STEPS_PHASE } from '../../data/setupSteps';
import { ChecklistItem } from '../../types';
import { 
  Search, 
  Filter, 
  Check, 
  Copy, 
  AlertTriangle, 
  Sparkles, 
  Terminal, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Apple,
  Smartphone,
  Globe,
  Lock,
  Eye,
  CheckCircle2,
  FileCode,
  Layers
} from 'lucide-react';

interface InteractiveAuditExplorerProps {
  onLaunchApp: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activePlatform?: 'all' | 'ios' | 'android';
  onSelectPlatform?: (platform: 'all' | 'ios' | 'android') => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const InteractiveAuditExplorer: React.FC<InteractiveAuditExplorerProps> = ({ 
  onLaunchApp,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  activePlatform: externalActivePlatform,
  onSelectPlatform: externalOnSelectPlatform,
  activeCategory: externalActiveCategory,
  onSelectCategory: externalOnSelectCategory
}) => {
  // Local state fallbacks if not controlled
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [localActivePlatform, setLocalActivePlatform] = useState<'all' | 'ios' | 'android'>('all');
  const [localActiveCategory, setLocalActiveCategory] = useState<string>('all');
  
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;
  const setSearchQuery = externalOnSearchChange || setLocalSearchQuery;

  const activePlatform = externalActivePlatform !== undefined ? externalActivePlatform : localActivePlatform;
  const setActivePlatform = externalOnSelectPlatform || setLocalActivePlatform;

  const activeCategory = externalActiveCategory !== undefined ? externalActiveCategory : localActiveCategory;
  const setActiveCategory = externalOnSelectCategory || setLocalActiveCategory;

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [inspectingItem, setInspectingItem] = useState<ChecklistItem | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [completedPreviewIds, setCompletedPreviewIds] = useState<Set<string>>(
    new Set(['p1-problem-solution', 'p2-safe-areas', 'p4-keychain-keystore'])
  );

  // Flatten all items from setup phase + 10 phases
  const allItems: ChecklistItem[] = useMemo(() => {
    const list: ChecklistItem[] = [...SETUP_STEPS_PHASE.items];
    PHASES_DATA.forEach(p => list.push(...p.items));
    return list;
  }, []);

  // Filtered items based on query, platform, and category
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = 
          item.title.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.whyItMatters.toLowerCase().includes(q) ||
          (item.agentPrompt && item.agentPrompt.toLowerCase().includes(q)) ||
          (item.storeGuideline && item.storeGuideline.name.toLowerCase().includes(q));
        if (!matchesText) return false;
      }

      // Platform filter
      if (activePlatform === 'ios' && item.platform === 'android') return false;
      if (activePlatform === 'android' && item.platform === 'ios') return false;

      // Category filter
      if (activeCategory === 'blockers') return item.priority === 'blocker';
      if (activeCategory === 'design') return item.category === 'design';
      if (activeCategory === 'security') return item.category === 'security';
      if (activeCategory === 'legal') return item.category === 'legal';
      if (activeCategory === 'functionality') return item.category === 'functionality';
      if (activeCategory === 'store') return item.category === 'store' || item.category === 'cicd';

      return true;
    });
  }, [allItems, searchQuery, activePlatform, activeCategory]);

  const blockerCount = useMemo(() => allItems.filter(i => i.priority === 'blocker').length, [allItems]);
  const iosCount = useMemo(() => allItems.filter(i => i.platform === 'ios' || i.platform === 'both').length, [allItems]);
  const androidCount = useMemo(() => allItems.filter(i => i.platform === 'android' || i.platform === 'both').length, [allItems]);

  // Toggle completion mark
  const toggleComplete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedPreviewIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // 1-Click Prompt Copier
  const copyPrompt = (item: ChecklistItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!item.agentPrompt) return;
    navigator.clipboard.writeText(item.agentPrompt);
    setCopiedItemId(item.id);
    setTimeout(() => {
      setCopiedItemId(null);
    }, 2000);
  };

  // Keyboard navigation for Mobbin Inspect Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!inspectingItem) return;
      if (e.key === 'Escape') {
        setInspectingItem(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredItems.findIndex(i => i.id === inspectingItem.id);
        if (currentIndex < filteredItems.length - 1) {
          setInspectingItem(filteredItems[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredItems.findIndex(i => i.id === inspectingItem.id);
        if (currentIndex > 0) {
          setInspectingItem(filteredItems[currentIndex - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectingItem, filteredItems]);

  // Navigate next/prev in modal
  const handleNextModal = () => {
    if (!inspectingItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === inspectingItem.id);
    if (currentIndex < filteredItems.length - 1) {
      setInspectingItem(filteredItems[currentIndex + 1]);
    }
  };

  const handlePrevModal = () => {
    if (!inspectingItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === inspectingItem.id);
    if (currentIndex > 0) {
      setInspectingItem(filteredItems[currentIndex - 1]);
    }
  };

  // Map phase ID to clean title
  const getPhaseName = (phaseId: string) => {
    if (phaseId.toLowerCase().includes('setup') || phaseId === 'phase-0') return 'Phase 0 • Setup & Pre-flight';
    const num = phaseId.replace('phase-', '');
    const phase = PHASES_DATA.find(p => p.id === phaseId);
    return phase ? `Phase ${num} • ${phase.title}` : `Phase ${num}`;
  };

  // Map phase ID to short title for badges and cards
  const getPhaseShortName = (phaseId: string) => {
    if (phaseId.toLowerCase().includes('setup') || phaseId === 'phase-0') return 'Phase 0 • Setup';
    const num = phaseId.replace('phase-', '');
    const phase = PHASES_DATA.find(p => p.id === phaseId);
    return phase ? `Phase ${num} • ${phase.shortTitle || phase.title}` : `Phase ${num}`;
  };

  // Render authentic Mobbin screen UI preview inside the card
  const renderScreenMockup = (item: ChecklistItem) => {
    // 1. Screenshot mappings for key flagship cards
    if (item.id === 'p0-1' || item.phaseId === 'phase-0') {
      return (
        <img 
          src="./screenshots/01_welcome.png" 
          alt={item.title} 
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" 
          loading="eager" 
        />
      );
    }
    if (item.category === 'store' || item.id === 'p1-1') {
      return (
        <img 
          src="./screenshots/02_production_checklist.png" 
          alt={item.title} 
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" 
          loading="eager" 
        />
      );
    }
    if (item.phaseId === 'phase-3' || item.phaseId === 'phase-4') {
      return (
        <img 
          src="./screenshots/03_interactive_roadmap.png" 
          alt={item.title} 
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" 
          loading="eager" 
        />
      );
    }
    if (item.category === 'design') {
      return (
        <img 
          src="./screenshots/04_app_launch_academy.png" 
          alt={item.title} 
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" 
          loading="eager" 
        />
      );
    }
    if (item.priority === 'blocker' && item.phaseId === 'phase-2') {
      return (
        <img 
          src="./screenshots/05_production_playbook.png" 
          alt={item.title} 
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" 
          loading="eager" 
        />
      );
    }

    // 2. High-fidelity pixel-perfect simulated mobile screen UI
    return (
      <div className="w-full h-full bg-slate-900 text-white p-3.5 flex flex-col justify-between select-none relative overflow-hidden">
        {/* Dynamic Island / Status Bar */}
        <div className="flex items-center justify-between text-[9px] text-slate-400 border-b border-white/5 pb-2">
          <span>9:41</span>
          <div className="w-16 h-3 bg-black rounded-full mx-auto" />
          <div className="flex items-center space-x-1">
            <span>5G</span>
            <div className="w-3.5 h-1.5 border border-slate-400 rounded-2xs" />
          </div>
        </div>

        {/* Screen Specific UI Elements */}
        <div className="my-auto space-y-2 py-2">
          {item.category === 'security' ? (
            <div className="bg-white/5 border border-emerald-500/30 p-2.5 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>KEYCHAIN ENCRYPTED</span>
                </span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">AES-256</span>
              </div>
              <div className="text-[10px] text-slate-300 truncate">SecItemAdd / Biometric Gate</div>
            </div>
          ) : item.category === 'legal' ? (
            <div className="bg-white/5 border border-blue-500/30 p-2.5 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-400">PRIVACY NUTRITION</span>
                <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">2026 MANIFEST</span>
              </div>
              <div className="text-[10px] text-slate-300 truncate">NSPrivacyAccessedAPITypes</div>
            </div>
          ) : item.priority === 'blocker' ? (
            <div className="bg-white/5 border border-rose-500/30 p-2.5 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-rose-400 flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>STORE REVIEW BLOCKER</span>
                </span>
                <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">PASS 100%</span>
              </div>
              <div className="text-[10px] text-slate-300 truncate">{item.title}</div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-300">{item.platform.toUpperCase()}</span>
                <span className="text-[9px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded">HIG VERIFIED</span>
              </div>
              <div className="text-[10px] text-slate-300 truncate">{item.title}</div>
            </div>
          )}

          {/* Mini Action Row */}
          <div className="h-6 bg-white/10 rounded-lg flex items-center justify-center text-[10px] font-semibold text-slate-200">
            Interactive Test Checkpoint
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="w-20 h-1 bg-white/20 rounded-full mx-auto" />
      </div>
    );
  };

  return (
    <section id="explorer" className="scroll-mt-20 py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Mobbin Section Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-semibold tracking-wide shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 stroke-[2.5]" />
          <span>Mobbin Screen &amp; Rule Catalog</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F17] tracking-tight font-google">
          Explore All {allItems.length} Production Screens &amp; AI Prompts
        </h2>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Filter and inspect real app screens, review Apple HIG and Google Play guidelines, test verification checks, and copy 1-click prompts for autonomous coding agents.
        </p>
      </div>

      {/* Mobbin Filter & Discovery Console */}
      <div className="bg-white rounded-3xl border border-black/8 shadow-sm overflow-hidden mb-10">
        
        {/* Search Bar Input (Mobbin / Spotlight Style) */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-100">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              id="explorer-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 101 rules & prompts..."
              className="w-full pl-12 pr-24 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-950/15 focus:border-slate-950 transition-all shadow-inner"
            />
            <div className="absolute right-3 flex items-center space-x-2">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Filter Bar & View Mode Switcher (Mobbin Style) */}
        <div className="px-4 py-3 sm:px-6 bg-slate-50/70 border-b border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Mobile Row 1 / Desktop Left: Platform Pills + Mobile View Switcher */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActivePlatform('all')}
                className={`apple-press inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePlatform === 'all'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-black/6'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>All ({allItems.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePlatform('ios')}
                className={`apple-press inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePlatform === 'ios'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-black/6'
                }`}
              >
                <Apple className="w-3 h-3" />
                <span>iOS ({iosCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePlatform('android')}
                className={`apple-press inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePlatform === 'android'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-black/6'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>Android ({androidCount})</span>
              </button>
            </div>

            {/* Mobile View Switcher */}
            <div className="flex items-center p-0.5 bg-white rounded-xl border border-black/8 shadow-2xs shrink-0 lg:hidden">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`apple-press p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-slate-950 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-950'
                }`}
                title="Mobbin Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`apple-press p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-slate-950 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-950'
                }`}
                title="Compact List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Filter Pills (Full horizontal scroll on mobile, inline on desktop) */}
          <div className="flex items-center justify-between space-x-3 w-full lg:w-auto">
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'blockers', label: `Blockers (${blockerCount})`, isAlert: true },
                { id: 'design', label: 'Design & HIG' },
                { id: 'security', label: 'Security & Auth' },
                { id: 'legal', label: 'Privacy & Legal' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`apple-press px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-slate-200/90 text-slate-950 font-bold'
                      : cat.isAlert
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
                      : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Desktop Grid vs List View Switcher */}
            <div className="hidden lg:flex items-center p-0.5 bg-white rounded-xl border border-black/8 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`apple-press p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-slate-950 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-950'
                }`}
                title="Mobbin Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`apple-press p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-slate-950 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-950'
                }`}
                title="Compact List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Counter Strip */}
        <div className="px-4 py-2 sm:px-6 bg-white border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div>
            Showing <span className="font-bold text-slate-900">{Math.min(visibleCount, filteredItems.length)}</span> of <span className="font-bold text-slate-900">{filteredItems.length}</span> matching requirements
          </div>
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline">Click any card to inspect full specs &amp; AI prompt</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MOBBIN GRID VIEW (Visual Screenshot / Screen Cards Feed)                  */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredItems.slice(0, visibleCount).map((item) => {
            const isComplete = completedPreviewIds.has(item.id);
            const isCopied = copiedItemId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setInspectingItem(item)}
                className="group relative bg-white rounded-2xl border border-black/8 hover:border-black/25 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Card Top: App Avatar & Flow Tag */}
                <div className="p-3.5 pb-2.5 flex items-center justify-between gap-2 border-b border-slate-100">
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-950 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      <Layers className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate font-google">
                        {getPhaseShortName(item.phaseId)}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate capitalize">
                        {item.category} • {item.platform}
                      </div>
                    </div>
                  </div>

                  {item.priority === 'blocker' && (
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/80 inline-flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                      <span>Blocker</span>
                    </span>
                  )}
                </div>

                {/* Card Body: High-Fidelity Mobile Screen Viewport (Mobbin Aesthetic) */}
                <div className="relative aspect-[9/14] bg-slate-950 overflow-hidden border-b border-slate-100 group">
                  {renderScreenMockup(item)}

                  {/* Mobbin Hover Action Glass Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4 space-y-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingItem(item);
                      }}
                      className="apple-press w-full py-2 px-3 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 cursor-pointer hover:bg-slate-100"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Screen &amp; Specs</span>
                    </button>

                    {item.agentPrompt && (
                      <button
                        type="button"
                        onClick={(e) => copyPrompt(item, e)}
                        className="apple-press w-full py-2 px-3 rounded-xl bg-slate-900/90 text-white border border-white/20 font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 cursor-pointer hover:bg-slate-800"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-blue-400" />}
                        <span>{isCopied ? 'Prompt Copied!' : 'Copy AI Prompt'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Footer: Title & Actions */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2 bg-white">
                  <div>
                    <h4 className={`text-sm font-bold font-google leading-snug line-clamp-2 ${
                      isComplete ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </h4>
                    {item.storeGuideline && (
                      <div className="text-[10px] text-slate-500 font-medium truncate mt-1">
                        {item.storeGuideline.name}
                      </div>
                    )}
                  </div>

                  {/* Bottom Actions Row */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleComplete(item.id, e)}
                      className={`apple-press inline-flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        isComplete 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Check className={`w-3 h-3 ${isComplete ? 'stroke-[3]' : 'opacity-40'}`} />
                      <span>{isComplete ? 'Passed' : 'Verify'}</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      {item.agentPrompt && (
                        <button
                          type="button"
                          onClick={(e) => copyPrompt(item, e)}
                          className="apple-press p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Copy AI Prompt"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                        Inspect &rarr;
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MOBBIN LIST VIEW (Compact Table View)                                      */}
      {/* ========================================================================= */}
      {viewMode === 'list' && (
        <div className="space-y-2.5">
          {filteredItems.slice(0, visibleCount).map((item) => {
            const isExpanded = expandedItemId === item.id;
            const isComplete = completedPreviewIds.has(item.id);
            const isCopied = copiedItemId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 bg-white ${
                  isExpanded
                    ? 'border-slate-900 shadow-md ring-2 ring-slate-900/10'
                    : 'border-black/8 shadow-2xs hover:border-black/20 hover:shadow-xs'
                }`}
              >
                {/* List Row Header */}
                <div 
                  onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => toggleComplete(item.id, e)}
                      className={`apple-press w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        isComplete
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'border-2 border-slate-300 hover:border-slate-900 bg-white'
                      }`}
                      title="Toggle verification status"
                    >
                      {isComplete && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">
                          {item.platform}
                        </span>
                        {item.priority === 'blocker' && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200/80 inline-flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                            <span>Blocker</span>
                          </span>
                        )}
                        <span className="text-[11px] font-medium text-slate-400 capitalize">
                          {getPhaseShortName(item.phaseId)}
                        </span>
                      </div>

                      <h4 className={`text-sm sm:text-base font-bold font-google truncate ${
                        isComplete ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}>
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingItem(item);
                      }}
                      className="apple-press hidden md:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>

                    {item.agentPrompt && (
                      <button
                        type="button"
                        onClick={(e) => copyPrompt(item, e)}
                        className={`apple-press hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isCopied 
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-950 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Terminal className="w-3.5 h-3.5 stroke-[2.2] text-blue-400" />}
                        <span>{isCopied ? 'Copied' : 'Prompt'}</span>
                      </button>
                    )}

                    <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Inline Detail */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 border-t border-slate-100 pt-5 space-y-4 bg-slate-50/70 rounded-b-2xl text-xs sm:text-sm">
                    <div>
                      <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1">
                        Why It Matters
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {item.whyItMatters}
                      </p>
                    </div>

                    {item.commonRejectionTraps && item.commonRejectionTraps.length > 0 && (
                      <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200/80 text-rose-900 space-y-1">
                        <div className="flex items-center space-x-1.5 font-bold text-rose-800 text-[11px] uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Common Rejection Trap</span>
                        </div>
                        <p className="text-rose-700 text-xs leading-relaxed">
                          {item.commonRejectionTraps[0]}
                        </p>
                      </div>
                    )}

                    {item.agentPrompt && (
                      <div className="rounded-xl overflow-hidden bg-slate-950 border border-white/10 shadow-lg text-slate-200">
                        <div className="px-4 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono text-[11px]">agent_prompt.md</span>
                          <button
                            type="button"
                            onClick={(e) => copyPrompt(item, e)}
                            className="apple-press inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <div className="p-3.5">
                          <pre className="text-[11px] font-mono whitespace-pre-wrap max-h-40 overflow-y-auto bg-black/50 p-3 rounded-lg border border-white/5 text-slate-300 leading-relaxed">
                            {item.agentPrompt}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-7 h-7" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-google">No matching screens or rules found</div>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            No items match &quot;{searchQuery}&quot;. Try resetting your filters or searching for terms like &quot;IPv6&quot;, &quot;Privacy&quot;, &quot;Safe Areas&quot;, or &quot;Keychain&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActivePlatform('all');
              setActiveCategory('all');
            }}
            className="apple-press inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-slate-950 px-4 py-2 rounded-full cursor-pointer hover:bg-slate-800"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination / Load More (Mobbin Style) */}
      {filteredItems.length > visibleCount && (
        <div className="mt-10 text-center space-y-3">
          <button
            type="button"
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="apple-press inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm px-7 py-3 rounded-full border border-black/10 shadow-sm transition-all cursor-pointer"
          >
            <span>Load More {viewMode === 'grid' ? 'Screens' : 'Requirements'} ({Math.min(visibleCount + 12, filteredItems.length)} of {filteredItems.length})</span>
            <ChevronDown className="w-4 h-4 stroke-[2.2]" />
          </button>
          <div>
            <button
              type="button"
              onClick={onLaunchApp}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
            >
              Or open all {allItems.length} rules in the Interactive Blueprint App &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MOBBIN SCREEN & RULE INSPECTOR MODAL                                      */}
      {/* ========================================================================= */}
      {inspectingItem && (
        <div 
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-8"
          onClick={() => setInspectingItem(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl border border-white/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Top Header (Sticky across scroll) */}
            <div className="sticky top-0 z-30 flex md:hidden items-center justify-between px-4 py-2.5 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-1 bg-white/10 px-2.5 py-1 rounded-full text-white text-xs">
                <button
                  type="button"
                  onClick={handlePrevModal}
                  className="apple-press p-1 hover:text-blue-300 cursor-pointer"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold px-1 text-slate-200">
                  {filteredItems.findIndex(i => i.id === inspectingItem.id) + 1} / {filteredItems.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextModal}
                  className="apple-press p-1 hover:text-blue-300 cursor-pointer"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                {inspectingItem.platform.toUpperCase()} VIEW
              </div>

              <button
                type="button"
                onClick={() => setInspectingItem(null)}
                className="apple-press w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            {/* LEFT COLUMN: Hardware Screen Frame (Mobbin Style) */}
            <div className="w-full md:w-5/12 bg-slate-950 p-4 sm:p-6 md:p-8 shrink-0 flex flex-col items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
              <div className="hidden md:block text-[11px] font-mono text-slate-400 mb-3 uppercase tracking-wider">
                {inspectingItem.platform.toUpperCase()} DEVICE VIEW
              </div>

              {/* Mobile Phone Mockup */}
              <div className="w-full max-w-[210px] md:max-w-[260px] aspect-[9/17] md:aspect-[9/18] rounded-3xl bg-slate-900 border-4 border-slate-800 shadow-2xl overflow-hidden relative flex flex-col">
                {renderScreenMockup(inspectingItem)}
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <span className="text-[11px] text-slate-400">Tested on iOS 18 &amp; Android 15</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Full Specification Sheet & AI Prompt */}
            <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-visible md:overflow-y-auto flex flex-col justify-between space-y-5 bg-white">
              <div className="space-y-4">
                
                {/* Header Row: Badges on left, Desktop Stepper + Close on right (Normal Flex Flow) */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                      {getPhaseShortName(inspectingItem.phaseId)}
                    </span>
                    {inspectingItem.priority === 'blocker' && (
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                        <span>Store Blocker</span>
                      </span>
                    )}
                    {inspectingItem.storeGuideline && (
                      <a
                        href={inspectingItem.storeGuideline.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center space-x-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60"
                      >
                        <span>{inspectingItem.storeGuideline.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Desktop Navigation & Close Controls */}
                  <div className="hidden md:flex items-center space-x-2 shrink-0">
                    <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-full text-slate-800 text-xs">
                      <button
                        type="button"
                        onClick={handlePrevModal}
                        className="apple-press p-1 hover:text-blue-600 cursor-pointer"
                        title="Previous (Left Arrow)"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] font-mono font-bold px-1 text-slate-700">
                        {filteredItems.findIndex(i => i.id === inspectingItem.id) + 1} / {filteredItems.length}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextModal}
                        className="apple-press p-1 hover:text-blue-600 cursor-pointer"
                        title="Next (Right Arrow)"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectingItem(null)}
                      className="apple-press w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer shadow-2xs"
                      title="Close (Esc)"
                    >
                      <X className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-google tracking-tight">
                    {inspectingItem.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {inspectingItem.shortDescription}
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Why Review Teams Flag This
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {inspectingItem.whyItMatters}
                  </p>
                </div>

                {/* Common Rejection Trap */}
                {inspectingItem.commonRejectionTraps && inspectingItem.commonRejectionTraps.length > 0 && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-rose-800 text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Rejection Trap to Avoid</span>
                    </div>
                    <p className="text-xs text-rose-700 leading-relaxed">
                      {inspectingItem.commonRejectionTraps[0]}
                    </p>
                  </div>
                )}

                {/* Verification Checklist */}
                {inspectingItem.verificationQuestions && inspectingItem.verificationQuestions.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Verification Criteria
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {inspectingItem.verificationQuestions.map((q, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Autonomous AI Agent Prompt Box */}
                {inspectingItem.agentPrompt && (
                  <div className="rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-lg text-slate-200">
                    <div className="px-4 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Terminal className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-bold text-slate-200 text-xs">Cursor / Claude / Copilot Prompt</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => copyPrompt(inspectingItem, e)}
                        className="apple-press inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer"
                      >
                        {copiedItemId === inspectingItem.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-3.5">
                      <pre className="text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto bg-black/60 p-3 rounded-xl border border-white/5 text-slate-300 leading-relaxed">
                        {inspectingItem.agentPrompt}
                      </pre>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => toggleComplete(inspectingItem.id)}
                  className={`apple-press w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    completedPreviewIds.has(inspectingItem.id)
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{completedPreviewIds.has(inspectingItem.id) ? 'Status: Verified' : 'Mark as Verified'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInspectingItem(null);
                    onLaunchApp();
                  }}
                  className="apple-press w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs cursor-pointer"
                >
                  <span>Open in Interactive App</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
