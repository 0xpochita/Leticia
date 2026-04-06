"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { LockIcon } from "lucide-react"
import gsap from "gsap"

function FloatingLogo({
  src,
  size,
  className,
  delay = 0,
}: {
  src: string
  size: number
  className: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current,
      { y: 0 },
      {
        y: -8,
        duration: 2 + delay * 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay,
      },
    )
  }, [delay])

  return (
    <div ref={ref} className={`pointer-events-none absolute select-none ${className}`}>
      <Image src={src} alt="" width={size} height={size} />
    </div>
  )
}

function YieldChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRef = useRef<HTMLSpanElement>(null)
  const initRef = useRef<HTMLDivElement>(null)
  const susdeRef = useRef<HTMLDivElement>(null)
  const inertiaRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true })

  const barHeights = [30, 45, 38, 58, 50, 72, 65, 85, 70, 80]

  useEffect(() => {
    if (!inView) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, yoyo: true, defaults: { ease: "power3.out" } })

    barRefs.current.forEach((bar, i) => {
      if (!bar) return
      tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, duration: 0.5 }, i * 0.07)
    })

    const counter = { val: 0 }
    tl.to(counter, {
      val: 10,
      duration: 1.4,
      ease: "power2.out",
      onUpdate() {
        if (labelRef.current) labelRef.current.textContent = `${Math.round(counter.val)}%`
      },
    }, 0)

    tl.fromTo(initRef.current, { x: 60, opacity: 0, scale: 0.6 }, { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" }, 0.3)
    tl.fromTo(susdeRef.current, { y: -40, opacity: 0, scale: 0.5 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }, 0.6)
    tl.fromTo(inertiaRef.current, { x: -40, y: 30, opacity: 0, scale: 0.5 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" }, 0.9)

    return () => { tl.kill() }
  }, [inView])

  return (
    <div ref={containerRef} className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-foreground/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-lg bg-foreground/10 px-3 py-2">
          <LockIcon className="size-4 text-foreground/60" />
        </div>
        <div className="flex items-center gap-3">
          <div ref={initRef} className="pointer-events-none select-none" style={{ opacity: 0 }}>
            <Image src="/Assets/Images/Logo/init-logo.webp" alt="" width={36} height={36} />
          </div>
          <span ref={labelRef} className="text-2xl font-bold text-foreground">0%</span>
          <span className="text-xs text-foreground/40">APY</span>
        </div>
      </div>

      <div ref={susdeRef} className="pointer-events-none absolute top-14 right-5 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/susde-logo.webp" alt="" width={28} height={28} />
      </div>

      <div className="relative flex flex-1 items-end justify-between gap-1.5 px-1">
        {barHeights.map((h, i) => (
          <div
            key={i}
            ref={(el) => { barRefs.current[i] = el }}
            className="flex-1 origin-bottom rounded-t bg-foreground/12"
            style={{ height: `${h}%`, transform: "scaleY(0)" }}
          />
        ))}
        <div ref={inertiaRef} className="pointer-events-none absolute right-6 bottom-2 select-none" style={{ opacity: 0 }}>
          <Image src="/Assets/Images/Logo/inertia-logo.png" alt="" width={44} height={44} />
        </div>
      </div>

      <div className="mt-3 h-px w-full bg-foreground/10" />
    </div>
  )
}

function AutoCompoundVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRef = useRef<HTMLSpanElement>(null)
  const initRef = useRef<HTMLDivElement>(null)
  const inertiaRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true })

  useEffect(() => {
    if (!inView) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, yoyo: true, defaults: { ease: "power3.out" } })

    circleRefs.current.forEach((el, i) => {
      if (!el) return
      tl.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }, i * 0.15)
    })

    const counter = { val: 0 }
    tl.to(counter, {
      val: 15,
      duration: 1.8,
      ease: "power2.out",
      onUpdate() {
        if (labelRef.current) labelRef.current.textContent = `${counter.val.toFixed(1)}%`
      },
    }, 0.3)

    tl.fromTo(initRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out" }, 0.5)
    tl.fromTo(inertiaRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out" }, 0.7)

    return () => { tl.kill() }
  }, [inView])

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-foreground/5 p-5">
      <div ref={initRef} className="pointer-events-none absolute top-5 left-5 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/init-logo.webp" alt="" width={32} height={32} />
      </div>
      <div ref={inertiaRef} className="pointer-events-none absolute top-5 right-5 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/inertia-logo.png" alt="" width={32} height={32} />
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              ref={(el) => { circleRefs.current[i] = el }}
              className="size-10 rounded-full bg-foreground/10"
              style={{ opacity: 0 }}
            />
          ))}
        </div>
        <span ref={labelRef} className="text-2xl font-bold tabular-nums text-foreground">0.0%</span>
        <span className="text-xs text-foreground/40">Compounding APR</span>
      </div>
    </div>
  )
}

function OneClickVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const depositRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const vaultRef = useRef<HTMLDivElement>(null)
  const initRef = useRef<HTMLDivElement>(null)
  const susdeRef = useRef<HTMLDivElement>(null)
  const inertiaRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true })

  useEffect(() => {
    if (!inView) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, yoyo: true, defaults: { ease: "expo.out" } })

    tl.fromTo(depositRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8 }, 0)
    tl.fromTo(arrowRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5 }, 0.3)
    tl.fromTo(vaultRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8 }, 0.4)

    tl.fromTo(initRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 0.6)
    tl.fromTo(susdeRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 0.8)
    tl.fromTo(inertiaRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 1.0)

    return () => { tl.kill() }
  }, [inView])

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-foreground/5 p-5">
      <div ref={initRef} className="pointer-events-none absolute top-4 left-4 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/init-logo.webp" alt="" width={32} height={32} />
      </div>
      <div ref={susdeRef} className="pointer-events-none absolute top-4 right-4 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/susde-logo.webp" alt="" width={28} height={28} />
      </div>
      <div ref={inertiaRef} className="pointer-events-none absolute right-6 bottom-4 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/inertia-logo.png" alt="" width={30} height={30} />
      </div>

      <div className="flex items-center gap-3">
        <div
          ref={depositRef}
          className="flex h-20 w-24 origin-left items-center justify-center rounded-2xl bg-foreground/10"
          style={{ opacity: 0 }}
        >
          <span className="text-[10px] font-medium text-foreground/30">Deposit</span>
        </div>

        <div
          ref={arrowRef}
          className="h-[2px] w-8 origin-left bg-foreground/20"
          style={{ opacity: 0 }}
        />

        <div
          ref={vaultRef}
          className="flex h-20 w-24 origin-right items-center justify-center rounded-2xl bg-foreground/10"
          style={{ opacity: 0 }}
        >
          <span className="text-[10px] font-medium text-foreground/30">Vault</span>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "Earn Fixed Yield",
    description:
      "Deposit any yield-bearing asset and receive a guaranteed fixed rate. No surprises, no variable swings. You know exactly what you earn before you commit.",
    visual: YieldChart,
    tags: [
      { icon: "/Assets/Images/Logo/init-logo.webp", rate: "5-12%", name: "INIT" },
      { icon: "/Assets/Images/Logo/inertia-logo.png", rate: "8-15%", name: "sINIT" },
      { icon: "/Assets/Images/Logo/susde-logo.webp", rate: "5-10%", name: "sUSDe" },
    ],
  },
  {
    title: "Auto-Compound Rewards",
    description:
      "Your yield is automatically reinvested to maximize returns. Rewards from staking, liquidity, and VIP programs are compounded without any manual action.",
    visual: AutoCompoundVisual,
    logos: true,
  },
  {
    title: "One-Click Deposit",
    description:
      "Deposit into optimized yield vaults with a single transaction. The protocol handles all the complexity — staking, reward collection, and rebalancing — so you don't have to.",
    visual: OneClickVisual,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
}

export function FeaturesSection() {
  return (
    <section className="relative w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          className="mb-16 text-center text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why earn with Leticia
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, i) => {
            const Visual = feature.visual
            return (
              <motion.div
                key={feature.title}
                className="flex flex-col gap-6 rounded-2xl  bg-foreground/3 p-5"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <div className="h-52">
                  <Visual />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/50">
                    {feature.description}
                  </p>
                </div>

                {feature.tags && (
                  <div className="flex flex-wrap items-center gap-2">
                    {feature.tags.map((tag) => (
                      <div
                        key={tag.name}
                        className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/3 px-3 py-1.5"
                      >
                        <Image
                          src={tag.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <div className="flex flex-col leading-none">
                          <span className="text-xs font-semibold text-foreground">{tag.rate}</span>
                          <span className="text-[10px] text-foreground/50">{tag.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {feature.logos && (
                  <div className="flex items-center -space-x-1.5">
                    {[
                      "/Assets/Images/Logo-Decorative/init-logo.png",
                      "/Assets/Images/Logo-Decorative/inertia-logo.png",
                      "/Assets/Images/Logo-Decorative/tia-logo.png",
                      "/Assets/Images/Logo-Decorative/echelon-logo.png",
                      "/Assets/Images/Logo-Decorative/rave-logo.png",
                      "/Assets/Images/Logo-Decorative/civitia-logo.png",
                    ].map((src) => (
                      <Image
                        key={src}
                        src={src}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full border-2 border-background"
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
