import React, { useState } from 'react';
import { 
  Flame, 
  Skull, 
  TrendingUp, 
  Send, 
  Sparkles, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare,
  Bot,
  Zap
} from 'lucide-react';
import { GenZBuddyInsight, BuddyMode, BuddyChatMessage } from '../../types';

interface GenZBuddyCardProps {
  insight: GenZBuddyInsight;
  currentPostContext?: string;
}

export const GenZBuddyCard: React.FC<GenZBuddyCardProps> = ({
  insight,
  currentPostContext,
}) => {
  const [activeMode, setActiveMode] = useState<BuddyMode>('hype');
  const [chatMessages, setChatMessages] = useState<BuddyChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'buddy',
      text: `Yo! Nova here. ${insight.vibeCheck} — Ask me to roast your hook, drop alternate punchlines, or test viral angles!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage.trim();
    const userMsg: BuddyChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/buddy-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          postContext: currentPostContext,
          mode: activeMode,
        }),
      });

      const data = await res.json();
      const buddyReply = data.reply || "Bro that's actually wild! Try opening with a question that makes people question their whole workflow.";

      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'buddy',
          text: buddyReply,
          timestamp: 'Just now',
        },
      ]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'buddy',
          text: 'Dang, internet glitched for a sec, but trust: keep the opening under 12 words and you’re cooking!',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-purple-500/25 p-5 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Avatar & Persona */}
      <div className="flex items-center justify-between border-b border-purple-500/15 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0E0A1E] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Nova · Gen-Z Buddy</h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                Witty AI
              </span>
            </div>
            <p className="text-[11px] text-purple-300/70 font-medium">Chief Vibe & Virality Officer</p>
          </div>
        </div>

        {/* Rizz Meter Indicator */}
        <div className="text-right">
          <div className="text-xs font-mono font-bold text-purple-200 flex items-center gap-1 justify-end">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{insight.rizzMeter}% Rizz</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Virality Score</p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center p-1 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs font-medium">
        <button
          onClick={() => setActiveMode('hype')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
            activeMode === 'hype'
              ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          <span>Hype</span>
        </button>
        <button
          onClick={() => setActiveMode('roast')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
            activeMode === 'roast'
              ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Skull className="w-3.5 h-3.5 text-rose-300" />
          <span>Roast</span>
        </button>
        <button
          onClick={() => setActiveMode('growth-hack')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
            activeMode === 'growth-hack'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
          <span>Growth</span>
        </button>
      </div>

      {/* Vibe Check Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-900/30 via-fuchsia-950/20 to-indigo-950/30 border border-purple-500/25">
        <div className="flex items-center gap-1.5 text-xs font-bold text-fuchsia-300 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Vibe Check: {insight.vibeCheck}</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed italic">
          "{insight.commentary}"
        </p>
      </div>

      {/* Strategic Takeaways: What Hits vs What Flops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-xs">
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1.5">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>What Hits:</span>
          </div>
          <ul className="space-y-1 text-slate-300 text-[11px]">
            {insight.whatHits.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1">
                <span className="text-emerald-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20">
          <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1.5">
            <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
            <span>Watch Out (Cringe Alert):</span>
          </div>
          <ul className="space-y-1 text-slate-300 text-[11px]">
            {insight.whatFlops.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1">
                <span className="text-rose-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Viral Hook Angle */}
      <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs">
        <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
          💡 Viral Angle Recommendation
        </span>
        <p className="text-slate-200 leading-relaxed text-[11px]">
          {insight.viralAngle}
        </p>
      </div>

      {/* Mini Interactive Chat with Buddy */}
      <div className="flex flex-col gap-2 pt-2 border-t border-purple-500/15">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-purple-300/70 uppercase tracking-wider flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-purple-400" /> Live Buddy Chat:
          </span>
          <span className="text-[10px] text-purple-400/70 font-mono">Real-time AI</span>
        </div>

        {/* Message bubble stream */}
        <div className="max-h-44 overflow-y-auto pr-1 flex flex-col gap-2">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-purple-600/30 border border-purple-400/30 text-white ml-6 text-right'
                  : 'bg-white/[0.04] border border-white/[0.06] text-slate-200 mr-4 text-left'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-0.5 text-[9px] text-purple-300/60 font-mono">
                <span>{msg.sender === 'user' ? 'You' : 'Nova'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p>{msg.text}</p>
            </div>
          ))}

          {isTyping && (
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs text-purple-300 flex items-center gap-2 max-w-[120px]">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-[10px] font-mono">cooking...</span>
            </div>
          )}
        </div>

        {/* Input bar */}
        <form onSubmit={handleSendMessage} className="flex gap-1.5 pt-1">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask Nova to rewrite or roast..."
            className="flex-1 px-3 py-1.5 text-xs text-slate-100 glass-input rounded-xl focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 disabled:opacity-40 text-white transition-all shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
