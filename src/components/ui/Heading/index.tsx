"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface HeadingProps {
  tag?: string;
  title1: string;
  title2?: string;
  sub?: string;
  centered?: boolean;
  className?: string;
}

export const Heading = ({ 
  tag, 
  title1, 
  title2, 
  sub, 
  centered = false,
  className 
}: HeadingProps) => {
  return (
    <div className={cn(
      "mb-12 flex flex-col gap-4",
      centered ? "items-center text-center" : "items-start",
      className
    )}>
      {tag && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-white/60"
        >
          {tag}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold tracking-tight"
      >
        {title1} {title2 && <span className="text-white/40">{title2}</span>}
      </motion.h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/50 max-w-2xl text-balance"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
};
