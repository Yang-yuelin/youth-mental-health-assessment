"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProgressHeader } from "@/components/assessment/progress-header"
import { QuestionCard } from "@/components/assessment/question-card"
import { DimensionIntro } from "@/components/assessment/dimension-intro"
import { QUESTIONS, DIMENSIONS } from "@/lib/assessment-data"
import { calculateResult } from "@/lib/scoring"
import { saveAssessmentResult } from "@/lib/storage"

type Phase = "intro" | "question" | "confirm"

export default function AssessmentPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [phase, setPhase] = useState<Phase>("intro")
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [introShown, setIntroShown] = useState<Set<string>>(new Set())
  const [submitting, setSubmitting] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]
  const currentDimension = useMemo(
    () => DIMENSIONS.find((d) => d.key === currentQuestion.dimensionKey)!,
    [currentQuestion]
  )
  const currentDimIndex = DIMENSIONS.findIndex(
    (d) => d.key === currentQuestion.dimensionKey
  )

  // Show dimension intro when entering a new dimension
  useEffect(() => {
    if (!introShown.has(currentQuestion.dimensionKey)) {
      setPhase("intro")
    } else {
      setPhase("question")
    }
  }, [currentIndex, currentQuestion.dimensionKey, introShown])

  const handleIntroComplete = useCallback(() => {
    setIntroShown((prev) => new Set(prev).add(currentQuestion.dimensionKey))
    setPhase("question")
  }, [currentQuestion.dimensionKey])

  const handleSelect = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))

      // Auto-advance after 400ms
      setTimeout(() => {
        if (currentIndex < QUESTIONS.length - 1) {
          setDirection("right")
          setCurrentIndex((prev) => prev + 1)
        } else {
          setPhase("confirm")
        }
      }, 400)
    },
    [currentIndex, currentQuestion.id]
  )

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("left")
      setPhase("question")
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex])

  const handleSubmit = useCallback(() => {
    setSubmitting(true)
    const result = calculateResult(answers)
    saveAssessmentResult(result)
    router.push("/result")
  }, [answers, router])

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === QUESTIONS.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(173,45%,92%)]/50 to-background">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            {"返回首页"}
          </Link>
          <span className="text-sm font-medium text-foreground">
            {"情绪健康测评"}
          </span>
          <span className="text-sm text-muted-foreground">
            {`已答 ${answeredCount}/${QUESTIONS.length}`}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8 md:py-12">
        {/* Progress header */}
        <div className="mb-10">
          <ProgressHeader
            currentIndex={currentIndex}
            totalQuestions={QUESTIONS.length}
            currentDimension={currentQuestion.dimensionKey}
          />
        </div>

        {/* Content area */}
        <div className="min-h-[400px]">
          {phase === "intro" && (
            <DimensionIntro
              dimension={currentDimension}
              index={currentDimIndex}
              onComplete={handleIntroComplete}
            />
          )}

          {phase === "question" && (
            <QuestionCard
              question={currentQuestion}
              selectedValue={answers[currentQuestion.id]}
              onSelect={handleSelect}
              onPrevious={handlePrevious}
              canGoPrevious={currentIndex > 0}
              direction={direction}
            />
          )}

          {phase === "confirm" && (
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-border/60 bg-card p-10 text-center shadow-sm animate-scale-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {"测评完成！"}
                </h2>
                <p className="text-muted-foreground">
                  {allAnswered
                    ? "你已回答全部 30 道题目。点击下方按钮查看你的个性化测评报告。"
                    : `你还有 ${QUESTIONS.length - answeredCount} 道题目未作答。建议全部作答以获得更准确的结果。`}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={submitting}
                  className="h-12 rounded-xl px-10 text-base font-semibold shadow-lg shadow-primary/20"
                >
                  {submitting ? "正在生成报告..." : "查看测评报告"}
                </Button>
                {!allAnswered && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      // Find first unanswered question
                      const firstUnanswered = QUESTIONS.findIndex(
                        (q) => answers[q.id] === undefined
                      )
                      if (firstUnanswered !== -1) {
                        setDirection("left")
                        setCurrentIndex(firstUnanswered)
                        setPhase("question")
                      }
                    }}
                    className="h-12 rounded-xl px-8 text-base"
                  >
                    {"补充作答"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
