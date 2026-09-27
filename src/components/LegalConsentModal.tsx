import React, { useState } from 'react';
import { FileText, ChevronRight, ChevronDown, Check, ArrowLeft } from 'lucide-react';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden h-[680px] max-h-[90vh] transform transition-all duration-300"
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
            <div className="flex-1 px-5 py-3.5 overflow-y-auto space-y-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans divide-y divide-slate-100">
              <div>
                <p className="font-medium text-slate-700">
                  App Blueprint is designed from the ground up with strict safety standards. By using this app, you acknowledge and agree to these terms:
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                  <span>1. Scaffolding &amp; Educational Guidance</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  Provided strictly as an educational developer guide and blueprint. App Store approval by Apple or Google is never guaranteed.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block" />
                  <span>2. Limitation of Liability</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  Contributors assume no liability for claims, penalties, or losses resulting from apps you create, deploy, or distribute.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                  <span>3. Prohibited Usage</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  Strictly prohibited from building unlawful, fraudulent, spyware, malicious, or sexually explicit software products.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span>4. Store Guidelines &amp; Compliance</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  You are solely responsible for ensuring your software complies with Apple App Store Review Guidelines and territorial laws.
                </p>
              </div>

              {/* Point 5: Privacy & Data Protection with drop-down arrow vertically centered on the right side */}
              <div className="pt-2.5">
                <div 
                  onClick={handleOpenPrivacy}
                  className="group cursor-pointer select-none flex items-center justify-between gap-3"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenPrivacy();
                    }
                  }}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block shrink-0" />
                      <span>5. Privacy &amp; Data Protection</span>
                    </h3>
                    <p className="text-slate-600 text-xs leading-normal">
                      Zero third-party tracking or telemetry. All roadmap progress and data remain 100% on your personal device.
                    </p>
                  </div>
                  
                  {/* Arrow vertically in the middle on the right side */}
                  <div className="shrink-0 flex items-center justify-center pl-1 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all">
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer / Acceptance - positioned closer to the bottom */}
            <div className="px-4 sm:px-5 pt-3 pb-3 sm:pb-3.5 border-t border-slate-100 bg-slate-50/60 flex flex-col space-y-2 shrink-0">
              <button
                type="button"
                onClick={handleAccept}
                className="apple-press w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold text-sm sm:text-base shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                <span>Agree &amp; Continue</span>
              </button>
            </div>
          </>
        ) : (
          /* Privacy Policy View: Full expanded sections */
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

            {/* Scrollable Privacy Policy Content with comprehensive sections */}
            <div className="flex-1 px-5 py-3.5 overflow-y-auto space-y-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans divide-y divide-slate-100">
              <div>
                <p className="font-medium text-slate-700">
                  App Blueprint is designed from the ground up with strict privacy-first principles. Your workflow data belongs entirely to you:
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />
                  <span>1. 100% Local On-Device Storage</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  All roadmap progress, custom phases, and settings are saved locally on your device. No cloud servers store data.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  <span>2. No Tracking, Telemetry, or Ads</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  We do not embed third-party advertising trackers, sell user data, or track your identity and behavioral activity.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span>3. Apple StoreKit 2 &amp; Payment Privacy</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  In-app purchases run securely through Apple App Store services. We never see or store your payment details.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                  <span>4. External Documentation &amp; SDKs</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  Links to developer tools open directly in your default browser and are subject to each site's privacy policy.
                </p>
              </div>

              <div className="pt-2.5 space-y-1">
                <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                  <span>5. Complete User Data Control</span>
                </h3>
                <p className="text-slate-600 text-xs leading-normal">
                  You retain full ownership of your roadmap. You can erase, rename, or reset all stored project data anytime.
                </p>
              </div>
            </div>

            {/* Privacy Policy Return Footer - positioned closer to the bottom */}
            <div className="px-4 sm:px-5 pt-3 pb-3 sm:pb-3.5 border-t border-slate-100 bg-slate-50/60 flex flex-col space-y-2 shrink-0">
              <button
                type="button"
                onClick={handleClosePrivacy}
                className="apple-press w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold text-sm sm:text-base shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Back to Terms</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
