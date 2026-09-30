import React, { useState } from 'react';
import { X, Calendar, Clock, Check, Trash2, Send } from 'lucide-react';
import { ScheduledPost } from '../types';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatform?: 'linkedin' | 'twitter' | 'instagram';
  defaultContent?: string;
  scheduledList: ScheduledPost[];
  onAddScheduled: (post: ScheduledPost) => void;
  onRemoveScheduled: (id: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  defaultPlatform = 'linkedin',
  defaultContent = '',
  scheduledList,
  onAddScheduled,
  onRemoveScheduled,
}) => {
  const [platform, setPlatform] = useState<'linkedin' | 'twitter' | 'instagram'>(defaultPlatform);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('09:00');
  const [content, setContent] = useState(defaultContent);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddScheduled({
      id: `sched-${Date.now()}`,
      platform,
      content,
      date,
      time,
      status: 'scheduled',
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel-elevated w-full max-w-lg rounded-2xl p-6 border border-purple-500/30 flex flex-col gap-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <Calendar className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Post Scheduler</h3>
              <p className="text-xs text-purple-300/70">Plan and auto-dispatch social media drafts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schedule Form */}
        <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider block mb-1.5">
              Select Platform
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['linkedin', 'twitter', 'instagram'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize transition-all ${
                    platform === p
                      ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/50'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {p === 'twitter' ? 'Twitter / X' : p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider block mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-100 glass-input rounded-xl focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider block mb-1.5">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-100 glass-input rounded-xl focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider block mb-1.5">
              Post Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Post body..."
              className="w-full p-3 text-xs text-slate-100 glass-input rounded-xl focus:outline-none resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Queued!</span>
                </>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5 text-purple-200" />
                  <span>Queue Post</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Currently Scheduled Queue */}
        {scheduledList.length > 0 && (
          <div className="pt-4 border-t border-purple-500/20 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-purple-200">
              Active Queue ({scheduledList.length})
            </h4>
            <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
              {scheduledList.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2 text-xs"
                >
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white capitalize">{item.platform}</span>
                      <span className="text-[10px] text-purple-300 font-mono">
                        {item.date} at {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.content}</p>
                  </div>
                  <button
                    onClick={() => onRemoveScheduled(item.id)}
                    className="p-1 hover:text-rose-400 text-slate-500"
                    title="Delete scheduled post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
