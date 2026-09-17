import React, { useState, useEffect, useRef } from 'react';
import { Page, User, PrayerSession } from '../types';
import { IMAGES } from '../assets/images';
import { sanctuaryAudio } from '../services/prayerService';
import { ChristianCross } from './SanctuaryLogo';
import {
  Play,
  Pause,
  RotateCcw,
  Bookmark,
  BookOpen,
  Share2,
  Volume2,
  VolumeX,
  Music,
  Check,
  Sparkles,
  Mic,
  Send,
  Heart,
  X,
  ArrowRight,
  Shield,
  HelpCircle,
  Lock,
} from 'lucide-react';

interface PrayerSessionViewProps {
  currentPrayer: PrayerSession | null;
  user: User;
  onSavePrayerToggle: (id: string) => void;
  onNewPrayerRequest: (request: string, topic?: string) => Promise<void>;
  onEndSession: () => void;
  onOpenPricing: () => void;
  setCurrentPage: (page: Page) => void;
  initialPrompt?: string;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const PrayerSessionView: React.FC<PrayerSessionViewProps> = ({
  currentPrayer,
  user,
  onSavePrayerToggle,
  onNewPrayerRequest,
  onEndSession,
  onOpenPricing,
  setCurrentPage,
  initialPrompt = '',
  onOpenAuth,
}) => {
  // Empty state input text
  const [inputText, setInputText] = useState(initialPrompt || '');
  const [selectedCategory, setSelectedCategory] = useState('Personal Faith');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDictating, setIsDictating] = useState(false);

  // Player state: STRICTLY FALSE BY DEFAULT (NO AUTOPLAY)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = currentPrayer?.durationSeconds || 135;
  const [ambientAudioActive, setAmbientAudioActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);

  // Modals & Share
  const [showScriptureModal, setShowScriptureModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccessToast, setSavedSuccessToast] = useState(false);

  // Sync initialPrompt into inputText when changed
  useEffect(() => {
    if (initialPrompt) {
      setInputText(initialPrompt);
    }
  }, [initialPrompt]);

