import Hero             from "../components/Hero";
import MissionStrip     from "../components/MissionStrip";
import ServicesPreview  from "../components/ServicesPreview";
import AboutTeaser      from "../components/AboutTeaser";
import Testimonials     from "../components/Testimonials";
import DonationTeaser   from "../components/DonationTeaser";
import { CTABanner, Footer } from "../components/CTAAndFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionStrip />
      <ServicesPreview />
      <AboutTeaser />
      <Testimonials />
      <DonationTeaser />
      <CTABanner />
      <Footer />
    </>
  );
}