import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  X, 
  Mic, 
  Send, 
  SlidersHorizontal, 
  Wand2, 
  Flame, 
  Layers, 
  Lightbulb, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface InputPanelProps {
  onGenerate: (data: {
    prompt: string;
    imageBase64?: string;
    imageMime?: string;
    tone: string;
    targetAudience: string;
    goal: string;
  }) => void;
  isLoading: boolean;
  loadingStepText: string;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  onGenerate,
  isLoading,
  loadingStepText,
}) => {
  const [promptText, setPromptText] = useState('');
  const [selectedTone, setSelectedTone] = useState('Viral & Punchy');
  const [targetAudience, setTargetAudience] = useState('Founders, Tech & Creators');
  const [primaryGoal, setPrimaryGoal] = useState('Viral Engagement & Discussion');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [attachedImage, setAttachedImage] = useState<{
    url: string;
    base64: string;
    mime: string;
    name: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const TONES = [
    'Viral & Punchy',
    'Thought Leadership',
    'Authentic Storyteller',
    'Gen-Z / Witty Slang',
    'Analytical & Data-Backed',
  ];

  const QUICK_PROMPTS = [
    { label: '🚀 SaaS Launch', prompt: 'Announcing our new AI workflow tool that writes multi-platform social posts from messy brain dumps. Emphasize saving 4 hours daily for solopreneurs.' },
    { label: '💡 Contrarian Truth', prompt: 'Why working 80 hours a week in 2026 is an anti-flex. Smart leverage, automated workflows, and shipping before you feel ready is what actually scales.' },
    { label: '🛠️ Build in Public', prompt: 'Behind the scenes: how we redesigned our entire product UI to glassmorphism dark mode with purple glowing accents. Breakdown of design choices and conversion results.' },
    { label: '📈 5-Step System', prompt: '5 counterintuitive rules for scaling an audience on LinkedIn and Twitter in 2026 without paying for ads or burning out.' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      setTimeout(() => setUploadError(null), 3000);
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAttachedImage({
        url: URL.createObjectURL(file),
        base64: result,
        mime: file.type,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setAttachedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() && !attachedImage) {
      return;
    }

    onGenerate({
      prompt: promptText.trim(),
      imageBase64: attachedImage?.base64,
      imageMime: attachedImage?.mime,
      tone: selectedTone,
      targetAudience,
      goal: primaryGoal,
    });
  };

  const simulateVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    setIsRecording(true);
    // Simulating quick voice dictation
    setTimeout(() => {
      const voiceSample = 'Why solopreneurs who build with AI in 2026 are outperforming 10-person agencies. Share 3 concrete daily habits that save 10 hours.';
      setPromptText((prev) => (prev ? prev + ' ' + voiceSample : voiceSample));
      setIsRecording(false);
    }, 2200);
  };

  return (
    <div className="relative glass-panel rounded-2xl p-4 sm:p-6 border border-purple-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
        {/* Header Title with Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <Wand2 className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                What are you shipping today?
              </h2>
              <p className="text-xs text-purple-300/70">
                Drop raw thoughts, bullet notes, or upload a graphic. Gemini turns it into viral copy.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            <span>{isAdvancedOpen ? 'Hide Controls' : 'Fine-Tune Settings'}</span>
          </button>
        </div>

        {/* Text Area Input */}
        <div className="relative rounded-xl border border-purple-500/25 bg-[#0D091F]/70 backdrop-blur-md focus-within:border-purple-400/60 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={4}
            placeholder="Type your messy brain dump, launch announcement, contrarian insight, or lesson learned..."
            className="w-full p-3.5 sm:p-4 text-sm text-slate-100 placeholder-slate-500 bg-transparent resize-none focus:outline-none"
          />

          {/* Attached image preview inside textarea container */}
          {uploadError && (
            <div className="mx-3.5 mb-2 p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
              {uploadError}
            </div>
          )}

          {attachedImage && (
            <div className="mx-3.5 mb-3 p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between gap-3 max-w-sm">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={attachedImage.url}
                  alt="Attachment preview"
                  className="w-10 h-10 rounded-lg object-cover border border-purple-400/40"
                />
                <div className="truncate text-left">
                  <p className="text-xs font-medium text-slate-200 truncate">{attachedImage.name}</p>
                  <p className="text-[10px] text-purple-300 font-mono">Image attached for visual AI context</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="p-1 rounded-lg hover:bg-purple-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom Toolbar inside the box */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 border-t border-purple-500/15 bg-white/[0.01]">
            <div className="flex items-center gap-1.5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-purple-200 hover:bg-purple-500/20 cursor-pointer border border-transparent hover:border-purple-500/30 transition-all"
              >
                <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                <span>Add Photo</span>
              </label>

              <button
                type="button"
                onClick={simulateVoiceInput}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isRecording
                    ? 'bg-rose-500/30 text-rose-200 border border-rose-500/50 animate-pulse'
                    : 'text-slate-300 hover:text-purple-200 hover:bg-purple-500/20'
                }`}
              >
                <Mic className={`w-3.5 h-3.5 ${isRecording ? 'text-rose-400' : 'text-purple-400'}`} />
                <span>{isRecording ? 'Listening...' : 'Voice Dictate'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="font-mono text-[11px]">{promptText.length} characters</span>
            </div>
          </div>
        </div>

        {/* Quick Inspiration Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-purple-300/60 uppercase tracking-wider flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Quick Starters:
          </span>
          {QUICK_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPromptText(item.prompt)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.03] hover:bg-purple-600/20 hover:text-purple-200 border border-purple-500/15 hover:border-purple-400/40 transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Tone Selector Pills */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-purple-300/60 uppercase tracking-wider">
            Copy Tone
          </span>
          <div className="flex flex-wrap gap-2">
            {TONES.map((tone) => {
              const isSelected = selectedTone === tone;
              return (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setSelectedTone(tone)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40'
                      : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.07] border border-white/[0.05]'
                  }`}
                >
                  {tone}
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Settings Drawer */}
        {isAdvancedOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Early-stage founders, B2B marketers"
                className="w-full px-3 py-1.5 text-xs text-slate-200 glass-input rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Goal
              </label>
              <input
                type="text"
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                placeholder="e.g. Lead generation, viral discussion, newsletter signups"
                className="w-full px-3 py-1.5 text-xs text-slate-200 glass-input rounded-lg focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Submit & Generate Button */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-purple-300/60 hidden sm:block">
            Generates 3 native platform packages + Gen-Z critique simultaneously
          </p>

          <button
            type="submit"
            disabled={isLoading || (!promptText.trim() && !attachedImage)}
            className={`relative flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 w-full sm:w-auto ${
              isLoading || (!promptText.trim() && !attachedImage)
                ? 'bg-purple-900/40 text-purple-300/50 cursor-not-allowed border border-purple-500/20'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:via-indigo-500 hover:to-fuchsia-500 shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:shadow-[0_0_40px_rgba(168,85,247,0.65)] active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 text-purple-200 animate-spin" />
                <span className="font-medium text-purple-100">{loadingStepText || 'Synthesizing with Gemini...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>Generate Social Package</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
