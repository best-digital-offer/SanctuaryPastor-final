import React from 'react';
import { Page, User } from '../types';
import { Home, Sparkles, BookOpen, Bookmark, User as UserIcon } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: User;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  setCurrentPage,
  user,
  onOpenAuth,
}) => {
  const items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
    isActive: boolean;
  }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentPage === 'home',
    },
    {
      id: 'pray',
      label: 'Pray',
      icon: Sparkles,
      action: () => setCurrentPage('prayer-session'),
      isActive: currentPage === 'prayer-session' || currentPage === 'prayer-topics' || currentPage === 'pray-for-someone',
    },
    {
      id: 'books',
      label: 'Books',
      icon: BookOpen,
      action: () => {
        setCurrentPage('prayer-books');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentPage === 'prayer-books',
    },
    {
      id: 'bible',
      label: 'Bible',
      icon: Bookmark,
      action: () => setCurrentPage('scripture'),
      isActive: currentPage === 'scripture',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserIcon,
      action: () => {
        if (user.id) {
          setCurrentPage('dashboard');
        } else {
          onOpenAuth('login');
        }
      },
      isActive: currentPage === 'dashboard' || currentPage === 'login' || currentPage === 'signup',
    },
  ];

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#070D1C]/95 backdrop-blur-lg border-t border-[#18264A] shadow-[0_-8px_25px_rgba(0,0,0,0.6)] px-2 py-1.5 pb-safe"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={item.action}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
                item.isActive
                  ? 'text-amber-300 font-bold bg-amber-400/10'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.isActive ? 'text-amber-400 stroke-[2.3]' : 'text-slate-400 stroke-[1.8]'}`} />
              <span className="text-[10px] mt-1 tracking-tight leading-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
