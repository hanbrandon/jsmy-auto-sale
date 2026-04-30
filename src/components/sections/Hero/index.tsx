"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { translations } from "@/constants/translations";

export const Hero = () => {
  const t = translations.en;
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-48 md:pt-56 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="mesh-gradient opacity-50" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[150px] rounded-full animate-slow-spin" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[150px] rounded-full animate-slow-spin" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-8">
              {t.hero.tag}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
          >
            {t.hero.title1}<br />
            <span className="text-white/50">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 text-balance"
          >
            {t.hero.sub} {t.hero.location} <span className="text-white/80">{t.hero.allInOne}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="tel:7146810161" size="lg" className="w-full sm:w-auto px-8 py-4 text-sm">
              {t.hero.cta}
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg" href="#contact" className="w-full sm:w-auto px-8 py-4 text-sm">
              {t.hero.consult}
            </Button>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 md:mt-24 pt-8 md:pt-12 border-t border-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Star, label: t.hero.badges.service.label, value: t.hero.badges.service.value },
                { icon: Shield, label: t.hero.badges.financing.label, value: t.hero.badges.financing.value },
                { icon: Zap, label: t.hero.badges.process.label, value: t.hero.badges.process.value },
              ].map((badge, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <badge.icon className="text-white/50 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                      {badge.label}
                    </div>
                    <div className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      {badge.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
