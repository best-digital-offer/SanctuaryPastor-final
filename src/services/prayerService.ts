import { PrayerSession } from '../types';

interface GeneratePrayerParams {
  request: string;
  topic?: string;
  recipientName?: string;
  relationship?: string;
  language?: string;
}

// Empathy & theological prayer generator with authentic scripture pairing
export async function generatePersonalizedPrayer(params: GeneratePrayerParams): Promise<PrayerSession> {
  const { request, recipientName, relationship, topic = 'General', language = 'en' } = params;

  let prayerTitle = recipientName ? `Prayer for ${recipientName}` : `Prayer for ${topic.toLowerCase()}`;
  let prayerContent = '';
  let scriptureRef = 'Philippians 4:6-7';
  let scriptureTxt = 'Do not be anxious about anything, but in everything by prayer and petition, with thanksgiving, present your requests to God.';
  let detectedTopic = topic;

  // Attempt server-side generation with auto-rollup
  try {
    const res = await fetch('/api/generate-prayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request,
        topic,
        recipientName,
        relationship,
        language,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.prayerText && data.scriptureReference) {
        prayerTitle = data.title || prayerTitle;
        prayerContent = data.prayerText;
        scriptureRef = data.scriptureReference;
        scriptureTxt = data.scriptureText || scriptureTxt;
        detectedTopic = data.detectedTopic || detectedTopic;

        return {
          id: `prayer-${Date.now()}`,
          title: prayerTitle,
          userRequest: request,
          prayerText: prayerContent,
          scriptureReference: scriptureRef,
          scriptureText: scriptureTxt,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          durationSeconds: 125,
          audioDuration: '02:05',
          topic: detectedTopic,
          isSaved: false,
          isAnswered: false,
          recipientName,
          relationship,
        };
      }
    }
  } catch {
    // Silent failover to local theological generator
  }

  // Fallback authentic pastoral catalog
  await new Promise(res => setTimeout(res, 600));

  prayerContent = '';
  scriptureRef = 'Philippians 4:6-7';
  scriptureTxt = 'Do not be anxious about anything, but in everything by prayer and petition, with thanksgiving, present your requests to God.';
  detectedTopic = topic;

  const lower = request.toLowerCase();

  if (recipientName) {
    prayerContent = `Heavenly Father, Almighty Lord of Grace, we lift up ${recipientName} to Your unfailing presence today. You know ${relationship ? `their bond as a beloved ${relationship.toLowerCase()} and ` : ''}every burden carried in their heart. Send forth Your angels of peace to surround ${recipientName}. Where there is weariness, breathe divine refreshment. Where there is uncertainty, make straight their path. Pour Your deep comforting love over them and remind them that they are never forsaken. We commit them wholly into Your sovereign hands. In the precious and holy name of Jesus Christ, Amen.`;
    scriptureRef = 'Numbers 6:24-26';
    scriptureTxt = 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.';
    detectedTopic = 'Pray For Someone';
  } else if (lower.includes('health') || lower.includes('sick') || lower.includes('pain') || lower.includes('mother') || lower.includes('father') || lower.includes('heal')) {
    prayerContent = `Merciful Father, Divine Healer and Sustainer of Life, we come quietly before Your throne of grace. Lord, You see the fragility of human flesh, and You hear the tender cries of our hearts. We ask that Your restoring hand touch every area of infirmity. Dispel distress and replace it with supernatural peace that calms every storm. May the presence of the Holy Spirit bring comfort to the body, clarity to the mind, and unwavering faith to the soul. We rest in Your mercy and love. In Jesus' mighty name, Amen.`;
    scriptureRef = 'Jeremiah 17:14';
    scriptureTxt = 'Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.';
    detectedTopic = 'Healing';
  } else if (lower.includes('job') || lower.includes('work') || lower.includes('money') || lower.includes('career') || lower.includes('finance') || lower.includes('interview')) {
    prayerContent = `Loving Lord and Faithful Provider, You know our daily needs before we even speak them. We surrender this career and financial season into Your hands. Grant wisdom beyond measure, open doors that no man can shut, and provide steady favor in every conversation and interview. Free the heart from anxious striving, and instill the confidence that You supply all our needs according to Your riches in glory. Guide each step in integrity and peace. In Christ's name, Amen.`;
    scriptureRef = 'Proverbs 3:5-6';
    scriptureTxt = 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.';
    detectedTopic = 'Job & Career';
  } else if (lower.includes('peace') || lower.includes('anxiety') || lower.includes('worried') || lower.includes('fear') || lower.includes('stress') || lower.includes('overwhelmed')) {
    prayerContent = `Father in Heaven, Prince of Peace, we quiet our racing thoughts before You right now. In a world full of noise, hurry, and fear, You whisper that we are safe in Your care. Cast out all anxiety and quiet every restless spirit. Help us take every anxious thought captive and lay it at the foot of the cross. Let Your peace, which surpasses all earthly comprehension, guard this heart and mind today and forevermore. In Jesus' peaceful name, Amen.`;
    scriptureRef = 'John 14:27';
    scriptureTxt = 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.';
    detectedTopic = 'Peace & Anxiety';
  } else if (lower.includes('family') || lower.includes('marriage') || lower.includes('child') || lower.includes('kids') || lower.includes('husband') || lower.includes('wife')) {
    prayerContent = `Lord God of Covenant and Home, we bring this family into the shelter of Your presence. Soften every harsh word, dissolve every root of bitterness, and build a fortress of unconditional love and patience around this home. Help each member see one another through Your eyes of grace. Bring restoration, laughter, and lasting unity that honors Your holy name. In Jesus' name, Amen.`;
    scriptureRef = 'Colossians 3:12-14';
    scriptureTxt = 'Clothe yourselves with compassion, kindness, humility, gentleness and patience... And over all these virtues put on love, which binds them all together in perfect unity.';
    detectedTopic = 'Family';
  } else {
    prayerContent = `Gracious Lord God, You know every detail of what is carried on this heart today. Nothing is hidden from Your sight, and nothing is too small for Your compassionate ear. We lay this petition before You with honest humility and trust. Remind us that You walk beside us through every valley and rejoice over us with singing. Grant patience, spiritual clarity, and renewed courage for the road ahead. May Your will be done in goodness and mercy. In the holy name of Jesus Christ, Amen.`;
    scriptureRef = 'Romans 8:28';
    scriptureTxt = 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.';
    detectedTopic = topic || 'General';
  }

  // Handle Spanish or multilingual if requested
  if (language === 'es') {
    prayerContent = `Padre Celestial y Amado Pastor, venimos humildemente ante Ti en este día entregando esta situación en Tus manos. Tú conoces cada lágrima y cada anhelo de nuestro corazón. Llena esta vida con Tu paz sobrenatural que sobrepasa todo entendimiento, restaura las fuerzas y guía cada paso en Tu santa verdad. En el nombre de Jesús, Amén.`;
    scriptureRef = 'Filipenses 4:6-7';
    scriptureTxt = 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.';
  }

  return {
    id: `prayer-${Date.now()}`,
    title: recipientName ? `Prayer for ${recipientName}` : `Prayer for ${detectedTopic.toLowerCase()}`,
    userRequest: request,
    prayerText: prayerContent,
    scriptureReference: scriptureRef,
    scriptureText: scriptureTxt,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    durationSeconds: 125,
    audioDuration: '02:05',
    topic: detectedTopic,
    isSaved: false,
    isAnswered: false,
    recipientName,
    relationship,
  };
}

