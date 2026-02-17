"use client"

import { useEffect, useState } from "react"
import { getLevelConfig, type ScoreLevel } from "@/lib/scoring"

interface ScoreSummaryProps {
  overallScore: number
  overallLevel: ScoreLevel
  summary: string
}

export function ScoreSummary({ overallScore, overallLevel, summary }: ScoreSummaryProps) {
  const config = getLevelConfig(overallLevel)
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const duration = 1200
    const steps = 60
    const increment = overallScore / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= overallScore) {
        setAnimatedScore(overallScore)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.round(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [overallScore])

  // SVG ring progress
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-border/60 bg-card p-8 shadow-sm animate-fade-in-up md:p-10">
      <h2 className="text-lg font-semibold text-muted-foreground">
        {"综合健康指数"}
      </h2>

      {/* Ring chart */}
      <div className="relative flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
          {/* Background ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
          />
          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute flex flex-col items-center gap-1">
          <span className="text-5xl font-bold tabular-nums text-foreground">
            {animatedScore}
          </span>
          <span
            className="rounded-full px-3 py-0.5 text-sm font-semibold"
            style={{
              backgroundColor: `${config.color}18`,
              color: config.color,
            }}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* Summary text */}
      <p className="max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
        {summary}
      </p>
    </div>
  )
}
