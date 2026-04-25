import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import NextLink from 'next/link';

export const metadata = {
    title: 'Privacy Policy | JSMY Auto Sales',
    description:
        'Privacy Policy for JSMY AUTO SALES, INC. Learn how we collect, use, and protect your personal information in compliance with CCPA/CPRA.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-brand-950 text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-400/10 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/5 blur-[120px] rounded-full" />
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
                            Privacy{' '}
                            <span className="text-white/40">Policy</span>
                        </h1>
                        <p className="text-white/60 text-lg">
                            Last updated: April 25, 2026
                        </p>
                    </header>

                    <section className="glass-premium border border-white/5 p-8 md:p-12 rounded-[2.5rem] space-y-12 text-white/70 leading-relaxed text-lg font-light">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                1. Introduction
                            </h2>
                            <p>
                                JSMY AUTO SALES, INC ("we," "us," or "our")
                                respects your privacy and is committed to
                                protecting it through our compliance with this
                                policy. This policy describes the types of
                                information we may collect from you or that you
                                may provide when you visit our website
                                (jsmyauto.com) and our practices for collecting,
                                using, maintaining, protecting, and disclosing
                                that information.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                2. Information We Collect
                            </h2>
                            <p>
                                We collect several types of information from and
                                about users of our Website, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-brand-400">
                                <li>
                                    <strong>Personal Identifiers:</strong> Name,
                                    postal address, email address, telephone
                                    number, and social security number (for
                                    financing applications).
                                </li>
                                <li>
                                    <strong>Vehicle Information:</strong> VIN,
                                    mileage, and vehicle condition for trade-in
                                    appraisals.
                                </li>
                                <li>
                                    <strong>Technical Data:</strong> IP address,
                                    browser type, and usage details collected
                                    through cookies and other tracking
                                    technologies.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                3. California Privacy Rights (CCPA/CPRA)
                            </h2>
                            <p>
                                Under the California Consumer Privacy Act (CCPA)
                                and the California Privacy Rights Act (CPRA),
                                California residents have specific rights
                                regarding their personal information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-brand-400">
                                <li>
                                    <strong>Right to Know:</strong> You have the
                                    right to request that we disclose what
                                    personal information we collect, use,
                                    disclose, and sell.
                                </li>
                                <li>
                                    <strong>Right to Delete:</strong> You have
                                    the right to request the deletion of your
                                    personal information.
                                </li>
                                <li>
                                    <strong>Right to Opt-Out:</strong> We do not
                                    sell personal information to third parties.
                                </li>
                                <li>
                                    <strong>
                                        Right to Non-Discrimination:
                                    </strong>{' '}
                                    We will not discriminate against you for
                                    exercising any of your CCPA/CPRA rights.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                4. How We Use Your Information
                            </h2>
                            <p>
                                We use information that we collect about you or
                                that you provide to us:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-brand-400">
                                <li>
                                    To provide you with information, products,
                                    or services that you request from us (e.g.,
                                    lease quotes, appraisals).
                                </li>
                                <li>
                                    To process your financing applications with
                                    our lender partners.
                                </li>
                                <li>
                                    To notify you about changes to our Website
                                    or any products or services we offer.
                                </li>
                                <li>
                                    To contact you about vehicles or services
                                    that may be of interest to you, in
                                    accordance with your preferences.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-400/50" />
                                5. Contact Information
                            </h2>
                            <p>
                                To ask questions or comment about this privacy
                                policy and our privacy practices, contact us at:
                            </p>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mt-6 backdrop-blur-md">
                                <p className="font-bold text-white mb-2">
                                    JSMY AUTO SALES, INC
                                </p>
                                <p>8 Corporate Park #300</p>
                                <p>Irvine, CA 92606</p>
                                <p className="mt-4">
                                    Email:{' '}
                                    <a
                                        href="mailto:justin.jsmyautosales@gmail.com"
                                        className="text-brand-400 hover:text-brand-300 transition-colors"
                                    >
                                        justin.jsmyautosales@gmail.com
                                    </a>
                                </p>
                            </div>
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
