import React from 'react';
import { 
  X, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Rocket,
  HelpCircle
} from 'lucide-react';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCount: number;
  totalCount: number;
}

export const AssistantModal: React.FC<AssistantModalProps> = ({
  isOpen,
  onClose,
  completedCount,
  totalCount,
}) => {
  if (!isOpen) return null;

  const percent = Math.round((completedCount / (totalCount || 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-md bg-white dark:bg-apple-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-apple-gray-200 dark:border-apple-gray-800 z-10 p-6 space-y-4 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-apple-gray-100 dark:border-apple-gray-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FFE6A5] text-amber-850 flex items-center justify-center border border-amber-300/60 shadow-xs">
              <Sparkles className="w-5 h-5 fill-amber-400 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                App Launch Advisor
              </h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Store Approval Probability: <strong className="text-emerald-600 dark:text-emerald-400">{percent}%</strong>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="apple-press p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Store Readiness Status Box */}
        <div className="p-4 rounded-2xl bg-[#FFF8F9] dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-[#FF456A]">
            <Rocket className="w-4 h-4" />
            <span>Active Sprint Recommendation</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            You have satisfied <strong>{completedCount} of {totalCount}</strong> primary launch milestones. Complete your <strong>PrivacyInfo.xcprivacy</strong> manifest before archiving your Xcode build for App Store Connect to prevent automatic rejection.
          </p>
        </div>

        {/* Critical Trap Checklist */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Top 3 Rejection Traps to Avoid</span>
          </h4>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                1. Apple Guideline 2.1 (Missing Reviewer Login)
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                Always provide dedicated credentials and SMS 2FA bypass codes in the App Review Notes.
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                2. Apple Guideline 5.1.1(v) (Account Deletion)
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                Must allow immediate in-app deletion if registration is possible. Don't force email requests.
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                3. Google Play 20-Tester Rule
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                Keep 20+ real testers opted into closed track for 14 continuous days before production access.
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="apple-press w-full py-2.5 rounded-2xl bg-[#FF456A] hover:bg-[#FF3058] text-white font-bold text-xs shadow-sm transition-colors"
        >
          Got it, continue checklist
        </button>

      </div>
    </div>
  );
};
