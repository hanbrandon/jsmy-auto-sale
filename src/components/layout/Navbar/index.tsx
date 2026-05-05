'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { translations } from '@/constants/translations';
import { cn } from '@/utils/cn';

export const Navbar = () => {
    const t = translations.en;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.services, href: '/#services' },
        { name: t.nav.gallery, href: '/#gallery' },
        { name: t.nav.whyUs, href: '/#why-us' },
        { name: t.nav.contact, href: '/#contact' },
        { name: 'Credit Application', href: '/credit-application' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
                scrolled
                    ? 'py-4 bg-black/60 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
                    : 'py-6 md:py-10 bg-transparent',
            )}
        >
            <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-black/20 to-transparent opacity-0 transition-opacity duration-700 scrolled:opacity-100" />

            <div className="relative z-10 container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex flex-col">
                    <span className="text-xl font-black tracking-tighter text-white">
                        JSMY AUTO
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 leading-none">
                        Sales & Lease
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            whileHover={{ y: -2 }}
                            className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group cursor-pointer"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ))}
                </div>


                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Button
                        href="tel:7146810161"
                        size="sm"
                        className="hidden sm:flex"
                        ariaLabel="Call JSMY Auto Sales"
                    >
                        <Phone size={16} className="mr-2" />
                        {t.nav.call}
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-0 left-0 w-full h-[100dvh] bg-black -z-10"
                    >
                        <div className="flex flex-col p-8 pt-32 h-full overflow-y-auto">
                            <div className="flex flex-col gap-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-4xl font-black text-white hover:text-white/70 transition-colors cursor-pointer tracking-tight"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                            <div className="mt-auto pt-12 pb-8 flex flex-col gap-4">
                                <Button
                                    href="tel:7146810161"
                                    className="justify-center py-6 text-lg w-full"
                                >
                                    <Phone size={24} className="mr-2" />
                                    {t.nav.call}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
