import React from 'react';

interface GripFourProps {
  className?: string;
}

/**
 * 4-dot (2x2 grid) drag-and-drop grip handle icon.
 * Replaces standard 6-dot (2x3) GripVertical with a clean, compact 4-circle layout.
 */
export const GripFour: React.FC<GripFourProps> = ({ className = 'w-4.5 h-4.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <circle cx="8.5" cy="8.5" r="2.2" />
    <circle cx="15.5" cy="8.5" r="2.2" />
    <circle cx="8.5" cy="15.5" r="2.2" />
    <circle cx="15.5" cy="15.5" r="2.2" />
  </svg>
);
