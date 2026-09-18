import React, { useState } from 'react';
import { Page } from '../types';
import { IMAGES } from '../assets/images';
import {
  MessageSquareHeart,
  Globe2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Mic,
  Send,
  X,
  Heart,
  BookOpen,
  Star,
  ExternalLink,
} from 'lucide-react';
import { ChristianCross } from './SanctuaryLogo';
import { PRAYER_BOOKS } from '../data/prayerBooksData';

interface HomeViewProps {
  onStartPrayer: (initialText?: string) => void;
  setCurrentPage: (page: Page) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartPrayer,
  setCurrentPage,
  onOpenAuth,
}) => {
  const [heroInput, setHeroInput] = useState('');

  const handleHeroSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onStartPrayer(heroInput.trim() || undefined);
  };

  const handleChipClick = (promptText: string) => {
    setHeroInput(promptText);
  };

  return (
    <div className="min-h-screen bg-[#080E1E] text-slate-100 flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-16 lg:py-20">
        {/* Subtle sanctuary background radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Top Badges and Action Button */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Brand badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111C38] border border-amber-400/30 text-amber-300 shadow-sm">
                  <ChristianCross className="w-4 h-4 text-amber-400" />
                  <span className="font-brand text-xs uppercase tracking-widest font-semibold">
                    Sanctuary Pastor
                  </span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-xs text-slate-300 font-normal">
                    Your AI Christian Prayer Companion
                  </span>
                </div>

                {/* Top Button: Best Prayer Books On Amazon */}
                <button
                  id="hero-top-prayer-books-btn"
                  onClick={() => {
                    setCurrentPage('prayer-books');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 hover:from-amber-500/30 hover:to-yellow-500/25 border border-amber-400/40 hover:border-amber-300 text-amber-300 text-xs font-bold transition-all shadow-sm cursor-pointer group"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Best Prayer Books On Amazon</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-bold">
                    
                  </span>
                </button>
              </div>

              {/* Main Spiritual Headline */}
              <h1 className="font-serif-sacred text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                What’s On Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400">
                  Heart Today?
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
                Tell Sanctuary Pastor what you're going through. Whether you seek peace, healing, or guidance, our fictional pastor is here to pray with you in deep Christian faith.
              </p>

              {/* Interactive Request Input (Never autoplays; explicitly initiated by user) */}
              <div className="bg-[#0D1836] border border-[#203159] rounded-2xl p-3.5 sm:p-4 shadow-xl space-y-3">
                <div className="relative">
                  <textarea
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    placeholder="Type what's on your heart (e.g., peace for anxiety, strength for my family, healing)..."
                    rows={3}
                    className="w-full p-3 text-sm rounded-xl bg-[#080E1F] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none font-sans"
                  />
                  {heroInput && (
                    <button
                      onClick={() => setHeroInput('')}
                      className="absolute top-2.5 right-2.5 text-slate-500 hover:text-slate-300 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Example Chips */}
                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-slate-400">
                    Common prayer requests:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Peace and anxiety', text: 'I am struggling with anxiety and need God’s supernatural peace and calm.' },
                      { label: 'Family', text: 'Please pray for reconciliation, love, and protection within our family.' },
                      { label: 'Healing', text: 'I am asking God for physical healing and full restoration of health.' },
                      { label: 'Job & guidance', text: 'Lord, guide my career steps, open righteous doors, and provide financial peace.' },
                    ].map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => handleChipClick(chip.text)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#070D1B] hover:bg-[#152347] border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-200 transition-colors cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: User must click one to proceed */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    id="hero-pray-with-me-btn"
                    onClick={() => handleHeroSubmit()}
                    className="flex-1 min-w-[160px] py-3 px-6 rounded-xl text-sm font-bold bg-gradient-to-r from-[#E5A93C] via-[#D49A2D] to-[#B8811C] text-slate-950 hover:brightness-110 shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🙏</span>
                    <span>Pray With Me</span>
                  </button>

                  <button
                    id="hero-talk-to-pastor-btn"
                    onClick={() => handleHeroSubmit()}
                    className="py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold bg-[#111C38] hover:bg-[#18274C] border border-slate-700 hover:border-amber-400/40 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mic className="w-4 h-4 text-amber-400" />
                    <span>Talk to Sanctuary Pastor</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Pastor Portrait matching reference */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Subtle back illumination glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent rounded-3xl blur-2xl transform scale-105" />

                {/* Pastor Portrait Card Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-[#23355E] bg-[#0F1A36] shadow-2xl shadow-black/60 group">
                  <img
                    src={IMAGES.pastorHero}
                    alt="Sanctuary Pastor - Realistic Fictional Christian AI Companion"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700"
                  />

                  {/* Gradient shadow overlay at bottom for text readability */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/70 to-transparent p-5 pt-16">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                          Sanctuary Pastor
                        </p>
                        <p className="text-xs text-slate-300">
                          Compassionate • Fictional Christian AI Companion
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#0C152B]/90 px-2.5 py-1 rounded-full border border-amber-500/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[11px] text-emerald-300 font-medium">Ready to Pray</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 FEATURE HIGHLIGHTS BAR matching reference */}
      <section className="py-6 bg-[#0B1329] border-y border-[#162347]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-[#101C3D] hover:bg-[#14234C] border border-[#1E2E59] rounded-xl p-4 flex items-center gap-3.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Real Conversations</h4>
                <p className="text-xs text-slate-400">Real Prayers for Real Needs</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#101C3D] hover:bg-[#14234C] border border-[#1E2E59] rounded-xl p-4 flex items-center gap-3.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-400/10 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Biblical Integrity</h4>
                <p className="text-xs text-slate-400">Grounded in Holy Scripture</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#101C3D] hover:bg-[#14234C] border border-[#1E2E59] rounded-xl p-4 flex items-center gap-3.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Private & Confidential</h4>
                <p className="text-xs text-slate-400">Your Story Stays Between You & God</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#101C3D] hover:bg-[#14234C] border border-[#1E2E59] rounded-xl p-4 flex items-center gap-3.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Faith-Filled Hope</h4>
                <p className="text-xs text-slate-400">Hope for Every Single Day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works-section" className="py-20 bg-[#080E1E] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-sacred text-3xl sm:text-4xl font-bold text-white mb-2">
            How It Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-14">
            A simple, reverent way to experience the power of prayer in your daily life.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-[#0E1834] border border-[#1A2A54] hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E5A93C] to-[#B37E1E] text-slate-950 font-bold text-lg flex items-center justify-center shadow-lg shadow-amber-900/30">
                1
              </div>
              <h3 className="text-base font-semibold text-white pt-1">Share Your Heart</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Type or speak about your situation, family, burden, or blessing freely.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-[#0E1834] border border-[#1A2A54] hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E5A93C] to-[#B37E1E] text-slate-950 font-bold text-lg flex items-center justify-center shadow-lg shadow-amber-900/30">
                2
              </div>
              <h3 className="text-base font-semibold text-white pt-1">AI Pastoral Care</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We understand your emotional weight, underlying intentions, and scriptural context.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-[#0E1834] border border-[#1A2A54] hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E5A93C] to-[#B37E1E] text-slate-950 font-bold text-lg flex items-center justify-center shadow-lg shadow-amber-900/30">
                3
              </div>
              <h3 className="text-base font-semibold text-white pt-1">Pastor Prays</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A photorealistic fictional Christian pastor prays aloud with you with warmth and reverence.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-[#0E1834] border border-[#1A2A54] hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E5A93C] to-[#B37E1E] text-slate-950 font-bold text-lg flex items-center justify-center shadow-lg shadow-amber-900/30">
                4
              </div>
              <h3 className="text-base font-semibold text-white pt-1">Feel at Peace</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive comforting Scripture promises, save your prayer, and continue with renewal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BEST PRAYER BOOKS ON AMAZON SHOWCASE */}
      <section className="relative overflow-hidden py-14 sm:py-18 bg-[#091126] border-t border-[#162347]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Amazon Curated Library</span>
              </div>
              <h2 className="font-serif-sacred text-2xl sm:text-3xl font-bold text-white">
                Best Prayer Books On Amazon
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Explore Christian prayer books and devotionals from the Prayerful Pages collection, with direct Amazon links.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentPage('prayer-books');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
            >
              <span>Explore All Books</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Spotlighted Books */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRAYER_BOOKS.slice(0, 4).map((book) => (
              <div
                key={book.id}
                className="bg-[#0C1733] border border-[#1C2C50] hover:border-amber-400/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-amber-950/20 group"
              >
                <div>
                  {/* Book Card Cover Graphic */}
                  <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 mb-3.5 shadow-md relative border border-white/10">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-2 bottom-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider text-amber-300">
                      Prayerful Pages
                    </div>
                  </div>


                  {/* Title & Author */}
                  <h3 className="font-semibold text-sm text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {book.title}
                  </h3>
                  {book.author && <p className="text-xs text-slate-400 mt-0.5">By {book.author}</p>}

                  {/* Rating */}

                </div>

                {/* View on Amazon Button */}
                <div className="pt-4">
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-[#FF9900] hover:bg-[#FFB033] text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>View on Amazon</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCRIPTURE BANNER */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-t border-[#162347]">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.crossSunrise}
            alt="Sunrise cross over mountain landscape"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1E]/95 via-[#080E1E]/80 to-[#080E1E]/60" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <p className="text-amber-300 font-brand text-xs uppercase tracking-widest font-semibold">
            God’s Eternal Promise
          </p>
          <blockquote className="font-serif-sacred text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug">
            “Cast all your anxiety on Him because He cares for you.”
          </blockquote>
          <p className="text-amber-300 text-sm font-semibold tracking-wider">
            1 Peter 5:7
          </p>
          <div className="pt-4">
            <button
              onClick={() => onStartPrayer()}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-[#D49A2D] hover:bg-[#E5A93C] text-slate-950 shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Bring Your Request Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
