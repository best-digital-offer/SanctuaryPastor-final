import React, { useState } from 'react';
import { Page, User, PrayerSession, JournalEntry } from '../types';
import { IMAGES } from '../assets/images';
import { ChristianCross } from './SanctuaryLogo';
import { DEFAULT_AVATAR } from '../data/avatars';
import { AvatarSelectorModal } from './AvatarSelectorModal';
import {
  Home,
  Mic,
  Bookmark,
  BookOpen,
  Calendar,
  Users,
  CreditCard,
  User as UserIcon,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Heart,
  Volume2,
  Clock,
  LogOut,
  X,
  Mail,
  Shield,
  Camera,
} from 'lucide-react';

interface DashboardViewProps {
  user: User;
  prayers: PrayerSession[];
  journalEntries: JournalEntry[];
  onStartPrayer: (initialText?: string) => void;
  onOpenPrayerSession: (prayer: PrayerSession) => void;
  setCurrentPage: (page: Page) => void;
  onOpenPricing: () => void;
  onLogout: () => void;
  onUpdateAvatar?: (avatarUrl: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  prayers,
  journalEntries,
  onStartPrayer,
  onOpenPrayerSession,
  setCurrentPage,
  onOpenPricing,
  onLogout,
  onUpdateAvatar,
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const savedCount = prayers.filter((p) => p.isSaved).length;
  const answeredCount = journalEntries.filter((j) => j.isAnswered).length + prayers.filter((p) => p.isAnswered).length;

  const sidebarLinks = [
    { label: 'Home', page: 'home' as Page, icon: Home },
    { label: 'Pray Now', page: 'prayer-session' as Page, icon: Sparkles, active: true },
    { label: 'Talk to Pastor', page: 'prayer-session' as Page, icon: Mic },
    { label: 'My Prayers', page: 'prayer-session' as Page, icon: Bookmark },
    { label: 'Prayer Journal', page: 'journal' as Page, icon: BookOpen },
    { label: 'Daily Prayer', page: 'prayer-session' as Page, icon: Calendar },
    { label: 'Pray For Someone', page: 'pray-for-someone' as Page, icon: Users },
    { label: 'Scripture', page: 'scripture' as Page, icon: BookOpen },
    { label: 'Subscription', page: 'pricing' as Page, icon: CreditCard },
    { label: 'Account & Profile', isProfileTrigger: true, icon: UserIcon },
  ];

  if (!user.id) {
    return (
      <div className="min-h-screen bg-[#070D1B] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#091124] border border-[#152347] rounded-2xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#D49A2D] flex items-center justify-center text-slate-950 font-bold shadow-lg">
            <ChristianCross className="w-6 h-6 text-[#0A1128]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Sign In to Sanctuary Pastor</h2>
            <p className="text-xs text-slate-400">
              You are currently logged out. Sign in to view your personalized prayer dashboard, answered prayer history, and spiritual journal.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              id="dash-loggedout-signin-btn"
              onClick={() => setCurrentPage('signup')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] hover:brightness-110 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Sign In / Create Account
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="w-full py-2.5 rounded-xl bg-[#0E1A38] border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col md:flex-row">
      {/* 1. Left Sidebar matching reference #5 */}
      <aside className="w-full md:w-64 bg-[#091124] border-r border-[#152347] flex flex-col justify-between shrink-0 p-4">
        <div className="space-y-6">
          {/* Brand */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2.5 text-left w-full focus:outline-none"
          >
            <div className="w-7 h-7 rounded-lg bg-[#D49A2D] flex items-center justify-center text-slate-950 font-bold">
              <ChristianCross className="w-4 h-4 text-[#0A1128]" />
            </div>
            <span className="font-brand text-base font-bold text-white tracking-wider">
              Sanctuary Pastor
            </span>
          </button>

          {/* User Profile Block with Logout Button */}
          <div className="p-3 rounded-xl bg-[#0E1A38] border border-[#1C2C55] space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={user.avatarUrl || DEFAULT_AVATAR}
                  alt={user.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/40 bg-slate-900 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowAvatarSelector(true)}
                  title="Change Avatar"
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow hover:scale-110 transition-transform cursor-pointer"
                >
                  <Camera className="w-2.5 h-2.5" />
                </button>
              </div>
              <div
                onClick={() => setShowProfileModal(true)}
                className="min-w-0 flex-1 cursor-pointer group"
                title="Click to view profile details"
              >
                <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                  {user.name || 'Faith Member'}
                </h4>
                <p className="text-[10px] text-slate-400 truncate">{user.email || 'Member account'}</p>
                <span className="inline-block mt-0.5 text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-amber-300 font-medium border border-amber-500/20">
                  {user.isPaid ? 'Paid Subscriber' : 'Free User'}
                </span>
              </div>
            </div>

            {/* Profile actions bar */}
            <div className="pt-2 border-t border-[#1C2C55]/80 flex items-center justify-between">
              <button
                id="profile-view-modal-btn"
                onClick={() => setShowProfileModal(true)}
                className="text-[11px] text-slate-300 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
              >
                <UserIcon className="w-3 h-3 text-slate-400" />
                <span>Profile</span>
              </button>

              <button
                id="profile-card-logout-btn"
                onClick={onLogout}
                className="text-[11px] text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2 py-1 rounded transition-colors flex items-center gap-1 font-semibold cursor-pointer border border-rose-500/20"
                title="Log out of your account"
              >
                <LogOut className="w-3 h-3 text-rose-400" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="space-y-1">
            {sidebarLinks.map((item, idx) => {
              const Icon = item.icon;
              const isCurrent = item.label === 'Pray Now';
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.isProfileTrigger) {
                      setShowProfileModal(true);
                    } else if (item.page) {
                      setCurrentPage(item.page);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600/20 text-amber-300 font-semibold border border-amber-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E1A38]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Prominent Sidebar Logout Button */}
            <button
              id="sidebar-logout-nav-btn"
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/15 transition-all text-left cursor-pointer mt-2 border border-rose-500/20"
            >
              <LogOut className="w-4 h-4 shrink-0 text-rose-400" />
              <span>Log Out</span>
            </button>
          </nav>
        </div>

        {/* Free Prayer Tracker Widget at bottom matching reference #5 */}
        <div className="pt-6">
          <div className="bg-[#0D1836] border border-[#1E2E59] rounded-xl p-3.5 space-y-2 text-center">
            <p className="text-xs text-slate-300">
              {user.isPaid ? (
                <span className="text-emerald-300 font-semibold">Unlimited Access Active</span>
              ) : (
                <>
                  You have <span className="text-amber-400 font-bold">{user.freePrayersLeft}</span> free prayer left
                </>
              )}
            </p>
            {!user.isPaid && (
              <button
                id="sidebar-upgrade-btn"
                onClick={onOpenPricing}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] hover:brightness-110 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Upgrade Now
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* 2. Main Dashboard Area matching reference #5 */}
      <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-5xl mx-auto w-full">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-serif-sacred text-base">
              How can we pray for you today?
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              id="dash-pray-now-btn"
              onClick={() => onStartPrayer()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md hover:brightness-105 transition-all cursor-pointer"
            >
              <span>🙏</span>
              <span>Pray Now</span>
            </button>
            <button
              id="dash-talk-to-pastor-btn"
              onClick={() => onStartPrayer()}
              className="px-4 py-2.5 rounded-xl bg-[#0E1A38] border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              <span>Talk to Pastor</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Cards matching reference #5 (Prayers, Saved, Journal Entries, Answered) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Card 1: Prayers */}
          <div className="bg-[#0B152F] border border-[#1B2950] rounded-xl p-4 text-center space-y-1">
            <div className="font-serif-sacred text-3xl font-bold text-white">
              {prayers.length}
            </div>
            <p className="text-xs text-slate-400 font-medium">Prayers</p>
          </div>

          {/* Card 2: Saved */}
          <div className="bg-[#0B152F] border border-[#1B2950] rounded-xl p-4 text-center space-y-1">
            <div className="font-serif-sacred text-3xl font-bold text-amber-300">
              {savedCount}
            </div>
            <p className="text-xs text-slate-400 font-medium">Saved</p>
          </div>

          {/* Card 3: Journal Entries */}
          <div className="bg-[#0B152F] border border-[#1B2950] rounded-xl p-4 text-center space-y-1">
            <div className="font-serif-sacred text-3xl font-bold text-blue-300">
              {journalEntries.length}
            </div>
            <p className="text-xs text-slate-400 font-medium">Journal Entries</p>
          </div>

          {/* Card 4: Answered */}
          <div className="bg-[#0B152F] border border-[#1B2950] rounded-xl p-4 text-center space-y-1">
            <div className="font-serif-sacred text-3xl font-bold text-emerald-400">
              {answeredCount}
            </div>
            <p className="text-xs text-slate-400 font-medium">Answered</p>
          </div>
        </div>

        {/* Recent Prayers List matching reference #5 */}
        <div className="bg-[#091124] border border-[#152347] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Recent Prayers</h3>
            <button
              onClick={() => setCurrentPage('journal')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium hover:underline"
            >
              View All
            </button>
          </div>

          {prayers.length === 0 ? (
            <div className="text-center py-8 px-4 bg-[#0D1836] rounded-xl border border-[#1E2E59] space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-semibold text-white">Your Prayer Sanctuary is Ready</h4>
                <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                  You haven't recorded any prayers yet. Share what is on your heart to receive a comforting pastoral prayer and scripture.
                </p>
              </div>
              <button
                onClick={() => onStartPrayer()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs hover:brightness-110 shadow transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Start Your First Prayer</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {prayers.slice(0, 3).map((prayer) => (
                <div
                  key={prayer.id}
                  onClick={() => onOpenPrayerSession(prayer)}
                  className="bg-[#0D1836] hover:bg-[#12224A] border border-[#1E2E59] rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={IMAGES.pastorPraying}
                      alt="Sanctuary Pastor"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-amber-400/40 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                        {prayer.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{prayer.date}</span>
                        <span>•</span>
                        <span className="text-amber-300/80">{prayer.topic}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      {prayer.audioDuration}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center text-slate-400 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Today's Verse Card matching reference #5 */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 p-6 sm:p-7 shadow-lg">
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.crossSunrise}
              alt="Today's Verse Cross"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070D1B]/95 via-[#070D1B]/85 to-[#070D1B]/60" />
          </div>

          <div className="relative z-10 max-w-xl space-y-2">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
              Today's Verse
            </span>
            <p className="font-serif-sacred text-lg sm:text-xl text-white leading-relaxed italic">
              “The Lord is my shepherd, I shall not want.”
            </p>
            <p className="text-xs font-bold text-amber-400">Psalm 23:1</p>
          </div>
        </div>
      </main>

      {/* Account & Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A1128] border border-[#1C2C55] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl space-y-5 p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2C55]">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Account & Profile</h3>
              </div>
              <button
                id="close-profile-modal-btn"
                onClick={() => setShowProfileModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Card */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0E1A38] border border-[#1C2C55]">
              <div className="relative shrink-0">
                <img
                  src={user.avatarUrl || DEFAULT_AVATAR}
                  alt={user.name || 'User'}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/50 bg-slate-900 shadow-md"
                />
                <button
                  type="button"
                  id="modal-change-avatar-btn"
                  onClick={() => setShowAvatarSelector(true)}
                  title="Change avatar or upload photo"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white truncate">
                    {user.name || 'Believer in Christ'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAvatarSelector(true)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer shrink-0"
                  >
                    Change Avatar
                  </button>
                </div>
                <p className="text-xs text-slate-300 truncate mt-0.5">{user.email || 'No email registered'}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${
                    user.isPaid
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}>
                    {user.isPaid ? 'Paid Subscriber' : 'Free Account'}
                  </span>
                  {!user.isPaid && (
                    <span className="text-[10px] text-amber-400 font-medium">
                      {user.freePrayersLeft} free prayer left
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Membership Details */}
            <div className="bg-[#0D1836] border border-[#1E2E59] rounded-xl p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Account Type</span>
                <span className="font-semibold text-white">{user.isPaid ? 'Sanctuary Unlimited' : 'Free Tier'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Prayer Vault Access</span>
                <span className="font-semibold text-emerald-400">Full Audio & Scripture</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Spiritual Journal</span>
                <span className="font-semibold text-white">Active</span>
              </div>
            </div>

            {/* Upgrade CTA if free */}
            {!user.isPaid && (
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  onOpenPricing();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 text-xs font-bold transition-all hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upgrade for Unlimited Pastoral Prayers</span>
              </button>
            )}

            {/* Prominent Profile Logout Action */}
            <div className="pt-2 border-t border-[#1C2C55] space-y-2">
              <button
                id="modal-logout-btn"
                onClick={() => {
                  setShowProfileModal(false);
                  onLogout();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Sanctuary Pastor</span>
              </button>
              <p className="text-[10px] text-center text-slate-500">
                You can log back in anytime to access your saved prayers and journal entries.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sacred Emblem & Photo Avatar Selector Modal */}
      {showAvatarSelector && (
        <AvatarSelectorModal
          currentAvatar={user.avatarUrl || DEFAULT_AVATAR}
          onSaveAvatar={(avatarUrl) => {
            onUpdateAvatar?.(avatarUrl);
            setShowAvatarSelector(false);
          }}
          onClose={() => setShowAvatarSelector(false)}
        />
      )}
    </div>
  );
};
