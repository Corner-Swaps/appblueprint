import React from 'react';
import { ArrowLeft, Globe, Sparkles } from 'lucide-react';

interface AppLauncherBarProps {
  onBackToWebsite: () => void;
}

export const AppLauncherBar: React.FC<AppLauncherBarProps> = ({ onBackToWebsite }) => {
  return (
    <div className="bg-slate-900 text-white text-xs font-medium py-2 px-4 shadow-xs z-50 sticky top-0 flex items-center justify-between border-b border-slate-800">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onBackToWebsite}
          className="apple-press inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </button>
        <span className="text-slate-500 hidden sm:inline">•</span>
        <span className="text-slate-300 hidden sm:inline-flex items-center space-x-1">
          <span>App Blueprint Web Edition</span>
          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold">Interactive</span>
        </span>
      </div>

      <div className="flex items-center space-x-3 text-[11px] text-slate-400">
        <span className="hidden md:inline">100% Client-Side • Stored Locally</span>
        <a 
          href="support.html" 
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Support
        </a>
      </div>
    </div>
  );
};
