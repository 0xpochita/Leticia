"use client"

import { motion } from "framer-motion"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { LaunchButton } from "@/components/ui/launch-button"

const logos = [
  {
    src: "https://storage.efferd.com/logo/nvidia-wordmark.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://storage.efferd.com/logo/openai-wordmark.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://storage.efferd.com/logo/turso-wordmark.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://storage.efferd.com/logo/github-wordmark.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://storage.efferd.com/logo/claude-wordmark.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
    alt: "Clerk Logo",
  },
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
        className="relative mx-auto flex max-w-[1200px] flex-col gap-8 px-6"
        style={{ paddingTop: 290 }}
      >
        <motion.h1
          className="text-[clamp(48px,5vw,80px)] font-medium leading-[1.05] tracking-[-0.04em] text-foreground"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Simple{" "}
          <span className="font-serif italic text-[clamp(60px,6.25vw,100px)]">
            tokenization
          </span>
          <br />
          for your yield strategy
        </motion.h1>

        <motion.p
          className="max-w-[554px] text-lg leading-relaxed text-[#373a46]/80"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Split yield-bearing assets into Principal and Yield Tokens on a custom
          yield-aware AMM. Fixed rates, yield speculation, and leveraged points
          farming on Initia.
        </motion.p>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <LaunchButton />
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
