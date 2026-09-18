import React from 'react';
import { Shield, PhoneCall, Globe2, HeartHandshake } from 'lucide-react';
import { Page } from '../types';
import { LegalTopic } from './LegalModal';
import { ChristianCross } from './SanctuaryLogo';

interface FooterProps {
  onOpenLegal: (topic: LegalTopic) => void;
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, setCurrentPage }) => {
  return (
    <footer className="bg-[#050914] border-t border-[#131E38] text-slate-400 py-14 px-4 sm:px-6 lg:px-8 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Sanctuary Pastor */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D49A2D] to-[#B37E1E] flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-950/20">
              <ChristianCross className="w-4 h-4 text-[#0A1128]" />
            </div>
            <span className="font-brand text-lg font-bold text-white tracking-wider">
              Sanctuary Pastor
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Your personal Christian prayer companion. Experiencing the comfort, presence, and transformative power of Christ-centered prayer every day.
          </p>
          <div className="pt-1 flex items-center gap-1.5 text-[11px] text-amber-300/80 font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>Private & Confidential Prayer Vault</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Fictional AI pastoral companion for prayer and biblical reflection.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-1.5">
            Explore
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('prayer-session')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Prayer
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('prayer-topics')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Prayer Topics (23 Categories)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentPage('prayer-books');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5 font-semibold text-amber-300/90"
              >
                <span>Best Books On Amazon (30)</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Featured
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('pray-for-someone')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Pray For Someone
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('scripture')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Scripture
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('journal')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Prayer Journal
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('pricing')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Pricing
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Transparency */}
        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-1.5">
            Transparency
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={() => onOpenLegal('about')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                About Sanctuary Pastor
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('ai-disclosure')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                AI Disclosure
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('safety')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Safety & Spiritual Ethics
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('terms')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('cookies')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cookie Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('refund')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Refund Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Support & Global Crisis Help */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-1.5">
            Support
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={() => onOpenLegal('contact')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('delete-account')}
                className="text-red-400/90 hover:text-red-300 transition-colors text-left cursor-pointer"
              >
                Delete Account
              </button>
            </li>
          </ul>

          {/* Worldwide Emergency Guidance Box */}
          <div className="bg-[#0C152B] p-4 rounded-xl border border-slate-800 space-y-2 mt-4">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Worldwide Crisis Support</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              If you or a loved one are in immediate danger or emotional crisis:
            </p>
            <div className="space-y-1 text-[11px] text-slate-300">
              <p>• <strong>US & Canada:</strong> Call/text <strong>988</strong></p>
              <p>• <strong>United Kingdom:</strong> Call <strong>116 123</strong> or 111</p>
              <p>• <strong>Australia:</strong> Call <strong>13 11 14</strong></p>
            </div>
            <button
              onClick={() => onOpenLegal('crisis')}
              className="w-full mt-2 py-1.5 rounded-lg bg-[#142347] hover:bg-[#1b2f60] border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Global Emergency Directory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} SanctuaryPastor.com. All rights reserved. Built with faith and empathy.</p>
        <p className="italic text-slate-400 font-serif-sacred text-center sm:text-right">
          "For where two or three gather in my name, there am I with them." — Matthew 18:20
        </p>
      </div>
    </footer>
  );
};
