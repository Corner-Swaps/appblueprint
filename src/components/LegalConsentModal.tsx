import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, FileText, ChevronRight, Check } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in select-none">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden max-h-[88vh] transform transition-all duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        {view === 'terms' ? (
          /* Terms of Service View */
          <>
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-b from-purple-50/60 to-white flex items-center space-x-3.5 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
                <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/80 border border-purple-200 px-2 py-0.5 rounded-full inline-block mb-1">
                  Mandatory Legal Agreement
                </span>
                <h2 id="legal-modal-title" className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-google">
                  Terms &amp; Safety Disclaimer
                </h2>
              </div>
            </div>

            {/* Scrollable Terms Content */}
            <div className="px-5 py-4 overflow-y-auto space-y-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans divide-y divide-slate-100">
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">
                  Welcome to App Blueprint. By accessing or using this tool, you explicitly acknowledge and agree to the legally binding terms detailed below.
                </p>
              </div>

              <div className="pt-3 space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 inline-block" />
                  <span>1. Technical Scaffolding &amp; Educational Tool</span>
                </h3>
                <p>
                  App Blueprint is provided strictly as an educational checklist, architecture guide, and developer assistant tool on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, express or implied. It does not guarantee approval by Apple Inc., Google LLC, or any third-party app review board.
                </p>
              </div>

              <div className="pt-3 space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                  <span>2. Absolute Limitation of Developer Liability</span>
                </h3>
                <p>
                  Under no circumstances shall the creators, authors, copyright holders, or contributors of App Blueprint be liable for any claims, damages, losses, liabilities, legal actions, financial penalties, account terminations, or operational disruptions arising from, out of, or in connection with the software, code generation, AI directives, architectural prompts, or any application created, compiled, or published by the user. <strong>You assume 100% full, exclusive, and sole legal and commercial liability for all software you build and distribute.</strong>
                </p>
              </div>

              <div className="pt-3 space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
                  <span>3. Strict Prohibition of Inappropriate &amp; Malicious Apps</span>
                </h3>
                <p>
                  You are strictly prohibited from using App Blueprint, its architecture guides, or prompt directives to develop, deploy, or assist with applications that:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Facilitate unlawful activities, fraudulent schemes, phishing, scamming, or intellectual property theft.</li>
                  <li>Distribute sexually explicit content, child exploitation material, extreme violence, harassment, discrimination, or hate speech.</li>
                  <li>Infiltrate systems with spyware, stalkerware, unlicensed keyloggers, botnets, or malicious code.</li>
                  <li>Violate Apple App Store Review Guidelines, Google Play Developer Policies, GDPR, COPPA, or international export controls.</li>
                </ul>
              </div>

              <div className="pt-3 space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                  <span>4. Compliance With Store Guidelines &amp; Local Laws</span>
                </h3>
                <p>
                  You are solely responsible for ensuring your application satisfies all legal requirements, user consent disclosures, data minimization standards, and platform store guidelines in all territories where your application is distributed.
                </p>
              </div>

              {/* In-App Privacy Link Card */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleOpenPrivacy}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-between text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Privacy Policy</div>
                      <div className="text-[11px] text-slate-500">Zero data collection, 100% on-device local storage</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
                </button>
              </div>
            </div>

            {/* Modal Footer / Acceptance */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/60 flex flex-col space-y-2.5 shrink-0">
              <p className="text-[11px] text-slate-500 text-center leading-snug">
                By tapping "I Agree &amp; Accept", you certify that you understand and agree to these Terms and assume full responsibility for your applications.
              </p>
              <button
                type="button"
                onClick={handleAccept}
                className="apple-press w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>I Agree &amp; Accept</span>
              </button>
            </div>
          </>
        ) : (
          /* Privacy Policy View */
          <>
            {/* Privacy Policy Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-b from-indigo-50/60 to-white flex items-center space-x-3.5 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 border border-indigo-200 px-2 py-0.5 rounded-full inline-block mb-1">
                  Privacy First
                </span>
                <h2 id="legal-modal-title" className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-google">
                  Privacy Policy
                </h2>
              </div>
            </div>

            {/* Scrollable Privacy Policy Content */}
            <div className="px-5 py-4 overflow-y-auto space-y-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans divide-y divide-slate-100">
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">
                  App Blueprint is architected with strict privacy-by-design principles. We believe your intellectual property and project workflows belong solely to you.
                </p>
              </div>

              <div className="pt-3 space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                  <span>1. 100% Local On-Device Storage</span>
                </h3>
                <p>
                  All project data, completed checklist states, custom items, and settings are stored locally on your device using browser <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[11px]">localStorage</code>. We run no remote tracking databases and do not sync or harvest your project contents.
                </p>
              </div>

              <div className="pt-3 space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>2. No Advertising or Data Brokering</span>
                </h3>
                <p>
                  We do not embed third-party advertising SDKs, sell user telemetry to data brokers, or track your identity across apps or websites. Your work remains completely confidential to your device.
                </p>
              </div>

              <div className="pt-3 space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                  <span>3. External Resource Links</span>
                </h3>
                <p>
                  The Resources and Video Guides in this application direct you to external third-party services (such as official Apple Developer portals, Google Play Console, GitHub, Fontshare, or YouTube). When interacting with external platforms, their respective privacy policies and terms apply.
                </p>
              </div>

              <div className="pt-3 space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 inline-block" />
                  <span>4. Your Rights &amp; Data Erasure</span>
                </h3>
                <p>
                  You retain full ownership of all content created. You may erase all locally stored data at any time by clearing your browser cache or resetting app data in your device settings.
                </p>
              </div>
            </div>

            {/* Privacy Policy Return Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/60 flex flex-col space-y-2 shrink-0">
              <button
                type="button"
                onClick={handleClosePrivacy}
                className="apple-press w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>I Understand</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
