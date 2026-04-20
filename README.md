# JSMY Auto Sales

Premium automotive experience platform specializing in high-end vehicle acquisition, leasing, and trade-ins. Built with Next.js 15, Tailwind CSS v4, and Framer Motion for a pixel-perfect, world-class user experience.

## ✨ Premium Features

- **Dynamic Visuals**: High-resolution Instagram-style gallery with interactive Lightbox and smooth hover tilt effects.
- **Responsive Excellence**: Fully optimized for Mobile, Tablet, and Desktop with "Airbnb-style" precise typography and balanced spacing.
- **Interactive Carousels**: Custom-built horizontal scroll carousels for mobile viewports in Gallery and Testimonials sections, featuring animated dot indicators.
- **Glassmorphism UI**: Modern, sleek interface with blur backdrops and premium card layouts.
- **English-Only Architecture**: Simplified, performance-focused codebase optimized for English-speaking global markets.

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (Pure CSS-first approach)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Brevo (formerly Sendinblue)

## 🚀 Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm run dev
   ```

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
# Brevo (Email)
BREVO_API_KEY=your_api_key
BREVO_SENDER_EMAIL=info@jsmyautosales.com
NOTIFICATION_EMAIL=admin@jsmyautosales.com

# Instagram (Behold.so)
NEXT_PUBLIC_BEHOLD_FEED_ID=your_behold_feed_id
```

## 📸 Instagram Integration (Behold.so)

To connect the live Instagram feed, we recommend using **Behold.so**. This service provides a stable, simplified API wrapper around the official Instagram Graph API.

### Caching & Optimization (ISR)

To stay within API limits and ensure maximum performance, the feed is fetched using Next.js **Incremental Static Regeneration (ISR)**:

```typescript
async function getInstagramPosts() {
  const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;
  const response = await fetch(`https://feeds.behold.so/${feedId}`, {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  });
  return response.json();
}
```

- **Efficiency**: API calls are made only once per hour on the server-side, serving cached results to all visitors.
- **Resilience**: Even if the Instagram API is temporarily down, the cached version will continue to serve.
- **Performance**: No client-side layout shifts as the data is available at the time of rendering.

## 📬 Contact Form & API

The platform features a multi-mode contact form supporting:
1. **New Car Inquiry** (Buy/Lease)
2. **Carfax Request** (Vehicle history with Zelle/Venmo fee notice)
3. **Used Car Inquiry**
4. **Sell Your Car** (Trade-in evaluation)

All submissions are processed via `/api/contact` and dispatched as professional HTML emails using the Brevo SMTP API.

## 📈 SEO & Performance

Optimized for **Lighthouse 100**, featuring:
- Semantic HTML5 structure
- Metadata API for dynamic titles and descriptions
- `content-visibility` optimizations for high performance
- Responsive image handling with `next/image`
