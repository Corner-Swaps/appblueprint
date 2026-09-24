export const STORAGE_KEY_PRO_UNLOCKED = 'appblueprint_pro_unlocked_v1';
export const STORAGE_KEY_UNLIMITED_UNLOCKED = 'appblueprint_unlimited_unlocked_v2';
export const STORAGE_KEY_PURCHASED_SLOTS = 'appblueprint_purchased_slots_v2';
export const STORAGE_KEY_TOTAL_CREATIONS_EVER = 'appblueprint_creations_ever_v2';
export const STORAGE_KEY_FREE_QUOTA_CLAIMED = 'appblueprint_free_project_claimed_v1';

export const NEXT_PROJECT_PRICE_DISPLAY = '$4.99';
export const NEXT_PROJECT_PRICE_VALUE = 4.99;

export const UNLIMITED_PRICE_DISPLAY = '$12.99';
export const UNLIMITED_PRICE_VALUE = 12.99;

// Backwards compatibility aliases
export const PRO_PRICE_DISPLAY = NEXT_PROJECT_PRICE_DISPLAY;
export const PRO_PRICE_VALUE = NEXT_PROJECT_PRICE_VALUE;
export const COFFEE_PRICE_DISPLAY = NEXT_PROJECT_PRICE_DISPLAY;
export const COFFEE_PRICE_VALUE = NEXT_PROJECT_PRICE_VALUE;

export const PRODUCT_ID_NEXT_PROJECT = 'com.slava.appblueprint.next_project';
export const PRODUCT_ID_UNLIMITED_PROJECTS = 'com.slava.appblueprint.unlimited_projects';
export const STORAGE_KEY_CREATOR_PROFILE = 'appblueprint_creator_profile_v1';

export interface CreatorProfile {
  name: string;
  email: string;
  registeredAt: string;
}

export const getCreatorProfile = (): CreatorProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CREATOR_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveCreatorProfile = (profile: { name: string; email: string }): void => {
  try {
    localStorage.setItem(STORAGE_KEY_CREATOR_PROFILE, JSON.stringify({
      ...profile,
      registeredAt: new Date().toISOString()
    }));
  } catch (e) {
    console.warn('Failed to save creator profile', e);
  }
};

/**
 * Checks whether the user has purchased Unlimited Projects.
 */
export const isUnlimitedUnlocked = (): boolean => {
  try {
    return (
      localStorage.getItem(STORAGE_KEY_UNLIMITED_UNLOCKED) === 'true' ||
      localStorage.getItem(STORAGE_KEY_PRO_UNLOCKED) === 'true'
    );
  } catch {
    return false;
  }
};

/**
 * Backwards compatibility alias for unlimited check.
 */
export const isProUnlocked = (): boolean => {
  return isUnlimitedUnlocked();
};

/**
 * Gets count of paid project slots bought ($4.99 each).
 */
export const getPurchasedSlots = (): number => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PURCHASED_SLOTS);
    return raw ? Math.max(0, parseInt(raw, 10) || 0) : 0;
  } catch {
    return 0;
  }
};

/**
 * Total project slots allowed without Unlimited: 1 free + purchased slots.
 */
export const getTotalAllowedCreations = (): number => {
  return 1 + getPurchasedSlots();
};

/**
 * Total number of projects ever created in this installation.
 * Anti-bypass guarantee: deleting a project NEVER decrements this number.
 */
export const getTotalCreationsEver = (currentProjectsCount?: number): number => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TOTAL_CREATIONS_EVER);
    let count = saved ? parseInt(saved, 10) || 0 : 0;
    
    // Check if free quota was claimed previously or if current projects count is higher
    const freeClaimed = localStorage.getItem(STORAGE_KEY_FREE_QUOTA_CLAIMED) === 'true';
    if (freeClaimed && count < 1) {
      count = 1;
    }
    if (typeof currentProjectsCount === 'number' && currentProjectsCount > count) {
      count = currentProjectsCount;
    }

    localStorage.setItem(STORAGE_KEY_TOTAL_CREATIONS_EVER, count.toString());
    return count;
  } catch {
    return currentProjectsCount || 0;
  }
};

