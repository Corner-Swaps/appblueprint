export interface PhaseTheme {
  number: number;
  color: string;
  iconBg: string;      // Vibrant solid background for the icon squircle
  iconColor: string;   // Pure white icon
  pillBg: string;      // Phase solid background for inside the pill
  pillText: string;    // Pure white text
  pillBorder: string;  // Subtle matching border
  progressBg: string;  // Progress bar fill
}

export const PHASE_THEMES: Record<number, PhaseTheme> = {
  0: {
    number: 0,
    color: '#8B5CF6',
    iconBg: 'bg-[#8B5CF6]',
    iconColor: 'text-white',
    pillBg: 'bg-[#8B5CF6]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#8B5CF6]',
  },
  1: {
    number: 1,
    color: '#0284C7',
    iconBg: 'bg-[#0284C7]',
    iconColor: 'text-white',
    pillBg: 'bg-[#0284C7]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#0284C7]',
  },
  2: {
    number: 2,
    color: '#06B6D4',
    iconBg: 'bg-[#06B6D4]',
    iconColor: 'text-white',
    pillBg: 'bg-[#06B6D4]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#06B6D4]',
  },
  3: {
    number: 3,
    color: '#FF4D6D',
    iconBg: 'bg-[#FF4D6D]',
    iconColor: 'text-white',
    pillBg: 'bg-[#FF4D6D]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#FF4D6D]',
  },
  4: {
    number: 4,
    color: '#7C3AED',
    iconBg: 'bg-[#7C3AED]',
    iconColor: 'text-white',
    pillBg: 'bg-[#7C3AED]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#7C3AED]',
  },
  5: {
    number: 5,
    color: '#6366F1',
    iconBg: 'bg-[#6366F1]',
    iconColor: 'text-white',
    pillBg: 'bg-[#6366F1]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#6366F1]',
  },
  6: {
    number: 6,
    color: '#D946EF',
    iconBg: 'bg-[#D946EF]',
    iconColor: 'text-white',
    pillBg: 'bg-[#D946EF]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#D946EF]',
  },
  7: {
    number: 7,
    color: '#10B981',
    iconBg: 'bg-[#10B981]',
    iconColor: 'text-white',
    pillBg: 'bg-[#10B981]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#10B981]',
  },
  8: {
    number: 8,
    color: '#F97316',
    iconBg: 'bg-[#F97316]',
    iconColor: 'text-white',
    pillBg: 'bg-[#F97316]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#F97316]',
  },
  9: {
    number: 9,
    color: '#0EA5E9',
    iconBg: 'bg-[#0EA5E9]',
    iconColor: 'text-white',
    pillBg: 'bg-[#0EA5E9]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#0EA5E9]',
  },
  10: {
    number: 10,
    color: '#A855F7',
    iconBg: 'bg-[#A855F7]',
    iconColor: 'text-white',
    pillBg: 'bg-[#A855F7]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#A855F7]',
  },
  11: {
    number: 11,
    color: '#14B8A6',
    iconBg: 'bg-[#14B8A6]',
    iconColor: 'text-white',
    pillBg: 'bg-[#14B8A6]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#14B8A6]',
  },
  12: {
    number: 12,
    color: '#059669',
    iconBg: 'bg-[#059669]',
    iconColor: 'text-white',
    pillBg: 'bg-[#059669]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#059669]',
  }
};

export const getPhaseTheme = (phaseNumber: number): PhaseTheme => {
  return PHASE_THEMES[phaseNumber] || {
    number: phaseNumber,
    color: '#6366F1',
    iconBg: 'bg-[#6366F1]',
    iconColor: 'text-white',
    pillBg: 'bg-[#6366F1]',
    pillText: 'text-white',
    pillBorder: 'border-transparent',
    progressBg: 'bg-[#6366F1]',
  };
};
