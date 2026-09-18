export type Page =
  | 'home'
  | 'signup'
  | 'login'
  | 'prayer-session'
  | 'prayer-topics'
  | 'pricing'
  | 'dashboard'
  | 'pray-for-someone'
  | 'journal'
  | 'scripture'
  | 'prayer-books'
  | 'admin';

export interface PrayerBook {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  reviewsCount: string;
  amazonUrl: string;
  imageUrl: string;
  coverGradient: string;
  accentColor: string;
  description: string;
  keyVerse?: string;
  badge?: string;
  price?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPaid: boolean;
  plan?: 'weekly' | 'monthly' | 'yearly';
  freePrayersLeft: number;
  avatarUrl?: string;
  role?: 'user' | 'admin';
}

export interface PrayerSession {
  id: string;
  title: string;
  userRequest: string;
  prayerText: string;
  scriptureReference: string;
  scriptureText: string;
  date: string;
  durationSeconds: number;
  topic: string;
  isSaved: boolean;
  isAnswered?: boolean;
  audioDuration?: string;
  language?: string;
  recipientName?: string;
  relationship?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Prayers' | 'Answers' | 'Notes';
  isAnswered: boolean;
  tags: string[];
  answeredDate?: string;
  testimony?: string;
  verseReference?: string;
}

export interface ScriptureItem {
  id: string;
  reference: string;
  text: string;
  category: 'Peace' | 'Healing' | 'Strength' | 'Family' | 'Faith' | 'Hope' | 'Protection';
  isSaved?: boolean;
}

export interface PricingPlan {
  id: 'weekly' | 'monthly' | 'yearly';
  name: string;
  price: string;
  period: string;
  subtext: string;
  isPopular?: boolean;
  savings?: string;
  features: string[];
}

export interface AdminMetrics {
  totalUsers: number;
  totalUsersChange: string;
  newUsers: number;
  newUsersChange: string;
  paidUsers: number;
  paidUsersChange: string;
  prayerSessions: number;
  prayerSessionsChange: string;
  monthlyRevenue: number;
  mrrGrowth: string;
  churnRate: string;
  userGrowth: { month: string; users: number }[];
  topTopics: { topic: string; percentage: number }[];
  usersByCountry: { country: string; flag: string; percentage: number }[];
}

export type LanguageCode = 'en' | 'es' | 'hi' | 'te' | 'pt' | 'fr' | 'de' | 'it';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
}