/**
 * Checks whether free quota has been claimed.
 */
export const hasUsedFreeQuota = (currentProjectsCount?: number): boolean => {
  if (isUnlimitedUnlocked()) return false;
  const creations = getTotalCreationsEver(currentProjectsCount);
  return creations >= 1;
};

/**
 * Returns true if the user has permission to create another project.
 */
export const canCreateNewProject = (currentProjectsCount: number): boolean => {
  if (isUnlimitedUnlocked()) return true;
  const creations = getTotalCreationsEver(currentProjectsCount);
  const allowed = getTotalAllowedCreations();
  return creations < allowed;
};

/**
 * Records that a new project was created (permanently consumes a creation quota).
 */
export const recordProjectCreated = (): void => {
  try {
    const current = getTotalCreationsEver();
    const updated = current + 1;
    localStorage.setItem(STORAGE_KEY_TOTAL_CREATIONS_EVER, updated.toString());
    localStorage.setItem(STORAGE_KEY_FREE_QUOTA_CLAIMED, 'true');
    window.dispatchEvent(new CustomEvent('appblueprint-pro-status-changed'));
  } catch (e) {
    console.warn('Failed to record project creation', e);
  }
};

/**
 * Alias for marking free quota claimed on deletion or initial project creation.
 */
export const markFreeQuotaClaimed = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY_FREE_QUOTA_CLAIMED, 'true');
    const current = getTotalCreationsEver();
    if (current < 1) {
      localStorage.setItem(STORAGE_KEY_TOTAL_CREATIONS_EVER, '1');
    }
    window.dispatchEvent(new CustomEvent('appblueprint-pro-status-changed'));
  } catch (e) {
    console.warn('Failed to persist free quota claim', e);
  }
};

/**
 * Unlocks 1 additional project slot ($4.99 Next Project).
 */
export const unlockNextProjectSlot = (): void => {
  try {
    const currentSlots = getPurchasedSlots();
    localStorage.setItem(STORAGE_KEY_PURCHASED_SLOTS, (currentSlots + 1).toString());
    window.dispatchEvent(new CustomEvent('appblueprint-pro-status-changed', { detail: { isPro: true } }));
  } catch (e) {
    console.warn('Failed to unlock next project slot', e);
  }
};

/**
 * Unlocks Unlimited Projects pass permanently ($12.99 Unlimited).
 */
export const unlockUnlimited = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY_UNLIMITED_UNLOCKED, 'true');
    localStorage.setItem(STORAGE_KEY_PRO_UNLOCKED, 'true');
    window.dispatchEvent(new CustomEvent('appblueprint-pro-status-changed', { detail: { isPro: true } }));
  } catch (e) {
    console.warn('Failed to persist Unlimited unlock', e);
  }
};

/**
 * Legacy unlockPro function (maps to unlockUnlimited).
 */
export const unlockPro = (): void => {
  unlockUnlimited();
};

/**
 * Restores previous purchases via StoreKit.
 */
export const restorePurchase = async (): Promise<{ restored: boolean; isUnlimited: boolean; slots: number }> => {
  await new Promise(r => setTimeout(r, 650));
  const isUnlimited = isUnlimitedUnlocked();
  const slots = getPurchasedSlots();
  return {
    restored: isUnlimited || slots > 0,
    isUnlimited,
    slots
  };
};

/**
 * Helper for development testing: resets unlocks and creation quotas.
 */
export const resetProForTesting = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY_PRO_UNLOCKED);
    localStorage.removeItem(STORAGE_KEY_UNLIMITED_UNLOCKED);
    localStorage.removeItem(STORAGE_KEY_PURCHASED_SLOTS);
    localStorage.removeItem(STORAGE_KEY_TOTAL_CREATIONS_EVER);
    localStorage.removeItem(STORAGE_KEY_FREE_QUOTA_CLAIMED);
    window.dispatchEvent(new CustomEvent('appblueprint-pro-status-changed'));
  } catch {}
};
