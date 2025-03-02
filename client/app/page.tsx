"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Header from "@/components/landingPage/header";
import ParallaxHero from "@/components/landingPage/parallax-hero";
import ParallaxDestinations from "@/components/landingPage/parallax-destinations";
import ParallaxAbout from "@/components/landingPage/parallax-about";
import ParallaxPackages from "@/components/landingPage/parallax-packages";
import ParallaxBlog from "@/components/landingPage/parallax-blog";
import ParallaxTestimonials from "@/components/landingPage/parallax-testimonials";
import ParallaxNewsletter from "@/components/landingPage/parallax-newsletter";
import Footer from "@/components/landingPage/footer";
import SearchSection from "@/components/landingPage/search-section";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <Header />
      <main className="relative">
        <ParallaxHero />
        <SearchSection />
        <ParallaxDestinations scrollYProgress={scrollYProgress} />
        <ParallaxAbout scrollYProgress={scrollYProgress} />
        <ParallaxPackages scrollYProgress={scrollYProgress} />
        <ParallaxBlog scrollYProgress={scrollYProgress} />
        <ParallaxTestimonials scrollYProgress={scrollYProgress} />
        <ParallaxNewsletter scrollYProgress={scrollYProgress} />
      </main>
      <Footer />
    </div>
  );
}
