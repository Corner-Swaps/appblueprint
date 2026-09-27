import { registerPlugin, Capacitor } from '@capacitor/core';
import { 
  PRODUCT_ID_NEXT_PROJECT, 
  PRODUCT_ID_UNLIMITED_PROJECTS,
  unlockUnlimited,
  unlockSingleProject,
  isUnlimitedUnlocked
} from './paywall';

export interface StoreKitPluginInterface {
  purchaseProduct(options: { productId: string }): Promise<{
    success: boolean;
    productId?: string;
    transactionId?: string;
    pending?: boolean;
    message?: string;
  }>;
  restorePurchases(): Promise<{
    success: boolean;
    entitlements: string[];
  }>;
  getEntitlements(): Promise<{
    entitlements: string[];
  }>;
}

// Register native plugin
export const StoreKit = registerPlugin<StoreKitPluginInterface>('StoreKit');

export interface PurchaseResult {
  success: boolean;
  userCancelled?: boolean;
  pending?: boolean;
  error?: string;
}

/**
 * Purchases a product via native Apple StoreKit 2.
 * Falls back to simulation only when running on web preview.
 */
export async function purchaseWithStoreKit(productId: string, targetProjectId?: string): Promise<PurchaseResult> {
  if (Capacitor.isNativePlatform()) {
    try {
      const res = await StoreKit.purchaseProduct({ productId });
      if (res.success) {
        if (productId === PRODUCT_ID_UNLIMITED_PROJECTS) {
          unlockUnlimited();
        } else {
          unlockSingleProject(targetProjectId);
        }
        return { success: true };
      } else if (res.pending) {
        return { success: false, pending: true };
      }
      return { success: false, error: res.message || 'Purchase could not be verified' };
    } catch (err: any) {
      const errorMsg = String(err?.message || err || '');
      if (errorMsg.includes('USER_CANCELLED') || errorMsg.includes('cancelled') || errorMsg.includes('canceled')) {
        return { success: false, userCancelled: true };
      }
      return { success: false, error: errorMsg };
    }
  }

  // Web fallback simulation
  await new Promise(resolve => setTimeout(resolve, 900));
  if (productId === PRODUCT_ID_UNLIMITED_PROJECTS) {
    unlockUnlimited();
  } else {
    unlockSingleProject(targetProjectId);
  }
  return { success: true };
}

/**
 * Restores previous purchases via App Store sync and current entitlements.
 * Mandatory under Apple App Store Review Guideline 3.1.1.
 */
export async function restoreWithStoreKit(): Promise<{ restoredCount: number; isUnlimited: boolean; error?: string }> {
  if (Capacitor.isNativePlatform()) {
    try {
      const res = await StoreKit.restorePurchases();
      const entitlements = res.entitlements || [];
      let isUnlimited = false;

      if (entitlements.includes(PRODUCT_ID_UNLIMITED_PROJECTS)) {
        unlockUnlimited();
        isUnlimited = true;
      }

      entitlements.forEach((pid) => {
        if (pid.startsWith('com.slava.appblueprint.keep_this_project') || pid.startsWith('com.slava.appblueprint.next_project')) {
          unlockSingleProject();
        }
      });

      return {
        restoredCount: entitlements.length,
        isUnlimited: isUnlimited || isUnlimitedUnlocked()
      };
    } catch (err: any) {
      return {
        restoredCount: 0,
        isUnlimited: isUnlimitedUnlocked(),
        error: String(err?.message || err || 'Failed to restore purchases')
      };
    }
  }

  // Web fallback: check local storage state
  return {
    restoredCount: isUnlimitedUnlocked() ? 1 : 0,
    isUnlimited: isUnlimitedUnlocked()
  };
}

/**
 * Sync active entitlements on startup.
 */
export async function syncActiveEntitlements(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const res = await StoreKit.getEntitlements();
    const entitlements = res.entitlements || [];
    if (entitlements.includes(PRODUCT_ID_UNLIMITED_PROJECTS)) {
      unlockUnlimited();
    }
  } catch (err) {
    console.warn('Failed to sync active entitlements on startup', err);
  }
}
