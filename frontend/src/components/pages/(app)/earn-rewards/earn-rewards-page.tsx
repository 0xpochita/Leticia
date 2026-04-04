"use client"

import { useState } from "react"
import Image from "next/image"
import { CopyIcon, StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function EarnRewardsPage() {
  const [tab, setTab] = useState<"tasks" | "history">("tasks")

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Rewards
      </h1>

      <div className="mt-8 flex flex-wrap items-stretch gap-4">
        <div className="rounded-2xl border border-foreground/10 px-6 py-4">
          <p className="text-xs text-foreground/40">Leticia Points</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">0</span>
            <Image
              src="/Assets/Images/Logo-Brands/logo-leticia.png"
              alt=""
              width={20}
              height={20}
              className="size-5 rounded-full"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-foreground/10 px-6 py-4">
          <p className="text-xs text-foreground/40">Boost</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">x1</span>
          </div>
        </div>
        <div className="rounded-2xl border border-foreground/10 px-6 py-4">
          <p className="text-xs text-foreground/40">Rank</p>
          <div className="mt-1">
            <span className="text-2xl font-bold text-foreground">--</span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 p-6">
          <h2 className="text-lg font-bold text-foreground">
            Referral Program
          </h2>
          <p className="text-sm text-foreground/50">
            Earn 10% of your referrals points. Share your link and grow
            together.
          </p>
          <div className="rounded-xl border border-foreground/10 px-4 py-3 text-center text-sm text-foreground/40">
            Already invited 0 friends
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex-1 cursor-pointer rounded-xl border border-foreground/10 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              Share
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-xl border border-foreground/10 px-4 py-3 text-foreground/40 transition-colors hover:text-foreground"
            >
              <CopyIcon className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 p-6">
          <h2 className="text-lg font-bold text-foreground">
            Deposit Bonus
          </h2>
          <p className="text-sm text-foreground/50">
            Earn bonus points for every deposit you make. Larger deposits earn
            more.
          </p>
          <div className="flex items-center justify-between rounded-xl border border-foreground/10 px-4 py-3">
            <span className="text-sm text-foreground/50">Deposit $100+</span>
            <span className="text-sm font-medium text-foreground">+50 pts</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-foreground/10 px-4 py-3">
            <span className="text-sm text-foreground/50">Deposit $1,000+</span>
            <span className="text-sm font-medium text-foreground">+500 pts</span>
          </div>
        </div>
      </div>

      <div className="mt-10 border-b border-foreground/10">
        <div className="flex gap-6">
          {(["tasks", "history"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "cursor-pointer border-b-2 pb-3 text-sm font-medium capitalize transition-colors",
                tab === t
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/40 hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {tab === "tasks" && (
          <div className="flex flex-col gap-3">
            {[
              { title: "Make your first deposit", points: 100 },
              { title: "Hold a position for 7 days", points: 200 },
              { title: "Deposit into 2 different assets", points: 150 },
              { title: "Refer a friend", points: 100 },
            ].map((task) => (
              <div
                key={task.title}
                className="flex items-center justify-between rounded-2xl border border-foreground/10 px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <StarIcon className="size-4 text-foreground/20" />
                  <span className="text-sm text-foreground">{task.title}</span>
                </div>
                <span className="text-sm font-medium text-foreground/40">
                  +{task.points} pts
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "history" && (
          <p className="py-12 text-center text-sm text-foreground/40">
            No reward history yet
          </p>
        )}
      </div>
    </div>
  )
}
