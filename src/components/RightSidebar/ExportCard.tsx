import React, { useState } from 'react';
import { 
  FileDown, 
  Share2, 
  FileText, 
  MessageSquare, 
  Check, 
  Copy, 
  Download,
  FileCode
} from 'lucide-react';
import { CampaignContent } from '../../types';
import { exportCampaignToPdf } from '../../utils/pdfExport';

interface ExportCardProps {
  campaign: CampaignContent;
}

export const ExportCard: React.FC<ExportCardProps> = ({ campaign }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getFullMarkdown = () => {
    return `# ${campaign.title}
Generated: ${campaign.timestamp}
Tone: ${campaign.tone}
Original Idea: ${campaign.originalPrompt}

=========================================
1. LINKEDIN POST
=========================================
${campaign.linkedin.hook}

${campaign.linkedin.body}

${campaign.linkedin.callToAction}

${campaign.linkedin.hashtags.join(' ')}

=========================================
2. TWITTER / X
=========================================
[Single Tweet]
${campaign.twitter.singleTweet}

[Thread Sequence]
${campaign.twitter.thread.map((t, i) => `${i + 1}/ ${t}`).join('\n\n')}

Hashtags: ${campaign.twitter.hashtags.join(' ')}

=========================================
3. INSTAGRAM CAROUSEL & CAPTION
=========================================
${campaign.instagram.caption}

Carousel Slides:
${campaign.instagram.carouselSlides.map((s, i) => `Slide ${i + 1}: ${s}`).join('\n')}

Hashtags: ${campaign.instagram.hashtags.join(' ')}

=========================================
4. GEN-Z BUDDY FEEDBACK
=========================================
Vibe: ${campaign.genZBuddy.vibeCheck}
Rizz Meter: ${campaign.genZBuddy.rizzMeter}/100
Commentary: "${campaign.genZBuddy.commentary}"
Viral Angle: ${campaign.genZBuddy.viralAngle}
`;
  };

  const handleDownloadPdf = () => {
    setIsExportingPdf(true);
    setErrorMessage(null);
    try {
      exportCampaignToPdf(campaign);
    } catch (err: any) {
      console.error('PDF export failed:', err);
      setErrorMessage('Could not generate PDF. Please try Markdown or JSON export.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const content = getFullMarkdown();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${campaign.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_social_drafts.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(campaign, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${campaign.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_package.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(getFullMarkdown());
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const waText = `🚀 *Social Media Campaign Draft:* "${campaign.title}"\n\n*LinkedIn Hook:*\n${campaign.linkedin.hook}\n\n*Twitter Hook:*\n${campaign.twitter.singleTweet}\n\n*IG Caption:*\n${campaign.instagram.caption.substring(0, 150)}...`;
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;

  return (
    <div className="glass-panel rounded-2xl border border-purple-500/25 p-5 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/15 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <Download className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Export & Multi-Share</h3>
            <p className="text-[11px] text-purple-300/70">Deliverables ready for publishing</p>
          </div>
        </div>
      </div>

      {/* Primary PDF Export Button */}
      <button
        onClick={handleDownloadPdf}
        disabled={isExportingPdf}
        className="group relative flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_25px_rgba(168,85,247,0.55)] transition-all active:scale-[0.98]"
      >
        <FileDown className="w-4 h-4 text-purple-200 group-hover:translate-y-0.5 transition-transform" />
        <span>{isExportingPdf ? 'Building PDF...' : 'Download Formatted PDF Blueprint'}</span>
      </button>

      {/* Secondary Quick Export Options */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          onClick={handleDownloadMarkdown}
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-all"
        >
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>Markdown (.md)</span>
        </button>

        <button
          onClick={handleDownloadJson}
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-all"
        >
          <FileCode className="w-3.5 h-3.5 text-purple-400" />
          <span>Raw JSON</span>
        </button>
      </div>

      {errorMessage && (
        <p className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/30">
          {errorMessage}
        </p>
      )}

      {/* Share Triggers */}
      <div className="flex flex-col gap-2 pt-1 border-t border-purple-500/10">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-emerald-700/50 hover:bg-emerald-600/70 border border-emerald-500/30 transition-all shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
          <span>Share Drafts to WhatsApp</span>
        </a>

        <button
          onClick={handleCopyAll}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs font-medium text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all"
        >
          {copiedAll ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">All Platforms Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-purple-300" />
              <span>Copy Entire Campaign Text</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
