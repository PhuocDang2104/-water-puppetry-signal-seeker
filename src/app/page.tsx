import { AboutSection } from "@/components/home/AboutSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsTrainingAnchors, ServiceIntroSection } from "@/components/home/ReservedSections";
import { Footer } from "@/components/layout/Footer";
import { ShowList } from "@/components/shows/ShowList";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServiceIntroSection />
      <ShowList />
      <NewsTrainingAnchors />
      <Footer />
    </>
  );
}
