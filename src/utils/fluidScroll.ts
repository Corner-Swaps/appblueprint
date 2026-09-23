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
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clampedTargetY = Math.min(maxScroll, Math.max(0, Math.round(targetY)));
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const diff = clampedTargetY - startY;

  if (Math.abs(diff) < 2) {
    window.scrollTo(0, clampedTargetY);
    if (options?.onComplete) options.onComplete();
    return;
  }

  // Apple-tuned duration: smooth, deliberate, unhurried Apple pace (380ms - 520ms)
  const duration = options?.duration ?? Math.min(520, Math.max(380, Math.round(Math.abs(diff) * 0.28 + 260)));
  const startTime = performance.now();

  // Apple Quartic ease-out curve: swift initial response, critically damped settling
  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

  let isSettled = false;
  const step = (currentTime: number) => {
    if (isSettled) return;
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const ease = easeOutQuart(progress);

    // Clean settling threshold: eliminate slow trailing tail to prevent draggy feeling
    if (progress >= 1 || Math.abs(diff * (1 - ease)) < 1.5) {
      isSettled = true;
      window.scrollTo(0, clampedTargetY);
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
