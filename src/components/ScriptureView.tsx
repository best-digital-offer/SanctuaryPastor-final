import React, { useState } from 'react';
import { Page, ScriptureItem } from '../types';
import { SCRIPTURES_DATA } from '../data/mockData';
import { ChristianCross } from './SanctuaryLogo';
import {
  Search,
  BookOpen,
  Bookmark,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Heart,
  Share2,
  Check,
} from 'lucide-react';

interface ScriptureViewProps {
  onPrayScripture: (reference: string, text: string) => void;
  setCurrentPage: (page: Page) => void;
}

export const ScriptureView: React.FC<ScriptureViewProps> = ({
  onPrayScripture,
  setCurrentPage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(['scrip-1', 'scrip-2', 'scrip-3', 'scrip-5', 'scrip-10', 'scrip-11', 'scrip-12']));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Peace', 'Healing', 'Strength', 'Family', 'Faith', 'Hope', 'Protection'];

  const filteredScriptures = SCRIPTURES_DATA.filter((s) => {
    const matchesCategory =
      selectedCategory === 'All' || s.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      s.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getCategoryIconColor = (category: string) => {
    switch (category) {
      case 'Peace':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
      case 'Strength':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'Hope':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
      case 'Healing':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Family':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      default:
        return 'text-pink-400 bg-pink-400/10 border-pink-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col justify-between">
      {/* Header matching reference #8 */}
      <header className="px-4 sm:px-6 py-4 border-b border-[#142347] bg-[#070D1B] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-8 h-8 rounded-lg bg-[#D49A2D] flex items-center justify-center text-slate-950 font-bold focus:outline-none"
          >
            <ChristianCross className="w-4 h-4 text-[#0A1128]" />
          </button>
          <span className="font-brand text-base font-bold text-white tracking-wider">
            Sanctuary Pastor
          </span>
        </div>

        <button
          onClick={() => setCurrentPage('dashboard')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>
      </header>

      {/* Main Scripture content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Bible Scripture
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-serif-sacred text-base">
            Find encouragement and eternal promises for every situation.
          </p>
        </div>

        {/* Search input matching reference #8 */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verses (e.g. peace, healing, strength...)"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B142B] border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>

        {/* Category filters matching reference #8: All, Peace, Healing, Strength, Family, Faith, Hope, Protection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E5A93C] text-slate-950 font-bold shadow-sm'
                    : 'bg-[#0E1A38] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Scripture List matching reference #8 */}
        <div className="space-y-3">
          {filteredScriptures.map((item) => {
            const isSaved = savedIds.has(item.id);
            const iconStyle = getCategoryIconColor(item.category);

            return (
              <div
                key={item.id}
                className="bg-[#0A1226] hover:bg-[#0E1A36] border border-[#17254A] rounded-2xl p-4 sm:p-5 transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${iconStyle}`}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.reference}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSave(item.id)}
                      title={isSaved ? 'Saved to bookmarks' : 'Save verse'}
                      className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(`${item.reference} - "${item.text}"`);
                        setCopiedId(item.id);
                        setTimeout(() => setCopiedId(null), 1800);
                      }}
                      title="Copy verse"
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => onPrayScripture(item.reference, item.text)}
                      className="ml-1 px-3 py-1.5 rounded-lg bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center gap-1 hover:bg-amber-400/25 transition-all cursor-pointer"
                    >
                      <span>Pray This</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-serif-sacred text-slate-200 text-sm sm:text-base leading-relaxed pl-12 italic">
                  “{item.text}”
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
