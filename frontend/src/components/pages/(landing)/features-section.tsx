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

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    barRefs.current.forEach((bar, i) => {
      if (!bar) return
      tl.fromTo(
        bar,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.5 },
        i * 0.07,
      )
    })

    const counter = { val: 0 }
    tl.to(
      counter,
      {
        val: 10,
        duration: 1.4,
        ease: "power2.out",
        onUpdate() {
          if (labelRef.current) {
            labelRef.current.textContent = `${Math.round(counter.val)}%`
          }
        },
      },
      0,
    )

    tl.fromTo(
      initRef.current,
      { x: 60, opacity: 0, scale: 0.6 },
      { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" },
      0.3,
    )

    tl.fromTo(
      susdeRef.current,
      { y: -40, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" },
      0.6,
    )

    tl.fromTo(
      inertiaRef.current,
      { x: -40, y: 30, opacity: 0, scale: 0.5 },
      { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" },
      0.9,
    )

    gsap.to(initRef.current, {
      y: "-=3",
      x: "+=2",
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2.5,
    })
    gsap.to(susdeRef.current, {
      y: "+=3",
      x: "-=2",
      duration: 3.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 3,
    })
    gsap.to(inertiaRef.current, {
      y: "-=4",
      duration: 3.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 3.2,
    })
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

function LeverageGauge() {
  const containerRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<HTMLDivElement>(null)
  const arcRef = useRef<SVGPathElement>(null)
  const dashRef = useRef<SVGCircleElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const initRef = useRef<HTMLDivElement>(null)
  const susdeRef = useRef<HTMLDivElement>(null)
  const inertiaRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true })

  useEffect(() => {
    if (!inView) return

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    if (dashRef.current) {
      const len = dashRef.current.getTotalLength?.() || 534
      tl.fromTo(
        dashRef.current,
        { strokeDasharray: `0 ${len}` },
        { strokeDasharray: `${len} 0`, duration: 1.2, ease: "power2.inOut" },
        0,
      )
    }

    if (arcRef.current) {
      const arcLen = arcRef.current.getTotalLength?.() || 220
      tl.fromTo(
        arcRef.current,
        { strokeDasharray: arcLen, strokeDashoffset: arcLen },
        { strokeDashoffset: 0, duration: 1, ease: "power2.out" },
        0.3,
      )
    }

    tl.fromTo(
      needleRef.current,
      { rotate: -120 },
      { rotate: 15, duration: 2, ease: "expo.out" },
      0.5,
    )

    tl.fromTo(
      dotRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.4, ease: "back.out(3)" },
      0.4,
    )

    const counter = { val: 0 }
    tl.to(
      counter,
      {
        val: 17,
        duration: 1.8,
        ease: "power2.out",
        onUpdate() {
          if (labelRef.current) labelRef.current.textContent = `${Math.round(counter.val)}x`
        },
      },
      0.5,
    )

    tl.fromTo(
      initRef.current,
      { y: 20, opacity: 0, scale: 0.7 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" },
      0.8,
    )
    tl.fromTo(
      susdeRef.current,
      { y: -20, opacity: 0, scale: 0.7 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" },
      1.0,
    )
    tl.fromTo(
      inertiaRef.current,
      { x: 20, opacity: 0, scale: 0.7 },
      { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" },
      1.2,
    )

    gsap.to(initRef.current, { y: "-=3", duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3 })
    gsap.to(susdeRef.current, { y: "+=3", duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3.5 })
    gsap.to(inertiaRef.current, { y: "-=2", x: "+=2", duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3.2 })
  }, [inView])

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-foreground/5 p-4">
      <div ref={initRef} className="pointer-events-none absolute top-5 left-5 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/init-logo.webp" alt="" width={32} height={32} />
      </div>
      <div ref={susdeRef} className="pointer-events-none absolute top-5 right-5 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/susde-logo.webp" alt="" width={28} height={28} />
      </div>
      <div ref={inertiaRef} className="pointer-events-none absolute bottom-5 left-5 select-none" style={{ opacity: 0 }}>
        <Image src="/Assets/Images/Logo/inertia-logo.png" alt="" width={32} height={32} />
      </div>

      <div className="relative flex size-44 items-center justify-center md:size-48">
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full">
          <circle
            ref={dashRef}
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="text-foreground/12"
          />
          <path
            ref={arcRef}
            d="M30,145 A85,85 0 0,1 170,145"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground/20"
          />
        </svg>

        <div className="absolute top-6 text-center">
          <span
            ref={labelRef}
            className="inline-block rounded-full bg-foreground/8 px-4 py-1.5 text-sm font-bold tabular-nums text-foreground"
          >
            0x
          </span>
        </div>

        <div
          ref={needleRef}
          className="absolute bottom-[44%] left-1/2 h-14 w-[2px] origin-bottom -translate-x-1/2 rounded-full bg-foreground/50"
          style={{ rotate: "-120deg" }}
        />
        <div
          ref={dotRef}
          className="absolute bottom-[41%] left-1/2 size-3 -translate-x-1/2 rounded-full bg-foreground/30"
          style={{ transform: "translateX(-50%) scale(0)" }}
        />

        <div className="absolute bottom-3 flex w-full justify-between px-6 text-[10px] font-medium text-foreground/25">
          <span>5x</span>
          <span>10x</span>
          <span>20x</span>
          <span>25x</span>
        </div>
      </div>
    </div>
  )
}

function LiquidityVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const poolARef = useRef<HTMLDivElement>(null)
  const poolBRef = useRef<HTMLDivElement>(null)
  const bridgeRefs = useRef<(HTMLDivElement | null)[]>([])
  const initRef = useRef<HTMLDivElement>(null)
  const susdeRef = useRef<HTMLDivElement>(null)
  const inertiaRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<SVGPathElement>(null)
  const inView = useInView(containerRef, { once: true })

  useEffect(() => {
    if (!inView) return

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

    tl.fromTo(
      poolARef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8 },
      0,
    )
    tl.fromTo(
      poolBRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8 },
      0.15,
    )

    bridgeRefs.current.forEach((el, i) => {
      if (!el) return
      tl.fromTo(
        el,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
        0.3 + i * 0.1,
      )
    })

    if (flowRef.current) {
      const len = flowRef.current.getTotalLength()
      tl.fromTo(
        flowRef.current,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
        0.5,
      )

      gsap.to(flowRef.current, {
        strokeDashoffset: -len * 2,
        duration: 4,
        ease: "none",
        repeat: -1,
        delay: 2,
      })
    }

    tl.fromTo(initRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 0.6)
    tl.fromTo(susdeRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 0.8)
    tl.fromTo(inertiaRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 1.0)

    gsap.to(initRef.current, { y: "-=3", duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.5 })
    gsap.to(susdeRef.current, { y: "+=2", x: "-=2", duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3 })
    gsap.to(inertiaRef.current, { y: "-=2", duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3.5 })
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
          ref={poolARef}
          className="flex h-20 w-24 origin-left items-center justify-center rounded-2xl bg-foreground/10"
          style={{ opacity: 0 }}
        >
          <span className="text-[10px] font-medium text-foreground/30">PT</span>
        </div>

        <div className="relative flex flex-col items-center gap-1.5">
          {[0, 1].map((i) => (
            <div
              key={i}
              ref={(el) => { bridgeRefs.current[i] = el }}
              className="h-8 w-5 origin-top rounded-lg bg-foreground/8"
              style={{ opacity: 0 }}
            />
          ))}
          <svg className="absolute inset-0 size-full" viewBox="0 0 20 70" fill="none">
            <path
              ref={flowRef}
              d="M10,0 L10,70"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="text-foreground/20"
            />
          </svg>
        </div>

        <div
          ref={poolBRef}
          className="flex h-20 w-24 origin-right items-center justify-center rounded-2xl bg-foreground/10"
          style={{ opacity: 0 }}
        >
          <span className="text-[10px] font-medium text-foreground/30">YT</span>
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
    title: "Speculate on Future Yield",
    description:
      "Think yields will go up? Buy Yield Tokens to profit from rising rates without holding the full asset. Use up to 25x leverage to amplify your position on any supported market.",
    visual: LeverageGauge,
    logos: true,
  },
  {
    title: "Provide Liquidity, Keep Your Exposure",
    description:
      "Supply liquidity to yield markets and earn trading fees plus protocol rewards. Unlike traditional AMMs, your assets stay productive and you maintain exposure to the underlying yield.",
    visual: LiquidityVisual,
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
          Three ways to put your yield to work
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, i) => {
            const Visual = feature.visual
            return (
              <motion.div
                key={feature.title}
                className="flex flex-col gap-6 rounded-2xl border border-foreground/10 bg-foreground/3 p-5"
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
