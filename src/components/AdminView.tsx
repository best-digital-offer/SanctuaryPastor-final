import React, { useState } from 'react';
import { Page, User, PrayerSession } from '../types';
import { ADMIN_METRICS } from '../data/mockData';
import { ChristianCross } from './SanctuaryLogo';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  DollarSign,
  Heart,
  Cpu,
  Volume2,
  Mail,
  BarChart3,
  BookOpen,
  HelpCircle,
  Settings,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  Filter,
  Calendar,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface AdminViewProps {
  user: User;
  prayers: PrayerSession[];
  setCurrentPage: (page: Page) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ user, prayers, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'prayers' | 'emails' | 'ai-usage'>('dashboard');
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  // RBAC: strict authorization check
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#070D1B] flex items-center justify-center p-4">
        <div className="bg-[#0D162F] border border-red-500/30 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif-sacred">403 — Unauthorized</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            This administrative control surface is restricted exclusively to authorized pastoral administrators. Your current account does not hold administrative credentials.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs hover:brightness-110 cursor-pointer transition-all"
            >
              Return to User Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'prayers', label: 'Prayers', icon: Heart },
    { id: 'ai-usage', label: 'AI Usage', icon: Cpu },
    { id: 'voice-usage', label: 'Voice Usage', icon: Volume2 },
    { id: 'emails', label: 'Emails', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'scripture', label: 'Scripture', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col md:flex-row">
      {/* 1. Dark Admin Sidebar matching reference #10 */}
      <aside className="w-full md:w-64 bg-[#091124] border-r border-[#152347] flex flex-col justify-between shrink-0 p-4">
        <div className="space-y-5">
          {/* Brand */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-7 h-7 rounded-lg bg-[#D49A2D] flex items-center justify-center text-slate-950 font-bold">
                <ChristianCross className="w-4 h-4 text-[#0A1128]" />
              </div>
              <span className="font-brand text-base font-bold text-white tracking-wider">
                Sanctuary Pastor
              </span>
            </button>
          </div>

          {/* Admin Profile matching reference #10 */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0E1A38] border border-[#1C2C55]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs border border-indigo-400">
              A
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white">Admin</h4>
              <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                Super Admin
              </span>
            </div>
          </div>

          {/* Navigation Menu matching reference #10 */}
          <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (['dashboard', 'users', 'prayers', 'emails', 'ai-usage'].includes(item.id)) {
                      setActiveTab(item.id as any);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/20 text-amber-300 font-semibold border border-amber-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E1A38]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to App */}
        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full py-2 rounded-xl bg-[#0C152B] hover:bg-[#142347] border border-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User App</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Admin Dashboard Area matching reference #10 */}
      <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-6xl mx-auto w-full">
        {/* Header & Date Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Overview of your platform metrics and prayer sessions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="pl-3 pr-8 py-2 text-xs rounded-xl bg-[#0C152B] border border-slate-700 text-slate-200 focus:outline-none cursor-pointer appearance-none"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
                <option value="Year to Date">Year to Date</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 6 Key Metric Cards matching reference #10 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* 1. Total Users */}
          <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-4 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Total Users</span>
            <div className="text-xl sm:text-2xl font-bold text-white font-serif-sacred">
              {ADMIN_METRICS.totalUsers.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>{ADMIN_METRICS.totalUsersChange}</span>
            </div>
          </div>

          {/* 2. New Users */}
          <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-4 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">New Users</span>
            <div className="text-xl sm:text-2xl font-bold text-white font-serif-sacred">
              {ADMIN_METRICS.newUsers.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>{ADMIN_METRICS.newUsersChange}</span>
            </div>
          </div>

          {/* 3. Paid Users */}
          <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-4 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Paid Users</span>
            <div className="text-xl sm:text-2xl font-bold text-amber-300 font-serif-sacred">
              {ADMIN_METRICS.paidUsers.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>{ADMIN_METRICS.paidUsersChange}</span>
            </div>
          </div>

          {/* 4. Prayer Sessions */}
          <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-4 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Prayer Sessions</span>
            <div className="text-xl sm:text-2xl font-bold text-white font-serif-sacred">
              {ADMIN_METRICS.prayerSessions.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>{ADMIN_METRICS.prayerSessionsChange}</span>
            </div>
          </div>

          {/* 5. Monthly Revenue */}
          <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-4 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Monthly Revenue</span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-serif-sacred">
              ${ADMIN_METRICS.monthlyRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>{ADMIN_METRICS.mrrGrowth}</span>
            </div>
          </div>

          {/* 6. Churn */}
          <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-4 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium">Churn Rate</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-200 font-serif-sacred">
              {ADMIN_METRICS.churnRate}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" />
              <span>-1%</span>
            </div>
          </div>
        </div>

        {/* User Growth Chart matching reference #10 */}
        <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">User Growth</h3>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Active Growth +24% MoM
            </span>
          </div>

          {/* Clean SVG Area Curve matching reference line graph */}
          <div className="h-44 w-full relative pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 140" preserveAspectRatio="none">
              <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="35" x2="600" y2="35" stroke="#17254A" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="600" y2="70" stroke="#17254A" strokeDasharray="3 3" />
              <line x1="0" y1="105" x2="600" y2="105" stroke="#17254A" strokeDasharray="3 3" />

              {/* Area */}
              <path
                d="M 0 100 Q 100 80, 200 82 T 300 65 T 400 75 T 500 35 T 600 20 L 600 140 L 0 140 Z"
                fill="url(#growthGradient)"
              />
              {/* Curve Line */}
              <path
                d="M 0 100 Q 100 80, 200 82 T 300 65 T 400 75 T 500 35 T 600 20"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Dots */}
              <circle cx="0" cy="100" r="4" fill="#60A5FA" />
              <circle cx="100" cy="80" r="4" fill="#60A5FA" />
              <circle cx="200" cy="82" r="4" fill="#60A5FA" />
              <circle cx="300" cy="65" r="4" fill="#60A5FA" />
              <circle cx="400" cy="75" r="4" fill="#60A5FA" />
              <circle cx="500" cy="35" r="4" fill="#60A5FA" />
              <circle cx="600" cy="20" r="4" fill="#E5A93C" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        {/* Bottom 2 Panels matching reference #10: Top Topics & Users by Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel 1: Top Prayer Topics */}
          <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Top Prayer Topics</h3>
            <div className="space-y-3">
              {ADMIN_METRICS.topTopics.map((item) => (
                <div key={item.topic} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.topic}</span>
                    <span className="text-amber-300 font-bold">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#070D1B] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Users by Country */}
          <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Users by Country</h3>
            <div className="space-y-2.5">
              {ADMIN_METRICS.usersByCountry.map((item) => (
                <div
                  key={item.country}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#070D1B] border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <span className="text-slate-200 font-medium">{item.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email sequences breakdown (as requested in prompt for free users & transactional) */}
        <div className="bg-[#0A1226] border border-[#17254A] rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Transactional & Nurture Sequences</h3>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Active Provider: Resend / Postmark
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#070D1B] p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Immediately</span>
              <p className="font-semibold text-slate-200">Your Prayer Is Always Close</p>
              <span className="text-emerald-400 text-[10px]">Delivered to 100% of new users</span>
            </div>
            <div className="bg-[#070D1B] p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Day 1 Drip</span>
              <p className="font-semibold text-slate-200">What’s On Your Heart Today?</p>
              <span className="text-blue-400 text-[10px]">Open rate: 64.2%</span>
            </div>
            <div className="bg-[#070D1B] p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Day 7 Drip</span>
              <p className="font-semibold text-slate-200">Continue Your Prayer Journey</p>
              <span className="text-amber-400 text-[10px]">Conversion to Paid: 18.6%</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
