import React, { useState } from 'react';
import { Page, User } from '../types';
import { IMAGES } from '../assets/images';
import { Lock, Mail, User as UserIcon, Eye, EyeOff, Check, ArrowLeft, Camera } from 'lucide-react';
import { ChristianCross } from './SanctuaryLogo';
import { DEFAULT_AVATAR } from '../data/avatars';
import { AvatarSelectorModal } from './AvatarSelectorModal';

interface SignupViewProps {
  setCurrentPage: (page: Page) => void;
  onLoginSuccess: (user: User) => void;
  onOpenLegal: (topic: 'privacy' | 'terms') => void;
}

export const SignupView: React.FC<SignupViewProps> = ({
  setCurrentPage,
  onLoginSuccess,
  onOpenLegal,
}) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('you@example.com');
  const [password, setPassword] = useState('sanctuary2024');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATAR);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        id: `user_${Date.now()}`,
        name: fullName || 'Believer in Christ',
        email: email || 'user@sanctuarypastor.com',
        isPaid: false,
        freePrayersLeft: 1,
        role: 'user',
        avatarUrl: selectedAvatar,
      });
      setCurrentPage('dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Top minimal header matching reference */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-[#152347] bg-[#070D1B]/90 backdrop-blur-md relative z-20">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#D49A2D] flex items-center justify-center text-slate-950 font-bold">
            <ChristianCross className="w-4 h-4 text-[#0A1128]" />
          </div>
          <div className="text-left">
            <span className="font-brand text-base font-bold text-white tracking-wider">
              Sanctuary Pastor
            </span>
            <span className="hidden sm:inline-block text-[10px] text-amber-300/80 ml-2">
              Your AI Christian Prayer Companion
            </span>
          </div>
        </button>

        <div className="text-xs text-slate-300">
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
          >
            {isLoginMode ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </header>

      {/* Center registration card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 my-4">
        <div className="w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-2xl shadow-black/80 p-6 sm:p-8 border border-slate-200">
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
              {isLoginMode ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-xs text-slate-500">
              {isLoginMode
                ? 'Sign in to access your prayer journal and audio sessions'
                : 'Join thousands experiencing the power of prayer'}
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-2.5 mb-5">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-600" />
              <span>Continue with Email</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-5">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-[11px] text-slate-400 uppercase tracking-wider font-medium">
              or enter details
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <>
                {/* Avatar / Profile Emblem Selection */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="relative">
                    <img
                      src={selectedAvatar}
                      alt="Profile Avatar"
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-sm bg-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAvatarModal(true)}
                      title="Choose avatar or upload photo"
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-800 block truncate">Profile Emblem / Photo</span>
                    <span className="text-[11px] text-slate-500 block">Pick sacred symbol or upload photo</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAvatarModal(true)}
                    className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors cursor-pointer shrink-0"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-9 pr-9 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLoginMode && (
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agree-checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="agree-checkbox" className="text-[11px] text-slate-500 leading-tight">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal('terms')}
                    className="text-amber-600 font-semibold hover:underline"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal('privacy')}
                    className="text-amber-600 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] hover:brightness-105 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : isLoginMode ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Mountain sunrise banner at bottom matching reference screen #2 */}
      <div className="relative overflow-hidden py-10 px-4 border-t border-[#162347]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={IMAGES.crossSunrise}
            alt="Mountain sunrise"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#070D1B]/70" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-1">
          <p className="font-serif-sacred text-base sm:text-lg text-amber-100 font-medium italic">
            “For where two or three gather in my name, there am I with them.”
          </p>
          <p className="text-xs text-amber-300 font-semibold">Matthew 18:20</p>
        </div>
      </div>

      {/* Avatar Selector Modal */}
      {showAvatarModal && (
        <AvatarSelectorModal
          currentAvatar={selectedAvatar}
          onSaveAvatar={(avatarUrl) => setSelectedAvatar(avatarUrl)}
          onClose={() => setShowAvatarModal(false)}
        />
      )}
    </div>
  );
};
