import React, { useState } from 'react';
import { Page, User, PricingPlan } from '../types';
import { PRICING_PLANS } from '../data/mockData';
import { IMAGES } from '../assets/images';
import { Check, ShieldCheck, Lock, RefreshCw, Sparkles, CreditCard, X, ArrowRight, Shield } from 'lucide-react';

interface PricingViewProps {
  user: User;
  onSubscribeSuccess: (planId: 'weekly' | 'monthly' | 'yearly') => void;
  setCurrentPage: (page: Page) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  user,
  onSubscribeSuccess,
  setCurrentPage,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardholderName, setCardholderName] = useState(user.name || 'Christian Believer');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (plan: PricingPlan) => {
    setSelectedPlan(plan);
  };

  const handleCompleteSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSubscribeSuccess(selectedPlan.id);
      setSelectedPlan(null);
      setCurrentPage('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#080E1E] text-slate-100 flex flex-col justify-between">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spiritual Devotion Membership</span>
          </div>
          <h1 className="font-serif-sacred text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Choose Your Prayer Journey
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Continue experiencing the deep comfort, faith, and transformative power of unlimited personalized prayers with Sanctuary Pastor.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-14">
          {PRICING_PLANS.map((plan) => {
            const isMonthly = plan.id === 'monthly';
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isMonthly
                    ? 'bg-[#0E1A38] border-2 border-amber-400 shadow-xl shadow-amber-950/30 scale-102 z-10'
                    : 'bg-[#0B142A] border border-[#1E2E56] hover:border-slate-600 shadow-md'
                }`}
              >
                {/* Most Popular Badge for Monthly */}
                {isMonthly && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                {/* Card Top */}
                <div className="space-y-4">
                  <div className="text-center pt-2">
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      {plan.name}
                    </h3>
                    <div className="mt-3 flex items-baseline justify-center gap-1">
                      <span className="font-serif-sacred text-4xl sm:text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        /{plan.id === 'weekly' ? 'week' : plan.id === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    <p className="text-xs text-amber-300/90 mt-1.5 font-medium">
                      {plan.subtext}
                    </p>
                  </div>

                  <button
                    id={`pricing-select-${plan.id}`}
                    onClick={() => handleCheckout(plan)}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                      isMonthly
                        ? 'bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] hover:brightness-110 text-slate-950'
                        : 'bg-[#D49A2D] hover:bg-[#E5A93C] text-slate-950'
                    }`}
                  >
                    Select Plan
                  </button>

                  {/* Clear Billing Frequency & Renewal Note */}
                  <div className="bg-[#070D1B] rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Billing:</span>
                      <strong className="text-slate-200">
                        {plan.id === 'weekly' ? 'Every 7 days' : plan.id === 'monthly' ? 'Every month' : 'Every 12 months'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Renewal:</span>
                      <span className="text-slate-300">Auto-renews until cancelled</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cancellation:</span>
                      <span className="text-emerald-400">1-click anytime</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-800/80 pt-4">
                    <p className="text-[11px] font-semibold text-slate-300 mb-2 uppercase tracking-wider">What is included:</p>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 text-center">
                  <span className="text-[10px] text-slate-500">
                    Cancel anytime online • No lock-in contracts
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges: Replacing 30-Day Guarantee with Secure Payments & Transparent Cancellation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto py-8 border-y border-[#162347] text-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-semibold text-white">Secure Payments</h4>
            <p className="text-[11px] text-slate-400">Powered by Stripe 256-bit SSL encryption</p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-semibold text-white">Cancel Anytime</h4>
            <p className="text-[11px] text-slate-400">Manage billing directly with 1-click self-serve</p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-semibold text-white">Private Prayer Vault</h4>
            <p className="text-[11px] text-slate-400">Strict confidential non-disclosure pledge</p>
          </div>
        </div>
      </main>

      {/* Bottom scripture banner */}
      <div className="relative overflow-hidden py-14 px-4 border-t border-[#162347]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={IMAGES.crossSunrise}
            alt="Sunrise Mountain Prayer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#080E1E]/80" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-1">
          <p className="font-serif-sacred text-lg sm:text-xl text-amber-100 font-semibold italic">
            “With God all things are possible.”
          </p>
          <p className="text-xs text-amber-300 font-semibold">Matthew 19:26</p>
        </div>
      </div>

      {/* STRIPE CHECKOUT MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D162F] border border-[#23355F] rounded-2xl max-w-md w-full p-6 text-left shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-300">
              <Lock className="w-4 h-4" />
              <span className="font-brand text-xs uppercase tracking-wider font-semibold">
                Stripe Billing Checkout
              </span>
            </div>

            <div className="bg-[#080F22] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{selectedPlan.name} Prayer Access</h4>
                <p className="text-xs text-slate-400">
                  {selectedPlan.id === 'weekly' ? 'Billed $9.99 weekly' : selectedPlan.id === 'monthly' ? 'Billed $25 monthly' : 'Billed $100 yearly'}
                </p>
                <p className="text-[10px] text-emerald-400 mt-0.5">Cancel anytime before next renewal</p>
              </div>
              <div className="text-right">
                <span className="font-serif-sacred text-2xl font-bold text-amber-300">
                  {selectedPlan.price}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  /{selectedPlan.id === 'weekly' ? 'wk' : selectedPlan.id === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>
            </div>

            <form onSubmit={handleCompleteSubscription} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#080E1E] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Card Information (Stripe Elements)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-[#080E1E] border border-slate-700 text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Expires</label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#080E1E] border border-slate-700 text-slate-100 text-center font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">CVC</label>
                  <input
                    type="text"
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="CVC"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#080E1E] border border-slate-700 text-slate-100 text-center font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Confirming with Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Subscribe {selectedPlan.price}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[10px] text-slate-500">
                  Recurring billing. You can cancel anytime in 1 click from your dashboard.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
