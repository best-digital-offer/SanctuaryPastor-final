import React, { useState, useEffect } from 'react';
import { Page, User, PrayerSession, JournalEntry } from './types';
import { INITIAL_USER, INITIAL_PRAYERS, MOCK_JOURNAL_ENTRIES } from './data/mockData';
import { generatePrayerSession } from './services/prayerService';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomeView } from './components/HomeView';
import { SignupView } from './components/SignupView';
import { PrayerSessionView } from './components/PrayerSessionView';
import { PricingView } from './components/PricingView';
import { DashboardView } from './components/DashboardView';
import { PrayForSomeoneView } from './components/PrayForSomeoneView';
import { PrayerJournalView } from './components/PrayerJournalView';
import { ScriptureView } from './components/ScriptureView';
import { PrayerTopicsView } from './components/PrayerTopicsView';
import { AdminView } from './components/AdminView';
import { LegalModal, LegalTopic } from './components/LegalModal';

// User-scoped storage keys to ensure each user has their own distinct prayers and journal
const getPrayerStorageKey = (userId?: string) =>
  userId ? `sanctuary_prayers_${userId}` : 'sanctuary_prayers_guest';

const getJournalStorageKey = (userId?: string) =>
  userId ? `sanctuary_journal_${userId}` : 'sanctuary_journal_guest';

const loadUserPrayers = (currentUser: User): PrayerSession[] => {
  if (!currentUser?.id) return [];
  try {
    const key = getPrayerStorageKey(currentUser.id);
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
    // Only the demo account 'user_john_doe' gets INITIAL_PRAYERS as sample data
    if (currentUser.id === 'user_john_doe') {
      return INITIAL_PRAYERS;
    }
  } catch (e) {
    console.error('Failed to load user prayers', e);
  }
  return [];
};

