"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { DimensionScore } from "@/lib/scoring"

interface RadarChartViewProps {
  dimensionScores: DimensionScore[]
}

export function RadarChartView({ dimensionScores }: RadarChartViewProps) {
  const data = dimensionScores.map((d) => ({
    dimension: d.name,
    score: d.percentage,
  }))

  const chartConfig: ChartConfig = {
    score: {
      label: "得分",
      color: "hsl(173, 58%, 39%)",
    },
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-sm animate-fade-in-up animation-delay-100 md:p-8">
      <h3 className="text-center text-lg font-semibold text-foreground">
        {"多维度总览"}
      </h3>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-md"
      >
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            tickCount={5}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => [`${value}%`, "得分"]}
              />
            }
          />
          <Radar
            name="得分"
            dataKey="score"
            stroke="hsl(173, 58%, 39%)"
            fill="hsl(173, 58%, 39%)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  )
}
