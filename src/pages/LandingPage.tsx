
import { LoadingProgress } from "@/components/ui/loading-progress";
import { Logo } from "@/components/branding/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const LandingPage = () => {
  const { loading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate initial page loading
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setPageLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5 flex flex-col items-center justify-center">
        <Logo size="lg" variant="full" className="mb-8 animate-pulse" />
        <LoadingProgress 
          isLoading={true} 
          progress={loadingProgress} 
          variant="bar"
          className="w-64 mb-4"
        />
        <div className="text-muted-foreground text-sm">Loading your experience...</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5 overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
