import React from 'react';
import { Phase } from '../types';
import { renderPhaseIcon } from '../utils/renderPhaseIcon';
import { getPhaseTheme, CUSTOM_PHASE_THEME } from '../utils/phaseThemes';
import { 
  CheckCircle2, 
  ChevronRight, 
  SlidersHorizontal, 
  ExternalLink, 
  Layers, 
  BookOpen,
  Folder
} from 'lucide-react';

interface PhaseRoadmapSidebarProps {
  activeProjectName: string;
  onSelectProject: () => void;
  phases: Phase[];
  setupPhase: Phase;
  completedItemIds: string[];
  activePhaseId: string | null;
  activePlatform: 'all' | 'ios' | 'android';
  onSelectPlatform: (platform: 'all' | 'ios' | 'android') => void;
  onSelectPhase: (phaseId: string) => void;
  onOpenManagePhases: () => void;
}

export const PhaseRoadmapSidebar: React.FC<PhaseRoadmapSidebarProps> = ({
  activeProjectName,
  onSelectProject,
  phases,
  setupPhase,
  completedItemIds,
  activePhaseId,
  activePlatform,
  onSelectPlatform,
  onSelectPhase,
  onOpenManagePhases,
}) => {
  const allPhasesWithSetup = [setupPhase, ...phases];

  return (
    <aside className="space-y-3.5">
      {/* 1. Active Project Title Button on the Left above the platform switcher */}
      <button
        type="button"
        onClick={onSelectProject}
        className="w-full apple-press flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-white/95 hover:bg-white border border-black/8 shadow-xs transition-all group"
        title="Switch or manage projects"
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
            <Folder className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Project
            </div>
            <div className="text-sm font-black text-slate-900 truncate font-google group-hover:text-blue-600 transition-colors">
              {activeProjectName}
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
      </button>

      {/* 2. Platform Switcher with Apple and Android Logos directly underneath Project Title */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-black/8 shadow-xs p-1.5 flex items-center justify-between gap-1.5 select-none">
        <button
          type="button"
          onClick={() => onSelectPlatform('all')}
          className={`apple-press flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
            activePlatform === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All (101)
        </button>

        {/* Apple iOS Button */}
        <button
          type="button"
          onClick={() => onSelectPlatform('ios')}
          className={`apple-press flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center space-x-1.5 ${
            activePlatform === 'ios'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Filter iOS Human Interface Guidelines"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.65-2.8 1.44-.59.68-1.11 1.77-.97 2.83 1.11.09 2.18-.54 2.81-1.32z"/>
          </svg>
          <span>iOS</span>
        </button>

        {/* Android Play Button */}
        <button
          type="button"
          onClick={() => onSelectPlatform('android')}
          className={`apple-press flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center space-x-1.5 ${
            activePlatform === 'android'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Filter Google Play Developer Guardrails"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0003 0-.5517.4482-1.0003.9993-1.0003.5517 0 .9999.4486.9999 1.0003 0 .5517-.4482 1.0003-.9999 1.0003m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0003 0-.5517.4482-1.0003.9993-1.0003.5517 0 .9999.4486.9999 1.0003 0 .5517-.4482 1.0003-.9999 1.0003m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.077 12 8.077c-1.8533 0-3.5902.3346-5.1368.8727L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
          </svg>
          <span>Android</span>
        </button>
      </div>

      {/* 3. Phase Roadmap Directory Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-black/8 shadow-sm p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center justify-between pb-2.5 border-b border-black/5">
          <div className="flex items-center space-x-2">
            <Layers className="w-4.5 h-4.5 text-blue-600 stroke-[2.2]" />
            <h2 className="text-sm font-black text-slate-900 font-google uppercase tracking-wider">
              Phase Roadmap
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenManagePhases}
            className="apple-press inline-flex items-center space-x-1 text-slate-500 hover:text-slate-900 text-[11px] font-bold px-2 py-1 rounded-lg hover:bg-black/5 transition-colors"
            title="Reorder and customize phases"
          >
            <SlidersHorizontal className="w-3 h-3 stroke-[2.2]" />
            <span>Customize</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Select any phase below to open its requirements and autonomous AI prompts.
        </p>

        {/* Phase List with larger pills & cards without truncation */}
        <div className="space-y-2 pt-1">
          {allPhasesWithSetup.map((phase) => {
            const isSetup = phase.id === setupPhase.id;
            const isCustom = phase.id.startsWith('custom-');
            const theme = isCustom ? CUSTOM_PHASE_THEME : getPhaseTheme(phase.number);
            const totalItems = phase.items.length;
            const completedCount = phase.items.filter(item => completedItemIds.includes(item.id)).length;
            const isAllCompleted = totalItems > 0 && completedCount === totalItems;
            const isActive = activePhaseId === phase.id;

            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => onSelectPhase(phase.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl flex items-center justify-between group transition-all duration-150 border ${
                  isActive
                    ? 'bg-blue-50/80 border-blue-300 shadow-xs ring-1 ring-blue-400/30'
                    : 'bg-white/70 hover:bg-slate-50/90 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl ${theme.iconBg} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                    {renderPhaseIcon(isCustom ? 'Info' : phase.iconName, "w-4.5 h-4.5 text-white stroke-[2.2]")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {isSetup ? 'Setup' : isCustom ? 'Custom' : `Phase ${phase.number}`}
                      </span>
                    </div>
                    <p className={`text-sm sm:text-base font-bold font-google leading-snug break-words transition-colors ${
                      isActive ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {phase.shortTitle || phase.title}
                    </p>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex items-center space-x-2 shrink-0">
                  {isAllCompleted ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{totalItems}</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200/80 shadow-2xs">
                      {completedCount}/{totalItems}
                    </span>
                  )}
                  <ChevronRight className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-600'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Developer Reference & Guidelines Quick Card */}
      <div className="bg-white/80 rounded-3xl border border-black/8 p-4 space-y-2.5 text-xs">
        <div className="flex items-center space-x-2 text-slate-800 font-bold font-google">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Official Store Guidelines</span>
        </div>
        <ul className="space-y-1.5 text-slate-600 pt-1">
          <li>
            <a
              href="https://developer.apple.com/app-store/review/guidelines/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>Apple Review Guidelines 2026</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </li>
          <li>
            <a
              href="https://support.google.com/googleplay/android-developer/topic/9858052"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>Google Play Developer Policy</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </li>
          <li>
            <a
              href="https://developer.apple.com/documentation/bundleresources/privacy_manifest_files"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>Apple Privacy Manifests (NSPrivacy)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </li>
          <li>
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>Apple Standard EULA</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
