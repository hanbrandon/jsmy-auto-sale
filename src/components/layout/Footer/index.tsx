'use client';

import { translations } from '@/constants/translations';
import { Phone, MapPin } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { InstagramIcon, ThreadsIcon } from '@hugeicons/core-free-icons';

export const Footer = () => {
    const t = translations.en;
    return (
        <footer className="py-20 border-t border-white/5 bg-black">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-2">
                        <a href="#" className="flex flex-col mb-8">
                            <span className="text-2xl font-black tracking-tighter text-white">
                                JSMY AUTO
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 leading-none">
                                Sales & Lease
                            </span>
                        </a>
                        <p className="text-white/40 max-w-sm leading-relaxed">
                            {t.hero.sub} Providing the best automotive
                            experience in California.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-6">
                            Explore
                        </h4>
                        <div className="flex flex-col gap-4 text-white/40">
                            <a
                                href="#services"
                                className="hover:text-white transition-colors"
                            >
                                {t.nav.services}
                            </a>
                            <a
                                href="#gallery"
                                className="hover:text-white transition-colors"
                            >
                                {t.nav.gallery}
                            </a>
                            <a
                                href="#why-us"
                                className="hover:text-white transition-colors"
                            >
                                {t.nav.whyUs}
                            </a>
                            <a
                                href="#contact"
                                className="hover:text-white transition-colors"
                            >
                                {t.nav.contact}
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-6">
                            Contact & Follow
                        </h4>
                        <div className="flex flex-col gap-6">
                            <div className="text-white/40 text-sm space-y-2">
                                <a
                                    href="mailto:justin.jsmyautosales@gmail.com"
                                    className="hover:text-white transition-colors block"
                                >
                                    justin.jsmyautosales@gmail.com
                                </a>
                                <p>8 Corporate Park #300</p>
                                <p>Irvine, CA 92606</p>
                                <p className="pt-2 text-white/20">
                                    DEALER #95338
                                    <br />
                                    OL#: S926138
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.instagram.com/jsmyautosales/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <HugeiconsIcon
                                        icon={InstagramIcon}
                                        size={20}
                                    />
                                </a>
                                <a
                                    href="https://www.threads.net/@jsmyautosales?xmt=AQF0DLzd_Vz65vaH9LwiFyKWRWwdu7M7QFc38I4DP7NCDWE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <HugeiconsIcon
                                        icon={ThreadsIcon}
                                        size={20}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    <div>
                        © {new Date().getFullYear()} JSMY AUTO SALES, INC. ALL
                        RIGHTS RESERVED.
                    </div>
                    <div className="flex gap-8">
                        <a
                            href="/privacy"
                            className="hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/terms"
                            className="hover:text-white transition-colors"
                        >
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
