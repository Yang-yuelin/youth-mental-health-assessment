export type DimensionKey =
  | "emotion"
  | "selfEsteem"
  | "interpersonal"
  | "lifeSatisfaction"
  | "resilience"
  | "physicalHealth"

export interface Dimension {
  key: DimensionKey
  name: string
  shortName: string
  description: string
  color: string
  bgColor: string
  borderColor: string
}

export interface Question {
  id: number
  dimensionKey: DimensionKey
  text: string
  reversed: boolean
}

export interface Option {
  value: number
  label: string
}

export const OPTIONS: Option[] = [
  { value: 1, label: "从不" },
  { value: 2, label: "很少" },
  { value: 3, label: "有时" },
  { value: 4, label: "经常" },
  { value: 5, label: "总是" },
]

export const DIMENSIONS: Dimension[] = [
  {
    key: "emotion",
    name: "情绪状态",
    shortName: "情绪",
    description: "评估你的焦虑、抑郁和压力水平，了解日常情绪波动情况。",
    color: "hsl(173, 58%, 39%)",
    bgColor: "bg-[hsl(173,45%,92%)]",
    borderColor: "border-[hsl(173,58%,39%)]",
  },
  {
    key: "selfEsteem",
    name: "自我认知与自尊",
    shortName: "自尊",
    description: "评估你的自我价值感、自信心和自我认同水平。",
    color: "hsl(263, 70%, 58%)",
    bgColor: "bg-[hsl(263,60%,94%)]",
    borderColor: "border-[hsl(263,70%,58%)]",
  },
  {
    key: "interpersonal",
    name: "人际关系",
    shortName: "人际",
    description: "评估你的社交能力、人际信任和关系质量。",
    color: "hsl(36, 90%, 55%)",
    bgColor: "bg-[hsl(36,80%,93%)]",
    borderColor: "border-[hsl(36,90%,55%)]",
  },
  {
    key: "lifeSatisfaction",
    name: "生活满意度与幸福感",
    shortName: "幸福感",
    description: "评估你对生活的总体满意度和主观幸福感。",
    color: "hsl(350, 70%, 60%)",
    bgColor: "bg-[hsl(350,60%,94%)]",
    borderColor: "border-[hsl(350,70%,60%)]",
  },
  {
    key: "resilience",
    name: "心理韧性与应对方式",
    shortName: "韧性",
    description: "评估你面对困难时的复原力和应对策略。",
    color: "hsl(210, 75%, 55%)",
    bgColor: "bg-[hsl(210,65%,93%)]",
    borderColor: "border-[hsl(210,75%,55%)]",
  },
  {
    key: "physicalHealth",
    name: "睡眠与身心健康",
    shortName: "身心",
    description: "评估你的睡眠质量及身心健康状态。",
    color: "hsl(155, 60%, 45%)",
    bgColor: "bg-[hsl(155,50%,92%)]",
    borderColor: "border-[hsl(155,60%,45%)]",
  },
]

