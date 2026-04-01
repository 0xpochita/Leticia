"use client"
import { Entropy } from "@/components/ui/entropy"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, PlayIcon } from "lucide-react"

export function EntropySection() {
  return (
    <section className="relative w-full bg-foreground py-32 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-0 px-4 md:grid-cols-2">
        <div className="relative flex items-center justify-center overflow-hidden md:justify-start">
          <Entropy className="shrink-0" size={480} />
        </div>

        <div className="flex flex-col gap-8 px-6 py-12 md:px-12">
          <span className="text-xs tracking-[0.3em] text-background/40 uppercase">
            About the Protocol
          </span>

          <h2 className="text-4xl font-light leading-tight tracking-tight text-background md:text-5xl lg:text-6xl">
            Order Meets
            <br />
            Chaos
          </h2>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-background/20 px-4 py-1.5 text-xs tracking-wider text-background/60">
              Cross-chain
            </span>
            <span className="rounded-full border border-background/20 px-4 py-1.5 text-xs tracking-wider text-background/60">
              Yield
            </span>
            <span className="rounded-full border border-background/20 px-4 py-1.5 text-xs tracking-wider text-background/60">
              DeFi
            </span>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-background/50">
            Our protocol transforms unpredictable cross-chain yields into
            structured, tradeable tokens. Split any yield-bearing asset into
            Principal and Yield Tokens with deterministic outcomes.
          </p>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer rounded-none border-background/25 bg-transparent text-xs tracking-widest text-background uppercase hover:bg-background/10 hover:text-background"
            >
              Learn More
              <ArrowRightIcon className="ml-2 size-3.5" />
            </Button>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 text-xs tracking-widest text-background/60 uppercase transition-colors hover:text-background"
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-background/25">
                <PlayIcon className="size-3 fill-current" />
              </span>
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
