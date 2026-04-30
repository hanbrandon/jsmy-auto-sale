'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import NextLink from 'next/link';
import { CheckCircle2, Loader2, ShieldCheck, Zap, Mail, MapPin, Scale } from 'lucide-react';

export default function DoNotSell() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [oneClickStatus, setOneClickStatus] = useState<'idle' | 'success'>('idle');
    const [isGpcDetected, setIsGpcDetected] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        state: 'California',
        requestType: 'Both (Sale & Sharing)'
    });

    useEffect(() => {
        // 1. Check if user already opted out manually
        const optedOut = localStorage.getItem('jsmy-privacy-opt-out');
        if (optedOut === 'true') {
            setOneClickStatus('success');
            return;
        }

        // 2. Detect Global Privacy Control (GPC) signal from browser
        // @ts-ignore - GPC is a modern browser feature
        if (navigator.globalPrivacyControl === true) {
            localStorage.setItem('jsmy-privacy-opt-out', 'true');
            setOneClickStatus('success');
            setIsGpcDetected(true);
        }
    }, []);

    const handleOneClickOptOut = () => {
        setStatus('loading');
        setTimeout(() => {
            localStorage.setItem('jsmy-privacy-opt-out', 'true');
            setOneClickStatus('success');
            setStatus('idle');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full" />
            </div>

            <main className="relative z-10 pt-32 pb-20">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <header className="mb-16">
                        <div className="flex items-center gap-3 text-white/40 mb-6">
                            <Scale size={16} />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
                                CCPA / CPRA / Nevada Privacy Rights
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
                            Do Not Sell or Share My <br />
                            <span className="text-white/40">Personal Information</span>
                        </h1>
                        <p className="text-white/60 text-lg">
                            Last updated: April 25, 2026
                        </p>
                    </header>

                    <div className="space-y-12">
                        {/* 1. Fast Action: One-Click */}
                        <section className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-md">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-yellow-400">
                                        <Zap size={20} />
                                        <h3 className="text-xl font-bold uppercase tracking-wider">Fast Opt-Out</h3>
                                    </div>
                                    <p className="text-white/60 leading-relaxed font-light">
                                        Instantly block all tracking and data sharing on this browser session. This is the fastest way to exercise your rights.
                                    </p>
                                </div>
                                <div className="w-full md:w-auto shrink-0">
                                    {oneClickStatus === 'success' ? (
                                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center px-12">
                                            <CheckCircle2 size={32} className="text-green-500 mx-auto mb-4" />
                                            <p className="text-sm font-bold text-green-500 mb-2">
                                                {isGpcDetected ? 'Privacy Signal Detected' : 'Shield Active'}
                                            </p>
                                            {isGpcDetected && (
                                                <p className="text-[10px] text-green-500/60 mb-4">
                                                    Your browser's privacy signal was honored automatically.
                                                </p>
                                            )}
                                            <button 
                                                onClick={() => {
                                                    localStorage.removeItem('jsmy-privacy-opt-out');
                                                    setOneClickStatus('idle');
                                                    setIsGpcDetected(false);
                                                }}
                                                className="text-[10px] font-black tracking-widest uppercase text-white/20 hover:text-white transition-colors"
                                            >
                                                Reset Preferences
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleOneClickOptOut}
                                            disabled={status === 'loading'}
                                            className="w-full md:w-64 bg-white text-black py-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/90 transition-all active:scale-[0.98] px-8"
                                        >
                                            {status === 'loading' ? (
                                                <Loader2 size={24} className="animate-spin" />
                                            ) : (
                                                <>
                                                    <span className="text-lg font-black uppercase tracking-tight">One-Click</span>
                                                    <span className="text-[10px] font-bold opacity-50 uppercase mt-1">Activate Shield</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* 2. Policy Content */}
                        <section className="bg-white/5 border border-white/5 p-8 md:p-12 rounded-[2.5rem] space-y-12 text-white/70 leading-relaxed text-lg font-light backdrop-blur-sm">
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-8 h-px bg-white/20" />
                                    1. Your Rights
                                </h2>
                                <p>
                                    Under the California Consumer Privacy Act (CCPA) and Nevada SB 220, you have the right to direct a business that sells or shares personal information about you to third parties not to sell or share your personal information. JSMY AUTO SALES, INC respects these rights and provides this page to help you exercise them.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-8 h-px bg-white/20" />
                                    2. "Sale" and "Sharing" of Information
                                </h2>
                                <p>
                                    We do not sell your personal information for monetary compensation. However, we use third-party services (such as Google, Facebook, and Instagram) that use cookies and similar technologies to show you personalized ads. Under California law, this activity may be considered "sharing" or "selling" of personal information.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-8 h-px bg-white/20" />
                                    3. Formal Request
                                </h2>
                                <p>
                                    If you wish to make a formal request to be removed from our marketing database or to exercise other privacy rights, please contact us using the information provided below. We will respond to your request within the legally required timeframe.
                                </p>
                            </div>
                        </section>

                        {/* 4. Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                            <a 
                                href="mailto:justin.jsmyautosales@gmail.com"
                                className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex items-center gap-6 hover:bg-white/10 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Mail className="text-blue-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-1">Email Support</p>
                                    <p className="text-sm font-medium">justin.jsmyautosales@gmail.com</p>
                                </div>
                            </a>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <MapPin className="text-blue-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-1">Office</p>
                                    <p className="text-sm font-medium">8 Corporate Park #300, Irvine, CA 92606</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="pt-12 border-t border-white/10">
                        <NextLink
                            href="/"
                            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"
                        >
                            ← Back to Home
                        </NextLink>
                    </footer>
                </div>
            </main>

            <Footer />
            <FloatingActionButton />
        </div>
    );
}
