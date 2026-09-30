import React, { useState } from 'react';
import { 
  Sparkles, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Layers, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { InputPanel } from './components/InputPanel';
import { LinkedInCard } from './components/PlatformCards/LinkedInCard';
import { TwitterCard } from './components/PlatformCards/TwitterCard';
import { InstagramCard } from './components/PlatformCards/InstagramCard';
import { GenZBuddyCard } from './components/RightSidebar/GenZBuddyCard';
import { SchedulingCard } from './components/RightSidebar/SchedulingCard';
import { ExportCard } from './components/RightSidebar/ExportCard';
import { ScheduleModal } from './components/ScheduleModal';
import { VaultView } from './components/VaultView';
import { ArchivesView } from './components/ArchivesView';
import { SettingsView } from './components/SettingsView';
import { 
  CampaignContent, 
  HistoryItem, 
  Platform, 
  LinkedInPost, 
  TwitterPost, 
  InstagramPost, 
  ScheduledPost 
} from './types';
import { INITIAL_CAMPAIGN, SAMPLE_HISTORIES } from './utils/sampleData';

export default function App() {
  const [currentCampaign, setCurrentCampaign] = useState<CampaignContent>(INITIAL_CAMPAIGN);
  const [historyList, setHistoryList] = useState<HistoryItem[]>(SAMPLE_HISTORIES);
  const [allCampaigns, setAllCampaigns] = useState<Record<string, CampaignContent>>({
    [INITIAL_CAMPAIGN.id]: INITIAL_CAMPAIGN,
  });

  const [activeTab, setActiveTab] = useState<string>('studio');
  const [platformFilter, setPlatformFilter] = useState<Platform>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Loading & Generation States
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [statusToast, setStatusToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Scheduling States
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTarget, setScheduleTarget] = useState<{
    platform: 'linkedin' | 'twitter' | 'instagram';
    content: string;
  }>({ platform: 'linkedin', content: '' });
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: 'sched-1',
      platform: 'linkedin',
      content: INITIAL_CAMPAIGN.linkedin.hook,
      date: 'Tomorrow',
      time: '08:30 AM',
      status: 'scheduled',
    },
    {
      id: 'sched-2',
      platform: 'twitter',
      content: INITIAL_CAMPAIGN.twitter.singleTweet,
      date: 'Thursday',
      time: '12:45 PM',
      status: 'scheduled',
    },
  ]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setStatusToast({ message, type });
    setTimeout(() => {
      setStatusToast(null);
    }, 3000);
  };

  // Generate new Campaign via Gemini API
  const handleGenerate = async (data: {
    prompt: string;
    imageBase64?: string;
    imageMime?: string;
    tone: string;
    targetAudience: string;
    goal: string;
  }) => {
    setIsLoading(true);
    setLoadingStepText('Analyzing idea with Gemini 3.8 Flash...');

    const stepTimer1 = setTimeout(() => {
      setLoadingStepText('Drafting tailored hooks for LinkedIn & X...');
    }, 1200);

    const stepTimer2 = setTimeout(() => {
      setLoadingStepText('Formulating carousel slides & Gen-Z vibe check...');
    }, 2400);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      const generated = await response.json();
      const newId = `campaign-${Date.now()}`;
      const newTitle = generated.topicSummary || (data.prompt ? data.prompt.slice(0, 36) + '...' : 'Visual Post Campaign');

      const newCampaign: CampaignContent = {
        id: newId,
        title: newTitle,
        timestamp: 'Just now',
        originalPrompt: data.prompt,
        attachedImage: data.imageBase64,
        tone: data.tone,
        linkedin: generated.linkedin,
        twitter: generated.twitter,
        instagram: generated.instagram,
        genZBuddy: generated.genZBuddy,
        scheduling: generated.scheduling,
      };

      setCurrentCampaign(newCampaign);
      setAllCampaigns((prev) => ({ ...prev, [newId]: newCampaign }));

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: newId,
        title: newTitle,
        timestamp: 'Just now',
        snippet: generated.linkedin.hook.slice(0, 75) + '...',
        tone: data.tone,
      };
      setHistoryList((prev) => [newHistoryItem, ...prev]);

      setActiveTab('studio');
      showToast('🎉 Multi-platform content package generated successfully!');
    } catch (err: any) {
      console.error('Generation failed:', err);
      showToast(err.message || 'Generation failed. Please try again.', 'error');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsLoading(false);
      setLoadingStepText('');
    }
  };

  // AI Refine a specific platform draft
  const handleRequestRefine = async (
    platform: 'linkedin' | 'twitter' | 'instagram',
    currentContent: string,
    instruction: string
  ) => {
    setIsRefining(true);
    showToast(`Refining ${platform} post with AI...`, 'info');

    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          currentContent,
          instruction,
          tone: currentCampaign.tone,
        }),
      });

      if (!res.ok) {
        throw new Error('Refinement request failed');
      }

      const data = await res.json();
      const refinedText = data.refinedContent;

      if (platform === 'linkedin') {
        const paragraphs = refinedText.split('\n\n').filter(Boolean);
        const hook = paragraphs[0] || refinedText;
        const cta = paragraphs.length > 1 ? paragraphs[paragraphs.length - 1] : '';
        const body = paragraphs.slice(1, -1).join('\n\n') || paragraphs.slice(1).join('\n\n');

        setCurrentCampaign((prev) => ({
          ...prev,
          linkedin: {
            ...prev.linkedin,
            hook,
            body: body || hook,
            callToAction: cta || prev.linkedin.callToAction,
          },
        }));
      } else if (platform === 'twitter') {
        setCurrentCampaign((prev) => ({
          ...prev,
          twitter: {
            ...prev.twitter,
            singleTweet: refinedText,
          },
        }));
      } else if (platform === 'instagram') {
        setCurrentCampaign((prev) => ({
          ...prev,
          instagram: {
            ...prev.instagram,
            caption: refinedText,
          },
        }));
      }

      showToast(`✨ Refined! ${data.changeSummary || 'Updated post text'}`);
    } catch (err) {
      console.error(err);
      showToast('Could not refine draft. Please try again.', 'error');
    } finally {
      setIsRefining(false);
    }
  };

  // Switch to an archived campaign
  const handleSelectHistory = (id: string) => {
    const found = allCampaigns[id];
    if (found) {
      setCurrentCampaign(found);
      setActiveTab('studio');
      showToast(`Loaded "${found.title}"`);
    }
  };

  // Delete history item
  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
    showToast('Draft removed from archives');
  };

  // Quick Open Scheduler for a card
  const handleScheduleFromCard = (platform: 'linkedin' | 'twitter' | 'instagram', content: string) => {
    setScheduleTarget({ platform, content });
    setIsScheduleOpen(true);
  };

  return (
    <div className="relative flex min-h-screen bg-[#0B0814] text-slate-100 overflow-x-hidden">
      {/* Background Cosmic / Glass Ambient Orbs matching reference image */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-700/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-10 w-[400px] h-[400px] bg-fuchsia-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Left Glassmorphism Sidebar */}
      <Sidebar
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        historyList={historyList}
        selectedHistoryId={currentCampaign.id}
        onSelectHistory={handleSelectHistory}
        onDeleteHistory={handleDeleteHistory}
        onNewCampaign={() => {
          setActiveTab('studio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickPreset={(preset) => {
            setActiveTab('vault');
          }}
        />

        {/* Global Toast Alert */}
        {statusToast && (
          <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-panel-elevated border border-purple-400/40 text-xs font-semibold text-white shadow-2xl">
              {statusToast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {statusToast.type === 'info' && <Sparkles className="w-4 h-4 text-purple-400" />}
              {statusToast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
              <span>{statusToast.message}</span>
            </div>
          </div>
        )}

        {/* Dynamic Main Workspace depending on activeTab */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'vault' && (
            <VaultView
              onSelectTemplate={(prompt) => {
                setActiveTab('studio');
                showToast('Template formula applied! Customize and click Generate.');
              }}
            />
          )}

          {activeTab === 'history' && (
            <ArchivesView
              historyList={historyList}
              onSelectHistory={handleSelectHistory}
              onDeleteHistory={handleDeleteHistory}
            />
          )}

          {activeTab === 'schedule' && (
            <div className="glass-panel rounded-2xl p-6 border border-purple-500/25 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Social Media Schedule Queue
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {scheduledPosts.length} Queued
                    </span>
                  </h2>
                  <p className="text-xs text-purple-300/70">
                    Auto-scheduled posts queued across LinkedIn, Twitter/X, and Instagram
                  </p>
                </div>
                <button
                  onClick={() => {
                    setScheduleTarget({ platform: 'linkedin', content: currentCampaign.linkedin.hook });
                    setIsScheduleOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-sm"
                >
                  + Add Post
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl glass-card-interactive border border-purple-500/15 flex flex-col justify-between gap-3 text-left"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white capitalize flex items-center gap-1.5">
                          {post.platform === 'linkedin' && <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />}
                          {post.platform === 'twitter' && <Twitter className="w-3.5 h-3.5 text-slate-200" />}
                          {post.platform === 'instagram' && <Instagram className="w-3.5 h-3.5 text-rose-400" />}
                          {post.platform}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-purple-300 font-mono">
                          <Clock className="w-3 h-3 text-purple-400" />
                          <span>{post.date} · {post.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[11px]">
                      <span className="text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Ready to dispatch
                      </span>
                      <button
                        onClick={() => setScheduledPosts((prev) => prev.filter((p) => p.id !== post.id))}
                        className="text-slate-500 hover:text-rose-400 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && <SettingsView />}

          {/* STUDIO VIEW (Main Default) */}
          {activeTab === 'studio' && (
            <div className="flex flex-col gap-6">
              {/* Top Prompt Composer Card */}
              <InputPanel
                onGenerate={handleGenerate}
                isLoading={isLoading}
                loadingStepText={loadingStepText}
              />

              {/* Platform Selector Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1 p-1 rounded-xl glass-panel border border-purple-500/20 bg-[#0E0A1E]/60 text-xs font-semibold">
                  <button
                    onClick={() => setPlatformFilter('all')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      platformFilter === 'all'
                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>All Platforms</span>
                  </button>

                  <button
                    onClick={() => setPlatformFilter('linkedin')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      platformFilter === 'linkedin'
                        ? 'bg-[#0077B5] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn</span>
                  </button>

                  <button
                    onClick={() => setPlatformFilter('twitter')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      platformFilter === 'twitter'
                        ? 'bg-black text-white border border-purple-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Twitter className="w-3.5 h-3.5 text-slate-200" />
                    <span>Twitter / X</span>
                  </button>

                  <button
                    onClick={() => setPlatformFilter('instagram')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      platformFilter === 'instagram'
                        ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Instagram className="w-3.5 h-3.5 text-rose-400" />
                    <span>Instagram</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-purple-300/80 font-mono">
                  <span>Current Campaign: </span>
                  <span className="font-semibold text-white truncate max-w-xs">{currentCampaign.title}</span>
                </div>
              </div>

              {/* 2-Column Responsive Layout: Left Main Drafts, Right Utilities & Gen-Z Buddy */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Main Generated Content Previews (7-8 columns on xl) */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                  {/* LinkedIn Card */}
                  {(platformFilter === 'all' || platformFilter === 'linkedin') && (
                    <LinkedInCard
                      post={currentCampaign.linkedin}
                      onUpdatePost={(updated) =>
                        setCurrentCampaign((prev) => ({ ...prev, linkedin: updated }))
                      }
                      onRequestRefine={handleRequestRefine}
                      onSchedule={handleScheduleFromCard}
                      isRefining={isRefining}
                    />
                  )}

                  {/* Twitter / X Card */}
                  {(platformFilter === 'all' || platformFilter === 'twitter') && (
                    <TwitterCard
                      post={currentCampaign.twitter}
                      onUpdatePost={(updated) =>
                        setCurrentCampaign((prev) => ({ ...prev, twitter: updated }))
                      }
                      onRequestRefine={handleRequestRefine}
                      onSchedule={handleScheduleFromCard}
                      isRefining={isRefining}
                    />
                  )}

                  {/* Instagram Card */}
                  {(platformFilter === 'all' || platformFilter === 'instagram') && (
                    <InstagramCard
                      post={currentCampaign.instagram}
                      attachedImage={currentCampaign.attachedImage}
                      onUpdatePost={(updated) =>
                        setCurrentCampaign((prev) => ({ ...prev, instagram: updated }))
                      }
                      onRequestRefine={handleRequestRefine}
                      onSchedule={handleScheduleFromCard}
                      isRefining={isRefining}
                    />
                  )}
                </div>

                {/* Right Utility & Insights Sidebar (4 columns on xl) */}
                <div className="xl:col-span-4 flex flex-col gap-6 sticky top-20">
                  {/* Gen-Z Buddy & Witty Insights Widget */}
                  <GenZBuddyCard
                    insight={currentCampaign.genZBuddy}
                    currentPostContext={currentCampaign.linkedin.hook}
                  />

                  {/* Best Post Times & Scheduling Insights */}
                  <SchedulingCard
                    scheduling={currentCampaign.scheduling}
                    onOpenScheduler={() => {
                      setScheduleTarget({
                        platform: 'linkedin',
                        content: currentCampaign.linkedin.hook,
                      });
                      setIsScheduleOpen(true);
                    }}
                  />

                  {/* Export & Sharing Options Card */}
                  <ExportCard campaign={currentCampaign} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Schedule Calendar Picker Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        defaultPlatform={scheduleTarget.platform}
        defaultContent={scheduleTarget.content}
        scheduledList={scheduledPosts}
        onAddScheduled={(newPost) => {
          setScheduledPosts((prev) => [newPost, ...prev]);
          showToast(`Scheduled for ${newPost.date} at ${newPost.time}!`);
        }}
        onRemoveScheduled={(id) => {
          setScheduledPosts((prev) => prev.filter((p) => p.id !== id));
          showToast('Removed from queue');
        }}
      />
    </div>
  );
}