  // When currentPrayer changes, reset play state to paused (NO AUTOPLAY)
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    stopSpeech();
  }, [currentPrayer?.id]);

  // Playback timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && currentTime < totalDuration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            stopSpeech();
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTime, totalDuration]);

  // Web Speech API for reverent pastoral voice
  const startSpeech = () => {
    if (!currentPrayer) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentPrayer.prayerText);
      utterance.rate = 0.88; // Reverent, gentle pastoral pacing
      utterance.pitch = 0.95; // Deep, comforting voice

      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('george') ||
            v.name.toLowerCase().includes('natural'))
      );
      if (maleVoice) utterance.voice = maleVoice;

      utterance.onend = () => {
        setSpeechActive(false);
      };
      utterance.onerror = () => {
        setSpeechActive(false);
      };

      window.speechSynthesis.speak(utterance);
      setSpeechActive(true);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeechActive(false);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSpeech();
    } else {
      setIsPlaying(true);
      if (currentTime >= totalDuration) {
        setCurrentTime(0);
      }
      if (!isMuted) {
        startSpeech();
      }
    }
  };

  // Toggle ambient organ pad
  const handleToggleAmbient = () => {
    if (ambientAudioActive) {
      sanctuaryAudio.stopPad();
      setAmbientAudioActive(false);
    } else {
      sanctuaryAudio.startPad();
      setAmbientAudioActive(true);
    }
  };

  // Speech Recognition for "Speak Your Request"
  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback
      setInputText((prev) =>
        prev ? `${prev} Lord, grant peace in our household and strength for the journey.` : 'Lord, grant peace in our household and strength for the journey.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsDictating(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsDictating(false);
      };
      recognition.onerror = () => setIsDictating(false);
      recognition.onend = () => setIsDictating(false);
      recognition.start();
    } catch {
      setIsDictating(false);
    }
  };

  // Handle submit prayer request
  const handleSubmitPrayer = async () => {
    const textToSubmit = inputText.trim() || 'Lord, grant peace and guidance for what is on my heart today.';

    // Check free prayer limit
    if (!user.isPaid && user.freePrayersLeft <= 0) {
      onOpenPricing();
      return;
    }

    setIsSubmitting(true);
    try {
      await onNewPrayerRequest(textToSubmit, selectedCategory);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // ==========================================
  // CASE 1: WELCOMING EMPTY STATE (PROBLEMS 1, 7, 8)
  // ==========================================
  if (!currentPrayer) {
    const hasFreePrayer = user.isPaid || user.freePrayersLeft > 0;

    return (
      <div className="min-h-screen bg-[#070D1C] text-slate-100 flex flex-col justify-between">
        {/* Top bar */}
        <header className="px-4 sm:px-6 py-3.5 border-b border-[#142244] bg-[#070D1C] flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D49A2D] to-[#B37E1E] flex items-center justify-center text-slate-950 font-bold">
              <ChristianCross className="w-4 h-4 text-[#0A1128]" />
            </div>
            <div>
              <h1 className="font-brand text-base font-bold text-white tracking-wider">
                Sanctuary Pastor
              </h1>
              <p className="text-[10px] text-amber-300/80 font-medium">
                Prayer Session • Fictional Christian Companion
              </p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('home')}
            className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-[#0E1A38] text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            Exit to Home
          </button>
        </header>

        {/* Empty State Body */}
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
          <div className="bg-[#0B152F] border border-[#1C2C55] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            {/* Free prayer badge / status (Problem 16) */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  user.isPaid
                    ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                    : hasFreePrayer
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border border-red-500/30 text-red-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {user.isPaid
                    ? 'Subscriber • Unlimited Prayers'
                    : hasFreePrayer
                    ? 'You have 1 free prayer'
                    : 'Your free prayer has been used'}
                </span>
              </div>

              {!hasFreePrayer && (
                <button
                  onClick={onOpenPricing}
                  className="text-xs text-amber-300 font-bold hover:underline"
                >
                  Unlock Unlimited →
                </button>
              )}
            </div>

            {/* Title & Pastor Welcome */}
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/50 mx-auto shadow-lg">
                <img
                  src={IMAGES.pastorHero}
                  alt="Sanctuary Pastor"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-white tracking-tight">
                What's on your heart?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Tell Sanctuary Pastor what you're going through. Whether it's anxiety, family, health, or gratitude, our pastor will craft a compassionate, scripture-rooted prayer for you.
              </p>
            </div>

            {/* Input area */}
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tell Sanctuary Pastor what you're going through..."
                  rows={4}
                  className="w-full p-4 text-sm rounded-2xl bg-[#070D1B] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none font-sans leading-relaxed"
                />
                {inputText && (
                  <button
                    onClick={() => setInputText('')}
                    className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 text-xs"
                    title="Clear"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Example Chips (clicking sets textarea, does NOT autoplay) */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium text-slate-400">
                  Select a prompt to start your request:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Peace and anxiety', text: 'I am struggling with anxiety and racing thoughts, and need God’s supernatural peace.' },
                    { label: 'Family', text: 'Please pray for reconciliation, patience, and love within our family home.' },
                    { label: 'Healing', text: 'I am asking for divine physical healing and restoration of health for myself and loved ones.' },
                    { label: 'Job and finances', text: 'Lord, guide my career decisions, open righteous doors, and provide for our household.' },
                    { label: 'Protection', text: 'Father, protect our steps and shield us from spiritual and physical harm.' },
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => setInputText(chip.text)}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#080E1E] hover:bg-[#142347] border border-slate-700 hover:border-amber-400/40 text-slate-300 hover:text-amber-200 transition-colors cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              {hasFreePrayer ? (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleSubmitPrayer}
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E5A93C] via-[#D49A2D] to-[#B8811C] text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Pastor Is Preparing Your Prayer...</span>
                      </>
                    ) : (
                      <>
                        <span>🙏</span>
                        <span>Pray With Me</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleVoiceInput}
                    disabled={isDictating}
                    type="button"
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#0E1A38] hover:bg-[#152752] border border-slate-700 hover:border-amber-400/40 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Mic className={`w-4 h-4 ${isDictating ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
                    <span>{isDictating ? 'Listening...' : '🎙️ Speak Your Request'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 text-center p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <p className="text-xs text-amber-200 font-medium">
                    Your free personalized prayer has been used. Continue your daily spiritual walk with unlimited prayers.
                  </p>
                  <button
                    onClick={onOpenPricing}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-sm shadow-md hover:brightness-110 cursor-pointer transition-all"
                  >
                    Continue Praying With Sanctuary Pastor
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-900">
          Sanctuary Pastor • Personal Devotional Reflection • Non-Denominational Christian
        </footer>
      </div>
    );
  }

  // ==========================================
  // CASE 2: ACTIVE PRAYER SESSION (PROBLEMS 9 & 10)
  // Layout:
  // REALISTIC PASTOR VIDEO
  // ↓
  // User Prayer Request
  // ↓
  // Prayer Status
  // ↓
  // Audio Player
  // ↓
  // Actions: Save Prayer, Read Scripture, Pray Again, Share
  // ↓
  // Spoken Prayer Transcript
  // ↓
  // Scripture
  // ==========================================
  return (
    <div className="min-h-screen bg-[#070D1C] text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="px-4 sm:px-6 py-3.5 border-b border-[#142244] bg-[#070D1C] flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D49A2D] to-[#B37E1E] flex items-center justify-center text-slate-950 font-bold shadow-md">
            <ChristianCross className="w-4 h-4 text-[#0A1128]" />
          </div>
          <div>
            <h1 className="font-brand text-base font-bold text-white tracking-wider">
              Sanctuary Pastor
            </h1>
            <p className="text-[10px] text-amber-300/80 font-medium">
              Prayer Session • Dedicated Christian Companion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Ambient sacred music toggle */}
          <button
            onClick={handleToggleAmbient}
            title={ambientAudioActive ? 'Ambient Sanctuary: ON' : 'Turn on peaceful background organ pad'}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              ambientAudioActive
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {ambientAudioActive ? 'Ambient Sanctuary: ON' : 'Ambient Music'}
            </span>
          </button>

          <button
            id="end-session-btn"
            onClick={onEndSession}
            className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-[#0E1A38] text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            End Session
          </button>
        </div>
      </header>

      {/* Main Prayer Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:py-6 flex flex-col gap-4">
        {/* 1. REALISTIC PASTOR VIDEO / VISUAL PRESENTATION */}
        <div className="relative rounded-2xl overflow-hidden border border-[#203159] bg-[#0A1226] shadow-2xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center group">
          <img
            src={IMAGES.pastorPraying}
            alt="Photorealistic Sanctuary Pastor in Reverent Prayer"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center transition-all duration-1000 ${
              isPlaying ? 'scale-101 brightness-105' : 'brightness-95'
            }`}
          />

          {/* Status badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            <span className="text-[11px] font-semibold tracking-wider text-emerald-300 uppercase">
              {isPlaying ? 'Pastor Praying With You' : 'Prayer Ready • Press Play'}
            </span>
          </div>

          {/* Spoken subtitles banner */}
          <div className="absolute inset-x-0 bottom-6 px-6 text-center">
            <div className="inline-block bg-black/75 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-white/10 shadow-lg max-w-xl mx-auto">
              <p className="font-serif-sacred text-base sm:text-lg text-amber-100 italic tracking-wide">
                {isPlaying
                  ? speechActive
                    ? '“Let us pray together in faith...”'
                    : '“Lord, we lift this prayer into Your gracious hands...”'
                  : '“Click play to hear Sanctuary Pastor pray for you...”'}
              </p>
            </div>
          </div>

          {/* Animated audio wave indicator when playing */}
          {isPlaying && (
            <div className="absolute bottom-3 right-4 flex items-end gap-1 h-5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
              <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.1s] h-3" />
              <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s] h-5" />
              <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s] h-2" />
              <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s] h-4" />
            </div>
          )}
        </div>

        {/* 2. USER PRAYER REQUEST */}
        <div className="bg-[#0E1936] border border-[#1E2E59] rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 text-xs">
              🙏
            </div>
            <div className="truncate">
              <p className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">
                Your Prayer Request
              </p>
              <p className="text-sm text-slate-200 truncate font-medium">
                "{currentPrayer.userRequest}"
              </p>
            </div>
          </div>

          <button
            onClick={() => onEndSession()}
            className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 shrink-0 font-medium cursor-pointer"
          >
            New Request
          </button>
        </div>

        {/* 3. PRAYER STATUS */}
        <div className="bg-[#0C1630] border border-[#1D2B52] rounded-xl px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <Check className="w-4 h-4" />
            <span>Personalized Christian Prayer Ready</span>
          </div>
          <span className="text-slate-400">{currentPrayer.topic || 'Personal Prayer'}</span>
        </div>

        {/* 4. AUDIO PLAYER */}
        <div className="bg-[#0C1630] border border-[#1D2B52] rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-amber-300 uppercase tracking-wider text-[10px]">
              {isPlaying ? 'Playing Audio' : 'Audio Controls'}
            </span>
            <span className="font-mono text-[11px] text-slate-300">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>
          </div>

          {/* Waveform Visualizer */}
          <div className="flex items-center gap-1 h-10 px-2 bg-[#080E1F] rounded-xl border border-slate-800/80 overflow-hidden">
            {Array.from({ length: 48 }).map((_, i) => {
              const progress = (currentTime / totalDuration) * 48;
              const isPast = i <= progress;
              const heightMultiplier = Math.sin((i / 48) * Math.PI) * 0.7 + 0.3;
              const randomH = Math.max(15, Math.floor(heightMultiplier * 36));
              return (
                <div
                  key={i}
                  style={{ height: `${randomH}px` }}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPast
                      ? 'bg-gradient-to-t from-[#B8811C] to-[#E5A93C]'
                      : 'bg-slate-700/60'
                  }`}
                />
              );
            })}
          </div>

          {/* Transport Row */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute voice' : 'Mute voice'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentTime((prev) => Math.max(0, prev - 15))}
                title="Rewind 15s"
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                id="prayer-play-pause-btn"
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? 'Pause Prayer' : 'Play Prayer Audio'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-slate-950" />
                ) : (
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                )}
              </button>

              <button
                onClick={() => setCurrentTime((prev) => Math.min(totalDuration, prev + 15))}
                title="Fast-forward 15s"
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 scale-x-[-1]" />
              </button>
            </div>

            <div className="text-[11px] text-amber-300/80 font-medium">
              {isPlaying ? 'Speaking...' : 'Ready'}
            </div>
          </div>
        </div>

        {/* 5. ACTIONS: Save Prayer, Read Scripture, Pray Again, Share */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Save Prayer */}
          <button
            id="save-prayer-btn"
            onClick={() => {
              onSavePrayerToggle(currentPrayer.id);
              setSavedSuccessToast(true);
              setTimeout(() => setSavedSuccessToast(false), 2500);
            }}
            className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              currentPrayer.isSaved
                ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                : 'bg-[#0E1936] border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${currentPrayer.isSaved ? 'fill-amber-400' : ''}`} />
            <span>{currentPrayer.isSaved ? 'Saved in Vault' : 'Save Prayer'}</span>
          </button>

          {/* Read Scripture */}
          <button
            onClick={() => setShowScriptureModal(true)}
            className="py-2.5 px-3 rounded-xl bg-[#0E1936] border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Read Scripture</span>
          </button>

          {/* Pray Again */}
          <button
            onClick={() => onEndSession()}
            className="py-2.5 px-3 rounded-xl bg-[#0E1936] border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>🙏</span>
            <span>Pray Again</span>
          </button>

          {/* Share */}
          <button
            onClick={() => setShowShareModal(true)}
            className="py-2.5 px-3 rounded-xl bg-[#0E1936] border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-purple-400" />
            <span>Share</span>
          </button>
        </div>

        {/* 6. SPOKEN PRAYER TRANSCRIPT */}
        <div className="bg-[#0C1630] border border-[#1D2B52] rounded-2xl p-5 sm:p-7 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider font-brand">
                Spoken Prayer Transcript
              </h3>
            </div>
            <span className="text-xs text-slate-400">{currentPrayer.date}</span>
          </div>

          <p className="font-serif-sacred text-base sm:text-lg text-slate-200 leading-relaxed sm:leading-loose whitespace-pre-line tracking-wide">
            {currentPrayer.prayerText}
          </p>
        </div>

        {/* 7. SCRIPTURE ANCHOR */}
        {currentPrayer.scriptureReference && (
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-[#0E1A38] p-5 sm:p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Scriptural Anchor
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {currentPrayer.scriptureReference}
                  </span>
                </div>
                <p className="font-serif-sacred text-sm sm:text-base text-slate-200 italic leading-relaxed">
                  "{currentPrayer.scriptureText}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 8. POST-PRAYER SUBSCRIPTION PROMPT (PROBLEM 16) */}
        {!user.isPaid && user.freePrayersLeft <= 0 && (
          <div className="bg-gradient-to-r from-[#111C38] via-[#14234A] to-[#111C38] border border-amber-500/40 rounded-2xl p-5 text-center space-y-3 shadow-xl mt-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Your Free Prayer Has Been Completed</span>
            </div>
            <h4 className="text-lg font-bold text-white font-serif-sacred">
              Continue Praying With Sanctuary Pastor
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Unlock unlimited prayers, voice prayer downloads, daily scriptures, and your personal faith journal from $9.99/week. Cancel anytime.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenPricing}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md cursor-pointer transition-all"
              >
                View Plans & Continue
              </button>
            </div>
          </div>
        )}
      </main>

      {/* SCRIPTURE MODAL */}
      {showScriptureModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D162F] border border-[#23355F] rounded-2xl max-w-lg w-full p-6 text-left shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowScriptureModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>{currentPrayer.scriptureReference}</span>
            </div>
            <blockquote className="font-serif-sacred text-lg text-amber-100 italic leading-relaxed border-l-2 border-amber-400 pl-4 py-1">
              "{currentPrayer.scriptureText}"
            </blockquote>
            <p className="text-xs text-slate-400">
              Scripture taken from public-domain and orthodox Christian translations.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowScriptureModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D162F] border border-[#23355F] rounded-2xl max-w-md w-full p-6 text-left shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-white text-base">Share This Prayer</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Send this comforting prayer and scripture to a friend, family member, or church group.
            </p>
            <div className="p-3 bg-[#080E1E] rounded-xl border border-slate-800 text-xs text-slate-300 font-serif-sacred italic line-clamp-3">
              "{currentPrayer.prayerText}"
            </div>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Prayer from Sanctuary Pastor: "${currentPrayer.prayerText}"\n\nAnchor: ${currentPrayer.scriptureReference} - "${currentPrayer.scriptureText}"\nhttps://sanctuarypastor.com`
                  );
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="flex-1 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer"
              >
                {copiedLink ? 'Copied to Clipboard!' : 'Copy Prayer Text'}
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVED TOAST */}
      {savedSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Prayer updated in your Vault!</span>
        </div>
      )}
    </div>
  );
};
