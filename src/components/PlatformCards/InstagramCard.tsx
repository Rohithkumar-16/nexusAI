import React, { useState } from 'react';
import { 
  Instagram, 
  Copy, 
  Check, 
  Edit3, 
  Sparkles, 
  Share2, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Save, 
  Wand2, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Palette,
  MessageSquare
} from 'lucide-react';
import { InstagramPost } from '../../types';

interface InstagramCardProps {
  post: InstagramPost;
  attachedImage?: string;
  onUpdatePost: (updated: InstagramPost) => void;
  onRequestRefine: (platform: 'instagram', currentContent: string, instruction: string) => void;
  onSchedule: (platform: 'instagram', content: string) => void;
  isRefining: boolean;
}

export const InstagramCard: React.FC<InstagramCardProps> = ({
  post,
  attachedImage,
  onUpdatePost,
  onRequestRefine,
  onSchedule,
  isRefining,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [customRefinePrompt, setCustomRefinePrompt] = useState('');
  const [showRefineInput, setShowRefineInput] = useState(false);

  // Editable drafts
  const [captionText, setCaptionText] = useState(post.caption);
  const [slides, setSlides] = useState<string[]>(post.carouselSlides || []);

  const fullCaption = `${post.caption}\n\n${post.hashtags.join(' ')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdatePost({
      ...post,
      caption: captionText,
      carouselSlides: slides,
    });
    setIsEditing(false);
  };

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `*Instagram Post Draft:*\n\n${fullCaption}\n\n*Carousel Slides:*\n${slides.join('\n')}`
  )}`;

  const refinePresets = [
    'Add stronger Save & Share CTA',
    'Generate 5 aesthetic carousel slides',
    'Optimize hashtag group for niche reach',
    'Make tone conversational & friendly',
  ];

  return (
    <div className="glass-panel rounded-2xl border border-purple-500/20 p-5 sm:p-6 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/15 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shadow-[0_0_15px_rgba(225,48,108,0.4)]">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Instagram Carousel & Caption
              <span className="text-[10px] font-normal text-purple-300/80 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                Visual Growth
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              High-retention carousel slides with engagement-optimized caption
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
            title={isEditing ? 'Close editor' : 'Edit caption text'}
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
                <span>Copy Caption</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Instagram Layout */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0E0A1E]/70 overflow-hidden flex flex-col">
        {/* Post Creator Bar */}
        <div className="flex items-center justify-between p-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
              <div className="w-full h-full rounded-full bg-[#120B25] flex items-center justify-center font-bold text-xs text-white">
                KV
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-white">kevin_varghees</p>
              <p className="text-[10px] text-slate-400 font-mono">Original Audio · AuraCraft</p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-mono">···</span>
        </div>

        {/* Carousel Visual Frame */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-gradient-to-br from-[#1E113C] via-[#120B25] to-[#25103E] flex flex-col justify-between p-6 overflow-hidden border-y border-white/[0.04]">
          {/* Subtle cosmic glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-fuchsia-600/15 blur-3xl pointer-events-none" />

          {/* Top indicator */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300/80 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-500/30">
              Carousel Slide {activeSlideIndex + 1} of {slides.length || 1}
            </span>
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlideIndex === i ? 'w-5 bg-purple-400' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Slide Content text */}
          <div className="relative z-10 my-auto text-center px-4 sm:px-8">
            {attachedImage && activeSlideIndex === 0 ? (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={attachedImage}
                  alt="Post visual"
                  className="max-h-40 rounded-xl object-contain shadow-2xl border border-purple-500/30"
                />
                <p className="text-xs font-medium text-purple-200 mt-1">
                  {slides[0] || 'Cover Slide'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-1">
                  <Palette className="w-4 h-4 text-purple-300" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {slides[activeSlideIndex] || 'Swipe to learn more'}
                </h4>
                <p className="text-xs text-purple-300/70 max-w-sm">
                  {activeSlideIndex === slides.length - 1
                    ? '📌 Save this post for later and share with your team!'
                    : 'Swipe left to continue the breakdown →'}
                </p>
              </div>
            )}
          </div>

          {/* Carousel Arrows */}
          {slides.length > 1 && (
            <div className="relative z-10 flex items-center justify-between pt-2">
              <button
                disabled={activeSlideIndex === 0}
                onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={activeSlideIndex === slides.length - 1}
                onClick={() => setActiveSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Social Bar */}
        <div className="p-3.5 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-rose-500 hover:scale-110 transition-transform cursor-pointer" />
            <MessageCircle className="w-5 h-5 text-slate-300 hover:text-white transition-colors cursor-pointer" />
            <Send className="w-5 h-5 text-slate-300 hover:text-white transition-colors cursor-pointer" />
          </div>
          <Bookmark className="w-5 h-5 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer" />
        </div>

        {/* Caption Area or Editor */}
        <div className="px-3.5 pb-4 pt-1 flex flex-col gap-2">
          {isEditing ? (
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
                  Instagram Caption
                </label>
                <textarea
                  value={captionText}
                  onChange={(e) => setCaptionText(e.target.value)}
                  rows={4}
                  className="w-full p-2.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
                  Carousel Slides (1 per line)
                </label>
                <textarea
                  value={slides.join('\n')}
                  onChange={(e) => setSlides(e.target.value.split('\n').filter(Boolean))}
                  rows={4}
                  className="w-full p-2.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
                />
              </div>

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
            <div className="text-xs sm:text-sm text-slate-200 space-y-2">
              <p className="leading-relaxed whitespace-pre-line text-slate-200">
                <span className="font-bold text-white mr-1.5">kevin_varghees</span>
                {post.caption}
              </p>
              <div className="flex flex-wrap gap-1 pt-1 text-xs text-purple-400 font-mono">
                {post.hashtags.map((tag, i) => (
                  <span key={i} className="hover:underline cursor-pointer">
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Visual Concept Idea prompt */}
          {post.visualConceptIdea && !isEditing && (
            <div className="mt-2 p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300/80 flex items-start gap-2">
              <Palette className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-purple-200">Visual Concept: </span>
                <span>{post.visualConceptIdea}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Refinement Chips */}
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
              onClick={() => onRequestRefine('instagram', fullCaption, preset)}
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
              placeholder="e.g. Add 3 more educational slides on hook frameworks..."
              className="flex-1 px-3 py-1.5 text-xs text-slate-100 glass-input rounded-lg focus:outline-none"
            />
            <button
              disabled={!customRefinePrompt.trim() || isRefining}
              onClick={() => {
                onRequestRefine('instagram', fullCaption, customRefinePrompt);
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
          {slides.length} carousel slides · {post.hashtags.length} hashtags
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSchedule('instagram', fullCaption)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-purple-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Schedule</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
            title="Share draft directly to WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Draft</span>
          </a>
        </div>
      </div>
    </div>
  );
};
