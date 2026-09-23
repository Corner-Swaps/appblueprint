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

  if (Math.abs(diff) < 2) {
    window.scrollTo(0, targetY);
    if (options?.onComplete) options.onComplete();
    return;
  }

  // Apple-tuned duration: swift & responsive, zero sluggishness
  const duration = options?.duration ?? Math.min(260, Math.max(160, Math.abs(diff) * 0.16));
  const startTime = performance.now();

  // Apple Quartic ease-out curve: swift initial response, critically damped settling
  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const ease = easeOutQuart(progress);

    // Clean settling threshold: eliminate slow trailing tail to prevent draggy feeling
    if (progress >= 1 || Math.abs(diff * (1 - ease)) < 2) {
      window.scrollTo(0, targetY);
      if (options?.onComplete) {
        options.onComplete();
      }
      return;
    }

    window.scrollTo(0, Math.round(startY + diff * ease));
    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};
