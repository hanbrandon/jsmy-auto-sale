"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { InstagramGallery } from "@/components/sections/InstagramGallery";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Navbar t={t} />
      
      <main>
        <Hero t={t} />
        <Services t={t} />
        <InstagramGallery t={t} />
        <WhyChooseUs t={t} />
        <Testimonials t={t} />
        <FAQ t={t} />
        <Contact t={t} />
      </main>
      
      <Footer t={t} />

      {/* Floating Action Button for mobile */}
      <motion.a
        href="tel:7146810161"
        aria-label="Call JSMY Auto Sales"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl md:hidden"
      >
        <Phone size={24} strokeWidth={3} />
      </motion.a>
    </div>
  );
}
