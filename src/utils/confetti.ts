import confetti from 'canvas-confetti';

/**
 * Fires celebratory confetti burst when a single phase / section completes.
 * Tuned to burst energetically and fade away promptly on descent.
 */
export const triggerPhaseCompleteConfetti = () => {
  confetti({
    particleCount: 110,
    spread: 95,
    startVelocity: 85,
    gravity: 0.65,
    ticks: 280,
    decay: 0.93,
    scalar: 1.15,
    origin: { y: 0.95 },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#6366F1'],
    disableForReducedMotion: true,
    zIndex: 9999,
  });
};

/**
 * Fires a grand celebratory multi-cannon confetti show when the entire project is completed.
 * Tuned to shoot high into the sky and sprinkle gracefully all the way down.
 */
export const triggerAllCompleteConfetti = () => {
  const duration = 2200;
  const animationEnd = Date.now() + duration;
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount: Math.floor(particleCount / 2),
      angle: 60,
      spread: 75,
      startVelocity: 92,
      gravity: 0.6,
      ticks: 320,
      decay: 0.93,
      scalar: 1.2,
      origin: { x: 0.05, y: 0.95 },
      colors: colors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    // Right cannon
    confetti({
      particleCount: Math.floor(particleCount / 2),
      angle: 120,
      spread: 75,
      startVelocity: 92,
      gravity: 0.6,
      ticks: 320,
      decay: 0.93,
      scalar: 1.2,
      origin: { x: 0.95, y: 0.95 },
      colors: colors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  }, 220);
};
