import React from 'react';
import { Search, Bell, Sparkles, Menu, Cpu, Share2 } from 'lucide-react';

interface TopNavProps {
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickPreset: (preset: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  onQuickPreset,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 lg:px-8 py-3.5 glass-panel border-b border-purple-500/15 bg-[#0B0814]/75 backdrop-blur-xl">
      {/* Mobile Toggle + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60 group-focus-within:text-purple-300 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search campaigns, hooks, keywords..."
            className="w-full pl-10 pr-12 py-2 text-xs text-slate-100 placeholder-slate-500 glass-input rounded-xl focus:outline-none transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[10px] text-purple-300/60 font-mono">
            ⌘K
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Model Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-mono text-[11px] text-purple-300">Gemini 3.8 Flash</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Quick Inspiration Button */}
        <button
          onClick={() => onQuickPreset('Viral SaaS Launch')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Inspiration</span>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#c084fc]" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-purple-500/15">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-500 p-[1.5px] shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <div className="w-full h-full rounded-full bg-[#120B25] flex items-center justify-center font-bold text-xs text-purple-200">
                KV
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0814]" />
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">Kevin V.</p>
            <p className="text-[10px] text-purple-300/60 font-mono">Creator Mode</p>
          </div>
        </div>
      </div>
    </header>
  );
};
