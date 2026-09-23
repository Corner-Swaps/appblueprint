/**
 * Smoothly glides the window scroll position to targetY using an authentic Apple fluid
 * ease-out curve. Executes onComplete callback once the viewport has safely settled.
 */
export const fluidScrollTo = (
  targetY: number,
  options?: {
    duration?: number;
    onComplete?: () => void;
  }
): void => {
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const diff = targetY - startY;

  if (Math.abs(diff) < 3) {
    window.scrollTo(0, targetY);
    if (options?.onComplete) options.onComplete();
    return;
  }

  // Apple-tuned duration: brisk, responsive, never sluggish
  const duration = options?.duration ?? Math.min(360, Math.max(200, Math.abs(diff) * 0.3));
  const startTime = performance.now();

  // Apple fluid ease-out cubic curve (critically damped feel)
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const ease = easeOutCubic(progress);

    window.scrollTo(0, Math.round(startY + diff * ease));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      if (options?.onComplete) {
        options.onComplete();
      }
    }
  };

  requestAnimationFrame(step);
};
