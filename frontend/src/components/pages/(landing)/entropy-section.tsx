"use client"
import Image from "next/image"
import { Entropy } from "@/components/ui/entropy"
import { LaunchButton } from "@/components/ui/launch-button"
import { PlusIcon } from "lucide-react"

function YieldCard({
  logo,
  alt,
  rate,
  token,
  label,
}: {
  logo: string
  alt: string
  rate: string
  token: string
  label: string
}) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-foreground/10 bg-foreground/3 px-6 py-5 backdrop-blur-sm">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-foreground/40">{label}</span>
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt={alt}
            width={32}
            height={32}
            className="pointer-events-none select-none rounded-full"
          />
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {rate}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-foreground/40">({token})</span>
    </div>
  )
}

export function EntropySection() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="text-foreground/40">First Yield</span>{" "}
              Tokenization
              <br />
              Protocol on Initia.
              <br />
              <span className="text-foreground/40">Experience</span> advanced
              DeFi
              <br />
              with Leticia.
            </h2>

            <div className="flex items-start gap-3 pt-8">
              <PlusIcon className="mt-0.5 size-4 shrink-0 text-foreground/40" />
              <p className="max-w-sm text-sm leading-relaxed text-foreground/50">
                Leticia Brings Yield Tokenization To Initia, Letting You Manage
                Your DeFi Returns With More Control And Flexibility.
              </p>
            </div>

            <div>
              <LaunchButton label="Open App" />
            </div>
          </div>

          <div className="relative flex flex-col gap-6">
            <div className="relative mx-auto h-[400px] w-full max-w-[500px] overflow-hidden rounded-2xl bg-foreground">
              <Entropy className="shrink-0 rounded-none" size={400} />
            </div>

            <div className="flex flex-col gap-3">
              <YieldCard
                logo="/Assets/Images/Logo/init-logo.webp"
                alt="INIT-USDC LP"
                rate="Up to 12%"
                token="INIT-USDC LP"
                label="Fixed Yield"
              />
              <YieldCard
                logo="/Assets/Images/Logo/inertia-logo.png"
                alt="sINIT"
                rate="Up to 15%"
                token="sINIT"
                label="Fixed Yield"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
