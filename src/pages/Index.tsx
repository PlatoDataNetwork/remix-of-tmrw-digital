import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VisionSection from "@/components/VisionSection";
import Web3AISection from "@/components/Web3AISection";
import ServicesSection from "@/components/ServicesSection";
import RWASection from "@/components/RWASection";
import TeamSection from "@/components/TeamSection";
import NewsSection from "@/components/NewsSection";
import InvestorsSection from "@/components/InvestorsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VisionSection />
      <Web3AISection />
      <ServicesSection />
      <RWASection />
      <TeamSection />
      <NewsSection />
      <InvestorsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
