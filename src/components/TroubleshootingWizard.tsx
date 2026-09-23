import React, { useState } from 'react';
import { TROUBLESHOOTING_DATA } from '../data/troubleshooting';
import { TroubleshootingScenario, Platform } from '../types';
import { copyToClipboard } from '../utils/clipboard';
import { PlatformBadge } from './PlatformBadge';
import { 
  Stethoscope, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Code, 
  Copy, 
  CheckCheck, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Wrench,
  Flame
} from 'lucide-react';

export const TroubleshootingWizard: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<TroubleshootingScenario | null>(TROUBLESHOOTING_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'rejection' | 'build' | 'runtime' | 'store_ops'>('all');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');
  const [copiedCode, setCopiedCode] = useState(false);

  // Filtered scenarios
  const filteredScenarios = TROUBLESHOOTING_DATA.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.triggerSymptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rootCauses.some(rc => rc.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesPlatform = platformFilter === 'all' || item.platform === platformFilter || item.platform === 'both';

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const handleCopyCode = (code: string) => {
    copyToClipboard(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="liquid-glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-apple-red to-orange-500 flex items-center justify-center text-white shadow-apple-md">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-apple-gray-900 dark:text-white">
              Production Troubleshooting & Rejection Diagnostic Wizard
            </h2>
            <p className="text-xs sm:text-sm text-apple-gray-500 dark:text-apple-gray-400">
              Interactive diagnostic decision trees to immediately remediate App Store rejections, build crashes, and store ops blocks.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="relative col-span-1 sm:col-span-1">
            <Search className="w-4 h-4 text-apple-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symptoms, e.g. 'Guideline 2.1'..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-[16px] sm:text-xs bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 text-apple-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-apple-blue"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 rounded-xl px-3 py-2 text-[16px] sm:text-xs font-medium text-apple-gray-700 dark:text-apple-300 outline-none cursor-pointer"
          >
            <option value="all">All Failure Categories</option>
            <option value="rejection">App Store / Play Rejections</option>
            <option value="build">Build & Obfuscation Crashes</option>
            <option value="runtime">Deep Links & Runtime Bugs</option>
            <option value="store_ops">20-Tester & Store Ops</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as any)}
            className="bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 rounded-xl px-3 py-2 text-[16px] sm:text-xs font-medium text-apple-gray-700 dark:text-apple-300 outline-none cursor-pointer"
          >
            <option value="all">All Platforms</option>
            <option value="ios">Apple Rejections & Issues</option>
            <option value="android">Android Rejections & Issues</option>
            <option value="both">Apple + Android Issues</option>
          </select>
        </div>
      </div>

      {/* Two-Column Diagnostic Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Scenario List (Left side) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-apple-gray-400 px-1 mb-1">
            Common Store Failure Scenarios ({filteredScenarios.length})
          </div>

          {filteredScenarios.map(scenario => {
            const isSelected = selectedScenario?.id === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`apple-press p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-apple-blue/10 border-apple-blue shadow-apple-sm'
                    : 'bg-white dark:bg-apple-gray-900 border-apple-gray-200 dark:border-apple-gray-800 hover:border-apple-gray-300 dark:hover:border-apple-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        scenario.category === 'rejection' ? 'bg-apple-red/10 text-apple-red' :
                        scenario.category === 'build' ? 'bg-amber-500/10 text-amber-600' :
                        scenario.category === 'runtime' ? 'bg-blue-500/10 text-blue-600' :
                        'bg-purple-500/10 text-purple-600'
                      }`}>
                        {scenario.category.toUpperCase()}
                      </span>
                      <PlatformBadge platform={scenario.platform} />
                    </div>

                    <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${
                      isSelected ? 'text-apple-blue' : 'text-apple-gray-900 dark:text-white'
                    }`}>
                      {scenario.title}
                    </h4>

                    <p className="text-[11px] text-apple-gray-500 line-clamp-2">
                      {scenario.triggerSymptom}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                    isSelected ? 'text-apple-blue translate-x-1' : 'text-apple-gray-400'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic Detail Panel (Right side) */}
        <div className="lg:col-span-7">
          {selectedScenario ? (
            <div className="liquid-glass-card rounded-2xl p-6 space-y-6">
              
              {/* Header */}
              <div className="border-b border-apple-gray-200 dark:border-apple-gray-800 pb-4">
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-apple-red">
                    {selectedScenario.category.toUpperCase()} DIAGNOSTIC
                  </span>
                  {selectedScenario.appStoreGuidelineRef && (
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-apple-purple font-medium">
                      {selectedScenario.appStoreGuidelineRef}
                    </span>
                  )}
                  {selectedScenario.googlePlayPolicyRef && (
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-apple-blue font-medium">
                      {selectedScenario.googlePlayPolicyRef}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-apple-gray-900 dark:text-white">
                  {selectedScenario.title}
                </h3>
              </div>

              {/* Symptom Box */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-apple-gray-400 mb-2 flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5 text-apple-red" />
                  <span>Reviewer Rejection Message / Fatal Symptom</span>
                </h4>
                <div className="p-4 rounded-xl bg-apple-red/5 border border-apple-red/20 font-mono text-xs text-apple-red leading-relaxed">
                  "{selectedScenario.triggerSymptom}"
                </div>
              </div>

              {/* Root Causes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-apple-gray-400 mb-2.5 flex items-center space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Primary Root Causes</span>
                </h4>
                <div className="space-y-2">
                  {selectedScenario.rootCauses.map((cause, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-apple-gray-50 dark:bg-apple-gray-950 border border-apple-gray-200 dark:border-apple-gray-800 text-xs text-apple-gray-800 dark:text-apple-200 flex items-start space-x-2"
                    >
                      <span className="text-apple-yellow font-bold">•</span>
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Fix Protocol */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-apple-green mb-2.5 flex items-center space-x-1.5">
                  <Wrench className="w-3.5 h-3.5 text-apple-green" />
                  <span>Immediate Remediation Protocol</span>
                </h4>
                <div className="space-y-2">
                  {selectedScenario.immediateFix.map((step, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-apple-gray-800 dark:text-apple-200 font-medium leading-relaxed"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet if present */}
              {selectedScenario.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-apple-gray-400 flex items-center space-x-1.5">
                      <Code className="w-3.5 h-3.5 text-apple-blue" />
                      <span>Remediation Code</span>
                    </h4>
                    <span className="text-xs font-mono text-apple-gray-400">
                      {selectedScenario.codeSnippet.filename}
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden bg-apple-gray-950 border border-apple-gray-800 font-mono text-xs">
                    <div className="flex items-center justify-between px-4 py-2 bg-apple-gray-900 border-b border-apple-gray-800">
                      <span className="text-[11px] text-apple-gray-400">
                        {selectedScenario.codeSnippet.filename}
                      </span>
                      <button
                        onClick={() => handleCopyCode(selectedScenario.codeSnippet!.code)}
                        className="apple-press text-xs px-2 py-1 rounded bg-apple-gray-800 hover:bg-apple-gray-700 text-apple-gray-200 flex items-center space-x-1"
                      >
                        {copiedCode ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-apple-green" />
                            <span className="text-apple-green">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed text-apple-gray-200">
                      <code>{selectedScenario.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="liquid-glass-card rounded-2xl p-12 text-center text-apple-gray-400">
              Select a scenario on the left to see the complete diagnostic playbook.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
