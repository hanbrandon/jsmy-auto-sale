import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { InstagramGallery } from "@/components/sections/InstagramGallery";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { BeholdPost } from "@/types/instagram";

async function getInstagramPosts(): Promise<BeholdPost[]> {
  const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;
  if (!feedId) return [];

  try {
    const response = await fetch(`https://feeds.behold.so/${feedId}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!response.ok) throw new Error("Failed to fetch feed");
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
