import React from 'react';
import { ChecklistItem, ItemStatus } from '../types';
import { PlatformBadge } from './PlatformBadge';
import { 
  Check, 
  Code, 
  ExternalLink, 
  ChevronRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface ChecklistCardProps {
  item: ChecklistItem;
  isCompleted: boolean;
  status: ItemStatus;
  note?: string;
  onToggleComplete: (id: string) => void;
  onOpenDetail: (item: ChecklistItem) => void;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  item,
  isCompleted,
  status,
  note,
  onToggleComplete,
  onOpenDetail,
}) => {
  const priorityConfig = {
    blocker: { label: 'BLOCKER', badge: 'bg-white/15 text-white border-white/30' },
    high: { label: 'HIGH', badge: 'bg-white/10 text-white border-white/20' },
    medium: { label: 'MEDIUM', badge: 'bg-white/5 text-white/90 border-white/10' },
  }[item.priority];

  return (
    <div 
      className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden ${
        isCompleted
          ? 'bg-[#16161C]/60 border-white/10 opacity-70 hover:opacity-100'
          : 'bg-[#121216]/90 border-white/15 hover:border-white/30 shadow-md'
      }`}
    >
      <div className="p-4 sm:p-5 flex items-start space-x-3.5">
        
        {/* First Page Style Circular Checkmark Seal */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(item.id);
          }}
          className={`apple-press mt-0.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
            isCompleted
              ? 'bg-white text-black shadow-lg scale-105'
              : 'border border-white/30 hover:border-white bg-white/5 text-white'
          }`}
          aria-label={isCompleted ? "Mark incomplete" : "Mark completed"}
        >
          {isCompleted ? (
            <Check className="w-4 h-4 stroke-[3] stroke-black" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          )}
        </button>

        {/* Card Content & Click Target to open details */}
        <div 
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => onOpenDetail(item)}
        >
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            {/* Priority Pill - Big and clear */}
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${priorityConfig.badge}`}>
              {priorityConfig.label}
            </span>

            {/* Platform Pill */}
            <PlatformBadge platform={item.platform} variant="dark" />

            {/* Has Code Snippet Badge */}
            {item.codeSnippet && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white flex items-center space-x-1">
                <Code className="w-3 h-3 stroke-white text-white" />
                <span>Code</span>
              </span>
            )}

            {/* Official Store Guideline Reference */}
            {item.storeGuideline && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white flex items-center space-x-1">
                <ExternalLink className="w-2.5 h-2.5 stroke-white text-white" />
                <span>Store Rule</span>
              </span>
            )}
          </div>

          <h4 className={`text-sm sm:text-base font-bold tracking-tight text-white ${
            isCompleted ? 'line-through text-white/50' : 'group-hover:text-white'
          } transition-colors`}>
            {item.title}
          </h4>

          <p className="text-xs text-white/80 mt-1 line-clamp-2 leading-relaxed">
            {item.shortDescription}
          </p>

          {/* User note preview if exists */}
          {note && (
            <div className="mt-2 text-[11px] bg-white/10 text-white p-2.5 rounded-xl flex items-start space-x-2 border border-white/15">
              <MessageSquare className="w-3.5 h-3.5 stroke-white text-white shrink-0 mt-0.5" />
              <span className="truncate italic">"{note}"</span>
            </div>
          )}
        </div>

        {/* Chevron Opener */}
        <button
          onClick={() => onOpenDetail(item)}
          className="apple-press p-1 text-white/60 hover:text-white shrink-0"
          title="View detailed guide and code"
        >
          <ChevronRight className="w-5 h-5 stroke-white text-white" />
        </button>

      </div>
    </div>
  );
};
