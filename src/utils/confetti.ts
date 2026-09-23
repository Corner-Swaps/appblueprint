import confetti from 'canvas-confetti';

/**
 * Fires celebratory confetti burst when a single phase / section completes.
 */
export const triggerPhaseCompleteConfetti = () => {
  // High-altitude celebratory burst shooting to the top and sprinkling down gracefully
  confetti({
    particleCount: 90,
    spread: 85,
    startVelocity: 70,
    gravity: 0.7,
    ticks: 380,
    origin: { y: 0.85 },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#6366F1'],
    disableForReducedMotion: true,
    zIndex: 9999,
  });
};

/**
 * Fires a grand celebratory multi-cannon confetti show when the entire project is completed.
 */
export const triggerAllCompleteConfetti = () => {
  const duration = 2400;
  const animationEnd = Date.now() + duration;
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left high-angle cannon shooting towards the ceiling
    confetti({
      particleCount: Math.floor(particleCount / 2),
      angle: 65,
      spread: 60,
      startVelocity: 75,
      gravity: 0.65,
      ticks: 420,
      origin: { x: 0.08, y: 0.85 },
      colors: colors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    // Right high-angle cannon shooting towards the ceiling
    confetti({
      particleCount: Math.floor(particleCount / 2),
      angle: 115,
      spread: 60,
      startVelocity: 75,
      gravity: 0.65,
      ticks: 420,
      origin: { x: 0.92, y: 0.85 },
      colors: colors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  }, 220);
};
