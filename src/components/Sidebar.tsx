import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  History, 
  Calendar, 
  Settings, 
  Zap, 
  Layers, 
  Trash2, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { HistoryItem } from '../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  historyList: HistoryItem[];
  selectedHistoryId: string;
  onSelectHistory: (id: string) => void;
  onDeleteHistory: (id: string, e: React.MouseEvent) => void;
  onNewCampaign: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  historyList,
  selectedHistoryId,
  onSelectHistory,
  onDeleteHistory,
  onNewCampaign,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'studio', label: 'Creator Studio', icon: LayoutDashboard },
    { id: 'history', label: 'Post Archives', icon: History },
    { id: 'schedule', label: 'Schedule Queue', icon: Calendar },
    { id: 'vault', label: 'Hook Templates', icon: Layers },
    { id: 'settings', label: 'Studio Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 flex flex-col justify-between p-4 glass-panel border-r border-purple-500/20 bg-[#0E0A1E]/80 backdrop-blur-2xl transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-6 flex-1 min-h-0">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-fuchsia-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                <div className="absolute inset-0 rounded-xl border border-white/20" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  AuraCraft <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">AI</span>
                </h1>
                <p className="text-xs text-purple-300/60 font-medium">Social Media Companion</p>
              </div>
            </div>
          </div>

          {/* New Campaign Button */}
          <button
            onClick={() => {
              onNewCampaign();
              if (isOpenMobile) onCloseMobile();
            }}
            className="group relative flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-purple-200 transition-transform group-hover:rotate-90 duration-200" />
            <span>New Content Draft</span>
          </button>

          {/* Navigation Items */}
          <div className="flex flex-col gap-1">
            <span className="px-3 text-[11px] font-semibold text-purple-300/50 uppercase tracking-wider">
              Navigation
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (isOpenMobile) onCloseMobile();
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600/25 text-white border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />}
                </button>
              );
            })}
          </div>

          {/* Recent Generation History */}
          <div className="flex flex-col gap-2 flex-1 min-h-0 pt-2 border-t border-purple-500/10">
            <div className="flex items-center justify-between px-3">
              <span className="text-[11px] font-semibold text-purple-300/50 uppercase tracking-wider">
                Recent Posts ({historyList.length})
              </span>
              <span className="text-[10px] text-purple-400/70 font-mono">Auto-saved</span>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1.5">
              {historyList.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No post drafts yet. Type an idea to begin!
                </div>
              ) : (
                historyList.map((hist) => {
                  const isSelected = selectedHistoryId === hist.id;
                  return (
                    <div
                      key={hist.id}
                      onClick={() => {
                        onSelectHistory(hist.id);
                        if (isOpenMobile) onCloseMobile();
                      }}
                      className={`group relative flex flex-col p-2.5 rounded-xl text-left cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-purple-500/20 border border-purple-400/30 text-white'
                          : 'bg-white/[0.02] border border-white/[0.04] text-slate-300 hover:bg-white/[0.06] hover:border-purple-500/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-xs font-medium text-slate-200 truncate pr-2 group-hover:text-purple-200">
                          {hist.title}
                        </span>
                        <button
                          onClick={(e) => onDeleteHistory(hist.id, e)}
                          title="Delete draft"
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 rounded transition-opacity"
                        >
                          <Trash2 className="w-3 h-3 text-slate-400 hover:text-rose-400" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {hist.snippet}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/[0.04] text-[10px] text-slate-500">
                        <span className="font-mono text-purple-300/70">{hist.timestamp}</span>
                        <span className="text-[10px] text-purple-400/90">{hist.tone}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Bottom Plan / Profile Status widget */}
        <div className="mt-4 pt-3 border-t border-purple-500/10">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-950/40 via-indigo-950/30 to-purple-900/20 border border-purple-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Zap className="w-4 h-4 text-purple-300" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Gemini 3.8 Flash</p>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Fast Latency · Connected
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-400/60" />
          </div>
        </div>
      </aside>
    </>
  );
};
