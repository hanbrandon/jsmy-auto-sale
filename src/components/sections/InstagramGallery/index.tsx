"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { TranslationType } from "@/constants/translations";
import Image from "next/image";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const gallery = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
    caption: "Tesla Model Y Delivery - Irvine",
    size: "large"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    caption: "BMW X5 - San Diego",
    size: "small"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
    caption: "Mercedes GLE - Lease Approval",
    size: "small"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800",
    caption: "Audi Q7 - Expat Financing",
    size: "small"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800",
    caption: "Genesis GV80 - Premium Delivery",
    size: "large"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800",
    caption: "Ford Mustang - No Credit OK",
    size: "small"
  }
];

interface InstagramGalleryProps {
  t: TranslationType;
}

export const InstagramGallery = ({ t }: InstagramGalleryProps) => {
  return (
    <Section id="gallery">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-white/40 mb-6"
          >
            <InstagramIcon size={16} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">{t.gallery.tag}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            {t.gallery.title1} <br />
            <span className="text-white/40">{t.gallery.title2}</span>
          </motion.h2>
        </div>
        
        <motion.a 
          href="#" 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
        >
          {t.gallery.follow}
          <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
        {gallery.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`relative overflow-hidden rounded-[2rem] group cursor-pointer ${
              item.size === "large" ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
            }`}
          >
            <Image 
              src={item.url} 
              alt={item.caption} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <p className="text-white font-bold text-lg leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.caption}
              </p>
              <span className="text-[9px] font-black tracking-widest uppercase text-white/40 mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {t.gallery.view}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
