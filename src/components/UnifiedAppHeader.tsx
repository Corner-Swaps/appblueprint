import React from 'react';
import { RotateCcw } from 'lucide-react';

interface UnifiedAppHeaderProps {
  overallPercent: number;
  totalItems: number;
  completedItems: number;
  onResetProgress: () => void;
}

export const UnifiedAppHeader: React.FC<UnifiedAppHeaderProps> = ({
  overallPercent,
  totalItems,
  completedItems,
  onResetProgress,
}) => {
  return (
    <header className="w-full bg-[#FAF8F6] border-b border-black/8 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-6 text-center">
        {/* Centered Main Title Explaining What It Does */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-google leading-tight">
          Build, Audit, &amp; Launch Audit-Proof Mobile Apps
        </h1>

        {/* Centered Subtext */}
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          10 guided phases, 101 audit-proof requirements, battle-tested store guardrails, and 1-click autonomous AI coding prompts to take your app from day zero to App Store and Google Play approval.
        </p>

        {/* Centered Progress Telemetry */}
        <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-center">
          <div className="flex items-center space-x-3 w-full max-w-sm">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">
                  {completedItems} of {totalItems} Verified
                </span>
                <span className="font-black text-slate-900 font-google">
                  {overallPercent}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
            </div>

            {completedItems > 0 && (
              <button
                type="button"
                onClick={onResetProgress}
                className="apple-press p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Reset completed checklist items"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
