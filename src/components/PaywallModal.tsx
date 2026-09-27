import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Unlock,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { 
  NEXT_PROJECT_PRICE_DISPLAY, 
  UNLIMITED_PRICE_DISPLAY, 
  PRODUCT_ID_NEXT_PROJECT,
  PRODUCT_ID_UNLIMITED_PROJECTS,
  unlockUnlimited,
  unlockSingleProject
} from '../utils/paywall';
import { purchaseWithStoreKit, restoreWithStoreKit } from '../utils/nativeStoreKit';
import { triggerHaptic, ImpactStyle } from '../utils/haptics';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
  targetProjectId?: string;
  targetProjectName?: string;
  canDismiss?: boolean;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUnlocked,
  targetProjectId,
  targetProjectName,
  canDismiss = true,
}) => {
  const [showStoreKitSheet, setShowStoreKitSheet] = useState(false);
  const [storeKitState, setStoreKitState] = useState<'idle' | 'processing' | 'done'>('idle');
  const [purchaseTier, setPurchaseTier] = useState<'single' | 'unlimited'>('unlimited');
  const [isNativeProcessing, setIsNativeProcessing] = useState(false);
  const [nativeMessage, setNativeMessage] = useState<string | null>(null);

  // Reset StoreKit state when modal closes and ensure body is never scroll-locked
  useEffect(() => {
    document.body.style.overflow = '';
    if (!isOpen) {
      setShowStoreKitSheet(false);
      setStoreKitState('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPrice = purchaseTier === 'unlimited' ? UNLIMITED_PRICE_DISPLAY : NEXT_PROJECT_PRICE_DISPLAY;
  const currentTitle = purchaseTier === 'unlimited' ? 'Unlimited Projects' : 'Project Blueprint';

  const handleStartPurchase = async (tier: 'single' | 'unlimited') => {
    triggerHaptic(ImpactStyle.Medium);
    setPurchaseTier(tier);

    const productId = tier === 'unlimited' ? PRODUCT_ID_UNLIMITED_PROJECTS : PRODUCT_ID_NEXT_PROJECT;

    if (Capacitor.isNativePlatform()) {
      setIsNativeProcessing(true);
      setNativeMessage(null);
      const res = await purchaseWithStoreKit(productId, targetProjectId);
      setIsNativeProcessing(false);

      if (res.success) {
        triggerHaptic(ImpactStyle.Heavy);
        onUnlocked();
        onClose();
      } else if (res.userCancelled) {
        // Apple HIG: silently cancel
      } else if (res.pending) {
        alert('Your purchase is pending approval (such as Ask to Buy). Access will activate once approved.');
      } else if (res.error) {
        alert(res.error);
      }
      return;
    }

    setStoreKitState('idle');
    setShowStoreKitSheet(true);
  };

  const handleConfirmStoreKitPurchase = async () => {
    triggerHaptic(ImpactStyle.Medium);
    setStoreKitState('processing');

    try {
      // Simulate authentic Apple StoreKit 2 transaction verification
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      if (purchaseTier === 'unlimited') {
        unlockUnlimited();
      } else {
        unlockSingleProject(targetProjectId);
      }

      setStoreKitState('done');
      triggerHaptic(ImpactStyle.Heavy);

      setTimeout(() => {
        setShowStoreKitSheet(false);
        setStoreKitState('idle');
        onUnlocked();
        onClose();
      }, 900);
    } catch {
      setStoreKitState('idle');
      setShowStoreKitSheet(false);
    }
  };

  const handleRestore = async () => {
    triggerHaptic(ImpactStyle.Light);
    setIsNativeProcessing(true);
    setNativeMessage('Restoring purchases with Apple ID...');
    const res = await restoreWithStoreKit();
    setIsNativeProcessing(false);
    setNativeMessage(null);

    if (res.isUnlimited || res.restoredCount > 0) {
      triggerHaptic(ImpactStyle.Heavy);
      alert('Purchases restored successfully!');
      onUnlocked();
      onClose();
    } else if (res.error) {
      alert(res.error);
    } else {
      alert('No active purchases found for this Apple ID.');
    }
  };

  return (
    <>
      {/* 1. Single Unified Smaller Paywall Pop-Up */}
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in select-none pointer-events-auto">
        {/* Subtle backdrop overlay */}
        <div 
          className="fixed inset-0 cursor-pointer"
          aria-hidden="true"
          onClick={() => {
            if (canDismiss && !showStoreKitSheet && storeKitState !== 'processing') {
              onClose();
            }
          }}
        />

        {/* The Card - Exact same size, border, shadow, and rounded-3xl styling as Terms & Safety modal */}
        <div 
          className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden h-[680px] max-h-[90vh] transform transition-all duration-300"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button if opened manually during the 7-day trial */}
          {canDismiss && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer z-20"
              title="Close"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}

          {/* Modal Header: Clean, centered title matching Terms & Safety modal */}
          <div className="py-4 px-12 border-b border-slate-100 bg-white text-center shrink-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-google">
              Unlock Full Access
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              One-time unlock &amp; all blueprints
            </p>
          </div>

          {/* Scrollable Features Content with Intro Text, 5 Distinct Colored Dots, Numbered Titles, and Matched Descriptions */}
          <div className="flex-1 px-5 py-3.5 overflow-y-auto space-y-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans divide-y divide-slate-100">
            <div>
              <p className="font-medium text-slate-700">
                App Blueprint takes you all the way from day zero idea to a published App Store release with production tools:
              </p>
            </div>

            <div className="pt-2.5 space-y-1">
              <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block shrink-0" />
                <span>1. Full App Launch Blueprint</span>
              </h3>
              <p className="text-slate-600 text-xs leading-normal">
                Step-by-step guidance from day zero through release with production-ready architecture and native standards.
              </p>
            </div>

            <div className="pt-2.5 space-y-1">
              <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block shrink-0" />
                <span>2. Integrated AI Prompts</span>
              </h3>
              <p className="text-slate-600 text-xs leading-normal">
                Curated AI prompts ready to copy and paste directly into your workflow for instant project scaffolding.
              </p>
            </div>

            <div className="pt-2.5 space-y-1">
              <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block shrink-0" />
                <span>3. Store Rejection Prevention</span>
              </h3>
              <p className="text-slate-600 text-xs leading-normal">
                Pre-submission audit checks aligned with Apple Review and Google guidelines to guarantee smooth approval.
              </p>
            </div>

            <div className="pt-2.5 space-y-1">
              <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block shrink-0" />
                <span>4. Native Production Templates</span>
              </h3>
              <p className="text-slate-600 text-xs leading-normal">
                Battle-tested setups for StoreKit 2 in-app purchases, push notifications, and biometric security.
              </p>
            </div>

            <div className="pt-2.5 space-y-1">
              <h3 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block shrink-0" />
                <span>5. Curated Developer Tools</span>
              </h3>
              <p className="text-slate-600 text-xs leading-normal">
                Hand-picked libraries, verified official SDKs, and typography tools tested thoroughly for high performance.
              </p>
            </div>
          </div>

          {/* Modal Footer / Action Buttons - positioned closer to the bottom */}
          <div className="px-4 sm:px-5 pt-3 pb-3 sm:pb-3.5 border-t border-slate-100 bg-slate-50/60 flex flex-col space-y-2 shrink-0">
            <button
              type="button"
              disabled={isNativeProcessing}
              onClick={() => handleStartPurchase('single')}
              className="apple-press w-full py-3.5 px-5 rounded-2xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:opacity-60 text-white font-semibold text-sm sm:text-base shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              {isNativeProcessing && purchaseTier === 'single' ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin text-white" />
              ) : (
                <span>Keep This Project • $4.99</span>
              )}
            </button>

            <button
              type="button"
              disabled={isNativeProcessing}
              onClick={() => handleStartPurchase('unlimited')}
              className="apple-press w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 disabled:opacity-60 text-white font-semibold text-sm sm:text-base shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              {isNativeProcessing && purchaseTier === 'unlimited' ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin text-white" />
              ) : (
                <span>Unlock for Life • $12.99</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Authentic Apple StoreKit Payment Sheet (The "Apple Pop-Up" at z-[70] above all navigation) */}
      {showStoreKitSheet && (
        <div id="storekit-sheet-container" className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-5 select-none pointer-events-auto">
          {/* Glass Scrim Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => {
              if (storeKitState !== 'processing') {
                setShowStoreKitSheet(false);
              }
            }}
          />

          <div 
            className="relative z-10 w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-slate-200/90 shadow-2xl p-6 space-y-5 animate-in slide-in-from-bottom duration-250 mb-0 sm:my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber Handle */}
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto -mt-1 sm:hidden" />

            {/* Apple App Store Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 fill-slate-900" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.77-8.79-10.37-18.66-13.8-29.62-3.43-10.96-5.15-21.2-5.15-30.73 0-14.01 3.55-25.59 10.65-34.74 7.1-9.16 15.86-13.85 26.27-14.07 4.9.11 10.28 1.45 16.14 4.02 5.86 2.57 9.53 3.91 11.01 4.02 2.01-.22 5.86-1.56 11.55-4.02 5.69-2.46 10.87-3.69 15.53-3.69 10.89.44 19.86 4.3 26.91 11.59-8.49 5.23-12.63 12.3-12.42 21.22.21 8.93 3.69 16.32 10.44 22.18 6.75 5.86 14.86 9.14 24.32 9.83-2.12 6.64-4.8 13.52-8.03 20.66zM119.22 31.84c0-7.39 2.68-14.39 8.03-21.01 5.35-6.62 12.1-10.49 20.24-11.61.22 1.34.33 2.57.33 3.69 0 7.39-2.73 14.39-8.19 21.01-5.46 6.62-12.37 10.49-20.73 11.61.11-1.23.32-2.46.32-3.69z" />
                </svg>
                <span className="text-xs font-bold text-slate-800 tracking-wide uppercase font-google">
                  App Store
                </span>
              </div>

              {storeKitState !== 'processing' && (
                <button
                  type="button"
                  onClick={() => setShowStoreKitSheet(false)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* App Purchase Item Overview */}
            <div className="flex items-center space-x-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 flex items-center justify-center shrink-0 shadow-md text-white font-black text-xl font-google">
                🚀
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900 font-google truncate">
                  Corner Swaps: App Creator
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {currentTitle}
                </p>
                <p className="text-[11px] text-slate-400">
                  In-App Purchase • Non-Consumable
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-lg font-black text-slate-900 font-google">
                  {currentPrice}
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Account
              </span>
              <span className="font-semibold text-slate-800 font-mono text-[11px]">
                Apple ID (slava@icloud.com)
              </span>
            </div>

            {/* StoreKit Action Flow */}
            <div className="pt-2">
              {storeKitState === 'processing' ? (
                <div className="w-full py-4 rounded-2xl bg-slate-100 flex flex-col items-center justify-center space-y-2">
                  <div className="w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                  <span className="text-xs font-bold text-slate-700 font-google">
                    Contacting App Store...
                  </span>
                </div>
              ) : storeKitState === 'done' ? (
                <div className="w-full py-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center space-x-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                  <span className="text-sm font-black font-google">Done</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmStoreKitPurchase}
                  className="apple-press w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Confirm with Apple ID</span>
                </button>
              )}
            </div>

            <div className="text-center text-[10px] text-slate-400 font-medium">
              Apple StoreKit 2 Transaction
            </div>
          </div>
        </div>
      )}
    </>
  );
};
