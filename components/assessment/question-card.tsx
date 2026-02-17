"use client"

import { OPTIONS, type Question } from "@/lib/assessment-data"

interface QuestionCardProps {
  question: Question
  selectedValue: number | undefined
  onSelect: (value: number) => void
  onPrevious: () => void
  canGoPrevious: boolean
  direction: "left" | "right"
}

export function QuestionCard({
  question,
  selectedValue,
  onSelect,
  onPrevious,
  canGoPrevious,
  direction,
}: QuestionCardProps) {
  return (
    <div
      key={question.id}
      className={`flex flex-col gap-8 ${
        direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
      }`}
    >
      {/* Question text */}
      <h2 className="text-center text-xl font-semibold leading-relaxed text-foreground md:text-2xl text-balance">
        {question.text}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {OPTIONS.map((option) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`group flex items-center gap-4 rounded-xl border-2 px-6 py-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border/60 bg-card hover:border-primary/30 hover:bg-secondary/50"
              }`}
              aria-pressed={isSelected}
            >
              {/* Radio indicator */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-border group-hover:border-primary/40"
                }`}
              >
                {isSelected && (
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-base font-medium transition-colors ${
                  isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Previous button */}
      {canGoPrevious && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onPrevious}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            {"上一题"}
          </button>
        </div>
      )}
    </div>
  )
}
