import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Trigger subtle Apple Taptic Engine feedback for fluid gestures
 */
export const triggerHaptic = (style: ImpactStyle = ImpactStyle.Light) => {
  try {
    Haptics.impact({ style }).catch(() => {
      // Graceful fallback if device does not support native haptics
    });
  } catch {
    // Ignore in unsupported environments
  }
};
