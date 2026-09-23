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
      subtitle: '54 store requirements with deep-dive guidance & traps',
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
    <section id="screenshots" className="scroll-mt-20 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-bold text-purple-700 uppercase tracking-wider">
          <Smartphone className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Pixel-Perfect Design</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-google">
          Designed for iOS 18 &amp; Apple HIG
        </h2>

        <p className="text-base sm:text-lg text-slate-600">
          Crafted with authentic tactile materials, fluid spring physics, dynamic type accessibility, and 44x44pt touch targets.
        </p>
      </div>

      {/* Horizontal Carousel / Showcase */}
      <div className="mt-12">
        
        {/* Navigation controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Previewing {activeIdx + 1} of {screenshots.length}:
            </span>
            <span className="text-sm font-bold text-slate-900 font-google">
              {screenshots[activeIdx].title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={prev}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Screenshot Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {screenshots.map((s, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`group cursor-pointer rounded-2xl p-2.5 transition-all duration-300 border flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-9/19.5 border border-slate-200/60 shadow-inner">
                  <img
                    src={s.src}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider">
                    {s.tag}
                  </div>
                </div>

                <div className="pt-2 text-center">
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
