// Curated sacred SVG avatars for Sanctuary Pastor believers
// Each SVG is crafted with rich colors, symbolic Christian elements, and optimized for instant loading.

export interface ReadyMadeAvatar {
  id: string;
  name: string;
  category: 'Sacred Symbols' | 'Biblical Motifs' | 'Pilgrims';
  svgDataUri: string;
}

// Helper to encode SVG into Data URI
function createSvgDataUri(svgContent: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
}

export const READY_MADE_AVATARS: ReadyMadeAvatar[] = [
  {
    id: 'sacred-dove',
    name: 'Holy Spirit Dove',
    category: 'Sacred Symbols',
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg_dove" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E3A8A"/>
            <stop offset="60%" stop-color="#0F172A"/>
            <stop offset="100%" stop-color="#090D1C"/>
          </linearGradient>
          <linearGradient id="gold_halo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FCD34D"/>
            <stop offset="100%" stop-color="#D97706"/>
          </linearGradient>
          <linearGradient id="dove_body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#E2E8F0"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg_dove)"/>
        <!-- Golden Halo -->
        <circle cx="60" cy="54" r="32" fill="none" stroke="url(#gold_halo)" stroke-width="2.5" opacity="0.6" stroke-dasharray="4 2"/>
        <circle cx="60" cy="54" r="26" fill="none" stroke="url(#gold_halo)" stroke-width="1.2" opacity="0.4"/>
        <!-- Descending Dove of Peace -->
        <g fill="url(#dove_body)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))">
          <!-- Wings -->
          <path d="M60 48 C45 30 25 35 22 46 C20 54 36 58 52 56 Z"/>
          <path d="M60 48 C75 30 95 35 98 46 C100 54 84 58 68 56 Z"/>
          <!-- Body & Tail -->
          <path d="M57 42 C57 36 63 36 63 42 C63 56 66 66 68 80 C60 76 52 80 52 80 C54 66 57 56 57 42 Z"/>
          <!-- Head -->
          <circle cx="60" cy="40" r="5.5"/>
          <!-- Beak -->
          <polygon points="60,34 58,37 62,37" fill="#F59E0B"/>
        </g>
        <!-- Olive leaf in beak -->
        <path d="M58 35 C52 32 48 35 48 35 C50 37 54 37 58 35 Z" fill="#10B981"/>
      </svg>
    `),
  },
  {
    id: 'golden-cross',
    name: 'Radiant Cross',
    category: 'Sacred Symbols',
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg_cross" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E1B4B"/>
            <stop offset="50%" stop-color="#0F172A"/>
            <stop offset="100%" stop-color="#030712"/>
          </linearGradient>
          <linearGradient id="gold_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE68A"/>
            <stop offset="40%" stop-color="#F59E0B"/>
            <stop offset="100%" stop-color="#B45309"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg_cross)"/>
        <!-- Sacred Sunburst Rays -->
        <g stroke="url(#gold_grad)" stroke-width="1.2" opacity="0.3" stroke-linecap="round">
          <line x1="60" y1="20" x2="60" y2="100"/>
          <line x1="20" y1="60" x2="100" y2="60"/>
          <line x1="32" y1="32" x2="88" y2="88"/>
          <line x1="88" y1="32" x2="32" y2="88"/>
        </g>
        <circle cx="60" cy="50" r="18" fill="none" stroke="url(#gold_grad)" stroke-width="1.5" opacity="0.5"/>
        <!-- Latin Christian Cross -->
        <g fill="url(#gold_grad)" filter="drop-shadow(0 4px 8px rgba(245,158,11,0.35))">
          <!-- Vertical beam -->
          <rect x="54" y="24" width="12" height="72" rx="3"/>
          <!-- Horizontal crossbeam -->
          <rect x="34" y="42" width="52" height="12" rx="3"/>
        </g>
      </svg>
    `),
  },
  {
    id: 'holy-bible',
    name: 'Sacred Scripture',
    category: 'Biblical Motifs',
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg_book" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#042F2E"/>
            <stop offset="60%" stop-color="#0F172A"/>
            <stop offset="100%" stop-color="#020617"/>
          </linearGradient>
          <linearGradient id="gold_page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FEF3C7"/>
            <stop offset="100%" stop-color="#FDE68A"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg_book)"/>
        <!-- Aura -->
        <circle cx="60" cy="60" r="36" fill="#F59E0B" opacity="0.12"/>
        <!-- Open Bible -->
        <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
          <!-- Back cover -->
          <path d="M22 44 C38 40 56 46 60 52 C64 46 82 40 98 44 L98 82 C82 78 64 84 60 90 C56 84 38 78 22 82 Z" fill="#78350F"/>
          <!-- Left page -->
          <path d="M24 42 C38 38 55 43 59 48 L59 86 C55 81 38 76 24 80 Z" fill="url(#gold_page)"/>
          <!-- Right page -->
          <path d="M96 42 C82 38 65 43 61 48 L61 86 C65 81 82 76 96 80 Z" fill="url(#gold_page)"/>
          <!-- Script lines left -->
          <line x1="30" y1="52" x2="52" y2="50" stroke="#B45309" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="30" y1="58" x2="52" y2="56" stroke="#B45309" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="30" y1="64" x2="52" y2="62" stroke="#B45309" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="30" y1="70" x2="48" y2="68" stroke="#B45309" stroke-width="1.5" stroke-linecap="round"/>
          <!-- Latin Cross on right page -->
          <g fill="#D97706">
            <rect x="76" y="52" width="4" height="22" rx="1"/>
            <rect x="70" y="58" width="16" height="4" rx="1"/>
          </g>
          <!-- Golden bookmark ribbon -->
          <path d="M60 48 L60 96 L63 92 L66 96 L66 48 Z" fill="#DC2626"/>
        </g>
      </svg>
    `),
  },
  {
    id: 'praying-hands',
    name: 'Praying Hands',
    category: 'Sacred Symbols',
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg_pray" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#311042"/>
            <stop offset="60%" stop-color="#0F172A"/>
            <stop offset="100%" stop-color="#060A17"/>
          </linearGradient>
          <linearGradient id="hands_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE68A"/>
            <stop offset="50%" stop-color="#F59E0B"/>
            <stop offset="100%" stop-color="#B45309"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg_pray)"/>
        <!-- Divine Rays -->
        <circle cx="60" cy="50" r="32" fill="none" stroke="#F59E0B" stroke-width="1.2" opacity="0.35" stroke-dasharray="3 3"/>
        <g stroke="#FDE68A" stroke-width="1" opacity="0.3">
          <line x1="60" y1="18" x2="60" y2="28"/>
          <line x1="40" y1="24" x2="46" y2="32"/>
          <line x1="80" y1="24" x2="74" y2="32"/>
        </g>
        <!-- Stylized Praying Hands Silhouette -->
        <g fill="url(#hands_grad)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
          <!-- Left hand -->
          <path d="M60 28 C59 28 54 36 53 46 C52 54 44 64 42 74 C40 82 48 94 56 94 C57 94 59 86 60 76 Z"/>
          <!-- Right hand -->
          <path d="M60 28 C61 28 66 36 67 46 C68 54 76 64 78 74 C80 82 72 94 64 94 C63 94 61 86 60 76 Z"/>
          <!-- Palms & Cuff details -->
          <path d="M48 90 C48 90 54 96 60 96 C66 96 72 90 72 90 L74 98 C74 98 66 102 60 102 C54 102 46 98 46 98 Z" fill="#92400E"/>
        </g>
      </svg>
    `),
  },
  {
    id: 'sacred-flame',
    name: 'Pentecost Flame',
    category: 'Biblical Motifs',
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg_flame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#450A0A"/>
            <stop offset="50%" stop-color="#18181B"/>
            <stop offset="100%" stop-color="#09090B"/>
          </linearGradient>
          <linearGradient id="flame_outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F59E0B"/>
            <stop offset="60%" stop-color="#EF4444"/>
            <stop offset="100%" stop-color="#B91C1C"/>
          </linearGradient>
          <linearGradient id="flame_inner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FEF08A"/>
            <stop offset="100%" stop-color="#F59E0B"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg_flame)"/>
        <!-- Outer Glow -->
        <circle cx="60" cy="62" r="30" fill="#EF4444" opacity="0.2"/>
        <!-- Main Flame -->
        <g filter="drop-shadow(0 4px 10px rgba(239,68,68,0.4))">
          <path d="M60 22 C64 34 76 46 76 62 C76 76 68 88 60 92 C52 88 44 76 44 62 C44 48 54 36 60 22 Z" fill="url(#flame_outer)"/>
          <!-- Inner Core -->
          <path d="M60 42 C63 50 68 56 68 66 C68 74 64 82 60 84 C56 82 52 74 52 66 C52 58 56 50 60 42 Z" fill="url(#flame_inner)"/>
          <!-- Divine Cross silhouette in flame -->
          <g fill="#FFFFFF" opacity="0.8">
            <rect x="58.5" y="52" width="3" height="20" rx="1"/>
            <rect x="53" y="58" width="14" height="3" rx="1"/>
          </g>
        </g>
      </svg>
    `),
  },
  {
    id: 'good-shepherd',
    name: 'Good Shepherd',
    category: 'Biblical Motifs',
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg_shepherd" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#064E3B"/>
            <stop offset="60%" stop-color="#0F172A"/>
            <stop offset="100%" stop-color="#020617"/>
          </linearGradient>
          <linearGradient id="staff_gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE68A"/>
            <stop offset="100%" stop-color="#D97706"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg_shepherd)"/>
        <!-- Star of Bethlehem -->
        <g fill="#FDE68A" opacity="0.8">
          <polygon points="60,20 62,26 68,28 62,30 60,36 58,30 52,28 58,26"/>
        </g>
        <!-- Shepherd Crook / Staff -->
        <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
          <!-- Hook curve -->
          <path d="M52 46 C42 46 40 32 54 32 C68 32 70 48 58 52 L58 98" fill="none" stroke="url(#staff_gold)" stroke-width="4.5" stroke-linecap="round"/>
          <!-- Little Lamb silhouette -->
          <path d="M66 74 C66 68 74 68 76 74 C78 72 84 74 84 80 C84 84 80 86 78 86 L78 92 L75 92 L75 86 L70 86 L70 92 L67 92 Z" fill="#F1F5F9"/>
        </g>
      </svg>
    `),
  },
  {
    id: 'brother-faith',
    name: 'Brother in Christ',
    category: 'Pilgrims',
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg_brother" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E293B"/>
            <stop offset="100%" stop-color="#090D1C"/>
          </linearGradient>
          <linearGradient id="skin1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FCD34D"/>
            <stop offset="100%" stop-color="#F59E0B"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg_brother)"/>
        <!-- Golden Halo -->
        <circle cx="60" cy="50" r="30" fill="none" stroke="#F59E0B" stroke-width="1.5" opacity="0.5"/>
        <!-- Person Head & Body -->
        <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))">
          <!-- Robe / Shoulder -->
          <path d="M30 102 C30 84 42 78 60 78 C78 78 90 84 90 102 Z" fill="#2563EB"/>
          <!-- Collar / Scarf -->
          <path d="M50 78 L60 90 L70 78 Z" fill="#DBEAFE"/>
          <!-- Neck -->
          <rect x="54" y="66" width="12" height="14" rx="2" fill="#E2E8F0"/>
          <!-- Face -->
          <circle cx="60" cy="52" r="16" fill="#F8FAFC"/>
          <!-- Hair & Beard -->
          <path d="M44 50 C44 38 52 34 60 34 C68 34 76 38 76 50 C76 54 74 54 74 50 C72 42 66 38 60 38 C54 38 48 42 46 50 Z" fill="#334155"/>
          <path d="M48 56 C52 68 68 68 72 56 C74 62 70 70 60 70 C50 70 46 62 48 56 Z" fill="#334155"/>
        </g>
      </svg>
    `),
  },
  {
    id: 'sister-grace',
    name: 'Sister in Grace',
    category: 'Pilgrims',
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg_sister" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B0764"/>
            <stop offset="100%" stop-color="#090D1C"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg_sister)"/>
        <!-- Golden Halo -->
        <circle cx="60" cy="50" r="30" fill="none" stroke="#E5A93C" stroke-width="1.5" opacity="0.6"/>
        <!-- Female Figure -->
        <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))">
          <!-- Robe / Shoulder -->
          <path d="M30 102 C30 84 42 78 60 78 C78 78 90 84 90 102 Z" fill="#7C3AED"/>
          <!-- Scarf / Grace -->
          <path d="M48 78 C54 84 66 84 72 78 L68 96 C64 94 56 94 52 96 Z" fill="#EDE9FE"/>
          <!-- Neck -->
          <rect x="55" y="66" width="10" height="14" rx="2" fill="#F8FAFC"/>
          <!-- Face -->
          <circle cx="60" cy="52" r="15" fill="#FFF1F2"/>
          <!-- Hair veil -->
          <path d="M44 48 C44 34 50 32 60 32 C70 32 76 34 76 48 C78 62 74 72 72 74 C68 60 68 50 60 50 C52 50 52 60 48 74 C46 72 42 62 44 48 Z" fill="#4C1D95"/>
        </g>
      </svg>
    `),
  },
];

// Default starting avatar
export const DEFAULT_AVATAR = READY_MADE_AVATARS[0].svgDataUri;

// Client-side image resize helper to ensure uploaded user photos stay small and fast in localStorage
export async function resizeImageToDataUrl(file: File, maxSize: number = 160): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        // Draw image resized
        ctx.drawImage(img, 0, 0, width, height);
        // Convert to lightweight JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for resizing'));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
