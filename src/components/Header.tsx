import React, { useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  onReset,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 text-white ios-safe-top transition-colors">
      <div className="max-w-xl mx-auto px-4 py-3 space-y-3">
        
        {/* Title & Discrete Reset */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
              App Store & Google Play
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              App Launch Checklist
            </h1>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all checklist progress?')) {
                onReset();
              }
            }}
            title="Reset Checklist"
            className="apple-press p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4 stroke-white" />
          </button>
        </div>

        {/* Master Overall Progress Bar */}
        <div className="p-3.5 rounded-2xl bg-[#141418] border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 stroke-white text-white" />
              <span>Overall Launch Progress</span>
            </span>
            <span>{completedCount} of {totalCount} Completed ({percent}%)</span>
          </div>

          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500 ease-out rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

      </div>
    </header>
  );
};
