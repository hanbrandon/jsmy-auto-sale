import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { translations } from '@/constants/translations';
import '@/app/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

// ... (metadata and dealerschema remain the same)
export const metadata: Metadata = {
    metadataBase: new URL('https://jsmyauto.com'),
    title: {
        default: 'JSMY Auto Sales | Premium Automotive Experience',
        template: '%s | JSMY Auto Sales',
    },
    description:
        'New Cars, Leasing, Used Cars, No Credit Financing in Irvine & San Diego. Specializing in Korean-speaking customer services.',
    keywords: [
        'Auto Sales',
        'Car Lease',
        'Irvine Car Dealer',
        'San Diego Car Dealer',
        'No Credit Car Loan',
        'Korean Car Dealer',
        'JSMY Auto',
    ],
    authors: [{ name: 'JSMY Auto' }],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'JSMY Auto Sales | Premium Automotive Experience',
        description:
            'New Cars, Leasing, Used Cars, No Credit Financing in Irvine & San Diego.',
        url: 'https://jsmyauto.com',
        siteName: 'JSMY Auto Sales',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'JSMY Auto Sales - Premium Automotive Experience',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JSMY Auto Sales | Premium Automotive Experience',
        description:
            'New Cars, Leasing, Used Cars, No Credit Financing in Irvine & San Diego.',
        images: ['/og-image.jpg'],
    },
    other: {
        'geo.region': 'US-CA',
        'geo.placename': 'Irvine, San Diego, Costa Mesa, Newport Beach',
        'geo.position': '33.6846;-117.8265',
        ICBM: '33.6846, -117.8265',
    },
    verification: {
        google: 'google-site-verification-placeholder',
    },
};

export const viewport: Viewport = {
    themeColor: '#050505',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const t = translations.en;
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        })),
    };

    const dealerSchema = [
        {
            '@context': 'https://schema.org',
            '@type': 'AutoDealer',
            '@id': 'https://jsmyauto.com/#dealer',
            name: 'JSMY Auto Sales',
            description:
                'Premium Automotive Experience specializing in new cars, leasing, and no-credit financing for Korean-speaking customers.',
            url: 'https://jsmyauto.com',
            telephone: '+1-714-681-0161',
            priceRange: '$$$',
            image: 'https://jsmyauto.com/logo.png',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Irvine',
                addressRegion: 'CA',
                addressCountry: 'US',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 33.6846,
                longitude: -117.8265,
            },
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ],
                    opens: '10:00',
                    closes: '18:00',
                },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'AutoDealer',
            name: 'JSMY Auto Sales San Diego',
            url: 'https://jsmyauto.com',
            telephone: '+1-714-681-0161',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'San Diego',
                addressRegion: 'CA',
                addressCountry: 'US',
            },
        },
    ];

    return (
        <html
            lang="en"
            className={`${inter.variable} ${outfit.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([...dealerSchema, faqSchema]),
                    }}
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}
