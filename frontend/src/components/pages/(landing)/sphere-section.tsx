"use client"

import { DitheringShader } from "@/components/ui/dithering-shader"

export function SphereSection() {
  return (
    <section className="relative w-full bg-foreground py-32 md:py-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex shrink-0 items-center justify-center">
          <DitheringShader
            shape="sphere"
            type="random"
            colorBack="#000000"
            colorFront="#f43f5e"
            pxSize={2}
            speed={1.5}
            width={360}
            height={360}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-6 md:max-w-md">
          <h2 className="text-balance text-4xl tracking-tight text-background md:text-5xl lg:text-6xl">
            Yield in Motion
          </h2>
          <p className="text-base leading-relaxed tracking-wider text-background/60 md:text-lg">
            Real-time yield dynamics visualized. Watch as cross-chain assets flow
            through the protocol, splitting into Principal and Yield Tokens with
            every block.
          </p>
        </div>
      </div>
    </section>
  )
}
