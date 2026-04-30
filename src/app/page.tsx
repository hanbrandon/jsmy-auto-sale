import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import dynamic from "next/dynamic";
import { BeholdPost } from "@/types/instagram";

const InstagramGallery = dynamic(() => import("@/components/sections/InstagramGallery").then(mod => mod.InstagramGallery));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs").then(mod => mod.WhyChooseUs));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ));
const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => mod.Contact));
const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer));
const FloatingActionButton = dynamic(() => import("@/components/ui/FloatingActionButton").then(mod => mod.FloatingActionButton));

async function getInstagramPosts(): Promise<BeholdPost[]> {
  let feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;
  if (!feedId) return [];

  // Extract ID if full URL was provided
  if (feedId.startsWith('http')) {
    feedId = feedId.split('/').pop() || '';
  }

  if (!feedId) return [];

  try {
    const response = await fetch(`https://feeds.behold.so/${feedId}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch Behold feed (${feedId}). Status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    // Behold can return an array directly or an object with a posts key
    return Array.isArray(data) ? data : data.posts || [];
  } catch (error) {
    console.error("Error fetching Instagram feed:", error);
    return [];
  }
}

export default async function Home() {
  const instagramPosts = await getInstagramPosts();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <InstagramGallery initialPosts={instagramPosts} />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      
      <footer className="relative z-10">
        <Footer />
      </footer>

      <FloatingActionButton />
    </div>
  );
}
