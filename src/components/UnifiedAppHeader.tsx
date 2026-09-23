import React from 'react';
import { AppLogo } from './AppLogo';
import { 
  Smartphone, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Apple, 
  ExternalLink
} from 'lucide-react';

interface UnifiedAppHeaderProps {
  overallPercent: number;
  totalItems: number;
  completedItems: number;
  activePlatform: 'all' | 'ios' | 'android';
  onSelectPlatform: (platform: 'all' | 'ios' | 'android') => void;
  onOpenPhoneModal: () => void;
  isAllExpanded: boolean;
  onToggleExpandAll: () => void;
  onResetProgress: () => void;
}

export const UnifiedAppHeader: React.FC<UnifiedAppHeaderProps> = ({
  overallPercent,
  totalItems,
  completedItems,
  activePlatform,
  onSelectPlatform,
  onOpenPhoneModal,
  isAllExpanded,
  onToggleExpandAll,
  onResetProgress,
}) => {
  return (
    <header className="w-full bg-[#FAF8F6] border-b border-black/8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-6">
        {/* Top Navbar Row: Logo, Brand, and Action Buttons */}
        <div className="flex items-center justify-between gap-4 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-md shadow-slate-900/10">
              <AppLogo size={24} color="#FFFFFF" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-black tracking-tight text-slate-900 font-google">
                  App Blueprint
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200/80 text-slate-700">
                  2026 OS
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Apple HIG &amp; Google Play Production Guardrails
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onOpenPhoneModal}
              className="apple-press inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
              title="Open QR code to test on real iPhone or Android"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-600 stroke-[2.2]" />
              <span className="hidden sm:inline">Test on Phone</span>
              <span className="sm:hidden">QR</span>
            </button>
            <a
              href="https://developer.apple.com/design/human-interface-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-transparent hover:bg-black/5 text-slate-600 text-xs font-semibold transition-colors"
            >
              <span>HIG Docs</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Quick Title Explaining What It Does */}
        <div className="pt-2 pb-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-[11px] font-bold tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Zero-to-Store Mobile Production OS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-google leading-tight">
            Build, Audit, &amp; Launch Audit-Proof Mobile Apps
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            10 guided phases, 101 audit-proof requirements, battle-tested store guardrails, and 1-click autonomous AI coding prompts to take your app from day zero to App Store and Google Play approval.
          </p>
        </div>

        {/* Telemetry Bar: Progress, Platform Filters, and Controls */}
        <div className="mt-3 pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* Platform Selector Filter */}
          <div className="flex items-center bg-slate-200/60 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => onSelectPlatform('all')}
              className={`apple-press px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activePlatform === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (101)
            </button>
            <button
              type="button"
              onClick={() => onSelectPlatform('ios')}
              className={`apple-press inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activePlatform === 'ios'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iOS HIG</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectPlatform('android')}
              className={`apple-press inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activePlatform === 'android'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android Play</span>
            </button>
          </div>

          {/* Progress & Reset Strip */}
          <div className="flex items-center space-x-3 flex-1 min-w-[220px] max-w-md">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
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

          {/* Expand / Collapse All Toggle */}
          <button
            type="button"
            onClick={onToggleExpandAll}
            className="apple-press inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
          >
            {isAllExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Expand All</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
