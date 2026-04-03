"use client"

import { PlusIcon } from "lucide-react"
import { LaunchButton } from "@/components/ui/launch-button"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Twitter", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "Discord", href: "#" },
  { label: "Mirror", href: "#" },
]

const docLinks = [
  { label: "Docs", href: "#" },
]

export function FooterSection() {
  return (
    <footer className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Start Managing Your Yield
            </h2>
            <div className="flex items-start gap-2">
              <PlusIcon className="mt-0.5 size-4 shrink-0 text-foreground/30" />
              <p className="max-w-xs text-sm leading-relaxed text-foreground/50">
                Join The Growing Community Of Initia Users Who Are Taking
                Control Of Their DeFi Returns With Leticia.
              </p>
            </div>
            <div>
              <LaunchButton label="Launch App" />
            </div>
          </div>

          <h3 className="text-right text-3xl leading-snug tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-foreground/30">First Yield</span>{" "}
            Tokenization Protocol on Initia.{" "}
            <span className="text-foreground/30">Experience</span> advanced
            DeFi with Leticia.
          </h3>
        </div>

        <div className="mt-20 border-t border-background/10 pt-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <span className="text-sm font-bold tracking-widest text-foreground uppercase">
                Leticia
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="cursor-pointer text-xs tracking-[0.15em] text-foreground/50 uppercase transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {docLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="cursor-pointer text-xs tracking-[0.15em] text-foreground/50 uppercase transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-start justify-end">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="flex cursor-pointer items-center justify-center rounded-2xl border border-background/10 px-8 py-6 text-sm text-foreground/60 transition-colors hover:border-background/20 hover:text-foreground"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none mt-10 select-none overflow-hidden">
        <p
          className="whitespace-nowrap text-center font-bold uppercase text-foreground/5 leading-none"
          style={{ fontSize: "clamp(120px, 15vw, 260px)" }}
        >
          LETICIA
        </p>
      </div>

      <div className="border-t border-background/10 px-6 py-6">
        <p className="text-center text-xs text-foreground/30">
          2026 Leticia. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
