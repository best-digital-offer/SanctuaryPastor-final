import { GoogleGenAI } from '@google/genai';

interface GeneratePrayerParams {
  request: string;
  topic?: string;
  recipientName?: string;
  relationship?: string;
  language?: string;
  userName?: string;
}

export async function generatePastoralPrayerWithRollup(params: GeneratePrayerParams): Promise<{
  title: string;
  prayerText: string;
  scriptureReference: string;
  scriptureText: string;
  detectedTopic: string;
}> {
  const { request, topic, recipientName, relationship, language = 'en', userName } = params;

  const systemInstruction = `You are Sanctuary Pastor, a loving, empathetic, theologically sound Christian pastor. When a believer shares their burden, petition, or prayer request, provide a deeply comforting, personal pastoral prayer and an appropriate scripture passage from the Holy Bible.
You must return your response STRICTLY as a JSON object with the following keys:
{
  "title": "A concise, uplifting prayer title (e.g., 'Prayer for Healing & Peace')",
  "prayerText": "A heartfelt, reverent prayer (130-220 words) written with warmth, compassion, and biblical truth, addressing God the Father, interceding for the named individual if provided, and closing reverently in the holy name of Jesus Christ, Amen.",
  "scriptureReference": "The exact Biblical book, chapter, and verse (e.g., 'Philippians 4:6-7')",
  "scriptureText": "The full verse text from the Bible (NIV or ESV)",
  "detectedTopic": "One of: Healing, Peace & Anxiety, Job & Career, Family, Grief & Loss, Guidance, Praise & Thanksgiving, Faith, or General"
}
Important: Never mention any AI brand, technology, machine learning, or company name. Speak exclusively as a faithful pastoral companion in Christ.`;

  const userContent = `Prayer Request: "${request}"
${recipientName ? `Interceding for: ${recipientName}${relationship ? ` (${relationship})` : ''}` : ''}
${userName ? `Believer's name: ${userName}` : ''}
${topic ? `Topic: ${topic}` : ''}
${language !== 'en' ? `Language: ${language}` : ''}`;

  // Strategy 1: High-Speed Primary / Rollup via Groq API if available
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey && groqApiKey !== 'MY_GROQ_API_KEY' && !groqApiKey.includes('your_groq')) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userContent },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }),
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          if (parsed.prayerText && parsed.scriptureReference) {
            return {
              title: parsed.title || (recipientName ? `Prayer for ${recipientName}` : `Prayer for ${topic || 'Peace'}`),
              prayerText: parsed.prayerText,
              scriptureReference: parsed.scriptureReference,
              scriptureText: parsed.scriptureText || '',
              detectedTopic: parsed.detectedTopic || topic || 'General',
            };
          }
        }
      }
    } catch (groqErr) {
      console.warn('Groq provider rollover initiated');
    }
  }

  // Strategy 2: Automatic Rollup via Gemini API if available
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (geminiApiKey && geminiApiKey !== 'MY_GEMINI_API_KEY' && !geminiApiKey.includes('your_gemini')) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      const geminiRes = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemInstruction}\n\n${userContent}`,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = geminiRes.text;
      if (text) {
        const parsed = JSON.parse(text);
        if (parsed.prayerText && parsed.scriptureReference) {
          return {
            title: parsed.title || (recipientName ? `Prayer for ${recipientName}` : `Prayer for ${topic || 'Peace'}`),
            prayerText: parsed.prayerText,
            scriptureReference: parsed.scriptureReference,
            scriptureText: parsed.scriptureText || '',
            detectedTopic: parsed.detectedTopic || topic || 'General',
          };
        }
      }
    } catch (geminiErr) {
      console.warn('Gemini provider rollover initiated');
    }
  }

  // Strategy 3: Pastoral Fallback Engine (Guaranteed comfort, no network failure)
  const lower = request.toLowerCase();
  if (recipientName) {
    return {
      title: `Prayer for ${recipientName}`,
      prayerText: `Heavenly Father, Almighty Lord of Grace, we lift up ${recipientName} to Your unfailing presence today. You know ${relationship ? `their bond as a beloved ${relationship.toLowerCase()} and ` : ''}every burden carried in their heart. Send forth Your angels of peace to surround ${recipientName}. Where there is weariness, breathe divine refreshment. Where there is uncertainty, make straight their path. Pour Your deep comforting love over them and remind them that they are never forsaken. We commit them wholly into Your sovereign hands. In the precious and holy name of Jesus Christ, Amen.`,
      scriptureReference: 'Numbers 6:24-26',
      scriptureText: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.',
      detectedTopic: 'Pray For Someone',
    };
  } else if (lower.includes('health') || lower.includes('sick') || lower.includes('pain') || lower.includes('heal')) {
    return {
      title: 'Prayer for Healing & Restoration',
      prayerText: `Merciful Father, Divine Healer and Sustainer of Life, we come quietly before Your throne of grace. Lord, You see the fragility of human flesh, and You hear the tender cries of our hearts. We ask that Your restoring hand touch every area of infirmity. Dispel distress and replace it with supernatural peace that calms every storm. May the presence of the Holy Spirit bring comfort to the body, clarity to the mind, and unwavering faith to the soul. We rest in Your mercy and love. In Jesus' mighty name, Amen.`,
      scriptureReference: 'Jeremiah 17:14',
      scriptureText: 'Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.',
      detectedTopic: 'Healing',
    };
  } else if (lower.includes('peace') || lower.includes('anxiety') || lower.includes('worried') || lower.includes('fear') || lower.includes('stress')) {
    return {
      title: 'Prayer for Peace & Calming the Mind',
      prayerText: `Father in Heaven, Prince of Peace, we quiet our racing thoughts before You right now. In a world full of noise, hurry, and fear, You whisper that we are safe in Your care. Cast out all anxiety and quiet every restless spirit. Help us take every anxious thought captive and lay it at the foot of the cross. Let Your peace, which surpasses all earthly comprehension, guard this heart and mind today and forevermore. In Jesus' peaceful name, Amen.`,
      scriptureReference: 'John 14:27',
      scriptureText: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
      detectedTopic: 'Peace & Anxiety',
    };
  } else {
    return {
      title: topic ? `Prayer for ${topic}` : 'Pastoral Prayer of Faith',
      prayerText: `Gracious Lord God, You know every detail of what is carried on this heart today. Nothing is hidden from Your sight, and nothing is too small for Your compassionate ear. We lay this petition before You with honest humility and trust. Remind us that You walk beside us through every valley and rejoice over us with singing. Grant patience, spiritual clarity, and renewed courage for the road ahead. May Your will be done in goodness and mercy. In the holy name of Jesus Christ, Amen.`,
      scriptureReference: 'Romans 8:28',
      scriptureText: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
      detectedTopic: topic || 'General',
    };
  }
}

// Vercel Serverless Function Handler
export default async function handler(req: any, res: any) {
  // Support CORS for client-side API requests if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // ignore
      }
    }

    const { request, topic, recipientName, relationship, language, userName } = body || {};
    if (!request || typeof request !== 'string') {
      return res.status(400).json({ error: 'Prayer request is required' });
    }

    const result = await generatePastoralPrayerWithRollup({
      request,
      topic,
      recipientName,
      relationship,
      language,
      userName,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Prayer generation error:', error);
    return res.status(500).json({ error: 'Pastoral service temporarily unavailable' });
  }
}
