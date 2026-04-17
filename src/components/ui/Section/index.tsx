"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

export const Section = ({ children, className, id, animate = true }: SectionProps) => {
  if (!animate) {
    return (
      <section id={id} className={cn("py-20 px-6 md:px-12", className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={cn("py-20 px-6 md:px-12", className)}
    >
      {children}
    </motion.section>
  );
};
