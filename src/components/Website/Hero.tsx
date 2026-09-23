import React, { useState } from 'react';
import { 
  Rocket, 
  ArrowRight, 
  Search,
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Smartphone, 
  Lock,
  ExternalLink,
  ChevronRight,
  Apple,
  Globe,
  AlertTriangle,
  Code2,
  FileCode,
  GraduationCap
} from 'lucide-react';

interface HeroProps {
  onLaunchApp: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activePlatform?: 'all' | 'ios' | 'android';
  onSelectPlatform?: (platform: 'all' | 'ios' | 'android') => void;
  onSelectCategory?: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onLaunchApp,
  searchQuery = '',
  onSearchChange,
  activePlatform = 'all',
  onSelectPlatform,
  onSelectCategory
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<number>(0);

  const previewTabs = [
    {
      id: 'checklist',
      title: 'Production Checklist',
      subtitle: '101 store requirements with 1-click AI prompts & traps',
      image: './screenshots/02_production_checklist.png',
      badge: '101 Guardrails',
    },
    {
      id: 'roadmap',
      title: 'Steps Roadmap',
      subtitle: 'Multi-phase milestones from idea to day-one approval',
      image: './screenshots/03_interactive_roadmap.png',
      badge: '10 Phases',
    },
    {
      id: 'academy',
      title: 'Launch Academy',
      subtitle: 'Curated typography, palettes, animation & audit tools',
      image: './screenshots/04_app_launch_academy.png',
      badge: 'Design System',
    },
    {
      id: 'playbook',
      title: 'Production Playbook',
      subtitle: 'Troubleshooting guides for IPv6, IAP, and deletion rules',
      image: './screenshots/05_production_playbook.png',
      badge: 'Store Playbooks',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlatformSelect = (p: 'all' | 'ios' | 'android') => {
    if (onSelectPlatform) onSelectPlatform(p);
    const el = document.getElementById('explorer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategorySelect = (cat: string) => {
    if (onSelectCategory) onSelectCategory(cat);
    const el = document.getElementById('explorer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="overview" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      
      {/* Subtle Mobbin Ambient Aura */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[520px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 12%, rgba(20, 20, 20, 0.05), rgba(59, 130, 246, 0.04) 40%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curated Editorial Hero Content (Mobbin Aesthetic) */}
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-7">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-black/8 shadow-2xs text-xs font-semibold text-slate-800 backdrop-blur-md max-w-full">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-google text-slate-900 font-bold hidden sm:inline">2026 Mobile Production Readiness OS</span>
            <span className="font-google text-slate-900 font-bold sm:hidden">2026 Production OS</span>
            <span className="text-slate-300 shrink-0">•</span>
            <span className="text-slate-500 shrink-0 font-medium">Apple HIG &amp; Google Play Reference</span>
          </div>

          {/* Main Title - Mobbin Editorial High-Contrast Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.038em] text-[#0A0D12] font-google leading-[1.04]">
            The World&apos;s Largest Mobile <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-indigo-700">
              Production Checklist &amp; Prompt Library.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto text-balance">
            Save hundreds of hours and avoid store rejections. Browse 101 battle-tested guidelines, authentic mobile app screens, and copy 1-click AI prompts for Cursor, Claude &amp; Copilot.
          </p>

          {/* Mobbin-Style Hero Search & Discovery Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-lg shadow-black/4 rounded-2xl">
              <Search className="absolute left-4.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder="Search 101 rules & prompts..."
                className="w-full pl-12 pr-24 py-4 rounded-2xl bg-white border border-black/10 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all"
              />
              <div className="absolute right-3 flex items-center space-x-2">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange && onSearchChange('')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md shadow-2xs">
                    ⌘K
                  </kbd>
                )}
              </div>
            </form>

            {/* Quick Filter Platform Pills (Mobbin Style) */}
            <div className="flex items-center justify-center flex-wrap gap-2 mt-3.5">
              <button
                type="button"
                onClick={() => handlePlatformSelect('all')}
                className={`apple-press inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePlatform === 'all'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-black/6 shadow-2xs'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>All Platforms (101)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePlatformSelect('ios')}
                className={`apple-press inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePlatform === 'ios'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-black/6 shadow-2xs'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>iOS HIG (84)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePlatformSelect('android')}
                className={`apple-press inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePlatform === 'android'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-black/6 shadow-2xs'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Google Play (72)</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('blockers')}
                className="apple-press inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 shadow-2xs transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>Store Blockers (28)</span>
              </button>
            </div>

            {/* Category / Pattern Chips */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 mt-2.5 text-xs">
              <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Popular:</span>
              {[
                { label: 'Store Traps', target: '#why-apps-fail' },
                { label: 'Safe Areas & HIG', category: 'design' },
                { label: 'Keychain & Security', category: 'security' },
                { label: 'Privacy Manifest', category: 'legal' },
                { label: 'Pass Calculator', target: '#calculator' },
                { label: 'Launch Academy', target: '#academy' },
              ].map(chip => (
                chip.category ? (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleCategorySelect(chip.category)}
                    className="apple-press px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-slate-600 hover:text-slate-950 border border-black/5 text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs"
                  >
                    {chip.label}
                  </button>
                ) : (
                  <a
                    key={chip.label}
                    href={chip.target}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!chip.target) return;
                      const targetId = chip.target.replace(/^#/, '');
                      const el = document.getElementById(targetId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        history.pushState(null, '', chip.target);
                      }
                    }}
                    className="apple-press px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-slate-600 hover:text-slate-950 border border-black/5 text-[11px] font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    {chip.label}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <Rocket className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform stroke-[2.2]" />
              <span>Launch Interactive Blueprint</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href="#phases"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('phases');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  history.pushState(null, '', '#phases');
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full border border-black/10 shadow-2xs hover:border-black/20 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-500 stroke-[2.2]" />
              <span>Explore 10 Phases</span>
            </a>
          </div>

          {/* Integrated Telemetry & Metrics Ribbon */}
          <div className="pt-2 flex justify-center">
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 sm:divide-x sm:divide-slate-200/90 bg-white/90 backdrop-blur-md rounded-2xl border border-black/8 shadow-2xs p-1.5 sm:p-2">
              <div className="px-4 py-2 text-center">
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-google tracking-tight">101</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Production Rules</div>
              </div>
              <div className="px-4 py-2 text-center">
                <div className="text-xl sm:text-2xl font-black text-indigo-600 font-google tracking-tight">10</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Guided Phases</div>
              </div>
              <div className="px-4 py-2 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-600 font-google tracking-tight">100%</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Private &amp; Local</div>
              </div>
              <div className="px-4 py-2 text-center">
                <div className="text-xl sm:text-2xl font-black text-purple-600 font-google tracking-tight">2026</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Store Guidelines</div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive App Showcase Window Chassis (Mobbin Hardware Stage) */}
        <div id="preview" className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          
          {/* Segmented Tab Selector */}
          <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1">
            <div className="inline-flex items-center space-x-2 px-4 pb-3 lg:w-full lg:justify-center">
              {previewTabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePreviewTab(idx)}
                  className={`apple-press px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                    activePreviewTab === idx
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-white'
                  }`}
                >
                  <span>{tab.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    activePreviewTab === idx ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Authentic Hardware Frame / macOS Window Container */}
          <div className="relative mt-2 rounded-3xl bg-slate-950 p-3 sm:p-5 lg:p-7 shadow-2xl border border-slate-800">
            
            {/* macOS Chrome Header Bar */}
            <div className="flex items-center justify-between text-white/70 text-xs px-2 sm:px-3 pb-3 sm:pb-4 border-b border-slate-800/80 mb-3 sm:mb-4 gap-2">
              <div className="flex items-center space-x-3 min-w-0 pr-1">
                <div className="flex items-center space-x-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center space-x-2 pl-2 min-w-0">
                  <span className="font-semibold text-slate-200 truncate">{previewTabs[activePreviewTab].title}</span>
                  <span className="text-slate-500 hidden sm:inline truncate">— {previewTabs[activePreviewTab].subtitle}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onLaunchApp}
                className="apple-press inline-flex items-center space-x-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors shrink-0"
              >
                <span>Try Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Device Screen Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-inner flex items-center justify-center max-w-sm sm:max-w-md mx-auto aspect-[9/19.5]">
              <img
                src={previewTabs[activePreviewTab].image}
                alt={previewTabs[activePreviewTab].title}
                className="w-full h-full object-cover object-top rounded-xl transition-all duration-300 transform hover:scale-[1.01]"
                loading="eager"
              />
              
              {/* Floating Live Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center justify-between text-white shadow-lg">
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold truncate font-google">Interactive Web Edition</div>
                  <div className="text-[11px] text-slate-400 truncate">Run the full blueprint in your browser</div>
                </div>
                <button
                  type="button"
                  onClick={onLaunchApp}
                  className="apple-press shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs"
                >
                  Open App
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
