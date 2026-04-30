'use client';

import { useState, useEffect, useCallback } from 'react';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { translations } from '@/constants/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Testimonials = () => {
    const t = translations.en;
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % t.testimonials.items.length);
    }, [t.testimonials.items.length]);

    const prevSlide = useCallback(() => {
        setActiveIndex(
            (prev) =>
                (prev - 1 + t.testimonials.items.length) %
                t.testimonials.items.length,
        );
    }, [t.testimonials.items.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000); // Auto-play every 6 seconds
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <Section id="testimonials" className="bg-white/5 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <Heading
                    tag={t.testimonials.tag}
                    title1={t.testimonials.title1}
                    title2={t.testimonials.title2}
                    centered
                />

                <div className="relative max-w-5xl mx-auto mt-12 md:mt-20">
                    <div className="relative min-h-112.5 md:min-h-87.5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute inset-x-0 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 flex flex-col justify-center items-center text-center h-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
                            >
                                <Quote
                                    className="text-white/10 mb-8"
                                    size={40}
                                />
                                <p className="text-xl md:text-3xl font-medium text-white mb-10 leading-relaxed italic max-w-4xl tracking-tight">
                                    "{t.testimonials.items[activeIndex].text}"
                                </p>
                                <div>
                                    <div className="font-bold text-white text-lg md:text-xl tracking-tight">
                                        {t.testimonials.items[activeIndex].name}
                                    </div>
                                    <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/30 mt-3">
                                        {t.testimonials.items[activeIndex].role}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={prevSlide}
                        suppressHydrationWarning
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all backdrop-blur-xl border border-white/10 hover:scale-110 z-10 group"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} className="md:w-8 md:h-8 group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    <button
                        onClick={nextSlide}
                        suppressHydrationWarning
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all backdrop-blur-xl border border-white/10 hover:scale-110 z-10 group"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} className="md:w-8 md:h-8 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center items-center gap-3 mt-16 md:mt-20">
                    {t.testimonials.items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            suppressHydrationWarning
                            className={cn(
                                'h-1.5 transition-all duration-500 rounded-full',
                                activeIndex === i
                                    ? 'w-12 bg-white'
                                    : 'w-3 bg-white/20 hover:bg-white/40',
                            )}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};
