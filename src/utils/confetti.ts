import confetti from 'canvas-confetti';

/**
 * Fires celebratory confetti burst when a single phase / section completes.
 */
export const triggerPhaseCompleteConfetti = () => {
  // Vibrant multi-color burst originating from slightly below center
  confetti({
    particleCount: 70,
    spread: 65,
    origin: { y: 0.65 },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'],
    disableForReducedMotion: true,
    zIndex: 9999,
  });
};

/**
 * Fires a grand celebratory multi-cannon confetti show when the entire project is completed.
 */
export const triggerAllCompleteConfetti = () => {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1'];

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount: Math.floor(particleCount / 2),
      angle: 60,
      spread: 55,
      origin: { x: 0.05, y: 0.7 },
      colors: colors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    // Right cannon
    confetti({
      particleCount: Math.floor(particleCount / 2),
      angle: 120,
      spread: 55,
      origin: { x: 0.95, y: 0.7 },
      colors: colors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  }, 250);
};
