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
    <section id="academy" className="py-16 sm:py-24 bg-gradient-to-b from-indigo-50/50 to-white/80 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Built-in Masterclass</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-google">
            App Launch Academy
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            A comprehensive design and engineering academy bundled directly into the app. Everything you need to design, build, and polish native mobile experiences.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {topics.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start space-x-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 font-google">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center CTA */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onLaunchApp}
            className="apple-press inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-xs"
          >
            <span>Explore Academy in Web Suite</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

      </div>
    </section>
  );
};
