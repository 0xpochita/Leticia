"use client"

import { useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const COLS = 16
const ROWS = 6

const logoMap: Record<string, string> = {
  "0-1": "/Assets/Images/Logo-Decorative/init-logo.png",
  "0-5": "/Assets/Images/Logo-Decorative/tia-logo.png",
  "0-9": "/Assets/Images/Logo-Decorative/rave-logo.png",
  "0-13": "/Assets/Images/Logo-Decorative/echelon-logo.png",
  "1-3": "/Assets/Images/Logo-Decorative/inertia-logo.png",
  "1-7": "/Assets/Images/Logo-Decorative/civitia-logo.png",
  "1-11": "/Assets/Images/Logo-Decorative/contro-logo.png",
  "1-15": "/Assets/Images/Logo-Decorative/init-logo.png",
  "2-0": "/Assets/Images/Logo-Decorative/echelon-logo.png",
  "2-4": "/Assets/Images/Logo-Decorative/tia-logo.png",
  "2-8": "/Assets/Images/Logo-Decorative/rave-logo.png",
  "2-12": "/Assets/Images/Logo-Decorative/inertia-logo.png",
  "3-2": "/Assets/Images/Logo-Decorative/contro-logo.png",
  "3-6": "/Assets/Images/Logo-Decorative/init-logo.png",
  "3-10": "/Assets/Images/Logo-Decorative/civitia-logo.png",
  "3-14": "/Assets/Images/Logo-Decorative/tia-logo.png",
  "4-1": "/Assets/Images/Logo-Decorative/rave-logo.png",
  "4-9": "/Assets/Images/Logo-Decorative/inertia-logo.png",
  "4-13": "/Assets/Images/Logo-Decorative/contro-logo.png",
  "5-11": "/Assets/Images/Logo-Decorative/civitia-logo.png",
  "5-15": "/Assets/Images/Logo-Decorative/echelon-logo.png",
}

export function HeroGrid() {
  const cells = useMemo(() => {
    return Array.from({ length: COLS * ROWS }, (_, i) => {
      const row = Math.floor(i / COLS)
      const col = i % COLS
      return {
        key: `${row}-${col}`,
        row,
        col,
        baseColor: `hsl(0 0% ${89 + Math.random() * 7}%)`,
      }
    })
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 select-none overflow-hidden"
      style={{ height: 440 }}
    >
      <div
        className="grid h-full w-full gap-1.5 p-1.5"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {cells.map((cell) => {
          const logo = logoMap[cell.key]
          const delay = cell.col * 0.15 + cell.row * 0.08

          return (
            <motion.div
              key={cell.key}
              className="relative flex items-center justify-center overflow-hidden rounded-lg"
              style={{ backgroundColor: cell.baseColor }}
              animate={{
                backgroundColor: [
                  cell.baseColor,
                  "hsl(0 0% 97%)",
                  cell.baseColor,
                  "hsl(0 0% 97%)",
                  cell.baseColor,
                ],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                delay,
              }}
            >
              {logo && (
                <Image
                  src={logo}
                  alt=""
                  width={28}
                  height={28}
                  className="select-none opacity-65"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
