import React from 'react';
import { Phase } from '../types';
import { renderPhaseIcon } from '../utils/renderPhaseIcon';
import { getPhaseTheme } from '../utils/phaseThemes';
import { 
  CheckCircle2, 
  ChevronRight, 
  SlidersHorizontal, 
  ExternalLink, 
  Layers, 
  BookOpen
} from 'lucide-react';

interface PhaseRoadmapSidebarProps {
  phases: Phase[];
  setupPhase: Phase;
  completedItemIds: string[];
  activePhaseId: string;
  onSelectPhase: (phaseId: string) => void;
  onOpenManagePhases: () => void;
}

export const PhaseRoadmapSidebar: React.FC<PhaseRoadmapSidebarProps> = ({
  phases,
  setupPhase,
  completedItemIds,
  activePhaseId,
  onSelectPhase,
  onOpenManagePhases,
}) => {
  const allPhasesWithSetup = [setupPhase, ...phases];

  return (
    <aside className="space-y-4">
      {/* Phases Directory Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-black/8 shadow-sm p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-black/5">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-600 stroke-[2.2]" />
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
          Select any phase below to jump to its requirements, verification guardrails, and autonomous AI prompts.
        </p>

        {/* Phase List */}
        <div className="space-y-1.5 pt-1">
          {allPhasesWithSetup.map((phase) => {
            const isSetup = phase.id === setupPhase.id;
            const theme = getPhaseTheme(phase.number);
            const totalItems = phase.items.length;
            const completedCount = phase.items.filter(item => completedItemIds.includes(item.id)).length;
            const isAllCompleted = totalItems > 0 && completedCount === totalItems;

            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => onSelectPhase(phase.id)}
                className={`w-full text-left p-2.5 rounded-2xl flex items-center justify-between group transition-all duration-150 border ${
                  activePhaseId === phase.id
                    ? 'bg-slate-100/90 border-slate-300 shadow-2xs'
                    : 'bg-white/60 hover:bg-slate-50/90 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <div className={`w-7 h-7 rounded-xl ${theme.iconBg} flex items-center justify-center text-white shrink-0 shadow-2xs`}>
                    {renderPhaseIcon(phase.iconName, "w-3.5 h-3.5 text-white stroke-[2.2]")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isSetup ? 'Setup' : `Phase ${phase.number}`}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate font-google group-hover:text-blue-600 transition-colors">
                      {phase.shortTitle || phase.title}
                    </p>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex items-center space-x-1.5 shrink-0">
                  {isAllCompleted ? (
                    <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                      <span>{totalItems}</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200/80">
                      {completedCount}/{totalItems}
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
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
