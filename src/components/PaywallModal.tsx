import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Lock,
  CheckCircle2,
  Loader2,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { triggerAllCompleteConfetti } from '../utils/confetti';
import { triggerHaptic } from '../utils/haptics';
import { ImpactStyle } from '@capacitor/haptics';

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
  targetProjectId = 'proj-1',
  targetProjectName = 'My Mobile App',
  canDismiss = true,
}) => {
  const [showStripeSheet, setShowStripeSheet] = useState(false);
  const [stripeState, setStripeState] = useState<'idle' | 'processing' | 'done'>('idle');
  const [purchaseTier, setPurchaseTier] = useState<'single' | 'unlimited'>('single');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    document.body.style.overflow = '';
    if (!isOpen) {
      setShowStripeSheet(false);
      setStripeState('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPrice = purchaseTier === 'unlimited' ? '$12.99' : '$4.99';
  const currentTitle = purchaseTier === 'unlimited' ? 'Lifetime Unlimited Access' : `Keep Project (${targetProjectName})`;

  const handleStartStripePurchase = (tier: 'single' | 'unlimited') => {
    triggerHaptic(ImpactStyle.Medium);
    setPurchaseTier(tier);
    setStripeState('idle');
    setShowStripeSheet(true);
  };

  const handleConfirmStripePayment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    triggerHaptic(ImpactStyle.Medium);
    setStripeState('processing');

    // Simulate authentic Stripe Checkout payment processing
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      if (purchaseTier === 'unlimited') {
        localStorage.setItem('appblueprint_unlimited_unlocked_v2', 'true');
        localStorage.setItem('appblueprint_pro_unlocked_v1', 'true');
      } else {
        const saved = localStorage.getItem('appblueprint_paid_project_ids_v1');
        const ids: string[] = saved ? JSON.parse(saved) : [];
        if (!ids.includes(targetProjectId)) {
          ids.push(targetProjectId);
          localStorage.setItem('appblueprint_paid_project_ids_v1', JSON.stringify(ids));
        }
      }
      localStorage.setItem('appblueprint_pro_unlocked_v1', 'true');

      setStripeState('done');
      triggerHaptic(ImpactStyle.Heavy);
      triggerAllCompleteConfetti();

      setTimeout(() => {
        setShowStripeSheet(false);
        setStripeState('idle');
        onUnlocked();
        onClose();
      }, 1000);
    } catch {
      setStripeState('idle');
      setShowStripeSheet(false);
    }
  };

  const handleRestore = () => {
    triggerHaptic(ImpactStyle.Light);
    const isUnlocked = localStorage.getItem('appblueprint_unlimited_unlocked_v2') === 'true';
    if (isUnlocked) {
      alert('Purchases restored successfully via Stripe!');
      onUnlocked();
      onClose();
    } else {
      alert('No previous Stripe purchases found for this browser session.');
    }
  };

  return (
    <>
      {/* 1. Website Paywall Pop-Up (Matches Mobile Exactly) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-5 select-none pointer-events-auto">
        {/* Subtle backdrop overlay */}
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs cursor-pointer animate-in fade-in duration-150"
          aria-hidden="true"
          onClick={() => {
            if (canDismiss && !showStripeSheet && stripeState !== 'processing') {
              onClose();
            }
          }}
        />

        {/* The Card - Exact matching typography and layout */}
        <div 
          className="relative z-10 w-full max-w-[370px] bg-white rounded-[32px] border border-purple-200/90 shadow-2xl p-5 sm:p-6 flex flex-col text-center my-auto animate-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          {canDismiss && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer z-20"
              title="Close"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}

          <div className="w-full flex flex-col items-center space-y-3.5">
            {/* Purple Squircle Lock Icon */}
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
              <Lock className="w-6 h-6 stroke-[2.2] text-white" />
            </div>

            {/* Header & Subtext (Refined Description 1 Word Less) */}
            <div className="space-y-1 px-1 w-full">
              <h3 className="text-xl font-black text-slate-900 font-google tracking-tight">
                Unlock App Blueprint
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                The complete step-by-step system with everything you need to architect, develop, audit, and launch production-grade iOS &amp; Android apps from scratch to store release.
              </p>
            </div>

            {/* Feature Information Sections (Blueprint, Prompts, Resources, Updates) */}
            <div className="w-full space-y-2.5 py-1 text-left">
              {/* 1. Full App Launch Blueprint */}
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">Full App Launch Blueprint</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Step-by-step roadmap from day zero to physical device &amp; store release</p>
                </div>
              </div>

              {/* 2. Autonomous AI Prompts */}
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">Autonomous AI Prompts</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">1-click prompts engineered for Cursor, Antigravity &amp; Claude Code</p>
                </div>
              </div>

              {/* 3. Developer Resources & Academy */}
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">Curated Developer Resources</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Official Apple/Google guidelines, verified SDKs &amp; video tutorials</p>
                </div>
              </div>

              {/* 4. Continuously Updated as Technology Updates */}
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">Continuous Lifetime Updates</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Updated continuously as iOS, Android, AI models &amp; store rules evolve</p>
                </div>
              </div>
            </div>

            {/* Action Buttons: Keep This Project on top with white letters, above Unlock for Life */}
            <div className="w-full space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleStartStripePurchase('single')}
                className="apple-press w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-md shadow-purple-500/25 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Keep This Project • $4.99</span>
              </button>

              <button
                type="button"
                onClick={() => handleStartStripePurchase('unlimited')}
                className="apple-press w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-md shadow-purple-500/25 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Unlock for Life • $12.99</span>
              </button>
            </div>

            {/* Subtle Footer Note with Stripe Badge */}
            <div className="flex items-center justify-center space-x-2 pt-0.5 text-[11px] text-slate-400 font-medium">
              <button
                type="button"
                onClick={handleRestore}
                className="hover:text-slate-600 transition-colors cursor-pointer"
              >
                Restore Purchases
              </button>
              <span>•</span>
              <span className="inline-flex items-center space-x-1 text-[#635BFF] font-bold">
                <span>Powered by Stripe</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Official Stripe Checkout Sheet for the Website */}
      {showStripeSheet && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 select-none pointer-events-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => {
              if (stripeState !== 'processing') {
                setShowStripeSheet(false);
              }
            }}
          />

          <div 
            className="relative z-10 w-full max-w-md bg-white rounded-[32px] border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Stripe Brand Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black text-[#635BFF] font-google tracking-tight text-lg">
                  stripe
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Checkout
                </span>
              </div>

              {stripeState !== 'processing' && (
                <button
                  type="button"
                  onClick={() => setShowStripeSheet(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Product Summary */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="min-w-0 pr-2">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {currentTitle}
                </h4>
                <p className="text-xs text-slate-500">
                  Instant Lifetime Access • No Subscription
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-black text-slate-900 font-google">
                  {currentPrice}
                </div>
              </div>
            </div>

            {/* Payment Processing Form */}
            {stripeState === 'processing' ? (
              <div className="w-full py-8 rounded-2xl bg-slate-50 flex flex-col items-center justify-center space-y-3">
                <div className="w-7 h-7 border-2 border-slate-300 border-t-[#635BFF] rounded-full animate-spin" />
                <span className="text-xs font-bold text-slate-700 font-google">
                  Securing payment with Stripe...
                </span>
                <span className="text-[11px] text-slate-400">
                  256-bit encrypted transaction
                </span>
              </div>
            ) : stripeState === 'done' ? (
              <div className="w-full py-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex flex-col items-center justify-center space-y-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 stroke-[2.5]" />
                <span className="text-base font-black font-google">Payment Complete!</span>
                <span className="text-xs text-emerald-700 font-medium">Access unlocked for {targetProjectName}</span>
              </div>
            ) : (
              <form onSubmit={handleConfirmStripePayment} className="space-y-3.5">
                {/* 1-Click Pay simulation button */}
                <button
                  type="button"
                  onClick={() => handleConfirmStripePayment()}
                  className="w-full py-3 px-4 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
                >
                  <span className="font-semibold">Pay with</span>
                  <span className="font-black text-sm">Pay</span>
                  <span className="text-slate-400 text-xs">/</span>
                  <span className="font-bold text-xs">GPay</span>
                </button>

                <div className="flex items-center my-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <div className="flex-1 border-t border-slate-200" />
                  <span className="px-2">Or pay with card</span>
                  <div className="flex-1 border-t border-slate-200" />
                </div>

                {/* Card input container */}
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs divide-y divide-slate-100">
                  <div className="flex items-center px-3.5 py-2.5">
                    <CreditCard className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                    <input
                      type="text"
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-slate-100">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="px-3.5 py-2.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="px-3.5 py-2.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="ZIP / Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="apple-press w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-[#635BFF] hover:bg-[#5349e4] active:bg-[#463cc9] shadow-md shadow-[#635BFF]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Pay {currentPrice}</span>
                </button>
              </form>
            )}

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted with Stripe 256-bit SSL Security</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
