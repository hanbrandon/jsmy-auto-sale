'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { translations } from '@/constants/translations';
import Image from 'next/image';
import { cn } from '@/utils/cn';

import { BeholdPost } from '@/types/instagram';

const InstagramIcon = ({
    size = 16,
    className,
}: {
    size?: number;
    className?: string;
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const STATIC_GALLERY = [
    {
        id: 's1',
        url: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200',
        caption: 'Tesla Model Y Delivery - Irvine',
        size: 'large',
        permalink: 'https://www.instagram.com/jsmyautosales/',
    },
    {
        id: 's2',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
        caption: 'BMW X5 - San Diego',
        size: 'small',
        permalink: 'https://www.instagram.com/jsmyautosales/',
    },
    {
        id: 's3',
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
        caption: 'Mercedes GLE - Lease Approval',
        size: 'small',
        permalink: 'https://www.instagram.com/jsmyautosales/',
    },
    {
        id: 's4',
        url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800',
        caption: 'Audi Q7 - Expat Financing',
        size: 'small',
        permalink: 'https://www.instagram.com/jsmyautosales/',
    },
    {
        id: 's5',
        url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=1200',
        caption: 'Genesis GV80 - Premium Delivery',
        size: 'large',
        permalink: 'https://www.instagram.com/jsmyautosales/',
    },
    {
        id: 's6',
        url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800',
        caption: 'Ford Mustang - No Credit OK',
        size: 'small',
        permalink: 'https://www.instagram.com/jsmyautosales/',
    },
];

interface InstagramGalleryProps {
    initialPosts?: BeholdPost[];
}

export const InstagramGallery = ({
    initialPosts = [],
}: InstagramGalleryProps) => {
    const t = translations.en;

    // Transform Behold posts to our gallery format
    const dynamicGallery = initialPosts.map((post, index) => ({
        id: post.id,
        url: post.mediaUrl,
        caption: post.caption || 'JSMY Auto Delivery',
        permalink: post.permalink,
        size:
            index === 0 || index === 4
                ? 'large'
                : ('small' as 'large' | 'small'),
    }));

    const gallery = dynamicGallery.length > 0 ? dynamicGallery : STATIC_GALLERY;

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
        <Section id="gallery" disableContain>
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 text-white/60 mb-6"
                        >
                            <InstagramIcon size={16} />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
                                {t.gallery.tag}
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
                        >
                            {t.gallery.title1} <br />
                            <span className="text-white/50">
                                {t.gallery.title2}
                            </span>
                        </motion.h2>
                    </div>

                    <motion.a
                        href="https://www.instagram.com/jsmyautosales/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
                    >

                        {t.gallery.follow}
                        <ArrowUpRight
                            size={14}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                    </motion.a>
                </div>

                <div className="relative">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex md:grid md:grid-cols-4 gap-4 md:auto-rows-[300px] overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
                    >
                        {gallery.map((item, i) => (
                            <motion.a
                                key={item.id}
                                href={item.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{
                                    y: -10,
                                    transition: {
                                        duration: 0.4,
                                        ease: 'easeOut',
                                    },
                                }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className={cn(
                                    'relative overflow-hidden rounded-[2.5rem] group cursor-pointer bg-white/5 border border-white/5 snap-center shrink-0',
                                    'w-[85vw] md:w-auto h-112.5 md:h-auto', // Mobile card height/width
                                    item.size === 'large'
                                        ? 'md:col-span-2 md:row-span-2'
                                        : 'md:col-span-1 md:row-span-1',
                                )}
                            >
                                <div className="absolute inset-0 z-10 bg-white/0 group-hover:bg-white/2 transition-colors duration-500" />

                                <Image
                                    src={item.url}
                                    alt={item.caption}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    quality={75}
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                />


                                {/* Overlay Content */}
                                <div className="absolute inset-0 z-20 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-10">
                                    <div className="flex justify-between items-end gap-4">
                                        <div className="flex-1">
                                            <motion.p className="text-white font-medium text-sm md:text-base line-clamp-1 leading-tight transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                                {item.caption}
                                            </motion.p>
                                            <div className="flex items-center gap-2 mt-3 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                                <InstagramIcon
                                                    size={12}
                                                    className="text-white/60"
                                                />
                                                <span className="text-[10px] font-black tracking-widest uppercase text-white/60">
                                                    {t.gallery.view}
                                                </span>
                                            </div>
                                        </div>
                                        <motion.div
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 90,
                                            }}
                                            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-100 shadow-2xl"
                                        >
                                            <ArrowUpRight size={20} />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Dots Indicator - Mobile Only */}
                    <div className="flex md:hidden justify-center items-center gap-2 mt-16">
                        {gallery.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'h-1 transition-all duration-300 rounded-full',
                                    activeIndex === i
                                        ? 'w-8 bg-white'
                                        : 'w-2 bg-white/20',
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </Section>
    );
};
