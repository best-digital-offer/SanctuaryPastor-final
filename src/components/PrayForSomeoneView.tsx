import React, { useState } from 'react';
import { Page, User } from '../types';
import { IMAGES } from '../assets/images';
import { Heart, Sparkles, Send, ArrowLeft, Users, User as UserIcon } from 'lucide-react';
import { ChristianCross } from './SanctuaryLogo';

interface PrayForSomeoneViewProps {
  onGenerateIntercession: (recipientName: string, relationship: string, request: string) => Promise<void>;
  setCurrentPage: (page: Page) => void;
  user: User;
}

export const PrayForSomeoneView: React.FC<PrayForSomeoneViewProps> = ({
  onGenerateIntercession,
  setCurrentPage,
  user,
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [request, setRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !request.trim()) return;

    setIsSubmitting(true);
    await onGenerateIntercession(recipientName, relationship, request);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col justify-between">
      {/* Top Header matching reference #6 */}
      <header className="px-6 py-4 border-b border-[#142347] bg-[#070D1B] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-8 h-8 rounded-lg bg-[#D49A2D] flex items-center justify-center text-slate-950 font-bold focus:outline-none"
          >
            <ChristianCross className="w-4 h-4 text-[#0A1128]" />
          </button>
          <div>
            <span className="font-brand text-base font-bold text-white tracking-wider">
              Sanctuary Pastor
            </span>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('dashboard')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>
      </header>

      {/* Main Form Section */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-8 space-y-6">
        <div className="text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Pray For Someone
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Lift up others in prayer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Their Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Their Name
            </label>
            <input
              type="text"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Enter name"
              className="w-full px-3.5 py-3 rounded-xl bg-[#0C152B] border border-slate-700/80 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 placeholder:text-slate-500"
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Relationship
            </label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Friend, Family, Colleague, Neighbor..."
              className="w-full px-3.5 py-3 rounded-xl bg-[#0C152B] border border-slate-700/80 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 placeholder:text-slate-500"
            />
          </div>

          {/* Prayer Request */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Prayer Request
              </label>
              <span className="text-[10px] text-slate-500">{request.length}/500</span>
            </div>
            <textarea
              rows={4}
              required
              maxLength={500}
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Share what you'd like us to pray for..."
              className="w-full px-3.5 py-3 rounded-xl bg-[#0C152B] border border-slate-700/80 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 placeholder:text-slate-500 leading-relaxed"
            />
          </div>

          {/* Large Gold Button matching reference #6 */}
          <button
            id="generate-intercession-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] hover:brightness-105 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-950/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Sanctuary Pastor is preparing prayer...</span>
              </>
            ) : (
              <span>Generate Prayer</span>
            )}
          </button>
        </form>

        {/* Quick Relationship presets */}
        <div className="pt-2">
          <p className="text-[11px] text-slate-400 mb-2">Popular prayer focuses:</p>
          <div className="flex flex-wrap gap-2">
            {['Healing & Recovery', 'Peace Through Loss', 'Encouragement at Work', 'Protection for Children'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setRequest(`Praying for God's grace and divine intervention in ${preset.toLowerCase()}.`)}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#0E1A38] hover:bg-[#162750] border border-slate-800 text-slate-300 transition-colors"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom praying hands card matching reference screen #6 */}
      <div className="relative overflow-hidden py-12 px-6 border-t border-[#142347]">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src={IMAGES.prayingHands}
            alt="Hands clasped in prayer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1B]/95 via-[#070D1B]/80 to-[#070D1B]/60" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto text-center space-y-1">
          <p className="font-serif-sacred text-base sm:text-lg text-amber-100 font-semibold italic">
            “A simple act of prayer can change someone’s day.”
          </p>
        </div>
      </div>
    </div>
  );
};
