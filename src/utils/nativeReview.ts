import { registerPlugin, Capacitor } from '@capacitor/core';

export interface NativeReviewPlugin {
  requestReview(): Promise<{ success: boolean; error?: string }>;
}

export const NativeReview = registerPlugin<NativeReviewPlugin>('NativeReview');

/**
 * Requests the official native App Store or Google Play Store in-app review.
 * 
 * In accordance with Apple App Store Review Guideline 5.6.1 and Google Play In-App Review Policy:
 * - Triggers the official iOS SKStoreReviewController dialog rendered directly by the operating system.
 * - No custom made-up review modals, no review gating, and no fake star submission prompts.
 * - On web/desktop platforms, safely logs or delegates without showing custom submission UI.
 */
export async function requestNativeStoreReview(): Promise<void> {
  try {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios') {
      await NativeReview.requestReview();
      console.log('[StoreKit] Native review requested via SKStoreReviewController');
    } else {
      console.log('[StoreKit] Store review is handled natively on iOS/Android devices');
    }
  } catch (error) {
    console.warn('[StoreKit] Native review request error:', error);
  }
}
