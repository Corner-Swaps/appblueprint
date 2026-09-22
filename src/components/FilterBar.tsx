import React from 'react';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterMode: 'all' | 'incomplete' | 'blockers';
  setFilterMode: (mode: 'all' | 'incomplete' | 'blockers') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  filterMode,
  setFilterMode,
}) => {
  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 stroke-white text-white absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search guidelines, code, requirements..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl text-[16px] sm:text-sm bg-[#121216] border border-white/15 text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-white transition-all shadow-md"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4 stroke-white" />
          </button>
        )}
      </div>

      {/* Simplified Large Menu Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilterMode('all')}
          className={`apple-press px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
            filterMode === 'all'
              ? 'bg-white text-black shadow-md'
              : 'bg-[#141418] text-white/70 hover:text-white border border-white/10'
          }`}
        >
          All Items
        </button>

        <button
          onClick={() => setFilterMode('incomplete')}
          className={`apple-press px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
            filterMode === 'incomplete'
              ? 'bg-white text-black shadow-md'
              : 'bg-[#141418] text-white/70 hover:text-white border border-white/10'
          }`}
        >
          Incomplete Only
        </button>

        <button
          onClick={() => setFilterMode('blockers')}
          className={`apple-press px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
            filterMode === 'blockers'
              ? 'bg-white text-black shadow-md'
              : 'bg-[#141418] text-white/70 hover:text-white border border-white/10'
          }`}
        >
          Store Blockers
        </button>
      </div>
    </div>
  );
};
