"use client";

import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { TranslationType } from "@/constants/translations";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  t: TranslationType;
}

export const Testimonials = ({ t }: TestimonialsProps) => {
  return (
    <Section id="testimonials" className="bg-white/5">
      <Heading 
        tag={t.testimonials.tag}
        title1={t.testimonials.title1}
        title2={t.testimonials.title2}
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.testimonials.items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-10 rounded-[3rem] bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-all duration-500"
          >
            <Quote className="text-white/20 mb-8" size={32} />
            <p className="text-xl font-medium text-white/80 mb-8 leading-relaxed italic">
              "{item.text}"
            </p>
            <div>
              <div className="font-bold text-white">{item.name}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/40 mt-1">{item.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
