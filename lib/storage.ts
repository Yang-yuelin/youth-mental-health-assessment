import type { AssessmentResult } from "./scoring"
export type { AssessmentResult }

const STORAGE_KEY = "youth-mental-health-assessment"

export function saveAssessmentResult(result: AssessmentResult): void {
  if (typeof window === "undefined") return
  try {
    const history = getAssessmentHistory()
    history.unshift(result)
    // Keep only last 10 results
    const trimmed = history.slice(0, 10)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch {
    // Storage might be full or unavailable
  }
}

export function getLatestResult(): AssessmentResult | null {
  if (typeof window === "undefined") return null
  try {
    const history = getAssessmentHistory()
    return history[0] || null
  } catch {
    return null
  }
}

export function getAssessmentHistory(): AssessmentResult[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as AssessmentResult[]
  } catch {
    return []
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
