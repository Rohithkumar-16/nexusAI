import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Check, 
  Plus, 
  Globe, 
  HelpCircle 
} from 'lucide-react';
import { SchedulingInsights } from '../../types';

interface SchedulingCardProps {
  scheduling: SchedulingInsights;
  onOpenScheduler: () => void;
}

export const SchedulingCard: React.FC<SchedulingCardProps> = ({
  scheduling,
  onOpenScheduler,
}) => {
  const [selectedTimezone, setSelectedTimezone] = useState('PST (UTC-8)');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const timezones = [
    'PST (UTC-8)',
    'EST (UTC-5)',
    'GMT (UTC+0)',
    'CET (UTC+1)',
    'IST (UTC+5:30)',
    'SGT (UTC+8)',
    'JST (UTC+9)',
  ];

  return (
    <div className="glass-panel rounded-2xl border border-purple-500/25 p-5 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/15 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <Calendar className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Algorithmic Best Times</h3>
            <p className="text-[11px] text-purple-300/70">Peak audience engagement windows</p>
          </div>
        </div>

        {/* Timezone Dropdown */}
        <div className="flex items-center gap-1 text-[11px] text-purple-300/80 bg-purple-950/40 px-2 py-1 rounded-lg border border-purple-500/20">
          <Globe className="w-3 h-3 text-purple-400" />
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="bg-transparent text-purple-200 focus:outline-none cursor-pointer"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz} className="bg-[#120B25] text-white">
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Platform Best Times List */}
      <div className="flex flex-col gap-3">
        {/* LinkedIn */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 transition-all flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
              <span className="text-xs font-bold text-white">LinkedIn</span>
            </div>
            <span className="text-[11px] font-mono font-medium text-purple-300">
              {scheduling.linkedin.bestTime}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-medium">{scheduling.linkedin.bestDay}</span>
            <button
              onClick={() => setActiveTooltip(activeTooltip === 'li' ? null : 'li')}
              className="text-slate-500 hover:text-purple-300 flex items-center gap-0.5"
            >
              <span>Why?</span>
              <HelpCircle className="w-3 h-3" />
            </button>
          </div>
          {activeTooltip === 'li' && (
            <p className="text-[10px] text-purple-200/80 bg-purple-950/50 p-2 rounded-lg border border-purple-500/20 leading-snug animate-in fade-in">
              {scheduling.linkedin.reason}
            </p>
          )}
        </div>

        {/* Twitter / X */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 transition-all flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Twitter className="w-3.5 h-3.5 text-slate-200" />
              <span className="text-xs font-bold text-white">Twitter / X</span>
            </div>
            <span className="text-[11px] font-mono font-medium text-purple-300">
              {scheduling.twitter.bestTime}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-medium">{scheduling.twitter.bestDay}</span>
            <button
              onClick={() => setActiveTooltip(activeTooltip === 'tw' ? null : 'tw')}
              className="text-slate-500 hover:text-purple-300 flex items-center gap-0.5"
            >
              <span>Why?</span>
              <HelpCircle className="w-3 h-3" />
            </button>
          </div>
          {activeTooltip === 'tw' && (
            <p className="text-[10px] text-purple-200/80 bg-purple-950/50 p-2 rounded-lg border border-purple-500/20 leading-snug animate-in fade-in">
              {scheduling.twitter.reason}
            </p>
          )}
        </div>

        {/* Instagram */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 transition-all flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-bold text-white">Instagram</span>
            </div>
            <span className="text-[11px] font-mono font-medium text-purple-300">
              {scheduling.instagram.bestTime}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-medium">{scheduling.instagram.bestDay}</span>
            <button
              onClick={() => setActiveTooltip(activeTooltip === 'ig' ? null : 'ig')}
              className="text-slate-500 hover:text-purple-300 flex items-center gap-0.5"
            >
              <span>Why?</span>
              <HelpCircle className="w-3 h-3" />
            </button>
          </div>
          {activeTooltip === 'ig' && (
            <p className="text-[10px] text-purple-200/80 bg-purple-950/50 p-2 rounded-lg border border-purple-500/20 leading-snug animate-in fade-in">
              {scheduling.instagram.reason}
            </p>
          )}
        </div>
      </div>

      {/* Button to view / add to queue */}
      <button
        onClick={onOpenScheduler}
        className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 transition-all shadow-sm"
      >
        <Plus className="w-3.5 h-3.5 text-purple-300" />
        <span>Add Current Drafts to Calendar</span>
      </button>
    </div>
  );
};
