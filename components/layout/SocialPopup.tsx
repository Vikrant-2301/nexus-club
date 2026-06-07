'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function SocialPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('socialPopupDismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 4000); // 4 second delay
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('socialPopupDismissed', 'true');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-[calc(100vw-3rem)]">
      <div className="bg-[#0a0a1a]/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/10 w-72 relative">
        <button 
          onClick={dismiss}
          className="absolute top-3 right-3 p-1 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close popup"
        >
          <X size={16} />
        </button>
        
        <div className="mb-4 pr-4">
          <p className="font-syne font-bold text-[15px] text-white mb-1.5">Stay Connected 🚀</p>
          <p className="text-white/60 text-xs leading-relaxed">
            Join our community for the latest updates, exclusive events, and behind the scenes.
          </p>
        </div>
        
        <div className="flex flex-col gap-2.5">
          <a 
            href="https://chat.whatsapp.com/EQNP8smPKozILPhfw2dXzr" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:-translate-y-0.5 group"
            style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', border: '1px solid rgba(37, 211, 102, 0.3)' }}
          >
            <WhatsAppIcon size={16} />
            Join WhatsApp
          </a>
          <a 
            href="https://www.instagram.com/beyondwork.site/" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:-translate-y-0.5 group"
            style={{ background: 'linear-gradient(45deg, rgba(240, 148, 51, 0.1) 0%, rgba(230, 104, 60, 0.1) 25%, rgba(220, 39, 67, 0.1) 50%, rgba(204, 35, 102, 0.1) 75%, rgba(188, 24, 136, 0.1) 100%)', color: '#E1306C', border: '1px solid rgba(225, 48, 108, 0.3)' }}
          >
            <InstagramIcon size={16} />
            Follow Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
