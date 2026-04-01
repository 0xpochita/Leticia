import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
}

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[]
}

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className,
      )}
    >
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {logos.map((logo) => (
          <Image
            alt={logo.alt}
            className="pointer-events-none h-4 w-auto select-none md:h-5 dark:brightness-0 dark:invert"
            height={20}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={120}
            unoptimized
          />
        ))}
      </InfiniteSlider>
    </div>
  )
}
