/**
 * Smoothly glides the window scroll position to targetY using an authentic Apple fluid
 * ease-out curve. Executes onComplete callback once the viewport has safely settled.
 */
let activeScrollAnimId: number | null = null;

export const fluidScrollTo = (
  targetY: number,
  options?: {
    duration?: number;
    onComplete?: () => void;
  }
): void => {
  if (activeScrollAnimId !== null) {
    cancelAnimationFrame(activeScrollAnimId);
    activeScrollAnimId = null;
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const initialMaxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clampedTargetY = Math.min(initialMaxScroll, Math.max(0, Math.round(targetY)));
  const diff = clampedTargetY - startY;

  if (Math.abs(diff) < 2) {
    window.scrollTo({ top: clampedTargetY, behavior: 'instant' });
    if (options?.onComplete) options.onComplete();
    return;
  }

  // Apple-tuned duration: smooth, deliberate, unhurried Apple pace
  const duration = options?.duration ?? Math.min(480, Math.max(300, Math.round(Math.abs(diff) * 0.26 + 220)));
  const startTime = performance.now();

  // Apple Quartic ease-out curve: swift initial response, critically damped settling
  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

  let isSettled = false;
  const step = (currentTime: number) => {
    if (isSettled) return;
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const ease = easeOutQuart(progress);

    const currentMax = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const safeTargetY = Math.max(0, Math.min(currentMax, clampedTargetY));

    // Clean settling threshold: eliminate slow trailing tail to prevent draggy feeling
    if (progress >= 1 || Math.abs(diff * (1 - ease)) < 1.5) {
      isSettled = true;
      activeScrollAnimId = null;
      window.scrollTo({ top: safeTargetY, behavior: 'instant' });
      if (options?.onComplete) {
        options.onComplete();
      }
      return;
    }

    const nextY = Math.max(0, Math.min(currentMax, Math.round(startY + diff * ease)));
    window.scrollTo({ top: nextY, behavior: 'instant' });
    activeScrollAnimId = requestAnimationFrame(step);
  };

  activeScrollAnimId = requestAnimationFrame(step);
};

