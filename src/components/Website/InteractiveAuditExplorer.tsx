import React, { useState, useMemo } from 'react';
import { PHASES_DATA } from '../../data/phases';
import { SETUP_STEPS_PHASE } from '../../data/setupSteps';
import { ChecklistItem } from '../../types';
import { 
  Search, 
  Filter, 
  Check, 
  Copy, 
  AlertTriangle, 
  Sparkles, 
  Terminal, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface InteractiveAuditExplorerProps {
  onLaunchApp: () => void;
}

export const InteractiveAuditExplorer: React.FC<InteractiveAuditExplorerProps> = ({ onLaunchApp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'blockers' | 'ios' | 'android' | 'legal' | 'security' | 'design'>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [completedPreviewIds, setCompletedPreviewIds] = useState<Set<string>>(new Set(['p1-problem-solution', 'p2-safe-areas', 'p4-keychain-keystore']));

  // All items flattened
  const allItems: ChecklistItem[] = useMemo(() => {
    const list: ChecklistItem[] = [...SETUP_STEPS_PHASE.items];
    PHASES_DATA.forEach(p => list.push(...p.items));
    return list;
  }, []);

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = 
          item.title.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.whyItMatters.toLowerCase().includes(q) ||
          (item.agentPrompt && item.agentPrompt.toLowerCase().includes(q));
        if (!matchesText) return false;
      }

      // Tag filter
      if (activeFilter === 'blockers') return item.priority === 'blocker';
      if (activeFilter === 'ios') return item.platform === 'ios' || item.platform === 'both';
      if (activeFilter === 'android') return item.platform === 'android' || item.platform === 'both';
      if (activeFilter === 'legal') return item.category === 'legal';
      if (activeFilter === 'security') return item.category === 'security';
      if (activeFilter === 'design') return item.category === 'design';

      return true;
    });
  }, [allItems, searchQuery, activeFilter]);

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedPreviewIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyPrompt = (item: ChecklistItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.agentPrompt) return;
    navigator.clipboard.writeText(item.agentPrompt);
    setCopiedItemId(item.id);
    setTimeout(() => {
      setCopiedItemId(null);
    }, 2000);
  };

  const blockerCount = useMemo(() => allItems.filter(i => i.priority === 'blocker').length, [allItems]);

  return (
    <section id="explorer" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Interactive Audit Playground</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-google">
          Explore All {allItems.length} Production Requirements &amp; AI Prompts
        </h2>

        <p className="text-base sm:text-lg text-slate-600">
          Search the entire production checklist live. Test checkmarks, inspect common rejection traps, and copy ready-to-use agent prompts for Cursor, Claude, and Copilot.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mt-10 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-md space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search requirements (e.g., IPv6, Privacy Manifest, Sign in with Apple, Dark Mode, Keychain)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center flex-wrap gap-1.5">
            {[
              { id: 'all', label: `All (${allItems.length})` },
              { id: 'blockers', label: `Store Blockers (${blockerCount})` },
              { id: 'ios', label: 'Apple iOS' },
              { id: 'android', label: 'Android' },
              { id: 'design', label: 'Design & HIG' },
              { id: 'security', label: 'Security & Auth' },
              { id: 'legal', label: 'Privacy & Legal' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`apple-press px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-slate-950 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-slate-500 hidden sm:block">
            Showing {filteredItems.length} of {allItems.length} rules
          </div>
        </div>

      </div>

      {/* Items List */}
      <div className="mt-6 space-y-3">
        {filteredItems.slice(0, 10).map((item) => {
          const isExpanded = expandedItemId === item.id;
          const isComplete = completedPreviewIds.has(item.id);
          const isCopied = copiedItemId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 bg-white ${
                isExpanded ? 'border-blue-400 shadow-md ring-1 ring-blue-400/20' : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              {/* Item Row Header */}
              <div 
                onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
                  {/* Interactive Checkbox */}
                  <button
                    type="button"
                    onClick={(e) => toggleComplete(item.id, e)}
                    className={`apple-press w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      isComplete
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'border-2 border-slate-300 hover:border-blue-500 bg-white'
                    }`}
                    title="Click to toggle status"
                  >
                    {isComplete && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {item.platform}
                      </span>
                      {item.priority === 'blocker' && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                          Blocker
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-slate-400 capitalize">
                        {item.category}
                      </span>
                    </div>

                    <h4 className={`text-sm sm:text-base font-bold font-google truncate ${
                      isComplete ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  {item.agentPrompt && (
                    <button
                      type="button"
                      onClick={(e) => copyPrompt(item, e)}
                      className={`apple-press hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isCopied 
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title="Copy AI Agent Prompt"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Terminal className="w-3.5 h-3.5 stroke-[2.2]" />}
                      <span>{isCopied ? 'Copied!' : 'Copy AI Prompt'}</span>
                    </button>
                  )}

                  <div className="p-1 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Deep Dive Content */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 border-t border-slate-100 pt-4 space-y-4 bg-slate-50/50 rounded-b-2xl text-xs sm:text-sm">
                  
                  {/* Why It Matters */}
                  <div>
                    <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1">
                      Why It Matters
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {item.whyItMatters}
                    </p>
                  </div>

                  {/* Rejection Trap Warning */}
                  {item.commonRejectionTraps && item.commonRejectionTraps.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-red-900 space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-red-800 text-[11px] uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Common Rejection Trap</span>
                      </div>
                      <p className="text-red-700 text-xs leading-relaxed">
                        {item.commonRejectionTraps[0]}
                      </p>
                    </div>
                  )}

                  {/* Implementation Steps */}
                  {item.implementationSteps && item.implementationSteps.length > 0 && (
                    <div>
                      <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1.5">
                        Step-by-Step Implementation
                      </div>
                      <ul className="space-y-1 list-disc pl-4 text-slate-600">
                        {item.implementationSteps.map((step, sIdx) => (
                          <li key={sIdx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* AI Agent Prompt Box */}
                  {item.agentPrompt && (
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5 text-blue-400 font-bold">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Autonomous AI Coding Agent Prompt (Cursor / Claude / Copilot)</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => copyPrompt(item, e)}
                          className="apple-press inline-flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded text-[11px] font-bold"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="text-[11px] font-mono whitespace-pre-wrap max-h-36 overflow-y-auto bg-black/40 p-2.5 rounded border border-white/5 text-slate-300">
                        {item.agentPrompt}
                      </pre>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length > 10 && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 text-center space-y-3">
            <div className="text-sm font-bold text-slate-900 font-google">
              + {filteredItems.length - 10} more requirements available in the interactive app
            </div>
            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-xs"
            >
              <span>Launch Interactive App to View All 54</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        )}
      </div>

    </section>
  );
};
