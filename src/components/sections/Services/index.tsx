"use client";

import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { TranslationType } from "@/constants/translations";
import { motion } from "framer-motion";

interface ServicesProps {
  t: TranslationType;
}

export const Services = ({ t }: ServicesProps) => {
  return (
    <Section id="services">
      <Heading 
        tag={t.services.tag}
        title1={t.services.title1}
        title2={t.services.title2}
        sub={t.services.sub}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.services.items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group p-8 rounded-[2rem] bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
          >
            <div className="mb-6 flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                {item.tag}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-1 transition-transform duration-500">
              {item.title}
            </h3>
            <p className="text-white/40 group-hover:text-white/60 transition-colors duration-500 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
