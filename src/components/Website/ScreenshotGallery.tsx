import React, { useState } from 'react';
import { Smartphone, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const ScreenshotGallery: React.FC = () => {
  const screenshots = [
    {
      src: './screenshots/01_welcome.png',
      title: 'Welcome & Setup',
      subtitle: 'Clear, distraction-free onboarding for your project',
      tag: 'Onboarding',
    },
    {
      src: './screenshots/02_production_checklist.png',
      title: 'Production Checklist',
      subtitle: '101 store requirements with deep-dive guidance & traps',
      tag: 'Checklist',
    },
    {
      src: './screenshots/03_interactive_roadmap.png',
      title: 'Multi-Phase Roadmap',
      subtitle: 'Reorderable milestones and live completion tracking',
      tag: 'Roadmap',
    },
    {
      src: './screenshots/04_app_launch_academy.png',
      title: 'App Launch Academy',
      subtitle: 'Curated typography, palettes, animation & audit tools',
      tag: 'Academy',
    },
    {
      src: './screenshots/05_production_playbook.png',
      title: 'Production Playbook',
      subtitle: 'Actionable playbooks for IPv6, IAP, and account deletion',
      tag: 'Playbook',
    },
  ];

  const [activeIdx, setActiveIdx] = useState(1);

  const prev = () => setActiveIdx((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  const next = () => setActiveIdx((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));

  return (
    <section id="screenshots" className="scroll-mt-20 py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-800 tracking-wide">
          <Smartphone className="w-3.5 h-3.5 text-purple-600 stroke-[2.5]" />
          <span>Pixel-Perfect Design</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F17] tracking-tight font-google">
          Designed for iOS 18 &amp; Apple HIG
        </h2>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Crafted with authentic tactile materials, fluid spring physics, dynamic type accessibility, and 44x44pt touch targets.
        </p>
      </div>

      {/* Hardware Showcase Stage */}
      <div className="mt-14 max-w-5xl mx-auto">
        
        {/* Navigation Controls Bar */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Previewing {activeIdx + 1} of {screenshots.length}:
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 font-google">
              {screenshots[activeIdx].title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={prev}
              className="apple-press p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-all cursor-pointer"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={next}
              className="apple-press p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-all cursor-pointer"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Featured Hero Device Stage */}
        <div className="bg-gradient-to-b from-slate-900 to-[#0A0D14] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left: Metadata & Context */}
          <div className="md:max-w-md space-y-4 text-center md:text-left z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/10">
              {screenshots[activeIdx].tag}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-google tracking-tight">
              {screenshots[activeIdx].title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {screenshots[activeIdx].subtitle}
            </p>
          </div>

          {/* Right: Featured Mobile Screen Frame */}
          <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] rounded-3xl p-2.5 bg-slate-800/80 border border-slate-700/80 shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden aspect-9/19.5 bg-slate-950 border border-white/10 shadow-inner">
              <img
                src={screenshots[activeIdx].src}
                alt={screenshots[activeIdx].title}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Interactive Thumbnail Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {screenshots.map((s, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`group cursor-pointer rounded-2xl p-2.5 transition-all duration-200 border flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20 translate-y-[-2px]'
                    : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-9/19.5 border border-slate-200/60 shadow-inner">
                  <img
                    src={s.src}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                    {s.tag}
                  </div>
                </div>

                <div className="pt-2.5 text-center">
                  <div className="text-xs font-bold text-slate-900 font-google truncate">
                    {s.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {s.subtitle}
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
