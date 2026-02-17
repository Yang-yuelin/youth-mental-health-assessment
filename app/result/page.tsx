"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScoreSummary } from "@/components/result/score-summary"
import { RadarChartView } from "@/components/result/radar-chart"
import { BarChartView } from "@/components/result/bar-chart"
import { DimensionDetail } from "@/components/result/dimension-detail"
import { Recommendation } from "@/components/result/recommendation"
import { getLatestResult, type AssessmentResult } from "@/lib/storage"
import { getOverallSummary } from "@/lib/scoring"

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = getLatestResult()
    if (!data) {
      router.replace("/")
      return
    }
    setResult(data)
    setLoading(false)
  }, [router])

  if (loading || !result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">{"正在加载报告..."}</p>
        </div>
      </div>
    )
  }

  const summary = getOverallSummary(result.overallScore, result.overallLevel)
  const date = new Date(result.timestamp).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(173,45%,92%)]/50 to-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            {"返回首页"}
          </Link>
          <span className="text-sm font-medium text-foreground">
            {"测评报告"}
          </span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8 md:py-12">
        {/* Title */}
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"你的情绪健康报告"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {"基于你的作答，以下是你在六大心理维度的综合评估结果"}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Overall score */}
          <ScoreSummary
            overallScore={result.overallScore}
            overallLevel={result.overallLevel}
            summary={summary}
          />

          {/* Charts grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            <RadarChartView dimensionScores={result.dimensionScores} />
            <BarChartView dimensionScores={result.dimensionScores} />
          </div>

          {/* Dimension details */}
          <DimensionDetail dimensionScores={result.dimensionScores} />

          {/* Recommendations */}
          <Recommendation dimensionScores={result.dimensionScores} />

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl px-10 text-base font-semibold shadow-lg shadow-primary/20"
            >
              <Link href="/assessment">{"重新测评"}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.print()}
              className="h-12 rounded-xl px-8 text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              {"保存为PDF"}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {"免责声明：本测评仅供参考和自我了解之用，不能替代专业心理诊断。如果你正在经历严重的心理困扰，请及时寻求专业心理咨询师或精神科医生的帮助。全国心理援助热线：400-161-9995"}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-6 text-center text-sm text-muted-foreground">
        <p>{"青年情绪健康综合测评 \u00B7 仅供学习参考"}</p>
      </footer>
    </div>
  )
}
