"use client";

import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { TranslationType } from "@/constants/translations";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, MapPin, Send } from "lucide-react";

interface ContactProps {
  t: TranslationType;
}

export const Contact = ({ t }: ContactProps) => {
  return (
    <Section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <Heading 
            tag={t.contact.tag}
            title1={t.contact.title1}
            title2={t.contact.title2}
          />

          <div className="space-y-12 mt-12">
            <div className="flex gap-6 items-start group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Phone size={24} className="text-white/60 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{t.contact.labels.tel}</div>
                <a href="tel:7146810161" className="text-2xl font-bold hover:text-white transition-colors">714.681.0161</a>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <MapPin size={24} className="text-white/60 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{t.contact.labels.loc}</div>
                <div className="text-2xl font-bold">Irvine & San Diego, CA</div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-14 rounded-[3rem] bg-white/[0.03] border border-white/10"
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-white/40 pl-1">{t.contact.labels.name}</label>
                <input 
                  id="name"
                  type="text" 
                  placeholder={t.contact.placeholders.name}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-white/40 pl-1">{t.contact.labels.phone}</label>
                <input 
                  id="phone"
                  type="tel" 
                  placeholder={t.contact.placeholders.phone}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="text-[10px] font-bold uppercase tracking-widest text-white/40 pl-1">{t.contact.labels.service}</label>
              <select 
                id="service"
                defaultValue=""
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-colors appearance-none"
              >
                <option value="" disabled>{t.contact.placeholders.service}</option>
                {t.contact.services.map(s => (
                  <option key={s} value={s} className="bg-black">{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-white/40 pl-1">{t.contact.labels.message}</label>
              <textarea 
                id="message"
                rows={4}
                placeholder={t.contact.placeholders.message}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-colors resize-none"
              />
            </div>

            <Button type="submit" className="w-full py-5">
              {t.contact.labels.submit}
              <Send size={18} className="ml-2" />
            </Button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
};
