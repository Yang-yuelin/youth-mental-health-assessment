"use client"

import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { DIMENSIONS } from "@/lib/assessment-data"
import type { DimensionScore } from "@/lib/scoring"

interface BarChartViewProps {
  dimensionScores: DimensionScore[]
}

const COLORS = [
  "hsl(173, 58%, 39%)",
  "hsl(263, 70%, 58%)",
  "hsl(36, 90%, 55%)",
  "hsl(350, 70%, 60%)",
  "hsl(210, 75%, 55%)",
  "hsl(155, 60%, 45%)",
]

export function BarChartView({ dimensionScores }: BarChartViewProps) {
  const data = dimensionScores.map((d, i) => {
    const dim = DIMENSIONS.find((dim) => dim.key === d.key)
    return {
      name: dim?.shortName || d.name,
      fullName: d.name,
      score: d.percentage,
      fill: COLORS[i % COLORS.length],
    }
  })

  const chartConfig: ChartConfig = {
    score: {
      label: "得分",
    },
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-sm animate-fade-in-up animation-delay-200 md:p-8">
      <h3 className="text-center text-lg font-semibold text-foreground">
        {"维度对比"}
      </h3>
      <ChartContainer config={chartConfig} className="mx-auto h-[300px] w-full max-w-lg">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 40, top: 10, bottom: 10 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            width={50}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, _name, item) => [
                  `${value}%`,
                  item.payload.fullName,
                ]}
              />
            }
          />
          <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={28}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="score"
              position="right"
              formatter={(v: number) => `${v}%`}
              className="fill-foreground text-xs font-medium"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
