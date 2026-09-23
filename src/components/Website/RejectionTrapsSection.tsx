import React from 'react';
import { AlertTriangle, ShieldAlert, WifiOff, FileCheck2, UserX, Clock, ArrowRight } from 'lucide-react';

interface RejectionTrapsSectionProps {
  onLaunchApp: () => void;
}

export const RejectionTrapsSection: React.FC<RejectionTrapsSectionProps> = ({ onLaunchApp }) => {
  const traps = [
    {
      icon: WifiOff,
      color: 'from-red-500 to-rose-600',
      tag: 'Apple Guideline 2.1',
      title: 'IPv6 Launch & Network Crashes',
      description:
        'Apple reviewers test exclusively on IPv6 cellular NAT64 networks. Hardcoded IPv4 endpoints or apps taking over 2.0s to load crash and trigger an immediate rejection notice.',
      guardrail: 'Pre-flight network audit & cold launch benchmark included in Phase 2 & 7.',
    },
    {
      icon: FileCheck2,
      color: 'from-amber-500 to-orange-600',
      tag: 'Apple Privacy 2026',
      title: 'Missing PrivacyInfo.xcprivacy Manifests',
      description:
        'Using common SDKs (UserDefaults, DiskSpace, SystemUptime) without declaring specific Required Reason API codes in your privacy manifest results in an instant Xcode upload block.',
      guardrail: 'Built-in XML Generator creates your compliant Privacy Manifest in seconds.',
    },
    {
      icon: UserX,
      color: 'from-purple-500 to-indigo-600',
      tag: 'Apple Guidelines 4.8 & 5.1.1',
      title: 'Sign in with Apple & Account Deletion',
      description:
        'If you offer Google or Facebook login, Apple mandates Sign in with Apple with equal prominence. And if users can register, self-service account deletion must be fully implemented inside the app.',
      guardrail: 'Step-by-step guidance & copy-paste prompts for auth parity & deletion flows.',
    },
    {
      icon: Clock,
      color: 'from-blue-500 to-cyan-600',
      tag: 'Google Play Core Policy',
      title: '20-Tester Rule & Background Vitals',
      description:
        'New personal developer accounts must recruit 20 opted-in testers for 14 continuous days before requesting production access. Background tasks must justify foreground services.',
      guardrail: 'Phase 9 includes closed testing playbook & Android Vitals health criteria.',
    },
  ];

  return (
    <section id="why-apps-fail" className="scroll-mt-20 py-20 sm:py-28 bg-[#090C15] text-white border-y border-slate-800/80 relative overflow-hidden">
      
      {/* Background Subtle Security Shield Grid Aura */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none opacity-20 -z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.15), transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 uppercase tracking-wider backdrop-blur-md">
            <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>The Cost of Guesswork</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-google">
            Why 40%+ of Mobile Apps Get Rejected on First Review
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed text-balance">
            Apple and Google reviewers don&apos;t just evaluate your design. They run rigorous automated and manual audits across network edge cases, privacy manifests, account lifecycle rules, and platform policies.
          </p>
        </div>

        {/* 4 Cards Diagnostic Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {traps.map((trap, idx) => {
            const Icon = trap.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700/80 shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${trap.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10">
                      {trap.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-google mb-2 group-hover:text-blue-300 transition-colors">
                    {trap.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {trap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-start space-x-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-800/40">
                  <span className="shrink-0 font-bold uppercase tracking-wider text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md font-google mt-0.5">
                    Solution
                  </span>
                  <span className="text-emerald-200">{trap.guardrail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-10 sm:mt-12 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold font-google text-white">
              Catch Every Rejection Trap Before Store Reviewers Do
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              App Blueprint encodes all 101 store guidelines into an actionable, self-auditing checklist.
            </p>
          </div>
          <button
            type="button"
            onClick={onLaunchApp}
            className="apple-press shrink-0 inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
          >
            <span>Run Store Audit Now</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

      </div>
    </section>
  );
};
