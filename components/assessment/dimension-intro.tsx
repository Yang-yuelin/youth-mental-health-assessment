"use client"

import { useEffect, useState } from "react"
import type { Dimension } from "@/lib/assessment-data"

interface DimensionIntroProps {
  dimension: Dimension
  index: number
  onComplete: () => void
}

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  emotion: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  selfEsteem: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  interpersonal: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  lifeSatisfaction: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>
  ),
  resilience: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  ),
  physicalHealth: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h5l2-7 4 14 2-7h5"/><path d="M6 12H2"/></svg>
  ),
}

export function DimensionIntro({ dimension, index, onComplete }: DimensionIntroProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 400)
    }, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  const handleClick = () => {
    setVisible(false)
    setTimeout(onComplete, 400)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex w-full cursor-pointer flex-col items-center gap-6 rounded-2xl border border-border/60 bg-card p-12 text-center shadow-sm transition-all duration-400 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      aria-label={`进入${dimension.name}维度测评`}
    >
      <div
        className="flex h-24 w-24 items-center justify-center rounded-3xl"
        style={{ backgroundColor: `${dimension.color}15`, color: dimension.color }}
      >
        {DIMENSION_ICONS[dimension.key]}
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {`${index + 1} / 6`}
        </span>
        <h2 className="text-2xl font-bold text-foreground">{dimension.name}</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {dimension.description}
        </p>
      </div>

      <span className="text-xs text-muted-foreground/60">{"点击任意处继续"}</span>
    </button>
  )
}
