import React, { useState } from 'react';
import { 
  Rocket, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Smartphone, 
  Lock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  onLaunchApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchApp }) => {
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

  return (
    <section id="overview" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      
      {/* Refined Ambient Radial Aura */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 10%, rgba(59, 130, 246, 0.12), rgba(99, 102, 241, 0.06) 45%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Hero Content */}
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Eyebrow Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200/80 shadow-2xs text-xs font-semibold text-slate-800 backdrop-blur-md max-w-full">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="font-google text-slate-900 font-bold hidden sm:inline">2026 Mobile Production Readiness OS</span>
            <span className="font-google text-slate-900 font-bold sm:hidden">2026 Production OS</span>
            <span className="text-slate-300 shrink-0">•</span>
            <span className="text-slate-500 shrink-0 font-medium">Apple HIG &amp; Google Play</span>
          </div>

          {/* Main Title - Authoritative Editorial Scale */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-[#0A0D12] font-google leading-[1.04]">
            Ship Your Mobile App <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Without Rejections.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto text-balance">
            The zero-to-store production operating system for indie builders, mobile engineers, and AI coding agents. 10 structured phases, 101 audit-proof requirements, battle-tested guardrails, and 1-click AI prompts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <Rocket className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform stroke-[2.2]" />
              <span>Launch Interactive Blueprint</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href="#phases"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/90 hover:bg-white text-slate-800 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all backdrop-blur-xs"
            >
              <Layers className="w-4 h-4 text-slate-500 stroke-[2.2]" />
              <span>Explore 10 Phases</span>
            </a>
          </div>

          {/* Integrated Telemetry & Metrics Ribbon */}
          <div className="pt-2 flex justify-center">
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 sm:divide-x sm:divide-slate-200/90 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xs p-1.5 sm:p-2">
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

        {/* Interactive App Showcase Window Chassis */}
        <div id="preview" className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          
          {/* Native Segmented Tab Selector */}
          <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1">
            <div className="inline-flex items-center space-x-2 px-4 pb-3 lg:w-full lg:justify-center">
              {previewTabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePreviewTab(idx)}
                  className={`apple-press px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-[13px] font-bold whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                    activePreviewTab === idx
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20'
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
          <div className="relative mt-2 rounded-3xl bg-slate-950 p-2 sm:p-5 lg:p-7 shadow-2xl border border-slate-800">
            
            {/* macOS Chrome Header Bar */}
            <div className="flex items-center justify-between text-white/70 text-xs px-2 sm:px-3 pb-3 sm:pb-4 border-b border-slate-800/80 mb-3 sm:mb-4">
              <div className="flex items-center space-x-3">
                {/* Traffic light window controls */}
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center space-x-2 pl-2">
                  <span className="font-semibold text-slate-200">{previewTabs[activePreviewTab].title}</span>
                  <span className="text-slate-500 hidden sm:inline">— {previewTabs[activePreviewTab].subtitle}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onLaunchApp}
                className="apple-press inline-flex items-center space-x-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
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
                className="w-full h-auto object-cover rounded-xl transition-all duration-300 transform hover:scale-[1.01]"
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
