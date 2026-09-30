import React, { useState } from 'react';
import { 
  Twitter, 
  Copy, 
  Check, 
  Edit3, 
  Sparkles, 
  Share2, 
  Heart, 
  Repeat2, 
  MessageCircle, 
  Bookmark, 
  Save, 
  Wand2, 
  Layers, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { TwitterPost } from '../../types';

interface TwitterCardProps {
  post: TwitterPost;
  onUpdatePost: (updated: TwitterPost) => void;
  onRequestRefine: (platform: 'twitter', currentContent: string, instruction: string) => void;
  onSchedule: (platform: 'twitter', content: string) => void;
  isRefining: boolean;
}

export const TwitterCard: React.FC<TwitterCardProps> = ({
  post,
  onUpdatePost,
  onRequestRefine,
  onSchedule,
  isRefining,
}) => {
  const [viewMode, setViewMode] = useState<'single' | 'thread'>('single');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customRefinePrompt, setCustomRefinePrompt] = useState('');
  const [showRefineInput, setShowRefineInput] = useState(false);

  // Editable drafts
  const [singleTweetText, setSingleTweetText] = useState(post.singleTweet);
  const [threadTweets, setThreadTweets] = useState<string[]>(post.thread || []);

  const activeContent = viewMode === 'single' ? singleTweetText : threadTweets.join('\n\n---\n\n');

  const charLimit = 280;
  const singleCharCount = singleTweetText.length;
  const isOverLimit = singleCharCount > charLimit;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdatePost({
      ...post,
      singleTweet: singleTweetText,
      thread: threadTweets,
    });
    setIsEditing(false);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    viewMode === 'single' ? singleTweetText : threadTweets[0] || ''
  )}`;

  const refinePresets = [
    'Make hook punchier & shorter',
    'Add viral quote-tweet question',
    'Expand into a 4-part thread',
    'Cut all corporate buzzwords',
  ];

  return (
    <div className="glass-panel rounded-2xl border border-purple-500/20 p-5 sm:p-6 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/15 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-black border border-purple-400/40 flex items-center justify-center text-white shadow-inner">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Twitter / X Post
              <span className="text-[10px] font-normal text-purple-300/80 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                High Velocity
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Optimized for quote tweets, bookmarks & algorithm retention
            </p>
          </div>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-2">
          {/* Single vs Thread Segmented Control */}
          <div className="flex items-center p-0.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs font-medium">
            <button
              onClick={() => setViewMode('single')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'single'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Single
            </button>
            <button
              onClick={() => setViewMode('thread')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                viewMode === 'thread'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Thread ({threadTweets.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-xl text-xs font-medium transition-all ${
              isEditing
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
            }`}
            title={isEditing ? 'Close editor' : 'Edit tweet text'}
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-200 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-purple-300" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tweet Body Preview */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0E0A1E]/70 p-4 sm:p-5 flex flex-col gap-4">
        {viewMode === 'single' ? (
          // SINGLE TWEET VIEW
          <div className="flex flex-col gap-3">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                  KV
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-bold text-white">Kevin Varghees</span>
                    <span className="text-blue-400 text-xs">✓</span>
                    <span className="text-xs text-slate-500">@kevin_builds</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Just now</span>
                </div>
              </div>

              {/* Character Limit Badge */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs font-mono font-medium ${
                    isOverLimit ? 'text-rose-400 font-bold' : singleCharCount > 250 ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  {singleCharCount}/{charLimit}
                </span>
                {isOverLimit && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
              </div>
            </div>

            {/* Content or Edit Box */}
            {isEditing ? (
              <div className="flex flex-col gap-2 pt-1">
                <textarea
                  value={singleTweetText}
                  onChange={(e) => setSingleTweetText(e.target.value)}
                  rows={4}
                  className="w-full p-3 text-xs sm:text-sm text-slate-100 glass-input rounded-xl focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-xs text-slate-400">
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed whitespace-pre-line">
                {singleTweetText}
              </p>
            )}

            {/* Social reactions */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-slate-400">
              <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>32</span>
              </button>
              <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                <Repeat2 className="w-3.5 h-3.5" />
                <span>18</span>
              </button>
              <button className="flex items-center gap-1 hover:text-rose-400 transition-colors">
                <Heart className="w-3.5 h-3.5" />
                <span>142</span>
              </button>
              <button className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                <Bookmark className="w-3.5 h-3.5" />
                <span>47</span>
              </button>
            </div>
          </div>
        ) : (
          // THREAD VIEW
          <div className="flex flex-col gap-4">
            {threadTweets.map((tweetText, idx) => (
              <div key={idx} className="relative flex gap-3">
                {/* Thread Connector Line */}
                {idx < threadTweets.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-purple-500/30" />
                )}

                <div className="relative z-10 w-8 h-8 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center font-bold text-xs text-purple-200 shrink-0">
                  {idx + 1}
                </div>

                <div className="flex-1 pb-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-bold text-white">Kevin Varghees</span>
                    <span className="text-blue-400 text-xs">✓</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Tweet {idx + 1}/{threadTweets.length}
                    </span>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={tweetText}
                      onChange={(e) => {
                        const updated = [...threadTweets];
                        updated[idx] = e.target.value;
                        setThreadTweets(updated);
                      }}
                      rows={3}
                      className="w-full p-2.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {tweetText}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-slate-500">
                    <span className="font-mono">{tweetText.length} chars</span>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-200 text-xs underline font-medium"
                    >
                      Tweet this part ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {isEditing && (
              <div className="flex justify-end gap-2 pt-1 border-t border-white/[0.06]">
                <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-xs text-slate-400">
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Thread</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Refine Chips */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-purple-300/60 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400" /> AI Refine Options:
          </span>
          <button
            onClick={() => setShowRefineInput(!showRefineInput)}
            className="text-[11px] text-purple-400 hover:text-purple-300 underline font-medium"
          >
            {showRefineInput ? 'Close' : 'Custom tweak'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {refinePresets.map((preset, idx) => (
            <button
              key={idx}
              disabled={isRefining}
              onClick={() => onRequestRefine('twitter', activeContent, preset)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-purple-200 bg-purple-950/40 hover:bg-purple-600/30 border border-purple-500/20 hover:border-purple-400/40 transition-all flex items-center gap-1"
            >
              <Wand2 className="w-2.5 h-2.5 text-purple-400" />
              <span>{preset}</span>
            </button>
          ))}
        </div>

        {showRefineInput && (
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={customRefinePrompt}
              onChange={(e) => setCustomRefinePrompt(e.target.value)}
              placeholder="e.g. Make it super punchy with 2 emojis and question at end..."
              className="flex-1 px-3 py-1.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
            />
            <button
              disabled={!customRefinePrompt.trim() || isRefining}
              onClick={() => {
                onRequestRefine('twitter', activeContent, customRefinePrompt);
                setCustomRefinePrompt('');
                setShowRefineInput(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all disabled:opacity-50"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-purple-500/10 text-xs">
        <span className="text-slate-400 text-[11px]">
          {viewMode === 'single' ? `${singleCharCount} chars` : `${threadTweets.length} tweets in thread`}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSchedule('twitter', activeContent)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-purple-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Schedule</span>
          </button>

          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-black hover:bg-zinc-900 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-purple-300" />
            <span>Tweet on X</span>
          </a>
        </div>
      </div>
    </div>
  );
};
