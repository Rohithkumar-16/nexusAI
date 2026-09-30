import React, { useState } from 'react';
import { History, Search, Trash2, ArrowUpRight, Calendar, Sparkles } from 'lucide-react';
import { HistoryItem } from '../types';

interface ArchivesViewProps {
  historyList: HistoryItem[];
  onSelectHistory: (id: string) => void;
  onDeleteHistory: (id: string, e: React.MouseEvent) => void;
}

export const ArchivesView: React.FC<ArchivesViewProps> = ({
  historyList,
  onSelectHistory,
  onDeleteHistory,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = historyList.filter(
    (h) =>
      h.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      h.snippet.toLowerCase().includes(filterQuery.toLowerCase()) ||
      h.tone.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="glass-panel rounded-2xl p-6 border border-purple-500/25 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Social Post Archives
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {historyList.length} Drafts Saved
            </span>
          </h2>
          <p className="text-xs text-purple-300/70">
            Revisit, re-export, or load any previously generated content package
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search saved drafts..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-white glass-input rounded-xl focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-xs flex flex-col items-center gap-2">
          <History className="w-8 h-8 text-purple-400/40" />
          <p>No archived campaigns found matching your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl glass-card-interactive border border-purple-500/15 flex flex-col justify-between gap-3 text-left group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/50 text-purple-300 border border-purple-500/20">
                    {item.tone}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                    <button
                      onClick={(e) => onDeleteHistory(item.id, e)}
                      className="p-1 hover:text-rose-400 text-slate-500 transition-colors"
                      title="Delete archive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {item.snippet}
                </p>
              </div>

              <button
                onClick={() => onSelectHistory(item.id)}
                className="flex items-center justify-between w-full pt-3 border-t border-white/[0.05] text-xs font-semibold text-purple-300 hover:text-white"
              >
                <span>Load into Studio</span>
                <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
