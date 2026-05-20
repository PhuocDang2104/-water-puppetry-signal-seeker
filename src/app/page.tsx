import { AboutSection } from "@/components/home/AboutSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HoaDatVietSection } from "@/components/home/HoaDatVietSection";
import { HomeCelebrationPopup } from "@/components/home/HomeCelebrationPopup";
import { ProjectIntroductionSection } from "@/components/home/ProjectIntroductionSection";
import { AudienceBenefitsSection, NewsTrainingAnchors } from "@/components/home/ReservedSections";
import { Footer } from "@/components/layout/Footer";
import { ShowList } from "@/components/shows/ShowList";

export default function HomePage() {
  return (
    <>
      <HomeCelebrationPopup />
      <HeroSection />
      <ProjectIntroductionSection />
      <AboutSection />
      <AudienceBenefitsSection />
      <HoaDatVietSection />
      <ShowList />
      <NewsTrainingAnchors />
      <Footer />
    </>
  );
}
