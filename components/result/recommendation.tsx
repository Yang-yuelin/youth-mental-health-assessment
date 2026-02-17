"use client"

import { generateRecommendations, getLevelConfig, type DimensionScore } from "@/lib/scoring"

interface RecommendationProps {
  dimensionScores: DimensionScore[]
}

export function Recommendation({ dimensionScores }: RecommendationProps) {
  const recommendations = generateRecommendations(dimensionScores)
  // Show top recommendations (worst 3 areas first, then the rest)
  const prioritized = recommendations.slice(0, 3)
  const rest = recommendations.slice(3)

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up animation-delay-400">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">
          {"个性化改善建议"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {"以下建议按优先级排列，重点关注最需要改善的方面"}
        </p>
      </div>

      {/* Priority recommendations */}
      <div className="flex flex-col gap-4">
        {prioritized.map((rec, i) => {
          const config = getLevelConfig(rec.level)
          const isPriority = rec.level === "critical" || rec.level === "concern"
          return (
            <div
              key={rec.dimensionName}
              className={`rounded-xl border bg-card p-6 shadow-sm ${
                isPriority ? "border-[hsl(350,70%,60%)]/30" : "border-border/60"
              }`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <h4 className="font-semibold text-foreground">{rec.dimensionName}</h4>
                <span
                  className="ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: `${config.color}18`,
                    color: config.color,
                  }}
                >
                  {config.label}
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {rec.summary}
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {"改善建议"}
                </span>
                <ul className="flex flex-col gap-2">
                  {rec.suggestions.map((s, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary"><path d="m9 12 2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* Remaining dimensions (collapsed) */}
      {rest.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-muted-foreground">
            {"其他维度"}
          </h4>
          {rest.map((rec) => {
            const config = getLevelConfig(rec.level)
            return (
              <div
                key={rec.dimensionName}
                className="flex flex-col gap-2 rounded-xl border border-border/60 bg-card p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <h5 className="font-medium text-foreground">{rec.dimensionName}</h5>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor: `${config.color}18`,
                      color: config.color,
                    }}
                  >
                    {config.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {rec.summary}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Encouragement */}
      <div className="rounded-xl border border-primary/20 bg-[hsl(173,45%,92%)]/50 p-6 text-center">
        <p className="text-sm leading-relaxed text-foreground">
          {"每个人都有成长和改变的能力。关注自己的心理健康是一种勇敢的选择。希望这份报告能够帮助你更好地了解自己，找到属于你的幸福之路。"}
        </p>
      </div>
    </div>
  )
}
