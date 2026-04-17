"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { TranslationType } from "@/constants/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQProps {
  t: TranslationType;
}

export const FAQ = ({ t }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
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
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <span className="text-xl font-bold pr-8">{item.q}</span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
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
    </Section>
  );
};
