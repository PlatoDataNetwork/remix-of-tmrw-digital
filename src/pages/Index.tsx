import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

// Lazy load below-fold sections
const VisionSection = lazy(() => import("@/components/VisionSection"));
const MethodologySection = lazy(() => import("@/components/MethodologySection"));
const Web3AISection = lazy(() => import("@/components/Web3AISection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const RWASection = lazy(() => import("@/components/RWASection"));
const NewsSection = lazy(() => import("@/components/NewsSection"));
const InvestorsSection = lazy(() => import("@/components/InvestorsSection"));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead path="/" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Suspense fallback={<SectionFallback />}>
        <VisionSection />
        <MethodologySection />
        <Web3AISection />
        <ServicesSection />
        <RWASection />
        <NewsSection />
        <InvestorsSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
