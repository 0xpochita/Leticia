"use client"

import { FunnelChart } from "@/components/ui/funnel-chart"

const data = [
  { label: "Total Deposits", value: 12400, displayValue: "$12.4M" },
  { label: "Wrapped (SY)", value: 6800, displayValue: "$6.8M" },
  { label: "Split PT/YT", value: 3200, displayValue: "$3.2M" },
  { label: "AMM Trades", value: 1500, displayValue: "$1.5M" },
  { label: "Settled", value: 620, displayValue: "$620K" },
]

export function FunnelSection() {
  return (
    <section className="relative w-full py-32 md:py-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-4xl tracking-tight md:text-5xl lg:text-6xl">
            Protocol Flow
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed tracking-wider text-muted-foreground md:text-lg">
            From cross-chain deposits to settled yield tokens, track every stage
            of the tokenization pipeline
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <FunnelChart
            data={data}
            orientation="vertical"
            color="hsl(var(--foreground))"
            layers={3}
          />
        </div>
      </div>
    </section>
  )
}
