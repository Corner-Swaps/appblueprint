import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, Activity, Sparkles } from 'lucide-react';

interface ReadinessCalculatorProps {
  onLaunchApp: () => void;
}

export const ReadinessCalculator: React.FC<ReadinessCalculatorProps> = ({ onLaunchApp }) => {
  const questions = [
    {
      id: 'ipv6',
      text: 'Does your app cold start in <2.0s and operate on IPv6 cellular NAT64 networks without crashing?',
      rule: 'Apple Guideline 2.1 & 4.0',
    },
    {
      id: 'manifest',
      text: 'Have you declared Required Reason APIs in an Apple PrivacyInfo.xcprivacy manifest?',
      rule: 'Apple Privacy 2026 Mandate',
    },
    {
      id: 'auth',
      text: 'If you support third-party login (Google/Meta), is Sign in with Apple implemented with equal prominence?',
      rule: 'Apple Guideline 4.8',
    },
    {
      id: 'deletion',
      text: 'Can users permanently delete their account and personal data self-serve within the app?',
      rule: 'Apple Guideline 5.1.1(v)',
    },
    {
      id: 'touch',
      text: 'Have you verified minimum 44x44pt touch targets and tested Large Text Dynamic Type scaling?',
      rule: 'Apple Human Interface Guidelines',
    },
  ];

  const [answers, setAnswers] = useState<Record<string, boolean>>({
    ipv6: true,
    manifest: false,
    auth: true,
    deletion: false,
    touch: false,
  });

  const toggle = (id: string) => {
    setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const yesCount = Object.values(answers).filter(Boolean).length;
  const score = Math.round((yesCount / questions.length) * 100);

  const getStatus = () => {
    if (score >= 80) {
      return {
        label: 'High Pass Likelihood',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 border-emerald-200',
        bar: 'bg-emerald-500',
        desc: 'Great job! You have addressed primary architectural blockers. Run the remaining checks to guarantee approval.',
      };
    }
    if (score >= 40) {
      return {
        label: 'Moderate Rejection Risk',
        color: 'text-amber-600',
        bg: 'bg-amber-50 border-amber-200',
        bar: 'bg-amber-500',
        desc: 'Reviewers will likely flag missing privacy manifests or account deletion flows. Run our automated guardrails.',
      };
    }
    return {
      label: 'Critical Rejection Risk',
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200',
      bar: 'bg-rose-500',
      desc: 'Your build has severe risks of immediate rejection. Use App Blueprint to audit each requirement before submission.',
    };
  };

  const status = getStatus();

  return (
    <section id="calculator" className="scroll-mt-20 py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-800 tracking-wide">
            <Activity className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
            <span>Store Approval Probability</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F17] tracking-tight font-google">
            How Ready Is Your App for Store Review?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Check off these 5 critical pre-flight criteria to calculate your estimated App Store approval probability right now.
          </p>
        </div>

        {/* Interactive Pre-Flight Simulator Station */}
        <div className="mt-14 max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/50 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: 5 Tactile Pre-Flight Questions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                  Critical Pre-Flight Questions:
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {yesCount} of {questions.length} passed
                </span>
              </div>

              <div className="space-y-3">
                {questions.map((q) => {
                  const isChecked = !!answers[q.id];
                  return (
                    <button
                      type="button"
                      key={q.id}
                      onClick={() => toggle(q.id)}
                      role="checkbox"
                      aria-checked={isChecked}
                      className={`w-full text-left apple-press p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                        isChecked 
                          ? 'bg-blue-50/40 border-blue-300/80 shadow-2xs' 
                          : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 hover:border-slate-300'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md">
                            {q.rule}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm font-bold leading-snug transition-colors ${
                          isChecked ? 'text-slate-900' : 'text-slate-600'
                        }`}>
                          {q.text}
                        </p>
                      </div>

                      {/* iOS-Style Tactile Switch */}
                      <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 shrink-0 flex items-center ${
                        isChecked ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                      }`}>
                        <div className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center transition-transform">
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Circular Telemetry Gauge & Call to Action */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50/90 to-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-inner flex flex-col justify-between text-center space-y-6">
            <div>
              <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                Store Pass Probability
              </span>

              {/* Radial Progress Ring */}
              <div className="relative w-40 h-40 mx-auto mt-4 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  {/* Background Track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="text-slate-200/80"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  {/* Animated Foreground Progress */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className={`${score >= 80 ? 'text-emerald-500' : score >= 40 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-700 ease-out`}
                    strokeWidth="10"
                    strokeDasharray={314.159}
                    strokeDashoffset={314.159 - (314.159 * score) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>

                {/* Score Number Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex items-baseline font-google">
                    <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${status.color}`}>
                      {score}%
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 mt-0.5">/ 100%</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`mt-5 p-4 rounded-xl border ${status.bg} text-xs leading-relaxed space-y-1.5 text-left`}>
                <div className={`font-bold font-google text-sm flex items-center space-x-1.5 ${status.color}`}>
                  {score >= 80 ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{status.label}</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {status.desc}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press w-full inline-flex items-center justify-center space-x-2 bg-[#0B0F17] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>Audit All 101 Rules in App</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
