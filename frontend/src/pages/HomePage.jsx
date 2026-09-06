import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Positioning from "@/components/Positioning";
import Showcase from "@/components/showcase/Showcase";
import { RagSection, AgentSection, OmniSection } from "@/sections/AiSections";
import { SchedulingSection, CrmSection, HandoffSection } from "@/sections/ProductSections";
import { MarketingSection, AnalyticsSection, IntegrationsSection, PlatformTour } from "@/sections/GrowthSections";
import { FreeTrialSection, FinalCta } from "@/sections/Closing";
import { scrollToSection } from "@/lib/scroll";

export default function HomePage() {
  const { hash } = useLocation();

  // Arriving here via a route change (e.g. from the legal page) carries the
  // target section as a hash instead of an in-page anchor click, so nothing
  // has scrolled yet -- do it once the page has mounted.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => scrollToSection(hash), 60);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
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
      <FreeTrialSection />
      <FinalCta />
    </>
  );
}
