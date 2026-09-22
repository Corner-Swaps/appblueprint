import React from 'react';
import { NavigationTab } from '../../types';
import { 
  Plus, 
  LayoutGrid, 
  TrendingUp, 
  ClipboardList, 
  Settings,
  ShieldCheck
} from 'lucide-react';

interface FloatingDockProps {
  activeTab: NavigationTab;
  onChangeTab: (tab: NavigationTab) => void;
  onOpenAddModal: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeTab,
  onChangeTab,
  onOpenAddModal,
}) => {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
      <div className="pointer-events-auto bg-[#16161C]/95 backdrop-blur-2xl border border-white/15 rounded-full px-3 py-2 flex items-center space-x-3 sm:space-x-4 shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
        
        {/* CoursePal Pink Circular Plus Action Button on Left */}
        <button
          onClick={onOpenAddModal}
          className="apple-press w-9 h-9 rounded-full bg-[#FF4D6D] hover:bg-[#F23B5D] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0"
          title="Add Task"
        >
          <Plus className="w-4 h-4 stroke-[3] stroke-white" />
        </button>

        {/* Tab 1: Today / Section Cards */}
        <button
          onClick={() => onChangeTab('today')}
          className={`apple-press p-2 rounded-xl transition-all ${
            activeTab === 'today'
              ? 'text-[#FF4D6D] bg-white/10'
              : 'text-white/60 hover:text-white'
          }`}
          title="Today Sections"
        >
          <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Tab 2: Store Readiness Audit */}
        <button
          onClick={() => onChangeTab('readiness')}
          className={`apple-press p-2 rounded-xl transition-all ${
            activeTab === 'readiness'
              ? 'text-[#FF4D6D] bg-white/10'
              : 'text-white/60 hover:text-white'
          }`}
          title="Readiness Audit"
        >
          <TrendingUp className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Tab 3: Full 10-Phase Database Checklist */}
        <button
          onClick={() => onChangeTab('blueprint')}
          className={`apple-press p-2 rounded-xl transition-all ${
            activeTab === 'blueprint'
              ? 'text-[#FF4D6D] bg-white/10'
              : 'text-white/60 hover:text-white'
          }`}
          title="10-Phase App Checklist"
        >
          <ClipboardList className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Tab 4: Rejection Doctor & Advisor */}
        <button
          onClick={() => onChangeTab('advisor')}
          className={`apple-press p-2 rounded-xl transition-all ${
            activeTab === 'advisor'
              ? 'text-[#FF4D6D] bg-white/10'
              : 'text-white/60 hover:text-white'
          }`}
          title="Rejection Doctor"
        >
          <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Tab 5: Settings */}
        <button
          onClick={() => onChangeTab('settings')}
          className={`apple-press p-2 rounded-xl transition-all ${
            activeTab === 'settings'
              ? 'text-[#FF4D6D] bg-white/10'
              : 'text-white/60 hover:text-white'
          }`}
          title="Settings"
        >
          <Settings className="w-5 h-5 stroke-[2.2]" />
        </button>

      </div>
    </div>
  );
};
