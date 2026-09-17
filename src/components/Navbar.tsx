import React, { useState } from 'react';
import { Page, User } from '../types';
import { Menu, X, Sparkles, User as UserIcon, ShieldCheck, LogOut } from 'lucide-react';
import { ChristianCross } from './SanctuaryLogo';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: User;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout?: () => void;
  isMobileSimulator?: boolean;
  setIsMobileSimulator?: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  user,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If in prayer session, let it have its dedicated focused layout
  if (currentPage === 'prayer-session') {
    return null;
  }

  const navLinks: { label: string; page: Page; action?: () => void }[] = [
    { label: 'Home', page: 'home' },
    {
      label: 'How It Works',
      page: 'home',
      action: () => {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById('how-it-works-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 750, behavior: 'smooth' });
          }
        }, 100);
      },
    },
    { label: 'Prayer Topics', page: 'prayer-topics' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Scripture', page: 'scripture' },
    { label: 'Journal', page: 'journal' },
  ];

  const handleNavClick = (link: { label: string; page: Page; action?: () => void }) => {
    if (link.action) {
      link.action();
    } else {
      setCurrentPage(link.page);
      if (link.page === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080E1E]/95 backdrop-blur-md border-b border-[#1A2645]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <button
          id="nav-logo-btn"
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D49A2D] to-[#B37E1E] flex items-center justify-center text-slate-950 shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
            <ChristianCross className="w-5 h-5 text-[#0A1128]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-brand text-lg tracking-wider font-bold text-white group-hover:text-amber-300 transition-colors">
                Sanctuary Pastor
              </span>
            </div>
            <p className="text-[10px] tracking-wide text-amber-300/80 font-medium">
              Your AI Christian Prayer Companion
            </p>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.label}
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-amber-300 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user.id ? (
            <div className="flex items-center gap-3">
              {/* Free prayer / Membership status pill */}
              <div
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
                  user.isPaid
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : user.freePrayersLeft > 0
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {user.isPaid
                    ? 'Subscriber Access'
                    : user.freePrayersLeft > 0
                    ? '1 Free Prayer'
                    : 'Free Prayer Used'}
                </span>
              </div>

              {/* User Dashboard */}
              <button
                id="user-dashboard-btn"
                onClick={() => setCurrentPage('dashboard')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                  currentPage === 'dashboard'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-[#101B36] text-slate-200 border-slate-700 hover:border-amber-400/40 hover:text-white'
                }`}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name || 'User'}
                    className="w-5 h-5 rounded-full object-cover border border-amber-400/50 shrink-0"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-[10px]">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span>Dashboard</span>
              </button>

              {/* Log Out Quick Action */}
              {onLogout && (
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#101B36] text-slate-400 border border-slate-700 hover:border-rose-500/40 hover:text-rose-300 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Log out of Sanctuary"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              )}

              {/* Admin Button ONLY if user.role === 'admin' */}
              {user.role === 'admin' && (
                <button
                  id="nav-admin-restricted-btn"
                  onClick={() => setCurrentPage('admin')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950/60 border border-indigo-500/50 text-indigo-300 flex items-center gap-1.5 hover:bg-indigo-900/60 transition-colors cursor-pointer"
                  title="Restricted Admin Console"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Admin</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="nav-login-btn"
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                id="nav-signup-btn"
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#D49A2D] to-[#C88A1E] text-slate-950 hover:brightness-110 shadow-sm transition-all cursor-pointer font-sans"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1128] border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-300 hover:bg-slate-800/50 cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            {user.id ? (
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setCurrentPage('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-amber-300 bg-amber-400/10 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span>Dashboard ({user.name})</span>
                  </div>
                  <span className="text-xs text-amber-200">
                    {user.isPaid ? 'Subscriber' : user.freePrayersLeft > 0 ? '1 Free Prayer' : 'Used'}
                  </span>
                </button>
                {onLogout && (
                  <button
                    id="mobile-nav-logout-btn"
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center rounded-lg text-sm font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center rounded-lg text-sm font-bold bg-amber-400 text-slate-950 hover:bg-amber-300"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
