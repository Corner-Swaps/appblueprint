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
    <section id="features" className="scroll-mt-20 py-16 sm:py-24 bg-white/60 border-t border-slate-200/80">
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

        {/* Features 6-Card Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-xs`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-google mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onLaunchApp}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <span>Try in Interactive App</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
