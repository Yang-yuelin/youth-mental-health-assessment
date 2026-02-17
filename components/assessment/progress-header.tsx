"use client"

import { Progress } from "@/components/ui/progress"
import { DIMENSIONS, type DimensionKey } from "@/lib/assessment-data"

interface ProgressHeaderProps {
  currentIndex: number
  totalQuestions: number
  currentDimension: DimensionKey
}

const DOT_COLORS: Record<string, string> = {
  emotion: "bg-[hsl(173,58%,39%)]",
  selfEsteem: "bg-[hsl(263,70%,58%)]",
  interpersonal: "bg-[hsl(36,90%,55%)]",
  lifeSatisfaction: "bg-[hsl(350,70%,60%)]",
  resilience: "bg-[hsl(210,75%,55%)]",
  physicalHealth: "bg-[hsl(155,60%,45%)]",
}

export function ProgressHeader({
  currentIndex,
  totalQuestions,
  currentDimension,
}: ProgressHeaderProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100
  const currentDim = DIMENSIONS.find((d) => d.key === currentDimension)
  const currentDimIndex = DIMENSIONS.findIndex((d) => d.key === currentDimension)

  return (
    <div className="flex flex-col gap-4">
      {/* Question counter + dimension name */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {`${currentIndex + 1} / ${totalQuestions}`}
        </span>
        <span className="text-sm font-medium text-foreground">
          {currentDim?.name}
        </span>
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-2" />

      {/* Dimension dots */}
      <div className="flex items-center justify-center gap-2">
        {DIMENSIONS.map((dim, i) => {
          const isCompleted = i < currentDimIndex
          const isCurrent = i === currentDimIndex
          return (
            <div key={dim.key} className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  isCompleted
                    ? `${DOT_COLORS[dim.key]} opacity-100`
                    : isCurrent
                      ? `${DOT_COLORS[dim.key]} opacity-100 ring-2 ring-offset-2 ring-offset-background ring-current scale-125`
                      : "bg-border opacity-60"
                }`}
                title={dim.name}
              />
              {i < DIMENSIONS.length - 1 && (
                <div
                  className={`h-px w-4 md:w-6 transition-colors ${
                    isCompleted ? "bg-primary/40" : "bg-border"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