// Ambient Sacred Sanctuary Sound Synthesizer using Web Audio API
class SanctuaryAmbientAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
      this.gainNode.connect(this.ctx.destination);

      // Warm peaceful organ/pad chord: D3 (146.83Hz), A3 (220.00Hz), F#3 (185.00Hz), D4 (293.66Hz)
      const frequencies = [146.83, 185.00, 220.00, 293.66];
      this.oscillators = frequencies.map(freq => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        
        // Gentle subtle LFO for warm organic breath
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.setValueAtTime(0.2, this.ctx!.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.ctx!.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(this.gainNode!);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch {
      // AudioContext unavailable or restricted
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;
    try {
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(o => {
          try { o.stop(); } catch {}
        });
        this.oscillators = [];
        this.isPlaying = false;
        try { this.ctx?.close(); } catch {}
        this.ctx = null;
      }, 1600);
    } catch {
      this.isPlaying = false;
    }
  }

  public startPad() {
    this.start();
  }

  public stopPad() {
    this.stop();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getActive(): boolean {
    return this.isPlaying;
  }
}

export const sanctuaryAudio = new SanctuaryAmbientAudio();

// Convenience helper for direct prompt execution
export async function generatePrayerSession(
  request: string,
  topic: string = 'General',
  userName?: string
): Promise<PrayerSession> {
  return generatePersonalizedPrayer({
    request,
    topic,
  });
}