const loadUserJournal = (currentUser: User): JournalEntry[] => {
  if (!currentUser?.id) return [];
  try {
    const key = getJournalStorageKey(currentUser.id);
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
    // Only the demo account 'user_john_doe' gets MOCK_JOURNAL_ENTRIES as sample data
    if (currentUser.id === 'user_john_doe') {
      return MOCK_JOURNAL_ENTRIES;
    }
  } catch (e) {
    console.error('Failed to load user journal entries', e);
  }
  return [];
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Persist User state with free prayer quota & subscription status
  const [user, setUser] = useState<User>(() => {
    try {
      const savedUser = localStorage.getItem('sanctuary_user_v2');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
    return INITIAL_USER;
  });

  // Persist user-scoped prayers
  const [prayers, setPrayers] = useState<PrayerSession[]>(() => loadUserPrayers(user));

  // Current prayer session (null means empty state)
  const [currentPrayer, setCurrentPrayer] = useState<PrayerSession | null>(null);
  const [initialPrayerPrompt, setInitialPrayerPrompt] = useState<string>('');

  // Persist user-scoped journal entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => loadUserJournal(user));

  const [legalModalType, setLegalModalType] = useState<LegalTopic>(null);

  // Sync user state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sanctuary_user_v2', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user state', e);
    }
  }, [user]);

  // Sync user-specific prayers
  useEffect(() => {
    if (!user.id) return;
    try {
      localStorage.setItem(getPrayerStorageKey(user.id), JSON.stringify(prayers));
    } catch (e) {
      console.error('Failed to save prayers state', e);
    }
  }, [prayers, user.id]);

  // Sync user-specific journal entries
  useEffect(() => {
    if (!user.id) return;
    try {
      localStorage.setItem(getJournalStorageKey(user.id), JSON.stringify(journalEntries));
    } catch (e) {
      console.error('Failed to save journal entries', e);
    }
  }, [journalEntries, user.id]);

  // When active user ID switches, load that user's specific data
  useEffect(() => {
    if (!user.id) {
      setPrayers([]);
      setJournalEntries([]);
    } else {
      setPrayers(loadUserPrayers(user));
      setJournalEntries(loadUserJournal(user));
    }
  }, [user.id]);

  // Handle starting a prayer from home, dashboard, or topic
  const handleStartPrayer = (initialText?: string) => {
    if (initialText) {
      setInitialPrayerPrompt(initialText);
    } else {
      setInitialPrayerPrompt('');
    }
    // Set current prayer to null so user sees the welcoming empty state
    // and explicitly presses "Pray With Me" (No autoplay)
    setCurrentPrayer(null);
    setCurrentPage('prayer-session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open existing prayer session from Vault / Dashboard
  const handleOpenPrayerSession = (prayer: PrayerSession) => {
    setCurrentPrayer(prayer);
    setInitialPrayerPrompt('');
    setCurrentPage('prayer-session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate prayer with 1-free-prayer enforcement (Problem 16)
  const handleNewPrayerRequest = async (prompt: string, topic?: string) => {
    if (!user.isPaid && user.freePrayersLeft <= 0) {
      setCurrentPage('pricing');
      return;
    }

    const session = await generatePrayerSession(prompt, topic, user.name);
    setPrayers((prev) => [session, ...prev]);
    setCurrentPrayer(session);

    // Decrement free prayer quota if not paid subscriber
    if (!user.isPaid) {
      setUser((prev) => ({
        ...prev,
        freePrayersLeft: Math.max(0, prev.freePrayersLeft - 1),
      }));
    }
  };

  // Intercession prayer generation ("Pray For Someone")
  const handleGenerateIntercession = async (recipientName: string, relationship: string, request: string) => {
    if (!user.isPaid && user.freePrayersLeft <= 0) {
      setCurrentPage('pricing');
      return;
    }

    const fullPrompt = `Father in heaven, I lift up ${recipientName}${relationship ? ` (${relationship})` : ''} into Your gracious hands: ${request}. Surround them with Your supernatural peace, protection, and divine grace.`;
    const generated = await generatePrayerSession(
      fullPrompt,
      'Family',
      user.name
    );
    setPrayers((prev) => [generated, ...prev]);
    setCurrentPrayer(generated);

    if (!user.isPaid) {
      setUser((prev) => ({
        ...prev,
        freePrayersLeft: Math.max(0, prev.freePrayersLeft - 1),
      }));
    }

    setCurrentPage('prayer-session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pray this scripture
  const handlePrayScripture = async (reference: string, text: string) => {
    if (!user.isPaid && user.freePrayersLeft <= 0) {
      setCurrentPage('pricing');
      return;
    }

    const prompt = `Lord, teach me to walk in the eternal promise of ${reference}: "${text}". Fill my heart with understanding, peace, and spiritual strength.`;
    const generated = await generatePrayerSession(prompt, 'Scripture', user.name);
    setPrayers((prev) => [generated, ...prev]);
    setCurrentPrayer(generated);

    if (!user.isPaid) {
      setUser((prev) => ({
        ...prev,
        freePrayersLeft: Math.max(0, prev.freePrayersLeft - 1),
      }));
    }

    setCurrentPage('prayer-session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subscribe success
  const handleSubscribeSuccess = (planId: 'weekly' | 'monthly' | 'yearly') => {
    setUser((prev) => ({
      ...prev,
      isPaid: true,
      subscriptionPlan: planId,
    }));
  };

  // Toggle save prayer in vault
  const handleToggleSavePrayer = (id: string) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  // Journal handlers
  const handleAddJournalEntry = (newEntry: Omit<JournalEntry, 'id' | 'date'>) => {
    const entry: JournalEntry = {
      ...newEntry,
      id: `journal-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setJournalEntries((prev) => [entry, ...prev]);
  };

  const handleToggleAnsweredJournal = (id: string, testimony?: string) => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setJournalEntries((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          const nextAnswered = !j.isAnswered;
          return {
            ...j,
            isAnswered: nextAnswered,
            answeredDate: nextAnswered ? (j.answeredDate || today) : undefined,
            testimony: testimony !== undefined ? testimony : j.testimony,
          };
        }
        return j;
      })
    );
  };

  const handlePrayFromJournal = async (title: string, content: string) => {
    if (!user.isPaid && user.freePrayersLeft <= 0) {
      setCurrentPage('pricing');
      return;
    }

    const prompt = `Lord, hear my heart regarding "${title}": ${content}. Draw near, grant spiritual discernment, and let Your peace rule in my heart.`;
    const generated = await generatePrayerSession(prompt, 'Reflection', user.name);
    setPrayers((prev) => [generated, ...prev]);
    setCurrentPrayer(generated);

    if (!user.isPaid) {
      setUser((prev) => ({
        ...prev,
        freePrayersLeft: Math.max(0, prev.freePrayersLeft - 1),
      }));
    }

    setCurrentPage('prayer-session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((j) => j.id !== id));
  };

  const handleSignupSuccess = (newUser: User) => {
    setUser(newUser);
    setPrayers(loadUserPrayers(newUser));
    setJournalEntries(loadUserJournal(newUser));
    setCurrentPage('dashboard');
  };

  const handleUpdateAvatar = (newAvatarUrl: string) => {
    setUser((prev) => ({
      ...prev,
      avatarUrl: newAvatarUrl,
    }));
  };

  const handleLogout = () => {
    const loggedOutUser: User = {
      id: '',
      name: '',
      email: '',
      isPaid: false,
      freePrayersLeft: 1,
      role: 'user',
      avatarUrl: '',
    };
    setUser(loggedOutUser);
    setPrayers([]);
    setJournalEntries([]);
    try {
      localStorage.removeItem('sanctuary_user_v2');
    } catch (e) {
      console.error('Failed to clear user', e);
    }
    setCurrentPage('home');
  };

  // Determine pages with standard global Navbar & Footer
  const showStandardHeaderFooter = [
    'home',
    'pricing',
    'prayer-topics',
    'scripture',
    'pray-for-someone',
    'journal',
  ].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 pb-16 md:pb-0">
      {/* Global Navbar */}
      {showStandardHeaderFooter && (
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          user={user}
          onOpenAuth={() => setCurrentPage('signup')}
          onLogout={handleLogout}
        />
      )}

      {/* Primary View Routing */}
      <div className="flex-1 flex flex-col">
        {currentPage === 'home' && (
          <HomeView
            onStartPrayer={handleStartPrayer}
            setCurrentPage={setCurrentPage}
            onOpenAuth={() => setCurrentPage('signup')}
          />
        )}

        {currentPage === 'signup' && (
          <SignupView
            onLoginSuccess={handleSignupSuccess}
            setCurrentPage={setCurrentPage}
            onOpenLegal={(topic) => setLegalModalType(topic)}
          />
        )}

        {currentPage === 'prayer-session' && (
          <PrayerSessionView
            currentPrayer={currentPrayer}
            initialPrompt={initialPrayerPrompt}
            onSavePrayerToggle={handleToggleSavePrayer}
            onNewPrayerRequest={handleNewPrayerRequest}
            onEndSession={() => {
              setCurrentPrayer(null);
              setCurrentPage('dashboard');
            }}
            onOpenPricing={() => setCurrentPage('pricing')}
            setCurrentPage={setCurrentPage}
            user={user}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingView
            user={user}
            onSubscribeSuccess={handleSubscribeSuccess}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardView
            user={user}
            prayers={prayers}
            journalEntries={journalEntries}
            onStartPrayer={handleStartPrayer}
            onOpenPrayerSession={handleOpenPrayerSession}
            setCurrentPage={setCurrentPage}
            onOpenPricing={() => setCurrentPage('pricing')}
            onLogout={handleLogout}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}

        {currentPage === 'pray-for-someone' && (
          <PrayForSomeoneView
            onGenerateIntercession={handleGenerateIntercession}
            setCurrentPage={setCurrentPage}
            user={user}
          />
        )}

        {currentPage === 'journal' && (
          <PrayerJournalView
            entries={journalEntries}
            onAddEntry={handleAddJournalEntry}
            onToggleAnswered={handleToggleAnsweredJournal}
            onDeleteEntry={handleDeleteJournalEntry}
            setCurrentPage={setCurrentPage}
            onPrayFromJournal={handlePrayFromJournal}
          />
        )}

        {currentPage === 'scripture' && (
          <ScriptureView
            onPrayScripture={handlePrayScripture}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'prayer-topics' && (
          <PrayerTopicsView
            onSelectTopic={(topic, prompt) => handleStartPrayer(prompt)}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'admin' && (
          <AdminView
            user={user}
            prayers={prayers}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>

      {/* Global Footer */}
      {showStandardHeaderFooter && (
        <Footer
          setCurrentPage={setCurrentPage}
          onOpenLegal={(type) => setLegalModalType(type)}
        />
      )}

      {/* Mobile Responsive Bottom Navigation */}
      <MobileBottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onOpenAuth={() => setCurrentPage('signup')}
      />

      {/* Global Legal & Crisis Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
