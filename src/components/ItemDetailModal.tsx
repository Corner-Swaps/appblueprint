import React, { useState, useEffect } from 'react';
import { ChecklistItem, ItemStatus } from '../types';
import { 
  X, 
  Check, 
  ExternalLink, 
  Copy, 
  CheckCheck, 
  AlertTriangle, 
  HelpCircle, 
  ListOrdered,
  FileCode,
  ShieldCheck,
  Save,
  MessageSquare,
  Terminal
} from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { PlatformBadge } from './PlatformBadge';
import { renderFormattedPrompt } from '../utils/formatAgentPrompt';
import { copyToClipboard } from '../utils/clipboard';

interface ItemDetailModalProps {
  item: ChecklistItem | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  note?: string;
  onSaveNote: (id: string, note: string) => void;
  status: ItemStatus;
  onUpdateStatus: (id: string, status: ItemStatus) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
  note = '',
  onSaveNote,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [currentNote, setCurrentNote] = useState(note);
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  useEffect(() => {
    setCurrentNote(note);
    setIsNoteSaved(false);
  }, [note, item]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleCopyCode = () => {
    if (item.codeSnippet) {
      copyToClipboard(item.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyAgentPrompt = async () => {
    if (item.agentPrompt) {
      copyToClipboard(item.agentPrompt);
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (e) {
        // Fallback if haptics unavailable
      }
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const handleSaveNote = () => {
    onSaveNote(item.id, currentNote);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity">
      
      {/* Click backdrop to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] bg-[#121216] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/15 z-10 transition-transform text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle for Sheet */}
        <div className="sm:hidden pt-3 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-start justify-between">
          <div className="space-y-2 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-3 py-0.5 rounded-full border border-white/20 bg-white/15 text-white">
                {item.priority.toUpperCase()}
              </span>
              <PlatformBadge platform={item.platform} variant="dark" />
              <span className="text-[10px] font-semibold px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-white">
                {item.category.toUpperCase()}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {item.title}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleComplete(item.id)}
              className={`apple-press px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 transition-all ${
                isCompleted
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white text-black shadow-md'
              }`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>

            <button
              onClick={onClose}
              className="apple-press p-2 rounded-full text-white/60 hover:text-white bg-white/10 hover:bg-white/20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-white/90 leading-relaxed">
          
          {/* Section: Why It Matters */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 stroke-white text-white" />
              <span>Architecture & Store Review Rationale</span>
            </h3>
            <p className="bg-white/5 p-4 rounded-2xl border border-white/10 text-white/90 leading-relaxed text-xs sm:text-sm">
              {item.whyItMatters}
            </p>
            <div className="flex items-center justify-center pt-2.5">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white/80 border border-white/15 text-center shadow-2xs">
                Copy to clipboard to transfer instructions to your computer and agent
              </span>
            </div>
          </div>

          {/* Section: Store Guideline Link */}
          {item.storeGuideline && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-white/60 block uppercase tracking-wider">
                  Official Store Policy Citation
                </span>
                <span className="text-xs font-bold text-white">
                  {item.storeGuideline.name}
                </span>
              </div>
              <a
                href={item.storeGuideline.url}
                target="_blank"
                rel="noreferrer"
                className="apple-press px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <span>Read Policy</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-white text-white" />
              </a>
            </div>
          )}

          {/* Section: AI Coding */}
          {item.agentPrompt && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[10.5px] font-bold uppercase tracking-wider text-white/90 font-google">
                  AI Coding
                </h3>
                <button
                  type="button"
                  onClick={handleCopyAgentPrompt}
                  className="apple-press px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold flex items-center space-x-1.5 transition-colors shrink-0"
                  title="Copy prompt for AI coding agent"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-400" />
                      <span className="text-emerald-300 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11.5px] sm:text-xs text-white/80 leading-relaxed font-google">
                Copy to clipboard to transfer instructions to your computer and agent (Cursor, Claude Code, Windsurf, Copilot & Antigravity).
              </p>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 border border-white/15 text-white/90 text-[12.5px] sm:text-[13px] select-text max-h-72 overflow-y-auto leading-relaxed font-google">
                {renderFormattedPrompt(item.agentPrompt, true)}
              </div>
            </div>
          )}

          {/* Section: Step-by-Step Implementation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2.5 flex items-center space-x-2">
              <ListOrdered className="w-4 h-4 stroke-white text-white" />
              <span>Step-by-Step Implementation Guide</span>
            </h3>
            <div className="space-y-2">
              {item.implementationSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <span className="w-5 h-5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Code Snippet */}
          {item.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center space-x-2">
                  <FileCode className="w-4 h-4 stroke-white text-white" />
                  <span>Production Code / Configuration Template</span>
                </h3>
                <span className="text-xs font-mono text-white/60">
                  {item.codeSnippet.filename}
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-white/15 font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
                  <span className="text-[11px] text-white/60 font-semibold">
                    {item.codeSnippet.filename} ({item.codeSnippet.language})
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="apple-press text-xs px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center space-x-1.5 font-semibold"
                  >
                    {copiedCode ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 stroke-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 stroke-white" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 overflow-x-auto text-[11px] sm:text-xs leading-relaxed text-white/90">
                  <code>{item.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Section: Rejection Traps */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 stroke-white text-white" />
              <span>Common Rejection Traps & Review Failures</span>
            </h3>
            <div className="space-y-2">
              {item.commonRejectionTraps.map((trap, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/90 flex items-start space-x-2.5"
                >
                  <AlertTriangle className="w-4 h-4 stroke-white text-white shrink-0 mt-0.5" />
                  <span>{trap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Self-Audit Checklist */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 stroke-white text-white" />
              <span>Pre-Commit Self-Audit Questions</span>
            </h3>
            <div className="space-y-2">
              {item.verificationQuestions.map((q, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90">
                  <Check className="w-3.5 h-3.5 stroke-white text-white shrink-0 mt-0.5" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Project Notes */}
          <div className="border-t border-white/10 pt-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 stroke-white text-white" />
                <span>Custom Project Notes & Audit Logs</span>
              </h3>
              {isNoteSaved && (
                <span className="text-xs font-semibold text-white flex items-center space-x-1">
                  <Check className="w-3 h-3 stroke-white" />
                  <span>Saved</span>
                </span>
              )}
            </div>

            <textarea
              rows={3}
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Record your implementation notes, PR links, ticket numbers, or verification timestamps..."
              className="w-full p-3.5 rounded-2xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-white"
            />

            <div className="flex justify-end mt-2">
              <button
                onClick={handleSaveNote}
                className="apple-press px-4 py-2 bg-white/15 hover:bg-white/25 rounded-full text-xs font-bold flex items-center space-x-1.5 transition-colors text-white"
              >
                <Save className="w-3.5 h-3.5 stroke-white" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
