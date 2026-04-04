"use client"

import { useState } from "react"
import Image from "next/image"
import { ShareIcon, CopyIcon, StarIcon, TrophyIcon, UsersIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function RewardsPage() {
  const [tab, setTab] = useState<"tasks" | "leaderboard" | "history">("tasks")

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Rewards
      </h1>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="rounded-2xl border border-foreground/10 px-6 py-4">
          <p className="text-xs text-foreground/40">Total Leticia Points</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">0</span>
            <Image
              src="/Assets/Images/Logo-Brands/logo-leticia.png"
              alt=""
              width={24}
              height={24}
              className="size-6 rounded-full"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-foreground/10 px-6 py-4">
          <p className="text-xs text-foreground/40">Boost</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">x1</span>
            <Image
              src="/Assets/Images/Logo-Brands/logo-leticia.png"
              alt=""
              width={24}
              height={24}
              className="size-6 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-6 rounded-2xl border border-foreground/10 p-6">
          <h2 className="text-xl font-bold text-foreground">
            Season 1 Points
          </h2>
          <div>
            <p className="text-xs text-foreground/40">Points collected:</p>
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
          <div className="mt-auto flex items-center gap-8">
            <div>
              <p className="text-xs text-foreground/40">End of season</p>
              <p className="text-sm font-medium text-foreground">30 Jun 2026</p>
            </div>
            <div>
              <p className="text-xs text-foreground/40">Total Users</p>
              <p className="text-sm font-medium text-foreground">1,284</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-foreground/10 p-6">
          <h2 className="text-xl font-bold text-foreground">
            esINIT Boost
          </h2>
          <p className="text-sm text-foreground/50">
            Hold esINIT in the protocol to gain additional point multipliers on
            all your positions.
          </p>
          <div className="flex items-center justify-between rounded-xl border border-foreground/10 px-4 py-3">
            <span className="text-sm text-foreground">esINIT Holder</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">x1.5</span>
              <Image
                src="/Assets/Images/Logo-Brands/logo-leticia.png"
                alt=""
                width={16}
                height={16}
                className="size-4 rounded-full"
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-auto w-full cursor-pointer rounded-xl border border-foreground/10 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Stake esINIT
          </button>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-foreground/10 p-6">
          <h2 className="text-xl font-bold text-foreground">
            Referral Program
          </h2>
          <p className="text-sm text-foreground/50">
            Get 10% of your referrals points.
          </p>
          <div className="flex items-center justify-center rounded-xl border border-foreground/10 px-4 py-3 text-sm text-foreground/50">
            Already invited 0 Pioneers
          </div>
          <div className="mt-auto flex items-center gap-2">
            <button
              type="button"
              className="flex-1 cursor-pointer rounded-xl border border-foreground/10 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              Share
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-xl border border-foreground/10 px-4 py-3 text-foreground/50 transition-colors hover:text-foreground"
            >
              <CopyIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-b border-foreground/10">
        <div className="flex gap-6">
          {(["tasks", "leaderboard", "history"] as const).map((t) => (
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

      <div className="mt-8">
        {tab === "tasks" && (
          <div className="flex flex-col gap-3">
            {[
              { title: "Provide liquidity to any pool", points: 100, done: false },
              { title: "Buy PT tokens on any market", points: 50, done: false },
              { title: "Buy YT tokens on any market", points: 50, done: false },
              { title: "Hold position for 7 days", points: 200, done: false },
              { title: "Refer a friend", points: 150, done: false },
            ].map((task) => (
              <div
                key={task.title}
                className="flex items-center justify-between rounded-2xl border border-foreground/10 px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <StarIcon className="size-4 text-foreground/30" />
                  <span className="text-sm text-foreground">{task.title}</span>
                </div>
                <span className="text-sm font-medium text-foreground/50">
                  +{task.points} pts
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "leaderboard" && (
          <div className="flex flex-col gap-3">
            {[
              { rank: 1, address: "init1...x4f2", points: 12450 },
              { rank: 2, address: "init1...k8m1", points: 9820 },
              { rank: 3, address: "init1...p3n7", points: 7340 },
              { rank: 4, address: "init1...j9w5", points: 5100 },
              { rank: 5, address: "init1...r2q8", points: 3890 },
            ].map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between rounded-2xl border border-foreground/10 px-6 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="w-6 text-center text-sm font-bold text-foreground/40">
                    {entry.rank}
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {entry.address}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {entry.points.toLocaleString()} pts
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
