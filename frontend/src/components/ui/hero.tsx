"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { LockIcon } from "lucide-react"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { LaunchButton } from "@/components/ui/launch-button"

const logos = [
  { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia Logo" },
  { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase Logo" },
  { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI Logo" },
  { src: "https://storage.efferd.com/logo/turso-wordmark.svg", alt: "Turso Logo" },
  { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel Logo" },
  { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub Logo" },
  { src: "https://storage.efferd.com/logo/claude-wordmark.svg", alt: "Claude AI Logo" },
  { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk Logo" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
}

function YieldCard({
  logo,
  alt,
  rate,
  token,
  label,
  badge,
}: {
  logo: string
  alt: string
  rate: string
  token: string
  label: string
  badge?: "lock"
}) {
  return (
    <div className="flex flex-1 items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-foreground/3 px-5 py-4 backdrop-blur-sm">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-foreground/40">{label}</span>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Image
              src={logo}
              alt={alt}
              width={32}
              height={32}
              className="pointer-events-none select-none rounded-full"
            />
            {badge === "lock" && (
              <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-foreground text-[8px] text-background">
                <LockIcon className="size-2.5" />
              </span>
            )}
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            {rate}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-foreground/40">({token})</span>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover [transform:scaleY(-1)] grayscale"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085640_276ea93b-d7da-4418-a09b-2aa5b490e838.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-[26.416%] from-[rgba(255,255,255,0)] to-[66.943%] to-white" />

      <div
        className="relative mx-auto flex max-w-300 flex-col gap-8 px-6"
        style={{ paddingTop: 290 }}
      >
        <motion.h1
          className="text-[clamp(48px,5vw,80px)] font-medium leading-[1.05] tracking-[-0.04em] text-foreground"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          One yield,{" "}
          <span className="font-serif italic text-[clamp(60px,6.25vw,100px)]">
            every chain
          </span>
          <br />
          zero boundaries
        </motion.h1>

        <motion.p
          className="max-w-138.5 text-lg leading-relaxed text-[#373a46]/80"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Split yield-bearing assets into Principal and Yield Tokens on a
          custom yield-aware AMM. Fixed rates, yield speculation, and
          leveraged points farming on Initia.
        </motion.p>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <LaunchButton />
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 md:flex-row"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <YieldCard
            logo="/Assets/Images/Logo/init-logo.webp"
            alt="INIT-USDC LP"
            rate="Up to 12%"
            token="INIT-USDC LP"
            label="Enshrined Liquidity"
          />
          <YieldCard
            logo="/Assets/Images/Logo/init-logo.png"
            alt="esINIT"
            rate="Up to 7%"
            token="esINIT"
            label="VIP Rewards"
            badge="lock"
          />
          <YieldCard
            logo="/Assets/Images/Logo/inertia-logo.png"
            alt="sINIT"
            rate="Up to 15%"
            token="sINIT"
            label="Liquid Staking"
          />
        </motion.div>
      </div>
    </section>
  )
}

export function LogosSection() {
  return (
    <section className="relative border-t pt-6 pb-10">
      <div className="relative z-10 mx-auto max-w-4xl">
        <LogoCloud logos={logos} />
      </div>
    </section>
  )
}
