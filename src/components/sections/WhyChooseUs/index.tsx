"use client";

import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { translations } from "@/constants/translations";

export const WhyChooseUs = () => {
  const t = translations.en;
  return (
    <Section id="why-us">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <Heading 
              tag={t.whyUs.tag}
              title1={t.whyUs.title1}
              title2={t.whyUs.title2}
              className="mb-12"
            />

            <div className="space-y-8">
              {t.whyUs.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Check size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-white/40 group-hover:text-white/60 transition-colors duration-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden bg-white/[0.03] border border-white/5 flex items-center justify-center"
          >
            {/* Decorative stats card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative text-center p-12">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-8xl md:text-9xl font-black tracking-tighter text-white mb-4"
              >
                2.5k+
              </motion.div>
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">
                {t.whyUs.stats}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
