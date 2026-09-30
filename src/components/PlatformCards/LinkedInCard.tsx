import React, { useState } from 'react';
import { 
  Linkedin, 
  Copy, 
  Check, 
  Edit3, 
  Sparkles, 
  Share2, 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Globe, 
  Save, 
  Wand2,
  Calendar,
  Clock
} from 'lucide-react';
import { LinkedInPost } from '../../types';

interface LinkedInCardProps {
  post: LinkedInPost;
  onUpdatePost: (updated: LinkedInPost) => void;
  onRequestRefine: (platform: 'linkedin', currentContent: string, instruction: string) => void;
  onSchedule: (platform: 'linkedin', content: string) => void;
  isRefining: boolean;
}

export const LinkedInCard: React.FC<LinkedInCardProps> = ({
  post,
  onUpdatePost,
  onRequestRefine,
  onSchedule,
  isRefining,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customRefinePrompt, setCustomRefinePrompt] = useState('');
  const [showRefineInput, setShowRefineInput] = useState(false);

  // Editable draft states
  const [hookText, setHookText] = useState(post.hook);
  const [bodyText, setBodyText] = useState(post.body);
  const [ctaText, setCtaText] = useState(post.callToAction);

  const fullContent = `${post.hook}\n\n${post.body}\n\n${post.callToAction}\n\n${post.hashtags.join(' ')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdatePost({
      ...post,
      hook: hookText,
      body: bodyText,
      callToAction: ctaText,
    });
    setIsEditing(false);
  };

  const handleDirectShare = () => {
    // LinkedIn share link opening LinkedIn feed with pre-copied text
    navigator.clipboard.writeText(fullContent);
    window.open('https://www.linkedin.com/feed/', '_blank');
  };

  const refinePresets = [
    'Make opening hook 2x punchier',
    'Add structured bullet points',
    'Make tone more executive & authoritative',
    'Shorten by 30% for quick mobile read',
  ];

  return (
    <div className="glass-panel rounded-2xl border border-purple-500/20 p-5 sm:p-6 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative">
      {/* Platform Header */}
      <div className="flex items-center justify-between border-b border-purple-500/15 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0077B5]/20 border border-[#0077B5]/40 flex items-center justify-center text-[#0A66C2]">
            <Linkedin className="w-5 h-5 text-[#0077B5]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              LinkedIn Post Draft
              <span className="text-[10px] font-normal text-purple-300/80 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                Thought Leadership
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Formatted for maximum dwell time & engagement algorithm
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-xl text-xs font-medium transition-all ${
              isEditing
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
            }`}
            title={isEditing ? 'Close editor' : 'Edit post text'}
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

      {/* Simulated LinkedIn Post Container */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0E0A1E]/70 p-4 sm:p-5 flex flex-col gap-3.5">
        {/* Author Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-xs text-white shadow-sm">
            KV
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-white">Kevin Varghees</span>
              <span className="text-[10px] text-slate-500">· 1st</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1">
              Founder & AI Strategist · Building high-leverage products
            </p>
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Just now</span>
              <span>·</span>
              <Globe className="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Post Content Display or Editor */}
        {isEditing ? (
          <div className="flex flex-col gap-3 pt-2">
            <div>
              <label className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
                Hook (The First 2 Lines)
              </label>
              <textarea
                value={hookText}
                onChange={(e) => setHookText(e.target.value)}
                rows={2}
                className="w-full p-2.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
                Main Body
              </label>
              <textarea
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                rows={5}
                className="w-full p-2.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
                Call to Action
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full p-2.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 font-normal">
            <p className="font-semibold text-white whitespace-pre-line border-l-2 border-purple-500 pl-3 py-0.5">
              {post.hook}
            </p>
            <div className="whitespace-pre-line text-slate-300">
              {post.body}
            </div>
            <p className="font-medium text-purple-200">
              {post.callToAction}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 text-xs text-purple-400 font-mono">
              {post.hashtags.map((tag, i) => (
                <span key={i} className="hover:underline cursor-pointer">
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Realistic Social Reaction Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-slate-400">
          <button className="flex items-center gap-1.5 hover:text-purple-300 transition-colors py-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Like</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-purple-300 transition-colors py-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Comment</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-purple-300 transition-colors py-1">
            <Repeat2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Repost</span>
          </button>
          <a 
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-purple-400 hover:text-purple-200 transition-colors py-1"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open LinkedIn</span>
          </a>
        </div>
      </div>

      {/* AI Refinement Chips & Custom Instructions */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-purple-300/60 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400" /> AI Refine Options:
          </span>
          <button
            onClick={() => setShowRefineInput(!showRefineInput)}
            className="text-[11px] text-purple-400 hover:text-purple-300 underline font-medium"
          >
            {showRefineInput ? 'Close custom prompt' : 'Custom tweak'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {refinePresets.map((preset, idx) => (
            <button
              key={idx}
              disabled={isRefining}
              onClick={() => onRequestRefine('linkedin', fullContent, preset)}
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
              placeholder="e.g. Add 3 statistics about creator productivity..."
              className="flex-1 px-3 py-1.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
            />
            <button
              disabled={!customRefinePrompt.trim() || isRefining}
              onClick={() => {
                onRequestRefine('linkedin', fullContent, customRefinePrompt);
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

      {/* Card Actions Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-purple-500/10 text-xs">
        <span className="text-slate-400 text-[11px]">
          {fullContent.length} chars · ~{Math.ceil(fullContent.split(' ').length / 200)}m read
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSchedule('linkedin', fullContent)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-purple-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Schedule</span>
          </button>

          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0A66C2] to-indigo-600 hover:opacity-90 shadow-sm transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Post on LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};
