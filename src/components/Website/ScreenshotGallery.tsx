import React, { useState } from 'react';
import { Smartphone, ChevronLeft, ChevronRight, Sparkles, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ScreenshotGalleryProps {
  onLaunchApp?: () => void;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ onLaunchApp }) => {
  const flowScreens = [
    {
      src: './screenshots/02_production_checklist.png',
      title: 'Production Checklist & Audit',
      subtitle: '101 store requirements with deep-dive guidance, traps, and 1-click AI prompts',
      tag: 'Checklist Flow',
      flowStep: 'Step 1 of 5',
      highlights: [
        'Real-time verification progress tracking',
        'Store Review Blocker priority filters',
        '1-Click AI Coding Prompts for Cursor & Claude',
      ],
    },
    {
      src: './screenshots/01_welcome.png',
      title: 'Welcome & Project Initialization',
      subtitle: 'Distraction-free onboarding with local persistent state and phase setup',
      tag: 'Onboarding Flow',
      flowStep: 'Step 2 of 5',
      highlights: [
        'Zero-login, 100% private local storage',
        'Immediate workspace setup in under 60 seconds',
        'Built-in project switcher with color coding',
      ],
    },
    {
      src: './screenshots/03_interactive_roadmap.png',
      title: 'Multi-Phase Milestone Roadmap',
      subtitle: 'Reorderable phase milestones from concept through submission and post-launch',
      tag: 'Roadmap Flow',
      flowStep: 'Step 3 of 5',
      highlights: [
        '10 guided phases with step-by-step deliverables',
        'Tactile reorderable milestone cards',
        'Completion badges and velocity tracking',
      ],
    },
    {
      src: './screenshots/04_app_launch_academy.png',
      title: 'App Launch Academy & Design Tokens',
      subtitle: 'Curated typography pairs, palettes, fluid spring curves, and WCAG contrast tools',
      tag: 'Academy Flow',
      flowStep: 'Step 4 of 5',
      highlights: [
        'Apple HIG and Google Material typography pairing',
        'Built-in 44x44pt touch target validator',
        'Dynamic Type Large Text accessibility spec',
      ],
    },
    {
      src: './screenshots/05_production_playbook.png',
      title: 'Store Review Traps & Playbooks',
      subtitle: 'Actionable diagnostic playbooks for IPv6, IAP, Sign in with Apple, and deletion',
      tag: 'Playbook Flow',
      flowStep: 'Step 5 of 5',
      highlights: [
        'NAT64 IPv6-only network crash diagnostics',
        'Apple Privacy 2026 manifest XML generator',
        'Self-serve in-app account deletion flow',
      ],
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((prev) => (prev > 0 ? prev - 1 : flowScreens.length - 1));
  const next = () => setActiveIdx((prev) => (prev < flowScreens.length - 1 ? prev + 1 : 0));

  return (
    <section id="screenshots" className="scroll-mt-20 py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Mobbin Section Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-semibold tracking-wide shadow-xs">
          <Smartphone className="w-3.5 h-3.5 text-blue-400 stroke-[2.5]" />
          <span>Mobbin Curated Flows</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F17] tracking-tight font-google">
          Authentic App Flows &amp; Design Architecture
        </h2>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Inspect how our core screens and user flows are architected to satisfy Apple HIG guidelines and pass store review on Day 1.
        </p>
      </div>

      {/* Hardware Showcase Stage (Mobbin Style) */}
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Controls Bar */}
        <div className="flex items-center justify-between mb-5 px-2">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              {flowScreens[activeIdx].flowStep}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-sm sm:text-base font-bold text-slate-900 font-google">
              {flowScreens[activeIdx].title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={prev}
              className="apple-press p-2 rounded-xl border border-black/8 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-all cursor-pointer"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={next}
              className="apple-press p-2 rounded-xl border border-black/8 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-all cursor-pointer"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Featured Hero Device Stage */}
        <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left: Flow Teardown & Context */}
          <div className="md:max-w-md space-y-4 text-left z-10">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/10">
                {flowScreens[activeIdx].tag}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                iOS 18 &amp; Android 15
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-google tracking-tight">
              {flowScreens[activeIdx].title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {flowScreens[activeIdx].subtitle}
            </p>

            {/* Highlights List */}
            <ul className="space-y-2 pt-2 border-t border-white/10">
              {flowScreens[activeIdx].highlights.map((h, i) => (
                <li key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {onLaunchApp && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onLaunchApp}
                  className="apple-press inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
                >
                  <span>Launch This Flow in App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Featured Mobile Screen Frame */}
          <div className="relative z-10 w-full max-w-[270px] sm:max-w-[310px] rounded-3xl p-2.5 bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden aspect-[9/19.5] bg-black border border-white/10 shadow-inner">
              <img
                src={flowScreens[activeIdx].src}
                alt={flowScreens[activeIdx].title}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="eager"
              />
            </div>
          </div>

        </div>

        {/* Interactive Thumbnail Ribbon (Mobbin Flow Thumbnails) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {flowScreens.map((s, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`group cursor-pointer rounded-2xl p-2.5 transition-all duration-200 border flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-slate-950 shadow-md ring-2 ring-slate-950/15 translate-y-[-2px]'
                    : 'bg-white/80 border-black/8 hover:bg-white hover:border-black/20 hover:shadow-2xs'
                }`}
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[9/19.5] border border-black/6 shadow-inner">
                  <img
                    src={s.src}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                    {s.flowStep}
                  </div>
                </div>

                <div className="pt-2.5 text-center">
                  <div className="text-xs font-bold text-slate-900 font-google truncate">
                    {s.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {s.tag}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
