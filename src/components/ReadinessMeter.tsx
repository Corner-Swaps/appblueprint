import React from 'react';
import { ChecklistItem, Category } from '../types';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Scale,
  Palette,
  Cpu,
  ShoppingBag,
  Rocket
} from 'lucide-react';

interface ReadinessMeterProps {
  allItems: ChecklistItem[];
  completedItemIds: string[];
  onSelectItem: (item: ChecklistItem) => void;
  onGoToChecklist: () => void;
}

export const ReadinessMeter: React.FC<ReadinessMeterProps> = ({
  allItems,
  completedItemIds,
  onSelectItem,
  onGoToChecklist
}) => {
  const totalCount = allItems.length;
  const completedCount = completedItemIds.length;
  const overallPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Uncompleted blockers
  const uncompletedBlockers = allItems.filter(
    item => item.priority === 'blocker' && !completedItemIds.includes(item.id)
  );

  // Category breakdown
  const categories: { key: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'security', label: 'Security & Cryptography', icon: ShieldCheck },
    { key: 'legal', label: 'Legal, Policies & UGC', icon: Scale },
    { key: 'design', label: 'Apple HIG & Material Design', icon: Palette },
    { key: 'functionality', label: 'Architecture & Resilience', icon: Cpu },
    { key: 'store', label: 'Store Metadata & Review Prep', icon: ShoppingBag },
    { key: 'cicd', label: 'CI/CD & Beta Testing', icon: Rocket },
  ];

  const categoryStats = categories.map(cat => {
    const items = allItems.filter(i => i.category === cat.key);
    const completed = items.filter(i => completedItemIds.includes(i.id)).length;
    const percent = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;
    return {
      ...cat,
      total: items.length,
      completed,
      percent
    };
  });

  // Calculate approval probability
  let probabilityLabel = 'High Risk of Immediate Rejection';
  let probabilityColor = 'text-white';
  let probabilityBg = 'bg-white/10 border-white/20';

  if (uncompletedBlockers.length === 0) {
    if (overallPercent >= 90) {
      probabilityLabel = 'Launch Ready: High Approval Rate (95%+)';
      probabilityBg = 'bg-white/15 border-white/30';
    } else if (overallPercent >= 70) {
      probabilityLabel = 'Moderate Approval Probability (75-85%)';
      probabilityBg = 'bg-white/10 border-white/20';
    } else {
      probabilityLabel = 'Blockers Resolved, But Further Polish Needed';
      probabilityBg = 'bg-white/10 border-white/20';
    }
  }

  return (
    <div className="space-y-6 text-white">
      
      {/* Top Banner: Score & Store Pass Probability */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Circular Progress Gauge */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  strokeWidth="8"
                  className="stroke-white/10"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * overallPercent) / 100}
                  strokeLinecap="round"
                  className="stroke-white transition-all duration-700 ease-out"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-tight text-white">
                  {overallPercent}%
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                  Readiness
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-white/70 font-medium">
              {completedCount} of {totalCount} requirements satisfied
            </p>
          </div>

          {/* Pass Probability Metric */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 stroke-white text-white" />
              <h2 className="text-lg font-bold text-white">
                App Store & Google Play Pass Probability
              </h2>
            </div>

            <div className={`p-4 rounded-2xl border ${probabilityBg} flex items-start space-x-3.5`}>
              {uncompletedBlockers.length > 0 ? (
                <ShieldAlert className="w-6 h-6 stroke-white text-white shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="w-6 h-6 stroke-white text-white shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={`text-base font-bold ${probabilityColor}`}>
                  {probabilityLabel}
                </h3>
                <p className="text-xs text-white/80 mt-1 leading-relaxed">
                  {uncompletedBlockers.length > 0 ? (
                    <>
                      You currently have <strong className="text-white underline">{uncompletedBlockers.length} active blocker items</strong> incomplete. Apple and Google automated review bots will flag these immediately.
                    </>
                  ) : (
                    <>
                      All critical blocker requirements are completed! Resolve the remaining high-priority items to guarantee a seamless first-time approval.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                onClick={onGoToChecklist}
                className="apple-press px-4 py-2 bg-white text-black text-xs font-bold rounded-full flex items-center space-x-2 shadow-md hover:bg-white/90"
              >
                <span>Continue Checklist</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-black" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Critical Blocker Alert Box if any */}
      {uncompletedBlockers.length > 0 && (
        <div className="rounded-3xl bg-[#121216] border border-white/20 p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 stroke-white text-white" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Unresolved Store Blockers ({uncompletedBlockers.length})
              </h3>
            </div>
            <span className="text-xs text-white/60">Must fix before submission</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {uncompletedBlockers.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="apple-press p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="pr-2 truncate">
                  <span className="text-xs font-bold text-white group-hover:underline transition-colors block truncate">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-white/60 truncate block mt-0.5">
                    {item.shortDescription}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 stroke-white text-white shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Domain Readiness Breakdown */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 space-y-4 shadow-2xl">
        <h3 className="text-base font-bold text-white mb-2">
          Audit Score by Engineering & Policy Domain
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map(stat => (
            <div 
              key={stat.key}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <stat.icon className="w-4 h-4 stroke-white text-white" />
                  <h4 className="text-xs font-bold text-white">
                    {stat.label}
                  </h4>
                </div>
                <span className="text-xs font-bold text-white">
                  {stat.percent}%
                </span>
              </div>

              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${stat.percent}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-white/60">
                <span>{stat.completed} of {stat.total} verified</span>
                <span>{stat.total - stat.completed} pending</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
