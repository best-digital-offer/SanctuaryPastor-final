import React, { useState, useMemo } from 'react';
import { Page, JournalEntry } from '../types';
import { ChristianCross } from './SanctuaryLogo';
import {
  Plus,
  Search,
  CheckCircle2,
  Bookmark,
  Calendar,
  Sparkles,
  Heart,
  Tag,
  ArrowLeft,
  X,
  Filter,
  Check,
  BookOpen,
  Feather,
  Clock,
  Trash2,
  Share2,
  Volume2,
  ChevronRight,
  HelpCircle,
  Flame,
  Award,
} from 'lucide-react';

interface PrayerJournalViewProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  onToggleAnswered: (id: string, testimony?: string) => void;
  onDeleteEntry: (id: string) => void;
  setCurrentPage: (page: Page) => void;
  onPrayFromJournal?: (title: string, content: string) => void;
}

export const PrayerJournalView: React.FC<PrayerJournalViewProps> = ({
  entries,
  onAddEntry,
  onToggleAnswered,
  onDeleteEntry,
  setCurrentPage,
  onPrayFromJournal,
}) => {
  // Navigation and Filter state
  const [activeTab, setActiveTab] = useState<'All' | 'Prayers' | 'Answers' | 'Notes'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [readingEntry, setReadingEntry] = useState<JournalEntry | null>(null);
  const [answeringEntry, setAnsweringEntry] = useState<JournalEntry | null>(null);
  const [testimonyInput, setTestimonyInput] = useState('');
  const [praiseToast, setPraiseToast] = useState<string | null>(null);

  // Form state for new entry
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Prayers' | 'Answers' | 'Notes'>('Prayers');
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [newVerseRef, setNewVerseRef] = useState('');
  const [isAnsweredImmediate, setIsAnsweredImmediate] = useState(false);
  const [newTestimony, setNewTestimony] = useState('');

  // Suggested tag chips
  const suggestedTags = ['Peace', 'Healing', 'Family', 'Career', 'Provision', 'Faith', 'Gratitude', 'Guidance'];

  // Calculate Metrics
  const totalCount = entries.length;
  const answeredCount = entries.filter((e) => e.isAnswered || e.category === 'Answers').length;
  const activePrayersCount = entries.filter((e) => e.category === 'Prayers' && !e.isAnswered).length;
  const notesCount = entries.filter((e) => e.category === 'Notes').length;

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    entries.forEach((entry) => {
      entry.tags?.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, [entries]);

  // Filter and Sort Entries
  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry) => {
        // Tab filtering
        const matchesTab =
          activeTab === 'All'
            ? true
            : activeTab === 'Answers'
            ? entry.isAnswered || entry.category === 'Answers'
            : entry.category === activeTab;

        // Search query matching title, content, or tags
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          entry.title.toLowerCase().includes(q) ||
          entry.content.toLowerCase().includes(q) ||
          entry.verseReference?.toLowerCase().includes(q) ||
          entry.tags?.some((t) => t.toLowerCase().includes(q));

        // Tag filter
        const matchesTag = selectedTag === 'All' || entry.tags?.includes(selectedTag);

        // Status filter
        const matchesStatus =
          statusFilter === 'all'
            ? true
            : statusFilter === 'answered'
            ? entry.isAnswered
            : !entry.isAnswered;

        return matchesTab && matchesSearch && matchesTag && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        // Approximate sorting using entry id/date
        if (sortBy === 'oldest') {
          return a.id.localeCompare(b.id);
        }
        return b.id.localeCompare(a.id);
      });
  }, [entries, activeTab, searchQuery, selectedTag, statusFilter, sortBy]);

  // Handle Tag Toggle for new entry form
  const toggleNewTag = (tag: string) => {
    if (newTags.includes(tag)) {
      setNewTags(newTags.filter((t) => t !== tag));
    } else {
      setNewTags([...newTags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (tagInput.trim() && !newTags.includes(tagInput.trim())) {
      setNewTags([...newTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Submit new entry
  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddEntry({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      isAnswered: isAnsweredImmediate || newCategory === 'Answers',
      tags: newTags.length > 0 ? newTags : [newCategory === 'Answers' ? 'Praise' : 'Reflection'],
      verseReference: newVerseRef.trim() || undefined,
      testimony: newTestimony.trim() || undefined,
      answeredDate: isAnsweredImmediate || newCategory === 'Answers' ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined,
    });

    // Reset Form
    setNewTitle('');
    setNewContent('');
    setNewCategory('Prayers');
    setNewTags([]);
    setNewVerseRef('');
    setIsAnsweredImmediate(false);
    setNewTestimony('');
    setShowAddModal(false);

    setPraiseToast('Your entry has been placed in your spiritual altar.');
    setTimeout(() => setPraiseToast(null), 3500);
  };

  // Quick toggle answered
  const handleQuickAnswerToggle = (entry: JournalEntry) => {
    if (!entry.isAnswered) {
      // Prompt for testimony
      setAnsweringEntry(entry);
      setTestimonyInput('');
    } else {
      // Revert to ongoing
      onToggleAnswered(entry.id);
      setPraiseToast('Entry marked as ongoing prayer.');
      setTimeout(() => setPraiseToast(null), 3000);
    }
  };

  const handleConfirmAnswered = () => {
    if (answeringEntry) {
      onToggleAnswered(answeringEntry.id, testimonyInput.trim() || undefined);
      setAnsweringEntry(null);
      setTestimonyInput('');
      setPraiseToast('Praise God! Marked as an Answered Prayer.');
      setTimeout(() => setPraiseToast(null), 3500);
    }
  };

  // Helper for category styling
  const getCategoryStyles = (category: string, isAnswered: boolean) => {
    if (isAnswered || category === 'Answers') {
      return {
        badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
        iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        label: 'Answered',
        Icon: CheckCircle2,
      };
    }
    if (category === 'Prayers') {
      return {
        badgeBg: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
        iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
        label: 'Prayer',
        Icon: Bookmark,
      };
    }
    return {
      badgeBg: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
      iconBg: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      label: 'Note',
      Icon: Feather,
    };
  };

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col justify-between">
      {/* Toast Notification */}
      {praiseToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#0E1E3D] border border-amber-400/60 shadow-2xl px-5 py-2.5 rounded-full flex items-center gap-2.5 text-xs text-amber-200 font-medium animate-in fade-in slide-in-from-top duration-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{praiseToast}</span>
        </div>
      )}

      {/* Top Header matching reference #7 */}
      <header className="px-4 sm:px-6 py-4 border-b border-[#142347] bg-[#070D1B] flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-8 h-8 rounded-lg bg-[#D49A2D] flex items-center justify-center text-slate-950 font-bold focus:outline-none hover:brightness-110 cursor-pointer transition-all"
            title="Return to Home"
          >
            <ChristianCross className="w-4 h-4 text-[#0A1128]" />
          </button>
          <div>
            <span className="font-brand text-base font-bold text-white tracking-wider">
              Sanctuary Pastor
            </span>
            <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-serif-sacred italic">
              — Prayer Journal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0C152B] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Journal Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Title Header & + New Entry Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Prayer Journal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-serif-sacred text-base">
              Write. Reflect. Remember God’s faithfulness.
            </p>
          </div>

          <button
            id="new-journal-entry-btn"
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 hover:brightness-110 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Entry</span>
          </button>
        </div>

        {/* Faith Altar Stat Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#0A1226] border border-[#17254A] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif-sacred text-xl font-bold text-white">{totalCount}</div>
              <p className="text-[11px] text-slate-400">Total Entries</p>
            </div>
          </div>

          <div className="bg-[#0A1226] border border-[#17254A] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif-sacred text-xl font-bold text-amber-300">{activePrayersCount}</div>
              <p className="text-[11px] text-slate-400">Active Petitions</p>
            </div>
          </div>

          <div className="bg-[#0A1226] border border-[#17254A] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif-sacred text-xl font-bold text-emerald-400">{answeredCount}</div>
              <p className="text-[11px] text-slate-400">Answered Praises</p>
            </div>
          </div>

          <div className="bg-[#0A1226] border border-[#17254A] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0">
              <Feather className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif-sacred text-xl font-bold text-purple-300">{notesCount}</div>
              <p className="text-[11px] text-slate-400">Devotional Notes</p>
            </div>
          </div>
        </div>

        {/* Search, Tabs, and Filter Bar matching reference Screen #7 */}
        <div className="space-y-3 bg-[#0A1226]/60 border border-[#162447] rounded-2xl p-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reflections, answered prayers, scripture..."
              className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-[#070D1B] border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Primary Tabs: All, Prayers, Answers, Notes */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80 pt-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {(['All', 'Prayers', 'Answers', 'Notes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-slate-700'
                  }`}
                >
                  {tab === 'Answers' ? 'Answers (Praises)' : tab}
                </button>
              ))}
            </div>

            {/* Controls: Status filter & Sort */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              {/* Status filter dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-[#070D1B] border border-slate-800 text-slate-300 text-xs focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="answered">Answered Only</option>
                <option value="unanswered">Ongoing Only</option>
              </select>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-[#070D1B] border border-slate-800 text-slate-300 text-xs focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Quick Tag Pills */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-800/50 scrollbar-none text-[11px]">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider shrink-0 mr-1">
                Filter Tag:
              </span>
              <button
                onClick={() => setSelectedTag('All')}
                className={`px-2.5 py-0.5 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  selectedTag === 'All'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-0.5 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                    selectedTag === tag
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                      : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredEntries.length}</strong> of {entries.length} entries
          </span>
          {searchQuery && (
            <span className="text-amber-300 text-[11px]">
              Filtered by: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Clean Journal Cards List matching reference #7 */}
        <div className="space-y-3.5">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs bg-[#091124] rounded-2xl border border-slate-800/80 p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-amber-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-serif-sacred">No journal entries found</h3>
              <p className="max-w-md mx-auto text-slate-400 leading-relaxed">
                {searchQuery || selectedTag !== 'All' || statusFilter !== 'all'
                  ? 'No entries match your search or filters. Try adjusting your search keywords.'
                  : 'Your spiritual journal is empty. Document your prayers, reflections, and answered moments of God’s grace.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                  setStatusFilter('all');
                  setActiveTab('All');
                  setShowAddModal(true);
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs cursor-pointer shadow-md inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Entry</span>
              </button>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const { badgeBg, iconBg, label, Icon } = getCategoryStyles(entry.category, entry.isAnswered);

              return (
                <div
                  key={entry.id}
                  className="bg-[#0A1226] hover:bg-[#0E1A36] border border-[#17254A] hover:border-[#223668] rounded-2xl p-4 sm:p-5 transition-all space-y-3 shadow-md group relative"
                >
                  {/* Top Bar: Icon, Title, Date, Category, and Answered Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Category Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${iconBg}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        {/* Title and Answered Status */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            onClick={() => setReadingEntry(entry)}
                            className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer truncate"
                          >
                            {entry.title}
                          </h3>

                          {/* Answered Status Badge */}
                          {entry.isAnswered ? (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold shrink-0">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Answered Prayer</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>Ongoing</span>
                            </span>
                          )}

                          {/* Category Badge */}
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md border font-medium uppercase tracking-wider shrink-0 ${badgeBg}`}
                          >
                            {label}
                          </span>
                        </div>

                        {/* Date and Metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>{entry.date}</span>
                          </span>
                          {entry.answeredDate && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-400 flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                <span>Answered on {entry.answeredDate}</span>
                              </span>
                            </>
                          )}
                          {entry.verseReference && (
                            <>
                              <span>•</span>
                              <span className="text-amber-300/90 font-medium">
                                {entry.verseReference}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Quick Answer Toggle & Menu */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleQuickAnswerToggle(entry)}
                        title={entry.isAnswered ? 'Click to mark as ongoing' : 'Praise God - Mark as Answered!'}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                          entry.isAnswered
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 shadow-sm'
                            : 'bg-[#0E1B38] border-slate-700 text-slate-300 hover:border-amber-400 hover:text-amber-300'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {entry.isAnswered ? 'Answered ✓' : 'Mark Answered'}
                        </span>
                      </button>

                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        title="Delete entry"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Devotional Preview */}
                  <div
                    onClick={() => setReadingEntry(entry)}
                    className="pl-0 sm:pl-13 cursor-pointer space-y-2"
                  >
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif-sacred line-clamp-3">
                      {entry.content}
                    </p>

                    {/* Testimony banner if answered */}
                    {entry.testimony && (
                      <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <strong className="text-emerald-300">Praise Testimony: </strong>
                          <span>{entry.testimony}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer: Tags and Read/Pray actions */}
                  <div className="pl-0 sm:pl-13 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {entry.tags && entry.tags.length > 0 ? (
                        entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#070D1B] text-slate-400 border border-slate-800"
                          >
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">No tags</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (onPrayFromJournal) {
                            onPrayFromJournal(entry.title, entry.content);
                          } else {
                            setCurrentPage('prayer-session');
                          }
                        }}
                        className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Pray with Pastor</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => setReadingEntry(entry)}
                        className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Read Full</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* ================= MODAL: RECORD TESTIMONY / MARK ANSWERED ================= */}
      {answeringEntry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0C152B] border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 text-left shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setAnsweringEntry(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 text-emerald-400">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Celebrate God’s Faithfulness</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Marking <strong className="text-amber-300">"{answeringEntry.title}"</strong> as an Answered Prayer! Would you like to record a short testimony of how God intervened?
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Praise Testimony (Optional)
              </label>
              <textarea
                rows={3}
                value={testimonyInput}
                onChange={(e) => setTestimonyInput(e.target.value)}
                placeholder="e.g. The doctor confirmed full recovery; peace was restored in our home..."
                className="w-full p-3 text-xs rounded-xl bg-[#070D1B] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setAnsweringEntry(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAnswered}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md hover:brightness-110 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Answered</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD NEW JOURNAL ENTRY ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0C152B] border border-[#20325C] rounded-2xl max-w-lg w-full p-6 text-left shadow-2xl relative space-y-4 my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#D49A2D] flex items-center justify-center text-slate-950 font-bold">
                <ChristianCross className="w-4 h-4 text-[#0A1128]" />
              </div>
              <h3 className="text-base font-bold text-white">Record God's Faithfulness</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Writing down your prayers and reflections anchors your soul in the promises of God.
            </p>

            <form onSubmit={handleCreateEntry} className="space-y-4 pt-1">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Breakthrough in healing / Peace during transition"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#070D1B] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              {/* Category & Verse */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#070D1B] border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer"
                  >
                    <option value="Prayers">🙏 Prayers (Petitions & Requests)</option>
                    <option value="Answers">✨ Answers (Praises & Breakthroughs)</option>
                    <option value="Notes">📖 Notes (Scripture & Reflections)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Scripture Anchor (Optional)
                  </label>
                  <input
                    type="text"
                    value={newVerseRef}
                    onChange={(e) => setNewVerseRef(e.target.value)}
                    placeholder="e.g. Philippians 4:6-7"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#070D1B] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              {/* Content Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    Your Reflection & Prayer *
                  </label>
                  <span className="text-[10px] text-slate-500">{newContent.length} chars</span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share what happened, how God touched your spirit, or what you are believing Him for in this season..."
                  className="w-full p-3 text-xs rounded-xl bg-[#070D1B] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 leading-relaxed"
                />
              </div>

              {/* Tag Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {suggestedTags.map((tag) => {
                    const isSelected = newTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleNewTag(tag)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                            : 'bg-[#070D1B] text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        +{tag}
                      </button>
                    );
                  })}
                </div>

                {/* Custom tag input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTag(e))}
                    placeholder="Add custom tag (press Enter)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[#070D1B] border border-slate-700 text-slate-100 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTag}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                  >
                    Add
                  </button>
                </div>

                {newTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newTags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => toggleNewTag(t)}
                          className="hover:text-red-400"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Already Answered Checkbox */}
              {newCategory !== 'Answers' && (
                <div className="p-3 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="mark-answered-immediate"
                    checked={isAnsweredImmediate}
                    onChange={(e) => setIsAnsweredImmediate(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
                  />
                  <label htmlFor="mark-answered-immediate" className="text-xs text-slate-300 cursor-pointer">
                    <span className="font-semibold text-white">Mark as Answered Prayer right away</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Check this if this entry represents a completed breakthrough or praise report.
                    </p>
                  </label>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: READ FULL ENTRY DEVOTIONAL ================= */}
      {readingEntry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0C152B] border border-[#20325C] rounded-2xl max-w-lg w-full p-6 text-left shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setReadingEntry(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                  {readingEntry.category}
                </span>
                {readingEntry.isAnswered && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Answered
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {readingEntry.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{readingEntry.date}</span>
                {readingEntry.answeredDate && (
                  <span>• Answered on {readingEntry.answeredDate}</span>
                )}
              </div>
            </div>

            {readingEntry.verseReference && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs italic font-serif-sacred">
                Anchor Scripture: {readingEntry.verseReference}
              </div>
            )}

            <div className="p-4 rounded-xl bg-[#070D1B] border border-slate-800/80">
              <p className="text-sm text-slate-200 leading-relaxed font-serif-sacred whitespace-pre-wrap">
                {readingEntry.content}
              </p>
            </div>

            {readingEntry.testimony && (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Praise Testimony</span>
                </div>
                <p className="text-emerald-200/90 leading-relaxed">
                  {readingEntry.testimony}
                </p>
              </div>
            )}

            {readingEntry.tags && readingEntry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {readingEntry.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  handleQuickAnswerToggle(readingEntry);
                  setReadingEntry({ ...readingEntry, isAnswered: !readingEntry.isAnswered });
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
              >
                {readingEntry.isAnswered ? 'Mark as Ongoing' : 'Mark as Answered'}
              </button>

              <button
                onClick={() => {
                  setReadingEntry(null);
                  if (onPrayFromJournal) {
                    onPrayFromJournal(readingEntry.title, readingEntry.content);
                  } else {
                    setCurrentPage('prayer-session');
                  }
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:brightness-110"
              >
                <span>🙏 Pray with Pastor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
