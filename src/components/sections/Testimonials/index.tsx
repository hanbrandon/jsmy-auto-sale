"use client";

import { useState, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { translations } from "@/constants/translations";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/utils/cn";

export const Testimonials = () => {
  const t = translations.en;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth - 48; 
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  return (
    <Section id="testimonials" className="bg-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <Heading 
          tag={t.testimonials.tag}
          title1={t.testimonials.title1}
          title2={t.testimonials.title2}
          centered
        />

        <div className="relative group">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
          >
            {t.testimonials.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-all duration-500 snap-center shrink-0 w-[85vw] md:w-auto flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-white/20 mb-8" size={32} />
                  <p className="text-lg md:text-xl font-medium text-white/80 mb-8 leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/40 mt-1">{item.role}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator - Mobile Only */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-16">
            {t.testimonials.items.map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "h-1 transition-all duration-300 rounded-full",
                  activeIndex === i ? "w-8 bg-white" : "w-2 bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
