import { Header } from "@/components/ui/header"
import { HeroSection } from "@/components/ui/hero"
import { EntropySection } from "./entropy-section"
import { FeaturesSection } from "./features-section"
import { FooterSection } from "./footer-section"

export function LandingPage() {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
        <EntropySection />
        <FeaturesSection />
      </main>
      <FooterSection />
    </div>
  )
}
