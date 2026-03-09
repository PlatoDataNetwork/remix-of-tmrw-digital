import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VisionSection from "@/components/VisionSection";
import MethodologySection from "@/components/MethodologySection";
import Web3AISection from "@/components/Web3AISection";
import ServicesSection from "@/components/ServicesSection";
import RWASection from "@/components/RWASection";
import NewsSection from "@/components/NewsSection";
import InvestorsSection from "@/components/InvestorsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll-to from subpage navigation
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      // Clear the state so it doesn't re-scroll on back navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MethodologySection />
      <VisionSection />
      <Web3AISection />
      <ServicesSection />
      <RWASection />
      <NewsSection />
      <InvestorsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
