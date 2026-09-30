import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parser with 20MB limit for image attachments
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Initialize GoogleGenAI SDK
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, imageBase64, imageMime, tone = 'engaging', targetAudience = 'professionals & creators', goal = 'engagement' } = req.body;

    if (!prompt && !imageBase64) {
      return res.status(400).json({ error: 'Please provide either a text idea or an image.' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const systemPrompt = `You are an elite, world-class Social Media Content Strategist and viral copywriter, paired with an extremely witty, hype, culturally tapped-in Gen-Z Social Media Director.
Your task is to take the user's raw idea, notes, or uploaded image and transform it into 3 tailored social media packages (LinkedIn, Twitter/X, and Instagram) plus authentic Gen-Z strategic commentary and optimal scheduling timings.

Formatting instructions:
1. LinkedIn Post:
   - Needs a high-converting 1-2 line hook (no generic buzzwords).
   - Clean readable formatting with white space between short paragraphs.
   - Core insights or story arc.
   - Clear Call To Action (question or discussion prompt).
   - 3-5 curated hashtags.
2. Twitter / X:
   - Provide a killer stand-alone Tweet (< 275 characters) with high quote-tweet potential.
   - Also provide a 3-part Thread version: Hook tweet, Value breakdown tweet, and Conclusion/CTA tweet.
   - Curated hashtags (1-3).
3. Instagram:
   - Attention-grabbing caption with bold opening.
   - 4-5 Carousel slide ideas (Slide 1 Hook, Slide 2-4 Value/Story, Slide 5 Save & Share CTA).
   - Aesthetic formatting with line breaks.
   - Smart hashtag group (mixture of niche and broad).
4. Gen-Z Buddy Feedback:
   - vibeCheck: catchy title (e.g. "CEO Vibe With Extra Sauce", "Cookin' With Gas", "Unc Energy Warning")
   - commentary: hilarious, witty, genuine Gen-Z slang & hype (use terms like 'no cap', 'let him cook', 'ate', 'rizz', 'living rent free', 'sheesh', 'main character energy' naturally and smartly).
   - rizzMeter: score from 50 to 99.
   - viralAngle: the single sharpest strategic angle to make this go viral.
   - whatHits: array of 2 strong things about the concept.
   - whatFlops: array of 2 things that could ruin it or cause cringe.
5. Scheduling:
   - Provide recommended best days, time slots (e.g., 'Tuesday 8:30 AM', 'Thursday 1:15 PM'), and algorithmic rationale for LinkedIn, Twitter, and Instagram.`;

    const contentsPayload: any[] = [];

    let userPromptText = `User Raw Idea/Brief:\n"${prompt || 'Create compelling social media posts based on this visual.'}"\n\nTone Preference: ${tone}\nTarget Audience: ${targetAudience}\nPrimary Goal: ${goal}`;

    if (imageBase64 && imageMime) {
      // Clean base64 string if data url prefix is present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');
      contentsPayload.push({
        inlineData: {
          mimeType: imageMime,
          data: cleanBase64,
        },
      });
      userPromptText += `\n\nNote: An image is attached. Analyze the visual elements, mood, and subject matter to weave into the copy.`;
    }

    contentsPayload.push({ text: userPromptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contentsPayload,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topicSummary: { type: Type.STRING, description: 'Short 3-5 word summary of the idea' },
            linkedin: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING },
                body: { type: Type.STRING },
                callToAction: { type: Type.STRING },
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                estimatedReadTime: { type: Type.STRING },
              },
              required: ['hook', 'body', 'callToAction', 'hashtags'],
            },
            twitter: {
              type: Type.OBJECT,
              properties: {
                singleTweet: { type: Type.STRING },
                thread: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '3 sequential thread tweets',
                },
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['singleTweet', 'thread', 'hashtags'],
            },
            instagram: {
              type: Type.OBJECT,
              properties: {
                caption: { type: Type.STRING },
                carouselSlides: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Short text bullets for carousel cards',
                },
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                visualConceptIdea: { type: Type.STRING },
              },
              required: ['caption', 'carouselSlides', 'hashtags', 'visualConceptIdea'],
            },
            genZBuddy: {
              type: Type.OBJECT,
              properties: {
                vibeCheck: { type: Type.STRING },
                commentary: { type: Type.STRING },
                rizzMeter: { type: Type.INTEGER },
                viralAngle: { type: Type.STRING },
                whatHits: { type: Type.ARRAY, items: { type: Type.STRING } },
                whatFlops: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['vibeCheck', 'commentary', 'rizzMeter', 'viralAngle', 'whatHits', 'whatFlops'],
            },
            scheduling: {
              type: Type.OBJECT,
              properties: {
                linkedin: {
                  type: Type.OBJECT,
                  properties: {
                    bestDay: { type: Type.STRING },
                    bestTime: { type: Type.STRING },
                    reason: { type: Type.STRING },
                  },
                  required: ['bestDay', 'bestTime', 'reason'],
                },
                twitter: {
                  type: Type.OBJECT,
                  properties: {
                    bestDay: { type: Type.STRING },
                    bestTime: { type: Type.STRING },
                    reason: { type: Type.STRING },
                  },
                  required: ['bestDay', 'bestTime', 'reason'],
                },
                instagram: {
                  type: Type.OBJECT,
                  properties: {
                    bestDay: { type: Type.STRING },
                    bestTime: { type: Type.STRING },
                    reason: { type: Type.STRING },
                  },
                  required: ['bestDay', 'bestTime', 'reason'],
                },
              },
              required: ['linkedin', 'twitter', 'instagram'],
            },
          },
          required: ['topicSummary', 'linkedin', 'twitter', 'instagram', 'genZBuddy', 'scheduling'],
        },
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('Received empty response from Gemini');
    }

    const parsedData = JSON.parse(textOutput);
    return res.json(parsedData);
  } catch (err: any) {
    console.error('Error in /api/generate:', err);
    return res.status(500).json({ error: err.message || 'Failed to generate content' });
  }
});

