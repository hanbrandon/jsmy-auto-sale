"use client";

import { translations } from "@/constants/translations";
import { Phone, MapPin } from "lucide-react";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

export const Footer = () => {
  const t = translations.en;
  return (
    <footer className="py-20 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <a href="#" className="flex flex-col mb-8">
              <span className="text-2xl font-black tracking-tighter text-white">JSMY AUTO</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 leading-none">Sales & Lease</span>
            </a>
            <p className="text-white/40 max-w-sm leading-relaxed">
              {t.hero.sub} Providing the best automotive experience in California.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-6">Explore</h4>
            <div className="flex flex-col gap-4 text-white/40">
              <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>
              <a href="#gallery" className="hover:text-white transition-colors">{t.nav.gallery}</a>
              <a href="#why-us" className="hover:text-white transition-colors">{t.nav.whyUs}</a>
              <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          <div>© {new Date().getFullYear()} JSMY AUTO SALES & LEASE. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
