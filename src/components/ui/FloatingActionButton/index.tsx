"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export const FloatingActionButton = () => {
  return (
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
  );
};