export const QUESTIONS: Question[] = [
  // 情绪状态 (emotion) - 反向题：分数越高=情绪越差，reversed=true 表示正向计分需要反转
  {
    id: 1,
    dimensionKey: "emotion",
    text: "我感到紧张或焦虑不安",
    reversed: true,
  },
  {
    id: 2,
    dimensionKey: "emotion",
    text: "我能够保持平和的心态面对日常事务",
    reversed: false,
  },
  {
    id: 3,
    dimensionKey: "emotion",
    text: "我感到情绪低落或沮丧",
    reversed: true,
  },
  {
    id: 4,
    dimensionKey: "emotion",
    text: "我觉得自己能够有效地管理压力",
    reversed: false,
  },
  {
    id: 5,
    dimensionKey: "emotion",
    text: "我会因为小事而感到烦躁不安",
    reversed: true,
  },

  // 自我认知与自尊 (selfEsteem)
  {
    id: 6,
    dimensionKey: "selfEsteem",
    text: "我对自己感到满意",
    reversed: false,
  },
  {
    id: 7,
    dimensionKey: "selfEsteem",
    text: "我觉得自己是一个有价值的人",
    reversed: false,
  },
  {
    id: 8,
    dimensionKey: "selfEsteem",
    text: "我对自己的能力缺乏信心",
    reversed: true,
  },
  {
    id: 9,
    dimensionKey: "selfEsteem",
    text: "我能够接纳自己的不完美",
    reversed: false,
  },
  {
    id: 10,
    dimensionKey: "selfEsteem",
    text: "我常常觉得自己不如别人",
    reversed: true,
  },

  // 人际关系 (interpersonal)
  {
    id: 11,
    dimensionKey: "interpersonal",
    text: "我在社交场合中感到自在",
    reversed: false,
  },
  {
    id: 12,
    dimensionKey: "interpersonal",
    text: "我能信任身边的朋友和家人",
    reversed: false,
  },
  {
    id: 13,
    dimensionKey: "interpersonal",
    text: "我在人际交往中感到孤独",
    reversed: true,
  },
  {
    id: 14,
    dimensionKey: "interpersonal",
    text: "遇到困难时，我能向他人寻求帮助",
    reversed: false,
  },
  {
    id: 15,
    dimensionKey: "interpersonal",
    text: "我觉得别人很难理解我",
    reversed: true,
  },

  // 生活满意度与幸福感 (lifeSatisfaction)
  {
    id: 16,
    dimensionKey: "lifeSatisfaction",
    text: "总体来说，我对目前的生活感到满意",
    reversed: false,
  },
  {
    id: 17,
    dimensionKey: "lifeSatisfaction",
    text: "我觉得自己的生活充满意义",
    reversed: false,
  },
  {
    id: 18,
    dimensionKey: "lifeSatisfaction",
    text: "我对未来充满希望",
    reversed: false,
  },
  {
    id: 19,
    dimensionKey: "lifeSatisfaction",
    text: "我很少从日常活动中感受到快乐",
    reversed: true,
  },
  {
    id: 20,
    dimensionKey: "lifeSatisfaction",
    text: "我觉得自己正在朝着理想的方向发展",
    reversed: false,
  },

  // 心理韧性与应对方式 (resilience)
  {
    id: 21,
    dimensionKey: "resilience",
    text: "遇到挫折时，我能很快恢复过来",
    reversed: false,
  },
  {
    id: 22,
    dimensionKey: "resilience",
    text: "面对困难，我倾向于逃避而非面对",
    reversed: true,
  },
  {
    id: 23,
    dimensionKey: "resilience",
    text: "我能够从失败中学习和成长",
    reversed: false,
  },
  {
    id: 24,
    dimensionKey: "resilience",
    text: "我有明确的方法来应对生活中的压力",
    reversed: false,
  },
  {
    id: 25,
    dimensionKey: "resilience",
    text: "困难时期，我容易感到无助和绝望",
    reversed: true,
  },

  // 睡眠与身心健康 (physicalHealth)
  {
    id: 26,
    dimensionKey: "physicalHealth",
    text: "我的睡眠质量良好，醒来时感到精力充沛",
    reversed: false,
  },
  {
    id: 27,
    dimensionKey: "physicalHealth",
    text: "我经常感到身体疲惫或不适",
    reversed: true,
  },
  {
    id: 28,
    dimensionKey: "physicalHealth",
    text: "我有规律的运动和健康的生活习惯",
    reversed: false,
  },
  {
    id: 29,
    dimensionKey: "physicalHealth",
    text: "我的睡眠时间和作息很不规律",
    reversed: true,
  },
  {
    id: 30,
    dimensionKey: "physicalHealth",
    text: "我能够保持良好的体力和精神状态",
    reversed: false,
  },
]

export function getQuestionsByDimension(dimensionKey: DimensionKey): Question[] {
  return QUESTIONS.filter((q) => q.dimensionKey === dimensionKey)
}

export function getDimensionByKey(key: DimensionKey): Dimension | undefined {
  return DIMENSIONS.find((d) => d.key === key)
}
