import React from 'react';
import { Sparkles, ArrowRight, Bookmark, Flame, Zap } from 'lucide-react';

interface VaultViewProps {
  onSelectTemplate: (prompt: string) => void;
}

export const VaultView: React.FC<VaultViewProps> = ({ onSelectTemplate }) => {
  const templates = [
    {
      title: 'The Contrarian Truth',
      category: 'Thought Leadership',
      hook: 'Most founders think [COMMON BELIEF]. After 6 months of testing, the exact opposite is true...',
      description: 'Disrupts timeline scrolling by challenging an industry consensus.',
      examplePrompt: 'Most founders think working 80 hours a week is necessary for scaling. Why automated workflows and async documentation outperform grinding.',
    },
    {
      title: 'The Brutal 1-Year Retrospective',
      category: 'Storytelling',
      hook: '12 months ago I had $0 in revenue and 50 followers. Today we passed $25,000 MRR. Here are 4 mistakes I will never repeat...',
      description: 'Vulnerable yet authoritative storytelling that drives massive bookmark saves.',
      examplePrompt: '12 months ago I was burned out building complex software nobody wanted. Here are 3 hard lessons on why building simple AI micro-tools in public changed everything.',
    },
    {
      title: 'The 5-Step Friction Eraser',
      category: 'Educational',
      hook: 'If you want to [DESIRED OUTCOME] without [MAJOR PAIN POINT], here is the exact 5-step checklist:',
      description: 'High scannability and value density that commands reposts.',
      examplePrompt: 'If you want to publish high-converting daily content across LinkedIn and Twitter without spending 3 hours writing, here is our 5-step checklist.',
    },
    {
      title: 'The Unfiltered Tool Stack',
      category: 'High Velocity',
      hook: 'I tested 47 AI tools over the last 90 days. 42 of them were pure gimmick wrappers. These 5 actually make me money every week:',
      description: 'Curation with strong opinion and filtered quality.',
      examplePrompt: 'Tested 40+ content creation and productivity tools this quarter. Here are the top 5 tools that actually save 20 hours each week.',
    },
    {
      title: 'The Micro-Habit Multiplier',
      category: 'Personal Growth',
      hook: 'The single 15-minute habit that doubled my creative output while working fewer hours:',
      description: 'Intriguing personal reflection with low barrier to adoption.',
      examplePrompt: 'The 15-minute evening brain-dump habit that eliminated writer block and generated our highest-viewed posts this year.',
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-purple-500/25 flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Viral Hook Templates & Frameworks
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Battle-Tested
            </span>
          </h2>
          <p className="text-xs text-purple-300/70">
            Click any proven structural formula to load into the AI studio generator
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl, i) => (
          <div
            key={i}
            className="p-4 rounded-xl glass-card-interactive flex flex-col justify-between gap-3 border border-purple-500/15 text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-500/20">
                  {tpl.category}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{tpl.title}</h3>
              <p className="text-xs text-purple-200/90 font-medium italic mb-2 border-l-2 border-purple-500 pl-2">
                "{tpl.hook}"
              </p>
              <p className="text-[11px] text-slate-400">{tpl.description}</p>
            </div>

            <button
              onClick={() => onSelectTemplate(tpl.examplePrompt)}
              className="flex items-center justify-between w-full pt-3 border-t border-white/[0.05] text-xs font-semibold text-purple-300 hover:text-white group"
            >
              <span>Use this framework</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
