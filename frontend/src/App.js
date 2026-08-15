import { useEffect } from "react";
import Lenis from "lenis";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Positioning from "@/components/Positioning";
import Showcase from "@/components/showcase/Showcase";
import { RagSection, AgentSection, OmniSection } from "@/sections/AiSections";
import { SchedulingSection, CrmSection, HandoffSection } from "@/sections/ProductSections";
import { MarketingSection, AnalyticsSection, IntegrationsSection, PlatformTour } from "@/sections/GrowthSections";
import { PricingSection, FinalCta, Footer } from "@/sections/Closing";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="grain min-h-screen bg-ink text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Positioning />
        <Showcase />
        <RagSection />
        <AgentSection />
        <OmniSection />
        <SchedulingSection />
        <CrmSection />
        <HandoffSection />
        <MarketingSection />
        <AnalyticsSection />
        <IntegrationsSection />
        <PlatformTour />
        <PricingSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
