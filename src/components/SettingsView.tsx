import React, { useState } from 'react';
import { Settings, Save, Check, User, Sparkles, Shield, Cpu } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [authorName, setAuthorName] = useState('Kevin Varghees');
  const [twitterHandle, setTwitterHandle] = useState('@kevin_builds');
  const [headline, setHeadline] = useState('Founder & AI Product Strategist · Building high-leverage products');
  const [defaultTone, setDefaultTone] = useState('Viral & Punchy');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-purple-500/25 flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <Settings className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Studio & Persona Settings</h2>
            <p className="text-xs text-purple-300/70">Customize author profile and AI generation defaults</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div>
          <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Author Identity
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Display Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-xs text-white glass-input rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Twitter / X Handle</label>
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                className="w-full px-3 py-2 text-xs text-white glass-input rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">LinkedIn Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs text-white glass-input rounded-xl focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-purple-500/15">
          <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> AI Model Engine
          </h3>
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Google Gemini 3.8 Flash</p>
              <p className="text-[11px] text-purple-300/70">
                Ultra-low latency, multimodal understanding, structured reasoning
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Preferences Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-purple-200" />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
