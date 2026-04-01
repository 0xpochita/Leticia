import { Header } from "@/components/ui/header"
import { HeroSection, LogosSection } from "@/components/ui/hero"
import { EntropySection } from "./entropy-section"
import { FunnelSection } from "./funnel-section"
import { FooterSection } from "./footer-section"

export function LandingPage() {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
        <LogosSection />
        <EntropySection />
        <FunnelSection />
      </main>
      <FooterSection />
    </div>
  )
}
