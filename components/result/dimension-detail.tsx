"use client"

import { Progress } from "@/components/ui/progress"
import { DIMENSIONS } from "@/lib/assessment-data"
import { getLevelConfig, type DimensionScore } from "@/lib/scoring"

interface DimensionDetailProps {
  dimensionScores: DimensionScore[]
}

const COLORS: Record<string, string> = {
  emotion: "hsl(173, 58%, 39%)",
  selfEsteem: "hsl(263, 70%, 58%)",
  interpersonal: "hsl(36, 90%, 55%)",
  lifeSatisfaction: "hsl(350, 70%, 60%)",
  resilience: "hsl(210, 75%, 55%)",
  physicalHealth: "hsl(155, 60%, 45%)",
}

export function DimensionDetail({ dimensionScores }: DimensionDetailProps) {
  return (
    <div className="flex flex-col gap-4 animate-fade-in-up animation-delay-300">
      <h3 className="text-center text-lg font-semibold text-foreground">
        {"各维度详情"}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {dimensionScores.map((score) => {
          const dim = DIMENSIONS.find((d) => d.key === score.key)
          const levelConfig = getLevelConfig(score.level)
          const color = COLORS[score.key] || "hsl(173, 58%, 39%)"

          return (
            <div
              key={score.key}
              className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {dim?.name}
                  </span>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: `${levelConfig.color}18`,
                    color: levelConfig.color,
                  }}
                >
                  {levelConfig.label}
                </span>
              </div>

              {/* Score + progress */}
              <div className="flex items-center gap-3">
                <Progress
                  value={score.percentage}
                  className="h-2 flex-1"
                />
                <span className="w-10 text-right text-sm font-bold tabular-nums text-foreground">
                  {score.percentage}%
                </span>
              </div>

              {/* Raw score */}
              <span className="text-xs text-muted-foreground">
                {`原始分 ${score.rawScore} / ${score.maxScore}`}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
