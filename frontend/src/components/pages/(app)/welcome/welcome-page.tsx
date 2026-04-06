"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import gsap from "gsap";

function AnimatedLogos({
  logos,
  dark = false,
}: {
  logos: { src: string; alt: string }[];
  dark?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = Array.from(containerRef.current.children) as HTMLElement[];

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.fromTo(
      els,
      { scale: 0, opacity: 0, rotation: -180 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2,
      },
    );

    tl.to(
      els,
      {
        x: (i) => (i - 1) * 80,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.05,
      },
      "+=0.5",
    );

    tl.to(
      els,
      {
        x: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.05,
      },
      "+=1",
    );

    tl.to(
      els,
      {
        scale: 1.15,
        duration: 0.3,
        ease: "power2.out",
        stagger: { each: 0.15, from: "center" },
      },
      "+=0.5",
    );

    tl.to(els, {
      scale: 1,
      duration: 0.3,
      ease: "power2.in",
      stagger: { each: 0.15, from: "center" },
    });

    tl.to({}, { duration: 1.5 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex items-center -space-x-3">
      {logos.map((logo) => (
        <Image
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          width={56}
          height={56}
          className={`size-14 rounded-full border-2 ${dark ? "border-foreground" : "border-background"}`}
          style={{ opacity: 0 }}
        />
      ))}
    </div>
  );
}

export function WelcomePage() {
  const router = useRouter();
  const [exiting, setExiting] = useState(false);
  const [exitTarget, setExitTarget] = useState("");

  const handleNavigate = useCallback(
    (href: string) => {
      setExitTarget(href);
      setExiting(true);
      setTimeout(() => router.push(href), 500);
    },
    [router],
  );

  return (
    <motion.div
      className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={exiting ? { opacity: 0, y: -30, scale: 0.98 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <Image
        src="/Assets/Images/Logo-Brands/logo-leticia.png"
        alt="Leticia"
        width={64}
        height={64}
        className="size-16 select-none rounded-full"
      />

      <h1 className="mt-6 text-center text-[clamp(32px,4vw,48px)] font-medium leading-[1.05] tracking-[-0.04em] text-foreground">
        Welcome to{" "}
        <span className="font-serif italic text-[clamp(36px,4.5vw,56px)]">
          Leticia
        </span>
      </h1>

      <p className="mt-3 text-center text-base text-foreground/50">
        Choose how you want to continue.
      </p>

      <Link
        href="/"
        className="mt-2 text-sm text-foreground/40 underline underline-offset-4 transition-colors hover:text-foreground"
      >
        Back to homepage
      </Link>

      <div className="mt-12 w-full max-w-lg">
        <div onClick={() => handleNavigate("/earn")} onKeyDown={() => {}} role="button" tabIndex={0} className="group cursor-pointer">
          <Card className="flex h-full flex-col gap-3 overflow-hidden rounded-3xl border p-3 shadow-lg transition-shadow group-hover:shadow-xl">
            <CardHeader className="p-0">
              <div className="flex h-52 w-full items-center justify-center rounded-2xl bg-foreground/5">
                <AnimatedLogos
                  logos={[
                    { src: "/Assets/Images/Logo/init-logo.webp", alt: "INIT" },
                    { src: "/Assets/Images/Logo/init-logo.png", alt: "esINIT" },
                    {
                      src: "/Assets/Images/Logo/inertia-logo.png",
                      alt: "sINIT",
                    },
                  ]}
                />
              </div>
            </CardHeader>

            <CardContent className="flex flex-grow flex-col gap-4 p-3">
              <div className="flex items-center gap-2">
                <Badge className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
                  Earn
                </Badge>
                <Badge className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
                  Fixed Yield
                </Badge>
              </div>

              <h2 className="text-2xl font-medium leading-tight tracking-[-0.04em] text-foreground">
                Earn Fixed Yield
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Deposit your assets and earn fixed yield automatically. No
                complex decisions, no active management needed.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-foreground/20" />
                  Fixed Returns
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-foreground/20" />
                  Auto Compound
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-foreground/20" />
                  One-Click Deposit
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-foreground/20" />
                  Up to 15% APR
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-3 pt-0">
              <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-foreground/10 py-3 text-sm font-medium text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                Start Earning
                <FiChevronRight className="size-4" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
