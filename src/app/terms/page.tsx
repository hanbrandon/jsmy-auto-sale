import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import NextLink from 'next/link';

export const metadata = {
    title: 'Terms & Conditions | JSMY Auto Sales',
    description:
        'Terms and Conditions for using JSMY AUTO SALES, INC website and services. Information on automotive sales, leasing, and credit approval.',
};

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-brand-950 text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-400/10 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-500/5 blur-[120px] rounded-full" />
            </div>

            <main className="relative z-10 pt-32 pb-20">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <header className="mb-16">
                        <div className="flex items-center gap-3 text-white/40 mb-6">
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
                                Legal
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                            Terms &{' '}
                            <span className="text-white/40">Conditions</span>
                        </h1>
                        <p className="text-white/60 text-lg">
                            Last updated: April 25, 2026
                        </p>
                    </header>

                    <section className="glass-premium border border-white/5 p-8 md:p-12 rounded-[2.5rem] space-y-12 text-white/70 leading-relaxed text-lg font-light">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                1. Agreement to Terms
                            </h2>
                            <p>
                                By accessing or using the website jsmyauto.com
                                (the "Website"), you agree to be bound by these
                                Terms and Conditions. If you do not agree to all
                                of these terms, do not use this Website.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                2. Automotive Sales & Leasing
                            </h2>
                            <p>
                                All vehicles are subject to prior sale. Prices
                                and availability are subject to change without
                                notice. While we strive for accuracy, JSMY AUTO
                                SALES, INC is not responsible for typographical
                                or other errors in descriptions, pricing, or
                                images.
                            </p>
                            <p className="italic bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                                "Subject to Credit Approval: All financing and
                                lease terms are subject to credit approval by
                                third-party lenders. Rates and terms may vary
                                based on credit history, vehicle choice, and
                                other factors."
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                3. Website Use
                            </h2>
                            <p>
                                You may use the Website only for lawful
                                purposes. You agree not to use the Website in
                                any way that violates any applicable federal,
                                state, local, or international law or
                                regulation.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                4. Electronic Communications
                            </h2>
                            <p>
                                When you use our Website or send emails, text
                                messages, and other communications from your
                                desktop or mobile device to us, you may be
                                communicating with us electronically. You
                                consent to receive communications from us
                                electronically, such as e-mails, texts, or
                                notices on this site.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                5. Limitation of Liability
                            </h2>
                            <p>
                                In no event will JSMY AUTO SALES, INC, its
                                affiliates, or their licensors, service
                                providers, employees, agents, officers, or
                                directors be liable for damages of any kind
                                arising out of or in connection with your use,
                                or inability to use, the Website.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                6. Governing Law
                            </h2>
                            <p>
                                All matters relating to the Website and these
                                Terms and Conditions shall be governed by and
                                construed in accordance with the internal laws
                                of the State of California without giving effect
                                to any choice or conflict of law provision or
                                rule.
                            </p>
                        </div>
                    </section>

                    <footer className="mt-20 pt-12 border-t border-white/10">
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
