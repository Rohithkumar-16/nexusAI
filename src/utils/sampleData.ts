import { CampaignContent } from '../types';

export const INITIAL_CAMPAIGN: CampaignContent = {
  id: 'campaign-launch-01',
  title: 'Shipping Fast & The AI Creator Economy',
  timestamp: 'Just now',
  originalPrompt: 'We just launched our new AI workspace that transforms raw thoughts into high-converting posts for LinkedIn, Twitter, and Instagram in 5 seconds. Why speed matters more than perfection for solopreneurs in 2026.',
  tone: 'Viral & Punchy',
  linkedin: {
    hook: 'Perfectionism is just procrastination disguised as high standards.\n\nIn 2026, the creators winning aren\'t working 80 hours a week. They are shipping in public before they feel ready.',
    body: 'Over the last 6 months, I noticed a brutal pattern:\n\n• The builder who polishes their deck for 3 months gets 0 users.\n• The creator who drops raw, authentic daily iterations builds a $20k MRR audience in 60 days.\n\nHere are 3 rules we used to cut our content cycle from 4 hours to 5 minutes:\n\n1. Capture thoughts in the moment (never let an insight expire in notes).\n2. Format natively for each platform\'s psychology.\n3. Let data test the hook, not your ego.',
    callToAction: 'What is one project you’ve been holding back from publishing this week? Drop it below and let’s get it launched.',
    hashtags: ['#BuildInPublic', '#Solopreneur', '#Creators', '#Productivity', '#Founders'],
    estimatedReadTime: '1 min read',
  },
  twitter: {
    singleTweet: 'Most people spend 4 hours writing a post nobody reads.\n\nTop 1% creators spend 4 minutes with smart AI workflows, test 3 hooks, and let the algorithm do the heavy lifting.\n\nSpeed > Perfection in 2026. Stop overthinking, start shipping. ⚡',
    thread: [
      '1/4 The dirty secret of social growth in 2026:\n\nYou don’t need more inspiration.\nYou need lower friction between having a thought and hitting publish.\n\nHere’s the 5-minute system that scaled our reach 10x 🧵👇',
      '2/4 Rule 1: The "Raw Voice" capture.\nNever open an empty editor. Speak or jot raw bullet points while the energy is fresh. AI handles syntax, formatting, and hashtag clustering. You provide the conviction.',
      '3/4 Rule 2: Multi-Platform Translation.\nA LinkedIn post needs spacing & executive reflection. Twitter needs ruthless conciseness and punchy cadence. Instagram needs visual slides with strong retention.',
      '4/4 The takeaway:\nYour audience doesn’t want polished PR. They want your real-time learnings.\n\nIf you learned something today, drop it in the replies. Let’s cook. 🚀',
    ],
    hashtags: ['#buildinpublic', '#tech', '#growth'],
  },
  instagram: {
    caption: 'Stop waiting for the "perfect time" to post. The algorithm favors momentum, not overthinking. 🔥\n\nSwipe through for the 4-step framework we use to turn messy brain dumps into viral carousels in under 3 minutes. 📲 Save this for your next content batching day!',
    carouselSlides: [
      'Slide 1: Why 90% of Creators Give Up in Month 2 (And how to avoid it)',
      'Slide 2: The "Brain Dump" Method: Speaking your raw thoughts into AI',
      'Slide 3: Transforming 1 core idea into LinkedIn, X, and IG carousels instantly',
      'Slide 4: The 24-Hour Feedback Loop: Let real engagement refine your message',
      'Slide 5: Save this post & tag a builder who needs to ship their project today! 📌',
    ],
    hashtags: ['#contentcreator', '#creatoreconomy', '#digitalmarketing', '#socialmediatips', '#founderjourney', '#reelsviral', '#productivityhacks'],
    visualConceptIdea: 'Clean dark neon gradient carousel with sleek purple glass cards, bold white sans-serif typography, and micro-animations.',
  },
  genZBuddy: {
    vibeCheck: 'Unapologetic Main Character Energy 💅',
    commentary: 'Sheesh, you cooked with this one! No cap, the LinkedIn hook is giving elite executive rizz while the Twitter thread actually has zero corporate fluff. The "perfection is procrastination" line is gonna hit right in the feels for all the overthinking solopreneurs.',
    rizzMeter: 94,
    viralAngle: 'Contrarian stance against perfectionism. Everyone has draft anxiety, so calling it out instantly triggers quote-tweets and bookmark saves.',
    whatHits: [
      'Relatable pain point: 4 hours on notes vs 4 minutes with AI workflows.',
      'Numbered digestible breakdown with high scannability.',
    ],
    whatFlops: [
      'Make sure not to sound like a 2021 crypto bro—keep the tone grounded in real productivity.',
      'Avoid cliché hashtags like #SuccessMindset; keep them targeted to #BuildInPublic.',
    ],
  },
  scheduling: {
    linkedin: {
      bestDay: 'Tuesday & Thursday',
      bestTime: '08:15 AM - 09:30 AM',
      reason: 'Peak commute & morning coffee reading window when B2B decision-makers scroll their feeds for inspiration.',
    },
    twitter: {
      bestDay: 'Wednesday & Friday',
      bestTime: '12:30 PM - 02:00 PM',
      reason: 'Mid-day lunch break spikes highest quote-tweet velocity and active tech/builder discussions.',
    },
    instagram: {
      bestDay: 'Sunday & Monday',
      bestTime: '06:45 PM - 08:30 PM',
      reason: 'Evening wind-down hours maximize save rates on educational carousel content.',
    },
  },
};

export const SAMPLE_HISTORIES = [
  {
    id: 'campaign-launch-01',
    title: 'Shipping Fast & The AI Creator Economy',
    timestamp: 'Today, 2:30 PM',
    snippet: 'Perfectionism is just procrastination disguised as high standards...',
    tone: 'Viral & Punchy',
  },
  {
    id: 'hist-02',
    title: 'Productivity Tech Stack for 2026',
    timestamp: 'Yesterday',
    snippet: '5 tools that save 15 hours every single week for solo founders...',
    tone: 'Thought Leader',
  },
  {
    id: 'hist-03',
    title: 'Behind the Scenes of our UI Redesign',
    timestamp: '3 days ago',
    snippet: 'Why we transitioned to glassmorphism dark mode and 60fps animations...',
    tone: 'Storyteller',
  },
];
