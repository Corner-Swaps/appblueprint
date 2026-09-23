import React from 'react';
import { GraduationCap } from 'lucide-react';

interface UnifiedAppHeaderProps {
  overallPercent: number;
  totalItems: number;
  completedItems: number;
  activeTab?: 'checklist' | 'resources' | 'projects';
}

export const UnifiedAppHeader: React.FC<UnifiedAppHeaderProps> = ({
  overallPercent,
  totalItems,
  completedItems,
  activeTab = 'checklist',
}) => {
  return (
    <header className="w-full bg-[#FAF8F6] border-b border-black/8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-6 text-center flex flex-col items-center">
        {/* Centered Main Title Explaining What It Does */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-google leading-tight text-center">
          Build, Audit, &amp; Launch Audit-Proof Mobile Apps
        </h1>

        {/* Centered Subtext */}
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto text-center">
          10 guided phases, 101 audit-proof requirements, battle-tested store guardrails, and 1-click autonomous AI coding prompts to take your app from day zero to App Store and Google Play approval.
        </p>

        {/* Centered Telemetry / Banner Area */}
        <div className="mt-5 pt-3.5 border-t border-black/5 w-full flex items-center justify-center">
          {activeTab === 'resources' ? (
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-purple-50/90 border border-purple-200/80 text-purple-700 shadow-xs">
              <GraduationCap className="w-4.5 h-4.5 text-purple-600 stroke-[2.2]" />
              <span className="text-xs sm:text-sm font-bold font-google">
                Academy &amp; Curated Production Resources
              </span>
              <span className="text-xs text-purple-400">•</span>
              <span className="text-xs font-semibold text-purple-600">
                10 Categories · 80 Verified Tools &amp; AI Prompts
              </span>
            </div>
          ) : (
            /* Progress Bar sized to match the big panel: max-w-2xl sm:max-w-3xl lg:max-w-4xl, NO refresh button */
            <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className="text-slate-600 font-medium">
                  {completedItems} of {totalItems} Verified
                </span>
                <span className="font-black text-slate-900 font-google">
                  {overallPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 sm:h-3 rounded-full bg-slate-200/90 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
