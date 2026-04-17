"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TranslationType } from "@/constants/translations";

interface HeroProps {
  t: TranslationType;
}

export const Hero = ({ t }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-8">
              {t.hero.tag}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight leading-[0.9] mb-8"
          >
            {t.hero.title1}<br />
            <span className="text-white/40">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto mb-12 text-balance"
          >
            {t.hero.sub} {t.hero.location} <span className="text-white/80">{t.hero.allInOne}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button href="tel:7146810161" size="lg" className="w-full sm:w-auto">
              {t.hero.cta}
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg" href="#contact" className="w-full sm:w-auto">
              {t.hero.consult}
            </Button>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-white/5"
          >
            <div className="flex items-center justify-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Star className="text-white/40" size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">{t.hero.badges.service.label}</div>
                <div className="text-sm font-semibold text-white/70">{t.hero.badges.service.value}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Shield className="text-white/40" size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">{t.hero.badges.financing.label}</div>
                <div className="text-sm font-semibold text-white/70">{t.hero.badges.financing.value}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Zap className="text-white/40" size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">{t.hero.badges.process.label}</div>
                <div className="text-sm font-semibold text-white/70">{t.hero.badges.process.value}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
