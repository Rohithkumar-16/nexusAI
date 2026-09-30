import jsPDF from 'jspdf';
import { CampaignContent } from '../types';

export function exportCampaignToPdf(campaign: CampaignContent): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }
  };

  // Modern Dark Header banner
  doc.setFillColor(15, 11, 28);
  doc.rect(0, 0, pageWidth, 75, 'F');

  // Purple accent line
  doc.setFillColor(168, 85, 247);
  doc.rect(0, 72, pageWidth, 3, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('AURACRAFT AI — SOCIAL CAMPAIGN BLUEPRINT', margin, 42);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(192, 132, 252);
  doc.text(`Generated on ${new Date().toLocaleDateString()} | Multi-Platform Package`, margin, 58);

  cursorY = 100;

  // Title & Brief section
  doc.setTextColor(20, 20, 25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(campaign.title, margin, cursorY);
  cursorY += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  const briefText = `Original Idea: "${campaign.originalPrompt}"`;
  const splitBrief = doc.splitTextToSize(briefText, contentWidth);
  doc.text(splitBrief, margin, cursorY);
  cursorY += splitBrief.length * 13 + 12;

  // Helper for rendering section header
  const renderSectionHeader = (title: string, badge: string) => {
    checkPageBreak(45);
    doc.setFillColor(243, 232, 255);
    doc.roundedRect(margin, cursorY, contentWidth, 24, 4, 4, 'F');

    doc.setTextColor(126, 34, 206);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(title.toUpperCase(), margin + 12, cursorY + 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(107, 33, 168);
    doc.text(badge, pageWidth - margin - 12 - doc.getTextWidth(badge), cursorY + 16);

    cursorY += 34;
  };

  // 1. LINKEDIN SECTION
  renderSectionHeader('1. LinkedIn Post Draft', 'Professional & Thought Leadership');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Opening Hook:', margin, cursorY);
  cursorY += 14;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  const splitHook = doc.splitTextToSize(campaign.linkedin.hook, contentWidth);
  checkPageBreak(splitHook.length * 13);
  doc.text(splitHook, margin, cursorY);
  cursorY += splitHook.length * 13 + 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Core Narrative:', margin, cursorY);
  cursorY += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const splitBody = doc.splitTextToSize(campaign.linkedin.body, contentWidth);
  checkPageBreak(splitBody.length * 13);
  doc.text(splitBody, margin, cursorY);
  cursorY += splitBody.length * 13 + 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Call to Action & Hashtags:', margin, cursorY);
  cursorY += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const ctaAndTags = `${campaign.linkedin.callToAction}\n\n${campaign.linkedin.hashtags.join(' ')}`;
  const splitCta = doc.splitTextToSize(ctaAndTags, contentWidth);
  checkPageBreak(splitCta.length * 13);
  doc.text(splitCta, margin, cursorY);
  cursorY += splitCta.length * 13 + 24;

  // 2. TWITTER / X SECTION
  renderSectionHeader('2. Twitter / X Package', 'High-Velocity & Quotes');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Single Punchy Tweet:', margin, cursorY);
  cursorY += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const splitSingleTweet = doc.splitTextToSize(campaign.twitter.singleTweet, contentWidth);
  checkPageBreak(splitSingleTweet.length * 13);
  doc.text(splitSingleTweet, margin, cursorY);
  cursorY += splitSingleTweet.length * 13 + 12;

  if (campaign.twitter.thread && campaign.twitter.thread.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('3-Part Viral Thread Sequence:', margin, cursorY);
    cursorY += 14;

    campaign.twitter.thread.forEach((tweet, i) => {
      checkPageBreak(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(126, 34, 206);
      doc.text(`[Tweet ${i + 1}]`, margin, cursorY);
      cursorY += 12;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      const splitTweet = doc.splitTextToSize(tweet, contentWidth);
      checkPageBreak(splitTweet.length * 12);
      doc.text(splitTweet, margin, cursorY);
      cursorY += splitTweet.length * 12 + 10;
    });
  }
  cursorY += 14;

  // 3. INSTAGRAM SECTION
  renderSectionHeader('3. Instagram Carousel & Caption', 'Visual Engagement & Saves');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Post Caption:', margin, cursorY);
  cursorY += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const splitIgCaption = doc.splitTextToSize(`${campaign.instagram.caption}\n\n${campaign.instagram.hashtags.join(' ')}`, contentWidth);
  checkPageBreak(splitIgCaption.length * 12);
  doc.text(splitIgCaption, margin, cursorY);
  cursorY += splitIgCaption.length * 12 + 12;

  if (campaign.instagram.carouselSlides && campaign.instagram.carouselSlides.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Carousel Slide Plan:', margin, cursorY);
    cursorY += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    campaign.instagram.carouselSlides.forEach((slide) => {
      const splitSlide = doc.splitTextToSize(`• ${slide}`, contentWidth);
      checkPageBreak(splitSlide.length * 12);
      doc.text(splitSlide, margin, cursorY);
      cursorY += splitSlide.length * 12 + 4;
    });
  }
  cursorY += 20;

  // 4. GEN-Z BUDDY & SCHEDULING
  renderSectionHeader('4. Gen-Z Strategic Insights & Best Times', `Rizz Meter: ${campaign.genZBuddy.rizzMeter}/100`);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Vibe Check: ${campaign.genZBuddy.vibeCheck}`, margin, cursorY);
  cursorY += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const splitGzComment = doc.splitTextToSize(`Feedback: "${campaign.genZBuddy.commentary}"`, contentWidth);
  checkPageBreak(splitGzComment.length * 12);
  doc.text(splitGzComment, margin, cursorY);
  cursorY += splitGzComment.length * 12 + 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(`Optimal Post Schedule:`, margin, cursorY);
  cursorY += 13;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const schedText = `• LinkedIn: ${campaign.scheduling.linkedin.bestDay} at ${campaign.scheduling.linkedin.bestTime}\n• Twitter/X: ${campaign.scheduling.twitter.bestDay} at ${campaign.scheduling.twitter.bestTime}\n• Instagram: ${campaign.scheduling.instagram.bestDay} at ${campaign.scheduling.instagram.bestTime}`;
  const splitSched = doc.splitTextToSize(schedText, contentWidth);
  checkPageBreak(splitSched.length * 12);
  doc.text(splitSched, margin, cursorY);

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`AuraCraft AI — Page ${p} of ${totalPages}`, pageWidth / 2 - 35, pageHeight - 15);
  }

  // Trigger download
  const cleanTitle = campaign.title.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30);
  doc.save(`${cleanTitle}_social_blueprint.pdf`);
}