// Endpoint for AI post refinement
app.post('/api/refine', async (req: Request, res: Response) => {
  try {
    const { platform, currentContent, instruction, tone } = req.body;

    if (!currentContent || !instruction) {
      return res.status(400).json({ error: 'Missing current content or instruction.' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are refining a ${platform || 'social media'} post.
Current draft:
"""
${currentContent}
"""

User instruction: "${instruction}"
Tone preference: ${tone || 'match existing or improve flow'}

Return refined content in JSON format with:
- "refinedContent": string of the revised post
- "changeSummary": 1-line note of what was altered (e.g. "Sharpened opening hook and shortened by 18%")
- "characterCount": integer count of new characters`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            refinedContent: { type: Type.STRING },
            changeSummary: { type: Type.STRING },
            characterCount: { type: Type.INTEGER },
          },
          required: ['refinedContent', 'changeSummary', 'characterCount'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/refine:', err);
    return res.status(500).json({ error: err.message || 'Failed to refine content' });
  }
});

// Endpoint for Gen-Z Buddy Chat
app.post('/api/buddy-chat', async (req: Request, res: Response) => {
  try {
    const { message, postContext, mode = 'hype' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const modeInstructions =
      mode === 'roast'
        ? 'Roast mode: Be hilariously savage, pointing out cringe, buzzwords, or boomer corporate energy, while still being helpful with a better alternative.'
        : mode === 'growth-hacker'
        ? 'Growth hacker mode: Focus strictly on retention, CTR, click triggers, and algorithmic hacks with Gen-Z speed.'
        : 'Hype mode: Full-on hype beast, validation, slang, high-energy encouragement, and amplifying the idea to 10x.';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are Nova (aka Gen-Z Buddy), an ultra-smart viral social strategist who speaks fluent Gen-Z slang (no cap, ate, rizz, cook, rent free, bet, based, lowkey, highkey).
Current mode: ${modeInstructions}
Active draft context:
${postContext || 'No specific post draft attached yet.'}

User message: "${message}"

Keep response punchy, entertaining, under 120 words, and genuinely actionable!`,
    });

    return res.json({ reply: response.text });
  } catch (err: any) {
    console.error('Error in /api/buddy-chat:', err);
    return res.status(500).json({ error: err.message || 'Buddy chat error' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
