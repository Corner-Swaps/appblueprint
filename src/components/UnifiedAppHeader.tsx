import React from 'react';

interface UnifiedAppHeaderProps {
  overallPercent?: number;
  totalItems?: number;
  completedItems?: number;
  activeTab?: 'checklist' | 'resources' | 'projects' | 'profile';
}

export const UnifiedAppHeader: React.FC<UnifiedAppHeaderProps> = () => {
  return (
    <header className="w-full bg-[#FAF8F6] border-b border-black/8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 text-center flex flex-col items-center">
        {/* Centered Main Title: Welcome to App Blueprint */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-google leading-tight text-center">
          Welcome to App Blueprint
        </h1>

        {/* Centered Welcoming Resource Description (Zero counts, pure welcoming developer guidance) */}
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto text-center">
          Welcome to your all-in-one developer companion and launch resource. App Blueprint guides you step by step through every milestone of mobile development—from initial architecture and UI wireframing, to native iOS and Android configurations, developer accounts, security checklists, and App Store submission.
        </p>
      </div>
    </header>
  );
};
