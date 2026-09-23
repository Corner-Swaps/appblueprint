import React, { useState } from 'react';
import { PHASES_DATA } from '../../data/phases';
import { SETUP_STEPS_PHASE } from '../../data/setupSteps';
import { renderPhaseIcon } from '../../utils/renderPhaseIcon';
import { getPhaseTheme } from '../../utils/phaseThemes';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight,
  Layers,
  Check
} from 'lucide-react';

interface PhasesShowcaseProps {
  onLaunchApp: () => void;
}

export const PhasesShowcase: React.FC<PhasesShowcaseProps> = ({ onLaunchApp }) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(PHASES_DATA[0].id);

  // Combine Setup Steps + 10 Phases for the showcase
  const allPhases = [SETUP_STEPS_PHASE, ...PHASES_DATA];

  const currentPhase = allPhases.find((p) => p.id === selectedPhaseId) || allPhases[0];
  const theme = getPhaseTheme(currentPhase.number);

  return (
    <section id="phases" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-bold text-indigo-700 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>The Complete Roadmap</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-google">
          10 Guided Production Phases
        </h2>

        <p className="text-base sm:text-lg text-slate-600">
          From first concept and audience validation to code signing, privacy manifests, and App Store submission. Every milestone is organized in strict execution order.
        </p>
      </div>

      {/* Interactive Phase Browser */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Phase Selector List (Scrollable / List) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {allPhases.map((phase) => {
            const isSelected = phase.id === currentPhase.id;
            const phaseTheme = getPhaseTheme(phase.number);
            const isSetup = phase.id === SETUP_STEPS_PHASE.id;

            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhaseId(phase.id)}
                className={`apple-press w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/10'
                    : 'bg-white/70 hover:bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl ${phaseTheme.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {renderPhaseIcon(phase.iconName, 'w-5 h-5 text-white stroke-[2.2]')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSetup ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isSetup ? 'Foundation' : `Phase ${phase.number}`}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {phase.items.length} checks
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 font-google truncate mt-0.5">
                      {phase.title}
                    </div>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Phase Inspection Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md flex flex-col justify-between min-h-[500px]">
          <div>
            
            {/* Header of Active Phase */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-3.5">
                <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                  {renderPhaseIcon(currentPhase.iconName, 'w-6 h-6 text-white stroke-[2.2]')}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {currentPhase.id === SETUP_STEPS_PHASE.id ? 'Foundational Step' : `Phase ${currentPhase.number}`}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">{currentPhase.items.length} Production Requirements</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-google tracking-tight mt-0.5">
                    {currentPhase.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {currentPhase.description}
            </p>

            {/* Sample Requirements in this Phase */}
            <div className="mt-6 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Requirements Included in this Phase:
              </div>
              <div className="space-y-2.5">
                {currentPhase.items.slice(0, 5).map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start space-x-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900 font-google">
                          {item.title}
                        </span>
                        {item.priority === 'blocker' && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-red-700 shrink-0">
                            Blocker
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider shrink-0">
                          {item.platform}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                        {item.shortDescription}
                      </p>
                    </div>
                  </div>
                ))}

                {currentPhase.items.length > 5 && (
                  <div className="text-xs text-slate-400 font-medium text-center pt-1">
                    + {currentPhase.items.length - 5} more requirements in the interactive app
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Card Footer CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              Includes pre-built AI agent prompts and store trap warnings for all items.
            </div>
            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs"
            >
              <span>Audit in Interactive Checklist</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
