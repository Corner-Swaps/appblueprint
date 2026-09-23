import React from 'react';
import { GraduationCap, Type, Palette, Activity, Flame, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AcademyHighlightProps {
  onLaunchApp: () => void;
}

export const AcademyHighlight: React.FC<AcademyHighlightProps> = ({ onLaunchApp }) => {
  const topics = [
    {
      icon: Type,
      title: 'Typography & GDPR-Safe Fonts',
      desc: 'Learn how to bundle local fonts (Fontshare, SF Pro) with zero external CDN requests, eliminating EU GDPR fines.',
    },
    {
      icon: Palette,
      title: 'High-Contrast Apple Color Systems',
      desc: 'Color palettes engineered for strict WCAG AA 4.5:1 contrast in both Light and Dark Mode without unreadable text.',
    },
    {
      icon: Activity,
      title: 'Fluid Spring Physics & Gesture HIG',
      desc: 'Apple WWDC fluid motion principles: critically damped springs (damping 1.0, 0.35s) and 44x44pt touch targets.',
    },
    {
      icon: Flame,
      title: 'Production Testing & Sentry Crash Reporting',
      desc: 'Real-time crash tracking, breadcrumb logging, and cold launch speed diagnostics to keep your crash-free rate at 99.9%.',
    },
  ];

  return (
    <section id="academy" className="scroll-mt-20 py-20 sm:py-28 bg-gradient-to-b from-indigo-50/40 via-white to-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-800 tracking-wide">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
            <span>Built-in Masterclass</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F17] tracking-tight font-google">
            App Launch Academy
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A comprehensive design and engineering academy bundled directly into the app. Everything you need to design, build, and polish native mobile experiences.
          </p>
        </div>

        {/* 4 Curriculum Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {topics.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/30 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 flex items-start space-x-5 group"
              >
                <div className="w-13 h-13 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Module 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-google tracking-tight group-hover:text-indigo-950 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onLaunchApp}
            className="apple-press inline-flex items-center space-x-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Explore Academy in Web Suite</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

      </div>
    </section>
  );
};
