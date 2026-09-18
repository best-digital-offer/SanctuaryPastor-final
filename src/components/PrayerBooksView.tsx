import React, { useState, useMemo } from 'react';
import { Page, PrayerBook } from '../types';
import { PRAYER_BOOKS } from '../data/prayerBooksData';
import {
  BookOpen,
  Search,
  ExternalLink,
  Star,
  Sparkles,
  Heart,
  Bookmark,
  Share2,
  SlidersHorizontal,
  ArrowRight,
  Info,
  CheckCircle2,
  X,
  Layers,
  Flame,
} from 'lucide-react';
import { ChristianCross } from './SanctuaryLogo';

interface PrayerBooksViewProps {
  setCurrentPage: (page: Page) => void;
  onStartPrayer?: (prompt?: string) => void;
}

export const PrayerBooksView: React.FC<PrayerBooksViewProps> = ({
  setCurrentPage,
  onStartPrayer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBook, setSelectedBook] = useState<PrayerBook | null>(null);
  const [savedBookIds, setSavedBookIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sanctuary_saved_books');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  const categories = [
    'All',
    'Spiritual Warfare',
    'Family & Marriage',
    'Daily Devotionals',
    'Biblical Prayer',
    'Classics',
    'Healing & Peace',
    'Theology & Depth',
  ];

  const toggleSaveBook = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedBookIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('sanctuary_saved_books', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const filteredBooks = useMemo(() => {
    return PRAYER_BOOKS.filter((book) => {
      const matchesCategory =
        selectedCategory === 'All' || book.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q) ||
        (book.keyVerse && book.keyVerse.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col font-sans">
      {/* Top Breadcrumb & Hero */}
      <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-[#0B152F] via-[#091124] to-[#070D1B] border-b border-[#1A284A]">
        {/* Subtle decorative glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-amber-300 font-medium">Best Prayer Books on Amazon</span>
          </div>

          {/* Heading block */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Amazon Curated Collection • 30 Best Sellers</span>
            </div>

            <h1 className="font-serif-sacred text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Best Christian Prayer Books <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300">
                Available On Amazon
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore timeless classics, battle-tested spiritual warfare strategies, and daily devotionals that have strengthened millions of Christians worldwide. Click any book below to view and order directly on Amazon.
            </p>
          </div>

          {/* Search & Category Controls */}
          <div className="mt-8 space-y-4">
            {/* Search Input Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, scripture or topic (e.g., Stormie, Warfare, Peace)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#0F1D3D] border border-[#213560] text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-950/40 font-bold'
                        : 'bg-[#0E1B38] text-slate-300 border-slate-700/80 hover:border-amber-400/40 hover:text-white hover:bg-[#14264E]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Results summary & Amazon notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#0D1836] border border-[#1E2E54] rounded-xl p-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <span className="font-semibold text-amber-300">
              Showing {filteredBooks.length} of {PRAYER_BOOKS.length} books
            </span>
            {selectedCategory !== 'All' && (
              <span className="text-slate-400">in "{selectedCategory}"</span>
            )}
            {searchQuery && (
              <span className="text-slate-400">matching "{searchQuery}"</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Click any product below to open its official Amazon listing in a new tab.</span>
          </div>
        </div>

        {/* Empty Search Result */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20 bg-[#0B152F] rounded-2xl border border-slate-800 p-8">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No prayer books found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              We couldn't find any prayer books matching "{searchQuery}". Try clearing your search or choosing another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* The Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isSaved = savedBookIds.includes(book.id);
            const hasImageError = imageErrorMap[book.id];

            return (
              <div
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="group relative bg-[#0C1733] hover:bg-[#0F1E42] border border-[#1C2C50] hover:border-amber-400/60 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20 cursor-pointer overflow-hidden"
              >
                {/* Book Badge (e.g. Best Seller) */}
                {book.badge && (
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-amber-400/95 text-slate-950 shadow-md backdrop-blur-sm">
                    {book.badge}
                  </div>
                )}

                {/* Bookmark Toggle button */}
                <button
                  onClick={(e) => toggleSaveBook(book.id, e)}
                  title={isSaved ? 'Remove from saved' : 'Save book for later'}
                  className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
                    isSaved
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-black/40 text-slate-300 hover:text-white hover:bg-black/60'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                {/* Book Cover Visual Display */}
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-slate-900 shadow-md border border-white/5">
                  {/* Real Image or Elegant Fallback Cover */}
                  {!hasImageError ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      onError={() => {
                        setImageErrorMap((prev) => ({ ...prev, [book.id]: true }));
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}

                  {/* Fallback Graphic Cover if image not yet loaded or on error */}
                  {hasImageError && (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${book.coverGradient} p-5 flex flex-col justify-between text-left relative overflow-hidden group-hover:scale-102 transition-transform duration-300`}
                    >
                      {/* Sacred watermarked background cross */}
                      <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 text-white pointer-events-none">
                        <ChristianCross className="w-full h-full" />
                      </div>

                      {/* Top spine / header */}
                      <div className="flex items-center justify-between relative z-10 pt-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                          <ChristianCross className="w-3.5 h-3.5 text-amber-300" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300/90 font-mono">
                          Amazon Selection
                        </span>
                      </div>

                      {/* Middle Book Title & Author */}
                      <div className="space-y-2 relative z-10 my-auto">
                        <p className="font-serif-sacred font-bold text-base sm:text-lg text-white leading-snug drop-shadow-md">
                          {book.title}
                        </p>
                        <div className="h-0.5 w-8 bg-amber-400/80 rounded-full" />
                        <p className="text-xs text-amber-100/90 font-medium tracking-wide">
                          {book.author}
                        </p>
                      </div>

                      {/* Bottom ribbon metadata */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/80 relative z-10">
                        <span className="truncate max-w-[120px] font-semibold">
                          {book.category}
                        </span>
                        {book.price && (
                          <span className="font-bold text-amber-300">{book.price}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hover Quick Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                    <span className="px-3.5 py-2 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span>Quick Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {/* Category & Price */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-400/90 font-medium text-[11px] uppercase tracking-wider">
                        {book.category}
                      </span>
                      {book.price && (
                        <span className="text-slate-300 font-semibold text-xs">
                          {book.price}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {book.title}
                    </h3>

                    {/* Author */}
                    <p className="text-xs text-slate-400">By {book.author}</p>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-current text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-white">{book.rating}</span>
                      <span className="text-[11px] text-slate-400">
                        ({book.reviewsCount})
                      </span>
                    </div>

                    {/* Description excerpt */}
                    <p className="text-xs text-slate-300 line-clamp-2 pt-1 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* Primary Action: VIEW ON AMAZON BUTTON (as explicitly requested by user) */}
                  <div className="pt-2 space-y-2">
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#FF9900] hover:bg-[#FFB033] text-slate-950 transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-950/40 hover:brightness-105 cursor-pointer"
                    >
                      <span className="font-extrabold tracking-tight">View on Amazon</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                    </a>

                    {onStartPrayer && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartPrayer(
                            `Lord, guide me as I reflect upon the themes of "${book.title}" by ${book.author}. Teach me to pray with faith, perseverance, and scripture truth.`
                          );
                        }}
                        className="w-full py-1.5 text-[11px] font-medium text-slate-400 hover:text-amber-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ChristianCross className="w-3 h-3 text-amber-400" />
                        <span>Pray with Sanctuary Pastor</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-[#0B152F] border border-[#1F3057] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {/* Cover Preview */}
              <div className="sm:col-span-5">
                <div
                  className={`w-full aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br ${selectedBook.coverGradient} p-5 flex flex-col justify-between shadow-lg border border-white/10`}
                >
                  <div className="flex items-center justify-between">
                    <ChristianCross className="w-5 h-5 text-amber-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                      {selectedBook.badge || 'Amazon Pick'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif-sacred text-xl font-bold text-white leading-snug">
                      {selectedBook.title}
                    </p>
                    <p className="text-xs text-amber-200">{selectedBook.author}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/10">
                    <span>{selectedBook.category}</span>
                    <span className="font-bold text-amber-300">{selectedBook.price}</span>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="sm:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                    <span>{selectedBook.category}</span>
                    <span>•</span>
                    <span>{selectedBook.price}</span>
                  </div>
                  <h2 className="font-serif-sacred text-2xl font-bold text-white">
                    {selectedBook.title}
                  </h2>
                  <p className="text-sm text-slate-300 font-medium">By {selectedBook.author}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 bg-[#101F42] px-3 py-1.5 rounded-lg w-fit border border-slate-700">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">{selectedBook.rating}</span>
                  <span className="text-xs text-slate-400">
                    ({selectedBook.reviewsCount} customer ratings)
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Overview
                  </p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedBook.description}
                  </p>
                </div>

                {/* Key Scripture Focus */}
                {selectedBook.keyVerse && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Scripture Focus</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium italic">
                      "{selectedBook.keyVerse}"
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-3 space-y-2">
                  <a
                    href={selectedBook.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl text-sm font-bold bg-[#FF9900] hover:bg-[#FFB033] text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 cursor-pointer"
                  >
                    <span>View on Amazon</span>
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  </a>

                  {onStartPrayer && (
                    <button
                      onClick={() => {
                        setSelectedBook(null);
                        onStartPrayer(
                          `Lord, teach me through the spiritual principles of "${selectedBook.title}" by ${selectedBook.author}. Strengthen my prayer life and deepen my devotion.`
                        );
                      }}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#111F3F] hover:bg-[#182C58] border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ChristianCross className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pray With Sanctuary Pastor on this Topic</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
