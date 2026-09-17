import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  HeartHandshake,
  FileText,
  Lock,
  PhoneCall,
  Globe2,
  Trash2,
  Mail,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export type LegalTopic =
  | 'terms'
  | 'privacy'
  | 'cookies'
  | 'refund'
  | 'ai-disclosure'
  | 'safety'
  | 'crisis'
  | 'about'
  | 'contact'
  | 'delete-account'
  | null;

interface LegalModalProps {
  type: LegalTopic;
  onClose: () => void;
  onConfirmDeleteAccount?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  type,
  onClose,
  onConfirmDeleteAccount,
}) => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  if (!type) return null;

  const isCrisis = type === 'crisis' || type === 'safety';
  const isAiSafety = type === 'ai-disclosure';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A1226] border border-[#213460] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isCrisis ? (
              <PhoneCall className="w-5 h-5 text-amber-400" />
            ) : isAiSafety ? (
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            ) : type === 'delete-account' ? (
              <Trash2 className="w-5 h-5 text-red-400" />
            ) : type === 'contact' ? (
              <Mail className="w-5 h-5 text-amber-400" />
            ) : (
              <FileText className="w-5 h-5 text-blue-400" />
            )}
            <h3 className="text-base font-bold text-white">
              {type === 'crisis' && 'Worldwide Emergency & Crisis Support'}
              {type === 'safety' && 'Spiritual & Emotional Safety Guidelines'}
              {type === 'ai-disclosure' && 'AI Pastor Disclosure & Theological Transparency'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'privacy' && 'Privacy Policy (Strict No-Sell)'}
              {type === 'cookies' && 'Cookie Policy'}
              {type === 'refund' && 'Refund Policy & Subscription Billing'}
              {type === 'about' && 'About Sanctuary Pastor'}
              {type === 'contact' && 'Contact Pastoral Support'}
              {type === 'delete-account' && 'Delete Account & Personal Prayer Vault'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {/* CRISIS (GLOBAL RESOURCES) */}
          {(type === 'crisis' || type === 'safety') && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                <strong>You are precious and never alone.</strong> If you or someone you know is in acute emotional distress, experiencing thoughts of self-harm, or in immediate physical danger, please connect immediately with the free, confidential 24/7 emergency support services in your country.
              </div>

              <div className="space-y-2.5">
                {/* USA & Canada */}
                <div className="p-3.5 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">United States & Canada: 988 Lifeline</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Free 24/7 call and text support. Crisis Text Line: Text HOME to 741741.</p>
                  </div>
                  <a
                    href="tel:988"
                    className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs shrink-0 hover:brightness-110"
                  >
                    Call 988
                  </a>
                </div>

                {/* United Kingdom */}
                <div className="p-3.5 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">United Kingdom: Samaritans & NHS 111</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Call 116 123 (free 24/7 Samaritans) or 111 for urgent mental health help.</p>
                  </div>
                  <a
                    href="tel:116123"
                    className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs shrink-0 hover:brightness-110"
                  >
                    Call 116 123
                  </a>
                </div>

                {/* Australia & New Zealand */}
                <div className="p-3.5 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Australia: Lifeline 13 11 14 | NZ: 1737</h4>
                    <p className="text-xs text-slate-400 mt-0.5">24/7 crisis support and suicide prevention services.</p>
                  </div>
                  <a
                    href="tel:131114"
                    className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs shrink-0 hover:brightness-110"
                  >
                    Call 13 11 14
                  </a>
                </div>

                {/* Global Directory */}
                <div className="p-3.5 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1 text-blue-400 font-bold text-xs">
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>International Crisis Directory</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Find free, confidential local crisis helplines in any nation worldwide.</p>
                  </div>
                  <a
                    href="https://findahelpline.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold text-xs shrink-0 hover:bg-blue-500/30"
                  >
                    Find Local Line
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* AI PASTOR DISCLOSURE */}
          {type === 'ai-disclosure' && (
            <div className="space-y-3">
              <p>
                <strong>1. Fictional Character & Artificial Intelligence:</strong> Sanctuary Pastor is an artificial intelligence application. The pastor depicted is a fictional, photorealistic digital representation and is not an ordained human minister, a church pastor, or a medical/mental health professional.
              </p>
              <p>
                <strong>2. Theological Integrity:</strong> Sanctuary Pastor does not claim divine revelation, prophecy, or supernatural authority. All prayers are algorithmically generated based on orthodox Christian theological principles, biblical scriptures, and user-provided prayer requests.
              </p>
              <p>
                <strong>3. Not a Substitute for Church Community:</strong> We strongly encourage all believers to actively participate in a local Bible-believing church community and seek guidance from qualified pastoral leaders, counselors, and healthcare practitioners.
              </p>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {type === 'privacy' && (
            <div className="space-y-3">
              <p>
                <strong>Strict Confidentiality:</strong> Your prayers, reflections, and heart requests are deeply personal. We never sell, rent, or monetize your personal prayer requests or journal entries to any third parties or advertisers.
              </p>
              <p>
                <strong>Encryption:</strong> All prayers are transmitted over secure 256-bit SSL encryption and stored in encrypted databases.
              </p>
              <p>
                <strong>Data Rights:</strong> You may export or permanently delete your entire prayer journal and account at any time with one click.
              </p>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {type === 'terms' && (
            <div className="space-y-3">
              <p>
                By using Sanctuary Pastor, you acknowledge that this service is intended for personal devotional and spiritual reflection purposes.
              </p>
              <p>
                Sanctuary Pastor does not provide healthcare, medical diagnosis, mental health therapy, legal, or financial counseling. If you require professional assistance, please consult licensed professionals.
              </p>
            </div>
          )}

          {/* COOKIE POLICY */}
          {type === 'cookies' && (
            <div className="space-y-3">
              <p>
                <strong>Essential Cookies Only:</strong> Sanctuary Pastor uses minimal, strictly essential cookies necessary for authentication, session security, and preserving your journal preferences.
              </p>
              <p>
                We do not use invasive third-party cross-site advertising trackers.
              </p>
            </div>
          )}

          {/* REFUND POLICY */}
          {type === 'refund' && (
            <div className="space-y-3">
              <p>
                <strong>Secure Payments Powered by Stripe:</strong> All transactions are processed using industry-standard, encrypted Stripe billing.
              </p>
              <p>
                <strong>Cancel Anytime:</strong> Subscriptions can be canceled at any time directly through your billing portal without penalties. Your plan remains active until the end of your billing cycle.
              </p>
              <p>
                <strong>Billing Transparency:</strong> Weekly ($9.99/week), Monthly ($25/month), and Yearly ($100/year) renewals are clearly displayed prior to confirmation. If you experience technical issues, contact our support team for prompt review.
              </p>
            </div>
          )}

          {/* ABOUT */}
          {type === 'about' && (
            <div className="space-y-3">
              <p>
                <strong>Sanctuary Pastor</strong> was created to help believers experience the peace and comfort of heartfelt, scripture-rooted prayer at any hour of the day or night.
              </p>
              <p>
                Whether seeking guidance during a career transition, comfort in grief, or peace in the middle of sleepless nights, Sanctuary Pastor is a faithful companion guiding your heart to Jesus Christ.
              </p>
            </div>
          )}

          {/* CONTACT */}
          {type === 'contact' && (
            <div className="space-y-3">
              <p>
                Have questions, prayer requests, or feedback? Our pastoral support team is here to assist you.
              </p>
              <div className="p-4 rounded-xl bg-[#070D1B] border border-slate-800 space-y-2">
                <p className="font-semibold text-white">Email Support:</p>
                <p className="text-amber-300 font-mono text-xs">support@sanctuarypastor.com</p>
                <p className="text-slate-400 text-xs">We typically respond within 24 business hours.</p>
              </div>
            </div>
          )}

          {/* DELETE ACCOUNT */}
          {type === 'delete-account' && (
            <div className="space-y-4">
              {deleteSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-base">Account & Data Deleted</h4>
                  <p className="text-xs text-slate-300">
                    Your personal prayer vault and account records have been wiped clean.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/40 text-red-200 text-xs">
                    <strong>Warning:</strong> Deleting your account will permanently erase your personal prayer history, saved prayers, and private journal reflections. This action cannot be undone.
                  </div>

                  <div className="p-3 bg-[#070D1B] rounded-xl border border-slate-800 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="confirm-delete-box"
                      checked={deleteConfirmed}
                      onChange={(e) => setDeleteConfirmed(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-red-500 focus:ring-red-400 cursor-pointer"
                    />
                    <label htmlFor="confirm-delete-box" className="text-xs text-slate-300 cursor-pointer">
                      I understand that all my prayers and journal reflections will be irreversibly erased.
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!deleteConfirmed}
                      onClick={() => {
                        if (onConfirmDeleteAccount) onConfirmDeleteAccount();
                        setDeleteSuccess(true);
                        setTimeout(() => {
                          onClose();
                        }, 2000);
                      }}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
                    >
                      Permanently Delete My Account
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#070D1B] rounded-b-2xl flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            SanctuaryPastor.com • Faith & Privacy Guaranteed
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
