export type Platform = 'all' | 'linkedin' | 'twitter' | 'instagram';

export interface LinkedInPost {
  hook: string;
  body: string;
  callToAction: string;
  hashtags: string[];
  estimatedReadTime?: string;
}

export interface TwitterPost {
  singleTweet: string;
  thread: string[];
  hashtags: string[];
}

export interface InstagramPost {
  caption: string;
  carouselSlides: string[];
  hashtags: string[];
  visualConceptIdea: string;
}

export interface GenZBuddyInsight {
  vibeCheck: string;
  commentary: string;
  rizzMeter: number;
  viralAngle: string;
  whatHits: string[];
  whatFlops: string[];
}

export interface PlatformSchedule {
  bestDay: string;
  bestTime: string;
  reason: string;
}

export interface SchedulingInsights {
  linkedin: PlatformSchedule;
  twitter: PlatformSchedule;
  instagram: PlatformSchedule;
}

export interface CampaignContent {
  id: string;
  title: string;
  timestamp: string;
  originalPrompt: string;
  attachedImage?: string;
  tone: string;
  linkedin: LinkedInPost;
  twitter: TwitterPost;
  instagram: InstagramPost;
  genZBuddy: GenZBuddyInsight;
  scheduling: SchedulingInsights;
}

export interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  snippet: string;
  tone: string;
}

export type BuddyMode = 'hype' | 'roast' | 'growth-hack';

export interface BuddyChatMessage {
  id: string;
  sender: 'user' | 'buddy';
  text: string;
  timestamp: string;
}

export interface ScheduledPost {
  id: string;
  platform: 'linkedin' | 'twitter' | 'instagram';
  content: string;
  date: string;
  time: string;
  status: 'scheduled' | 'published';
}
