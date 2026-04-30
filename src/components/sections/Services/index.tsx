"use client";

import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { translations } from "@/constants/translations";

import { motion } from "framer-motion";

export const Services = () => {
  const t = translations.en;
  return (
    <Section id="services">
      <div className="container mx-auto px-6 md:px-12">
        <Heading 
          tag={t.services.tag}
          title1={t.services.title1}
          title2={t.services.title2}
          sub={t.services.sub}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {t.services.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="mb-10 flex justify-between items-start relative z-10">
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-colors duration-500">
                  {item.tag}
                </span>
              </div>


              <h3 className="text-3xl font-bold mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-700 relative z-10">
                {item.title}
              </h3>
              <p className="text-white/40 group-hover:text-white/70 transition-colors duration-700 leading-relaxed text-lg relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
