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
        { name: t.nav.services, href: '#services' },
        { name: t.nav.gallery, href: '#gallery' },
        { name: t.nav.whyUs, href: '#why-us' },
        { name: t.nav.contact, href: '#contact' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-100 transition-all duration-500',
                scrolled
                    ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5'
                    : 'py-6 md:py-8 bg-transparent',
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex flex-col">
                    <span className="text-xl font-black tracking-tighter text-white">
                        JSMY AUTO
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 leading-none">
                        Sales & Lease
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/50 hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col gap-6 p-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-white/70 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 flex flex-col gap-4">
                                <Button
                                    href="tel:7146810161"
                                    className="justify-center"
                                >
                                    <Phone size={18} className="mr-2" />
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
