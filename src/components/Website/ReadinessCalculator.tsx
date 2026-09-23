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
    <section id="calculator" className="scroll-mt-20 py-16 sm:py-24 bg-white/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Store Approval Probability</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-google">
            How Ready Is Your App for Store Review?
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Check off these 5 critical pre-flight criteria to calculate your estimated App Store approval probability right now.
          </p>
        </div>

        {/* Interactive Calculator Box */}
        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 5 Questions */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Critical Pre-Flight Questions:
            </div>

            {questions.map((q) => {
              const isChecked = !!answers[q.id];
              return (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => toggle(q.id)}
                  role="checkbox"
                  aria-checked={isChecked}
                  className={`w-full text-left apple-press p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 select-none ${
                    isChecked 
                      ? 'bg-blue-50/50 border-blue-200/80 shadow-2xs' 
                      : 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/60'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? 'bg-blue-600 text-white shadow-2xs' : 'border-2 border-slate-300 bg-white'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-slate-900' : 'text-slate-600'}`}>
                      {q.text}
                    </p>
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider mt-0.5 inline-block">
                      {q.rule}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Score Gauge & Call to Action */}
          <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between text-center space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Store Pass Probability
              </span>

              <div className="mt-3 flex items-baseline justify-center space-x-1 font-google">
                <span className={`text-5xl sm:text-6xl font-black ${status.color}`}>
                  {score}%
                </span>
                <span className="text-slate-400 font-bold text-lg">/ 100%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-3 rounded-full mt-4 overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${status.bar}`}
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Status Badge */}
              <div className={`mt-4 p-3 rounded-xl border ${status.bg} text-xs leading-relaxed space-y-1`}>
                <div className={`font-bold font-google ${status.color}`}>
                  {status.label}
                </div>
                <p className="text-slate-600 text-[11px]">
                  {status.desc}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press w-full inline-flex items-center justify-center space-x-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
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
