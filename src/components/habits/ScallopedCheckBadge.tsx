import React from 'react';

interface ScallopedCheckBadgeProps {
  className?: string;
}

export const ScallopedCheckBadge: React.FC<ScallopedCheckBadgeProps> = ({
  className = 'w-8 h-8',
}) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_4px_rgba(34,197,94,0.35)]"
      >
        {/* Scalloped rosette seal body */}
        <path
          d="M 12.00 1.20 C 13.60 1.20 14.70 2.40 16.00 2.75 C 17.30 3.10 18.70 2.60 19.80 3.45 C 20.90 4.30 20.90 5.80 21.65 6.90 C 22.40 8.00 23.80 8.85 24.00 10.20 C 24.20 11.55 23.20 12.75 23.00 14.10 C 22.80 15.45 23.40 16.95 22.65 18.05 C 21.90 19.15 20.40 19.45 19.30 20.30 C 18.20 21.15 17.65 22.65 16.35 22.95 C 15.05 23.25 13.80 22.25 12.00 22.25 C 10.20 22.25 8.95 23.25 7.65 22.95 C 6.35 22.65 5.80 21.15 4.70 20.30 C 3.60 19.45 2.10 19.15 1.35 18.05 C 0.60 16.95 1.20 15.45 1.00 14.10 C 0.80 12.75 -0.20 11.55 0.00 10.20 C 0.20 8.85 1.60 8.00 2.35 6.90 C 3.10 5.80 3.10 4.30 4.20 3.45 C 5.30 2.60 6.70 3.10 8.00 2.75 C 9.30 2.40 10.40 1.20 12.00 1.20 Z"
          transform="scale(0.92) translate(1, 1)"
          className="fill-[#22C55E]"
        />
        {/* Crisp white checkmark */}
        <path
          d="M7.5 12.2L10.3 15L16.5 8.8"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
