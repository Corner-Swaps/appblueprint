import React from 'react';

export const AppleIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 170 170" fill="currentColor" aria-hidden="true">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.77-12.01-14.2-5.44-8.15-9.76-17.71-12.96-28.69-3.2-10.97-4.8-21.75-4.8-32.33 0-14.12 3.56-25.75 10.67-34.88 7.12-9.13 16.03-13.79 26.74-13.99 4.36 0 9.29 1.15 14.79 3.44 5.5 2.29 9.3 3.47 11.4 3.54 1.74-.07 5.76-1.32 12.06-3.75 6.3-2.43 11.66-3.5 16.07-3.21 12.56.88 22.42 5.56 29.58 14.04-10.96 6.64-16.32 15.7-16.08 27.18.24 8.91 3.55 16.39 9.93 22.45 6.38 6.06 14.13 9.47 23.25 10.23-2.22 6.53-4.85 13.33-7.89 20.41zM119.22 31.84c0-7.3 2.66-14.18 7.99-20.64 5.33-6.46 11.96-10.42 19.89-11.88.35 1.76.53 3.51.53 5.24 0 7.21-2.82 14.28-8.47 21.21-5.65 6.93-12.44 10.9-20.37 11.91-.23-1.89-.35-3.84-.35-5.84z" />
  </svg>
);

export const AndroidIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5896 8.3986 13.8566 8 12 8s-3.5896.3986-5.1368.9497L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
  </svg>
);

interface PlatformBadgeProps {
  platform: 'ios' | 'android' | 'both';
  variant?: 'light' | 'dark';
  className?: string;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ 
  platform, 
  variant = 'light',
  className = ''
}) => {
  const isDark = variant === 'dark';

  const appleClasses = isDark
    ? "px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-950 border border-white/90 tracking-wide inline-flex items-center space-x-1 shadow-2xs"
    : "px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white border border-slate-900 tracking-wide inline-flex items-center space-x-1 shadow-2xs";

  const androidClasses = isDark
    ? "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white border border-emerald-400 tracking-wide inline-flex items-center space-x-1 shadow-2xs"
    : "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white border border-emerald-600 tracking-wide inline-flex items-center space-x-1 shadow-2xs";

  if (platform === 'ios') {
    return (
      <span className={`${appleClasses} ${className}`}>
        <AppleIcon className={`w-2.5 h-2.5 shrink-0 -mt-0.5 ${isDark ? 'text-slate-950' : 'text-white'}`} />
        <span>Apple</span>
      </span>
    );
  }

  if (platform === 'android') {
    return (
      <span className={`${androidClasses} ${className}`}>
        <AndroidIcon className="w-2.5 h-2.5 shrink-0 text-white" />
        <span>Android</span>
      </span>
    );
  }

  // platform === 'both' -> Separate pills with their own distinct colors!
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={appleClasses}>
        <AppleIcon className={`w-2.5 h-2.5 shrink-0 -mt-0.5 ${isDark ? 'text-slate-950' : 'text-white'}`} />
        <span>Apple</span>
      </span>
      <span className={androidClasses}>
        <AndroidIcon className="w-2.5 h-2.5 shrink-0 text-white" />
        <span>Android</span>
      </span>
    </span>
  );
};
