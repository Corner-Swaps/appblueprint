import React from 'react';

export const AppleIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 170 170" fill="currentColor" aria-hidden="true">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.77-12.01-14.2-5.44-8.15-9.76-17.71-12.96-28.69-3.2-10.97-4.8-21.75-4.8-32.33 0-14.12 3.56-25.75 10.67-34.88 7.12-9.13 16.03-13.79 26.74-13.99 4.36 0 9.29 1.15 14.79 3.44 5.5 2.29 9.3 3.47 11.4 3.54 1.74-.07 5.76-1.32 12.06-3.75 6.3-2.43 11.66-3.5 16.07-3.21 12.56.88 22.42 5.56 29.58 14.04-10.96 6.64-16.32 15.7-16.08 27.18.24 8.91 3.55 16.39 9.93 22.45 6.38 6.06 14.13 9.47 23.25 10.23-2.22 6.53-4.85 13.33-7.89 20.41zM119.22 31.84c0-7.3 2.66-14.18 7.99-20.64 5.33-6.46 11.96-10.42 19.89-11.88.35 1.76.53 3.51.53 5.24 0 7.21-2.82 14.28-8.47 21.21-5.65 6.93-12.44 10.9-20.37 11.91-.23-1.89-.35-3.84-.35-5.84z" />
  </svg>
);

interface PlatformBadgeProps {
  platform?: 'ios' | 'both';
  variant?: 'light' | 'dark';
  className?: string;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ 
  variant = 'light',
  className = ''
}) => {
  const isDark = variant === 'dark';

  const appleClasses = isDark
    ? "px-2 py-0.5 rounded-full text-[10px] font-bold font-google bg-white text-slate-950 border border-white/90 tracking-wide inline-flex items-center space-x-1 shadow-2xs"
    : "px-2 py-0.5 rounded-full text-[10px] font-bold font-google bg-slate-900 text-white border border-slate-900 tracking-wide inline-flex items-center space-x-1 shadow-2xs";

  return (
    <span className={`${appleClasses} ${className}`}>
      <AppleIcon className={`w-2.5 h-2.5 shrink-0 -mt-0.5 ${isDark ? 'text-slate-950' : 'text-white'}`} />
      <span>Apple iOS</span>
    </span>
  );
};
