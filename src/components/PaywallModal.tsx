import React, { useState, useEffect } from 'react';
import { 
  X, 
  FolderPlus,
  Infinity as InfinityIcon,
  CheckCircle2
} from 'lucide-react';
import { 
  NEXT_PROJECT_PRICE_DISPLAY, 
  UNLIMITED_PRICE_DISPLAY, 
  unlockNextProjectSlot,
  unlockUnlimited 
} from '../utils/paywall';
import { triggerHaptic, ImpactStyle } from '../utils/haptics';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUnlocked
}) => {
  // ALL hooks must be declared at the top level to strictly follow the Rules of Hooks
  const [selectedTier, setSelectedTier] = useState<'next' | 'unlimited'>('unlimited');
  const [showStoreKitSheet, setShowStoreKitSheet] = useState(false);
  const [storeKitState, setStoreKitState] = useState<'idle' | 'processing' | 'done'>('idle');

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setShowStoreKitSheet(false);
      setStoreKitState('idle');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPrice = selectedTier === 'unlimited' ? UNLIMITED_PRICE_DISPLAY : NEXT_PROJECT_PRICE_DISPLAY;
  const currentTitle = selectedTier === 'unlimited' ? 'Unlimited Projects' : 'Next Project';

  const handleStartPurchase = () => {
    triggerHaptic(ImpactStyle.Medium);
    setStoreKitState('idle');
    setShowStoreKitSheet(true);
  };

  const handleConfirmStoreKitPurchase = async () => {
    triggerHaptic(ImpactStyle.Medium);
    setStoreKitState('processing');

    try {
      // Simulate authentic Apple StoreKit 2 transaction verification
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      if (selectedTier === 'unlimited') {
        unlockUnlimited();
      } else {
        unlockNextProjectSlot();
      }

      setStoreKitState('done');
      triggerHaptic(ImpactStyle.Heavy);

      setTimeout(() => {
        setShowStoreKitSheet(false);
        setStoreKitState('idle');
        onUnlocked();
        onClose();
      }, 950);
    } catch {
      setStoreKitState('idle');
      setShowStoreKitSheet(false);
    }
  };

  return (
    <>
      {/* 1. Main Paywall Selection Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-5 select-none overflow-y-auto">
        {/* Dedicated full-screen Backdrop that captures clicks anywhere outside for instant 1-tap dismiss */}
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
          aria-hidden="true"
          onClick={() => {
            if (!showStoreKitSheet && storeKitState !== 'processing') {
              onClose();
            }
          }}
        />

        <div 
          className="relative z-10 w-full max-w-lg bg-white rounded-[32px] border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="paywall-title"
        >
          {/* Header with Close Button */}
          <div className="pt-5 px-6 pb-2 flex items-center justify-between shrink-0">
            <h2 id="paywall-title" className="text-xl sm:text-[22px] font-black text-slate-900 tracking-tight font-google">
              Upgrade Projects
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Plan Options (Step 1 / Step 2 clean aesthetic with colored squircle icons and pure white glyphs) */}
          <div className="px-6 py-2 overflow-y-auto min-h-0 flex-1 space-y-3">
            {/* Coffee Price Guarantee Bubble (styled just like Fair Use Policy) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block font-google">
                Coffee Price Guarantee
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                For less than what you would pay for a cup of coffee, you get full access to production checklists, architecture guidance, and step by step developer blueprints.
              </p>
            </div>

            {/* Option 1: Next Project */}
            <div
              onClick={() => {
                triggerHaptic(ImpactStyle.Light);
                setSelectedTier('next');
              }}
              className={`p-4 sm:p-4.5 rounded-3xl border transition-colors duration-150 cursor-pointer shadow-xs ${
                selectedTier === 'next'
                  ? 'border-2 border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs bg-blue-600 text-white">
                    <FolderPlus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-google">
                      Next Project
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      1 additional project blueprint
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 pt-0.5">
                  <div className="text-base sm:text-lg font-black text-slate-900 font-google leading-tight">
                    {NEXT_PROJECT_PRICE_DISPLAY}
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                    one-time
                  </span>
                </div>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-normal">
                Skip one coffee to unlock a complete project blueprint for your next app. You get full developer checklists, architecture guidance, and permanent lifetime access.
              </div>
            </div>

            {/* Option 2: Unlimited Projects */}
            <div
              onClick={() => {
                triggerHaptic(ImpactStyle.Light);
                setSelectedTier('unlimited');
              }}
              className={`p-4 sm:p-4.5 rounded-3xl border transition-colors duration-150 cursor-pointer shadow-xs ${
                selectedTier === 'unlimited'
                  ? 'border-2 border-purple-600 bg-purple-50/50 ring-2 ring-purple-500/20'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs bg-purple-600 text-white">
                    <InfinityIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-google">
                      Unlimited Projects
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Endless project blueprints forever
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 pt-0.5">
                  <div className="text-base sm:text-lg font-black text-slate-900 font-google leading-tight">
                    {UNLIMITED_PRICE_DISPLAY}
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                    lifetime
                  </span>
                </div>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-normal">
                For the price of a couple cups of coffee, you can build as many apps as you can dream up. Enjoy endless project blueprints, lifetime updates, and complete freedom with zero subscriptions.
              </div>
            </div>

            {/* Fair Use Policy (Clean neutral tone matching Step 1/Step 2 - NO yellow) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block font-google">
                Fair Use Policy
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Every creator starts with one full project free. When you are ready to expand your workspace, unlock your next project or go unlimited with a simple one-time payment.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 pt-3 shrink-0">
            <button
              type="button"
              onClick={handleStartPurchase}
              className={`apple-press w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                selectedTier === 'unlimited'
                  ? 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-purple-500/25'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/25'
              }`}
            >
              <span>
                {selectedTier === 'unlimited'
                  ? `Unlock Unlimited • ${UNLIMITED_PRICE_DISPLAY}`
                  : `Unlock Next Project • ${NEXT_PROJECT_PRICE_DISPLAY}`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Authentic Apple StoreKit In-App Purchase Modal Sheet */}
      {showStoreKitSheet && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center select-none overflow-y-auto">
          {/* Full-screen Backdrop overlay for StoreKit */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
            aria-hidden="true"
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
              Simulated Apple StoreKit 2 Transaction Environment
            </div>
          </div>
        </div>
      )}
    </>
  );
};
