import React, { useState } from 'react';
import { FileText, ChevronRight, Check, ArrowLeft } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { ImpactStyle } from '@capacitor/haptics';

interface LegalConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const LegalConsentModal: React.FC<LegalConsentModalProps> = ({ isOpen, onAccept }) => {
  const [view, setView] = useState<'terms' | 'privacy'>('terms');

  if (!isOpen) return null;

  const handleAccept = () => {
    triggerHaptic(ImpactStyle.Medium);
    onAccept();
  };

  const handleOpenPrivacy = () => {
    triggerHaptic(ImpactStyle.Light);
    setView('privacy');
  };

  const handleClosePrivacy = () => {
    triggerHaptic(ImpactStyle.Light);
    setView('terms');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden max-h-[70vh] sm:max-h-[72vh] transform transition-all duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        {view === 'terms' ? (
          /* Terms of Service View */
          <>
            {/* Modal Header: Clean, centered title, no icon or badges */}
            <div className="py-4 px-6 border-b border-slate-100 bg-white text-center shrink-0">
              <h2 id="legal-modal-title" className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-google">
                Terms &amp; Safety Disclaimer
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Please review before proceeding
              </p>
            </div>

            {/* Scrollable Terms Content */}
            <div className="px-5 py-3.5 overflow-y-auto space-y-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans divide-y divide-slate-100">
              <div>
                <p className="font-medium text-slate-700">
                  Welcome to App Blueprint. By accessing or using this application, you acknowledge and agree to these terms:
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                  <span>1. Scaffolding &amp; Educational Guidance</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  Provided strictly "AS IS" as an educational checklist and developer guide. Store approval by Apple or Google is not guaranteed.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block" />
                  <span>2. Limitation of Liability</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  Contributors assume no liability for any claims, penalties, or losses resulting from software you create. You assume 100% sole responsibility for your apps.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                  <span>3. Prohibited Usage</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  Strictly prohibited from developing unlawful, fraudulent, spyware, malicious, or sexually explicit applications.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span>4. Store Guidelines &amp; Compliance</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  You are solely responsible for ensuring your software complies with Apple App Store Review Guidelines, Google Play Policies, and territorial laws.
                </p>
              </div>

              {/* In-App Privacy Link Card */}
              <div className="pt-2.5">
                <button
                  type="button"
                  onClick={handleOpenPrivacy}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <FileText className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Privacy Policy</div>
                      <div className="text-[10px] text-slate-500">Zero data collection, 100% on-device storage</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
                </button>
              </div>
            </div>

            {/* Modal Footer / Acceptance */}
            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/60 flex flex-col space-y-2 shrink-0">
              <button
                type="button"
                onClick={handleAccept}
                className="apple-press w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Agree &amp; Continue</span>
              </button>
            </div>
          </>
        ) : (
          /* Privacy Policy View */
          <>
            {/* Privacy Policy Header */}
            <div className="py-4 px-6 border-b border-slate-100 bg-white text-center shrink-0">
              <h2 id="legal-modal-title" className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-google">
                Privacy Policy
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Local storage &amp; zero tracking
              </p>
            </div>

            {/* Scrollable Privacy Policy Content */}
            <div className="px-5 py-3.5 overflow-y-auto space-y-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans divide-y divide-slate-100">
              <div>
                <p className="font-medium text-slate-700">
                  App Blueprint is designed with privacy-first principles. Your workflow data belongs entirely to you.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />
                  <span>1. 100% Local On-Device Storage</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  All checklist progress, custom items, and settings are saved locally on your device in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[10px]">localStorage</code>. No remote databases or user harvesting.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  <span>2. No Ads or Telemetry</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  We do not embed third-party advertising trackers, sell user data, or track your activity across apps.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span>3. External Links</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  Links to external tools or documentation open in third-party services subject to their respective policies.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                  <span>4. Data Control</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  You can reset or erase all local data at any time through the app settings or by clearing your browser/app data.
                </p>
              </div>
            </div>

            {/* Privacy Policy Return Footer */}
            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/60 flex flex-col space-y-2 shrink-0">
              <button
                type="button"
                onClick={handleClosePrivacy}
                className="apple-press w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Terms</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
