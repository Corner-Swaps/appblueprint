import { registerPlugin, Capacitor } from '@capacitor/core';
import { 
  PRODUCT_ID_NEXT_PROJECT, 
  PRODUCT_ID_UNLIMITED_PROJECTS,
  unlockUnlimited,
  unlockSingleProject,
  isUnlimitedUnlocked
} from './paywall';

export interface StoreProduct {
  id: string;
  displayName: string;
  description: string;
  displayPrice: string;
  price: number;
}

export interface StoreKitPluginInterface {
  purchaseProduct(options: { productId: string }): Promise<{
    success: boolean;
    productId?: string;
    transactionId?: string;
    pending?: boolean;
    userCancelled?: boolean;
    message?: string;
    error?: string;
  }>;
  restorePurchases(): Promise<{
    success: boolean;
    entitlements: string[];
    error?: string;
  }>;
  getEntitlements(): Promise<{
    success?: boolean;
    entitlements: string[];
  }>;
  getProducts(options: { productIds: string[] }): Promise<{
    success: boolean;
    products: StoreProduct[];
    error?: string;
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
 * Queries product details from native StoreKit 2.
 */
export async function getStoreProducts(productIds: string[]): Promise<Record<string, StoreProduct>> {
  if (Capacitor.getPlatform() === 'ios') {
    try {
      const res = await StoreKit.getProducts({ productIds });
      if (res && res.success && Array.isArray(res.products)) {
        const map: Record<string, StoreProduct> = {};
        for (const p of res.products) {
          map[p.id] = p;
        }
        return map;
      }
    } catch (e) {
      console.warn('StoreKit getProducts query notice:', e);
    }
  }
  return {};
}

/**
 * Purchases a product via native Apple StoreKit 2.
 * Falls back to simulation only when running on web preview.
 */
export async function purchaseWithStoreKit(productId: string, targetProjectId?: string): Promise<PurchaseResult> {
  if (Capacitor.getPlatform() === 'ios') {
    try {
      const res = await StoreKit.purchaseProduct({ productId });
      if (res.success) {
        if (productId === PRODUCT_ID_UNLIMITED_PROJECTS) {
          unlockUnlimited();
        } else {
          unlockSingleProject(targetProjectId);
        }
        return { success: true };
      } else if (res.userCancelled) {
        return { success: false, userCancelled: true };
      } else if (res.pending) {
        return { success: false, pending: true };
      }
      const rawError = String(res.message || res.error || '').toLowerCase();
      if (rawError.includes('cancel') || rawError.includes('abort') || rawError.includes('dismiss')) {
        return { success: false, userCancelled: true };
      }
      return { success: false, error: res.message || res.error || 'Purchase could not be completed at this time.' };
    } catch (err: any) {
      const errorMsg = String(err?.message || err || '');
      const lower = errorMsg.toLowerCase();
      if (lower.includes('cancel') || lower.includes('abort') || lower.includes('dismiss')) {
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
  if (Capacitor.getPlatform() === 'ios') {
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
  if (Capacitor.getPlatform() !== 'ios') return;
  try {
    const res = await StoreKit.getEntitlements();
    const entitlements = res.entitlements || [];
    if (entitlements.includes(PRODUCT_ID_UNLIMITED_PROJECTS)) {
      unlockUnlimited();
    }
    entitlements.forEach((pid) => {
      if (pid.startsWith('com.slava.appblueprint.keep_this_project') || pid.startsWith('com.slava.appblueprint.next_project')) {
        unlockSingleProject();
      }
    });
  } catch (err) {
    console.warn('Failed to sync active entitlements on startup', err);
  }
}
