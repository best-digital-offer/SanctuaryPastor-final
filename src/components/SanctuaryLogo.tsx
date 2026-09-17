import React from 'react';
import { BookOpen } from 'lucide-react';

interface SanctuaryLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'cross' | 'bible';
  className?: string;
}

/**
 * Authentic Christian Latin Cross
 * Features true Latin cross proportions: elevated horizontal crossbeam
 * and elongated lower vertical stem, distinct from a medical/mathematical plus symbol.
 */
export const ChristianCross: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {/* Classic Christian Latin Cross (Crux Ordinaria) */}
    <path d="M10 2.5C10 1.67 10.67 1 11.5 1H12.5C13.33 1 14 1.67 14 2.5V7H18.5C19.33 7 20 7.67 20 8.5V9.5C20 10.33 19.33 11 18.5 11H14V21.5C14 22.33 13.33 23 12.5 23H11.5C10.67 23 10 22.33 10 21.5V11H5.5C4.67 11 4 10.33 4 9.5V8.5C4 7.67 4.67 7 5.5 7H10V2.5Z" />
  </svg>
);

/**
 * Holy Bible Emblem
 * Features an open sacred scripture Bible with cross insignia.
 */
export const HolyBible: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Open Bible Pages */}
    <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H10a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H4.5A2.5 2.5 0 0 0 2 20.5v-16z" />
    <path d="M22 4.5A2.5 2.5 0 0 0 19.5 2H14a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h5.5a2.5 2.5 0 0 1 2.5 2.5v-16z" />
    {/* Latin Cross on Scripture page */}
    <path d="M6.5 6.5v5M5 8h3" strokeWidth="1.5" />
    <line x1="15" y1="7" x2="19" y2="7" strokeWidth="1.5" />
    <line x1="15" y1="10" x2="18" y2="10" strokeWidth="1.5" />
  </svg>
);

/**
 * Sanctuary Pastor Brand Emblem Logo
 * Replaces the equilateral plus (+) icon with the true Christian Cross or Holy Bible.
 */
export const SanctuaryLogo: React.FC<SanctuaryLogoProps> = ({
  size = 'md',
  variant = 'cross',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-md',
    md: 'w-8 h-8 rounded-lg',
    lg: 'w-10 h-10 rounded-xl',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <div
      className={`${sizeClasses} bg-gradient-to-br from-[#E5A93C] via-[#D49A2D] to-[#B8811C] flex items-center justify-center text-[#0A1128] shadow-md shadow-amber-950/30 shrink-0 ${className}`}
    >
      {variant === 'bible' ? (
        <HolyBible className={`${iconSizes} text-[#0A1128]`} />
      ) : (
        <ChristianCross className={`${iconSizes} text-[#0A1128]`} />
      )}
    </div>
  );
};
