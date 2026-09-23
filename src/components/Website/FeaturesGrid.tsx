import React from 'react';
import { 
  Terminal, 
  ShieldAlert, 
  FileCode, 
  GraduationCap, 
  FolderSync, 
  Lock,
  Sparkles,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

interface FeaturesGridProps {
  onLaunchApp: () => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onLaunchApp }) => {
  const features = [
    {
      icon: Terminal,
      color: 'from-blue-600 to-indigo-600',
      title: '1-Click AI Coding Agent Prompts',
      tag: 'Cursor • Claude • ChatGPT',
      description:
        'Every single production requirement includes an autonomous, battle-tested prompt. Copy and paste directly into Cursor or Claude Code to audit safe areas, dark mode contrast, or keychain encryption.',
    },
    {
      icon: ShieldAlert,
      color: 'from-rose-500 to-red-600',
      title: 'Store Review Traps & Playbooks',
      tag: 'Guideline Diagnostics',
      description:
        'Know the exact rejection traps flagged by Apple and Google review teams before you submit. Includes step-by-step diagnostic playbooks for IPv6 connectivity, IAP bypasses, and account deletion.',
    },
    {
      icon: FileCode,
      color: 'from-amber-500 to-orange-600',
      title: 'Built-in Config & Policy Generators',
      tag: 'Zero-Effort Compliance',
      description:
        'Instantly generate store-ready Apple Privacy Manifests (PrivacyInfo.xcprivacy XML), Universal Links JSON (apple-app-site-association), Android App Links (assetlinks.json), and GDPR Privacy Policy Markdown.',
    },
    {
      icon: GraduationCap,
      color: 'from-purple-600 to-pink-600',
      title: 'App Launch Academy & Design System',
      tag: 'Apple HIG Masterclass',
      description:
        'Comprehensive reference guides for system typography (Fontshare, SF Pro, Google Sans), high-contrast palettes, fluid spring curves, and 44x44pt touch target accessibility.',
    },
    {
      icon: FolderSync,
      color: 'from-teal-500 to-emerald-600',
      title: 'Multi-Project Management',
      tag: 'Independent Progress',
      description:
        'Manage multiple apps simultaneously with dedicated color tags, custom phases, reorderable items, and isolated completion tracking saved automatically to your device.',
    },
    {
      icon: Lock,
      color: 'from-slate-700 to-slate-900',
      title: '100% Client-Side Zero-Trust Privacy',
      tag: 'No Tracking • No Server',
      description:
        'Your unreleased app concepts, ideas, and checklist data never touch external cloud servers. Zero tracking, zero third-party telemetry, 100% offline capable.',
    },
  ];

  return (
    <section id="features" className="scroll-mt-20 py-16 sm:py-24 bg-white/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Built For Precision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-google">
            Engineered for Mobile Builders &amp; AI Agents
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            More than just a static checklist. A purpose-built productivity suite giving indie founders and engineering teams the exact tools needed to ship world-class native apps.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          
          {/* Card 1: Flagship AI Prompts (Span 2 on lg) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Terminal className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/10 backdrop-blur-xs">
                  {features[0].tag}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-google mb-2">
                {features[0].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {features[0].description}
              </p>

              {/* Interactive Code Preview Box */}
              <div className="mt-5 p-3.5 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs text-slate-300 space-y-1.5 max-w-xl">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-white/10">
                  <span className="flex items-center space-x-1.5 text-blue-400 font-bold">
                    <span>⚡️</span>
                    <span>CURSOR / CLAUDE AGENT PROTOCOL</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">AUTONOMOUS AUDIT</span>
                </div>
                <p className="text-slate-200 truncate pt-1">
                  &quot;You are the autonomous senior mobile architect. Audit safe areas, IPv6 endpoints, and keychain storage...&quot;
                </p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10 relative z-10 flex items-center justify-between">
              <button
                type="button"
                onClick={onLaunchApp}
                className="apple-press inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                <span>Try in Interactive App</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Card 2: Store Review Traps */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-xs">
                  <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                  {features[1].tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-google mb-2">
                {features[1].title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {features[1].description}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onLaunchApp}
                className="apple-press inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>Try in Interactive App</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Card 3: Config & Policy Generators */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xs">
                  <FileCode className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                  {features[2].tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-google mb-2">
                {features[2].title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {features[2].description}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onLaunchApp}
                className="apple-press inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>Try in Interactive App</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Card 4: App Launch Academy */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-xs">
                  <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                  {features[3].tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-google mb-2">
                {features[3].title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {features[3].description}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onLaunchApp}
                className="apple-press inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>Try in Interactive App</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Card 5: Multi-Project Management */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-xs">
                  <FolderSync className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                  {features[4].tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-google mb-2">
                {features[4].title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {features[4].description}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onLaunchApp}
                className="apple-press inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>Try in Interactive App</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Card 6: 100% Client-Side Privacy (Span 3 on lg or Span 1) */}
          <div className="lg:col-span-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start sm:items-center space-x-4 max-w-3xl">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Lock className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-google">
                    {features[5].title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {features[5].tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {features[5].description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press shrink-0 inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Try in Interactive App</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
