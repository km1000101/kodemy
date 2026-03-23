import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeVideo } from "@/components/home/HomeVideo";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeCTA } from "@/components/home/HomeCTA";

export default function Home() {
  return (
    <div className="min-h-full">
      <HomeHero />
      <HomeFeatures />
      <HomeHowItWorks />
      <HomeVideo />
      <HomeTestimonials />
      <HomeCTA />
    </div>
  );
}
