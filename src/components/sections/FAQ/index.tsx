"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { translations } from "@/constants/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export const FAQ = () => {
  const t = translations.en;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Heading 
            tag={t.faq.tag}
            title1={t.faq.title1}
            title2={t.faq.title2}
            centered
          />

          <div className="space-y-4">
            {t.faq.items.map((item, index) => (
              <div 
                key={index}
                className="rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  suppressHydrationWarning
                  className="w-full p-8 flex items-center justify-between text-left group/btn"
                >
                  <span className="text-xl font-bold pr-8 group-hover:text-white transition-colors">{item.q}</span>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-white/10 group-hover/btn:scale-110 transition-all">
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="px-8 pb-8 text-white/40 leading-relaxed text-lg">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
