import {
  DIMENSIONS,
  QUESTIONS,
  type DimensionKey,
} from "./assessment-data"

export interface DimensionScore {
  key: DimensionKey
  name: string
  rawScore: number
  maxScore: number
  percentage: number
  level: ScoreLevel
}

export type ScoreLevel = "excellent" | "good" | "average" | "concern" | "critical"

export interface AssessmentResult {
  id: string
  timestamp: number
  answers: Record<number, number>
  dimensionScores: DimensionScore[]
  overallScore: number
  overallLevel: ScoreLevel
}

const LEVEL_CONFIG: Record<ScoreLevel, { label: string; color: string; description: string }> = {
  excellent: { label: "优秀", color: "hsl(155, 60%, 45%)", description: "状态极佳" },
  good: { label: "良好", color: "hsl(173, 58%, 39%)", description: "状态不错" },
  average: { label: "一般", color: "hsl(36, 90%, 55%)", description: "有待提升" },
  concern: { label: "需关注", color: "hsl(25, 85%, 55%)", description: "建议关注" },
  critical: { label: "需重视", color: "hsl(350, 70%, 60%)", description: "建议寻求帮助" },
}

export function getLevelConfig(level: ScoreLevel) {
  return LEVEL_CONFIG[level]
}

function getScoreLevel(percentage: number): ScoreLevel {
  if (percentage >= 85) return "excellent"
  if (percentage >= 70) return "good"
  if (percentage >= 55) return "average"
  if (percentage >= 40) return "concern"
  return "critical"
}

export function calculateDimensionScores(
  answers: Record<number, number>
): DimensionScore[] {
  return DIMENSIONS.map((dimension) => {
    const questions = QUESTIONS.filter((q) => q.dimensionKey === dimension.key)
    const maxScore = questions.length * 5

    let rawScore = 0
    questions.forEach((q) => {
      const answer = answers[q.id]
      if (answer !== undefined) {
        rawScore += q.reversed ? 6 - answer : answer
      }
    })

    const percentage = Math.round((rawScore / maxScore) * 100)

    return {
      key: dimension.key,
      name: dimension.name,
      rawScore,
      maxScore,
      percentage,
      level: getScoreLevel(percentage),
    }
  })
}

export function calculateOverallScore(dimensionScores: DimensionScore[]): number {
  if (dimensionScores.length === 0) return 0
  const total = dimensionScores.reduce((sum, d) => sum + d.percentage, 0)
  return Math.round(total / dimensionScores.length)
}

export function calculateResult(answers: Record<number, number>): AssessmentResult {
  const dimensionScores = calculateDimensionScores(answers)
  const overallScore = calculateOverallScore(dimensionScores)

  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    answers,
    dimensionScores,
    overallScore,
    overallLevel: getScoreLevel(overallScore),
  }
}

// --- 个性化建议 ---

interface Recommendation {
  dimensionName: string
  level: ScoreLevel
  summary: string
  suggestions: string[]
}

const DIMENSION_RECOMMENDATIONS: Record<DimensionKey, Record<ScoreLevel, { summary: string; suggestions: string[] }>> = {
  emotion: {
    excellent: {
      summary: "你的情绪管理能力非常出色，能够很好地应对日常压力和情绪波动。",
      suggestions: [
        "继续保持你现有的情绪管理方式",
        "可以尝试帮助身边的人，分享你的情绪管理经验",
        "保持正念冥想等有益的放松习惯",
      ],
    },
    good: {
      summary: "你的情绪状态整体良好，偶尔可能会有一些波动，但总体上能够较好地应对。",
      suggestions: [
        "学习一些深呼吸或渐进式肌肉放松技巧",
        "建立固定的情绪日记习惯，记录和反思情绪变化",
        "保持规律的运动习惯，有助于稳定情绪",
      ],
    },
    average: {
      summary: "你的情绪状态有一定的波动，可能时常感受到压力或焦虑，值得关注和改善。",
      suggestions: [
        "每天安排 10-15 分钟的正念冥想或深呼吸练习",
        "识别触发负面情绪的常见情境，提前准备应对策略",
        "减少信息过载，适当限制社交媒体使用时间",
        "与信任的朋友或家人分享你的感受",
      ],
    },
    concern: {
      summary: "你可能正在经历较多的焦虑、压力或情绪低落，这些情绪需要被认真对待。",
      suggestions: [
        "建议尝试与专业心理咨询师进行交流",
        "建立「安全清单」：列出3-5个能让你感到安心的活动",
        "练习478呼吸法：吸气4秒，屏气7秒，呼气8秒",
        "减少独处时间，主动与关心你的人保持联系",
      ],
    },
    critical: {
      summary: "你的情绪状态令人担忧，可能正在经历严重的焦虑、抑郁或压力。请务必寻求专业帮助。",
      suggestions: [
        "强烈建议尽快联系专业心理咨询师或精神科医生",
        "如果感到极度痛苦，请拨打心理援助热线：400-161-9995",
        "告诉你信任的家人或朋友你的真实感受",
        "尝试保持基本的生活作息规律，即使很困难也要坚持",
      ],
    },
  },
  selfEsteem: {
    excellent: {
      summary: "你拥有很强的自我价值感和自信心，能够很好地接纳自己。",
      suggestions: [
        "继续培养你的优势和兴趣爱好",
        "用你的自信去激励和帮助他人",
        "保持自我反思的习惯，持续成长",
      ],
    },
    good: {
      summary: "你的自我认知整体健康，有一定的自信心，但偶尔会出现自我怀疑。",
      suggestions: [
        "每天写下3件你做得好的事情，培养积极的自我对话",
        "设定小而可达的目标，通过完成目标增强信心",
        "学会区分「我做得不好」和「我不够好」的区别",
      ],
    },
    average: {
      summary: "你的自我评价存在一些波动，可能在某些方面缺乏自信。",
      suggestions: [
        "制作一份「个人优势清单」，定期回顾和补充",
        "减少与他人的比较，专注于自己的成长轨迹",
        "尝试走出舒适区，参加一些新的社交或学习活动",
        "练习自我关怀：像对待好朋友一样对待自己",
      ],
    },
    concern: {
      summary: "你可能正在经历自我价值感低下或严重的自我怀疑，这影响了你的生活质量。",
      suggestions: [
        "建议寻求心理咨询帮助，专业人士可以提供有针对性的支持",
        "练习「认知重构」：质疑负面的自我评价是否客观",
        "参加提升自我效能感的课程或工作坊",
        "与积极正向的人在一起，减少负面评判的社交环境",
      ],
    },
    critical: {
      summary: "你的自尊心处于很低的水平，可能对自己有严重的消极看法。请认真考虑寻求帮助。",
      suggestions: [
        "建议尽快寻求专业心理治疗，认知行为疗法对提升自尊很有帮助",
        "写一封给自己的信，列出你值得被爱和被尊重的理由",
        "设立一个简单的每日自我肯定仪式",
        "远离对你进行言语贬低或精神打压的人",
      ],
    },
  },
  interpersonal: {
    excellent: {
      summary: "你拥有出色的社交能力和健康的人际关系，能够很好地与他人建立和维护联系。",
      suggestions: [
        "继续培养和深化你的重要人际关系",
        "尝试成为他人的支持系统和倾听者",
        "参与社区活动或志愿服务，拓展社交圈",
      ],
    },
    good: {
      summary: "你的人际关系状态良好，能够维持较为稳定的社交联系。",
      suggestions: [
        "主动安排与朋友的定期聚会或交流",
        "练习积极倾听，在对话中给予他人更多关注",
        "学习非暴力沟通技巧，提升关系质量",
      ],
    },
    average: {
      summary: "你的人际关系有改善空间，可能偶尔感到社交困难或孤独。",
      suggestions: [
        "加入兴趣小组或社团，在共同爱好中自然地建立联系",
        "学习表达自己的需求和感受，而不是压抑或回避",
        "练习主动发起对话，从简单的问候开始",
        "尝试每周至少与一个朋友进行一次深度交流",
      ],
    },
    concern: {
      summary: "你可能在人际交往中经历较大的困难，感到孤独或难以信任他人。",
      suggestions: [
        "考虑参加社交技能培训课程或团体心理辅导",
        "从一对一的交往开始，逐步扩展社交范围",
        "审视是否有过往经历影响了你对人际关系的看法",
        "利用线上社区作为起步，降低社交压力",
      ],
    },
    critical: {
      summary: "你在人际关系方面面临严重困难，可能感到极度孤立。专业帮助很重要。",
      suggestions: [
        "建议寻求专业心理咨询，尤其是人际关系治疗方向",
        "不要勉强自己立刻建立深度关系，从基本的日常互动开始",
        "如有社交恐惧，认知行为疗法和暴露疗法可以帮助你",
        "寻找线上或线下的互助支持团体",
      ],
    },
  },
  lifeSatisfaction: {
    excellent: {
      summary: "你对生活充满满意和热情，拥有很强的幸福感和生活目标感。",
      suggestions: [
        "分享你的快乐和积极态度，传递正能量",
        "设立新的挑战和目标，保持成长动力",
        "珍惜当下的美好，持续感恩",
      ],
    },
    good: {
      summary: "你总体对生活比较满意，能够从日常中找到快乐。",
      suggestions: [
        "建立感恩日记，每天记录3件值得感恩的事",
        "探索新的兴趣爱好或学习领域",
        "平衡工作/学业与休闲，给自己留出享受的时间",
      ],
    },
    average: {
      summary: "你对生活的满意度一般，可能感觉缺少方向感或日常乐趣。",
      suggestions: [
        "重新审视你的价值观和人生目标，确认方向",
        "尝试「小确幸」练习：每天发现一个微小的美好瞬间",
        "安排一些你一直想做但没做的事情",
        "与积极乐观的人多交流，感受不同的生活态度",
      ],
    },
    concern: {
      summary: "你对生活感到不满意，可能缺乏动力和对未来的希望。",
      suggestions: [
        "建议与心理咨询师探讨你对生活的期望和现实之间的差距",
        "从最容易改变的小事开始，逐步改善生活质量",
        "建立有意义的日常仪式感，如清晨的茶歇或傍晚的散步",
        "重新评估你的环境，是否需要做出一些改变",
      ],
    },
    critical: {
      summary: "你对生活极度不满意，可能感到绝望或看不到前进的方向。请寻求帮助。",
      suggestions: [
        "请认真考虑寻求专业心理支持",
        "如果你有伤害自己的想法，请立即拨打心理援助热线：400-161-9995",
        "试着每天只完成一件小事，不给自己过大的压力",
        "与关心你的人谈谈你的感受，你不需要独自面对",
      ],
    },
  },
  resilience: {
    excellent: {
      summary: "你拥有很强的心理韧性，能够从困难中快速恢复并从中成长。",
      suggestions: [
        "分享你的应对策略，帮助他人增强韧性",
        "挑战更高的目标，发挥你的韧性优势",
        "保持灵活性，继续学习新的应对方法",
      ],
    },
    good: {
      summary: "你有不错的心理韧性和应对能力，能够较好地面对大多数挑战。",
      suggestions: [
        "建立你的「应对工具箱」：整理不同情境下的有效策略",
        "练习将挫折视为学习机会的思维模式",
        "培养至少一种能帮你快速恢复的放松方式",
      ],
    },
    average: {
      summary: "你的心理韧性有提升空间，在面对较大压力时可能感到吃力。",
      suggestions: [
        "学习问题解决的结构化方法：识别问题→列出方案→评估选择→行动",
        "培养成长型思维：将「我不行」改为「我还没学会」",
        "建立支持网络，困难时知道可以向谁求助",
        "通过渐进式挑战来增强自己的抗压能力",
      ],
    },
    concern: {
      summary: "你在面对困难时可能容易感到无助和崩溃，应对策略较为单一。",
      suggestions: [
        "建议寻求心理咨询，学习更多样化的应对策略",
        "尝试认知重构练习，改变对困难情境的解读方式",
        "开始记录「成功应对日志」，积累信心",
        "学习情绪调节技巧，如正念和自我关怀",
      ],
    },
    critical: {
      summary: "你在逆境中感到极度脆弱，急需建立更有效的应对机制。",
      suggestions: [
        "强烈建议寻求专业心理帮助",
        "从最基本的自我照顾开始：吃饭、睡觉、呼吸",
        "不要试图同时解决所有问题，一次只关注一件事",
        "接受帮助不是软弱，而是勇气的表现",
      ],
    },
  },
  physicalHealth: {
    excellent: {
      summary: "你的身心健康状态极佳，拥有良好的睡眠和健康的生活习惯。",
      suggestions: [
        "保持你现有的健康生活方式",
        "尝试新的运动或健康活动，保持新鲜感",
        "帮助身边的人建立健康的生活习惯",
      ],
    },
    good: {
      summary: "你的身心健康状态良好，基本能保持健康的生活方式。",
      suggestions: [
        "优化你的睡眠环境，保证7-9小时的优质睡眠",
        "增加每周的运动频率，目标是每周3-5次",
        "注意工作/学业与休息的平衡",
      ],
    },
    average: {
      summary: "你的身心状态一般，可能存在睡眠不规律或缺乏运动的问题。",
      suggestions: [
        "建立固定的作息时间表，每天同一时间起床和入睡",
        "从每天15分钟的运动开始，逐步增加",
        "减少睡前使用电子设备的时间",
        "注意饮食均衡，减少咖啡因和糖分摄入",
      ],
    },
    concern: {
      summary: "你的身心状态不佳，可能经常感到疲惫，睡眠质量差。",
      suggestions: [
        "建议咨询医生排除身体健康问题",
        "尝试建立「睡眠仪式」：热水澡→轻音乐→阅读→入睡",
        "每天至少进行20分钟的户外活动",
        "学习渐进式肌肉放松法来改善入睡困难",
      ],
    },
    critical: {
      summary: "你的身心健康状态令人担忧，长期的睡眠和身体问题需要被认真对待。",
      suggestions: [
        "请尽快就医检查身体状况",
        "如果失眠严重，考虑寻求睡眠专科帮助",
        "从最基本的规律作息开始改善",
        "身心是一体的，心理问题也可能表现为身体症状，建议同时关注心理健康",
      ],
    },
  },
}

export function generateRecommendations(dimensionScores: DimensionScore[]): Recommendation[] {
  const sorted = [...dimensionScores].sort((a, b) => a.percentage - b.percentage)

  return sorted.map((score) => {
    const config = DIMENSION_RECOMMENDATIONS[score.key][score.level]
    return {
      dimensionName: score.name,
      level: score.level,
      summary: config.summary,
      suggestions: config.suggestions,
    }
  })
}

export function getOverallSummary(overallScore: number, overallLevel: ScoreLevel): string {
  const summaries: Record<ScoreLevel, string> = {
    excellent:
      "你的整体心理健康状况非常好！你在各个维度都表现出色，拥有良好的情绪管理能力、健康的自我认知和丰富的社交支持。继续保持你的好习惯，同时也别忘了偶尔给自己放松的时间。",
    good:
      "你的整体心理健康状况良好。大部分维度都在健康范围内，你有着不错的心理基础。关注那些得分稍低的领域，有针对性地提升，你的心理健康水平会更上一层楼。",
    average:
      "你的整体心理健康状况处于中等水平。你在某些方面表现不错，但也有一些领域需要关注和改善。现在正是开始行动的好时机，小小的改变就能带来大大的不同。",
    concern:
      "你的整体心理健康状况需要关注。多个维度显示你可能正在面临一些挑战。建议认真对待下方的改善建议，如果感觉压力很大，请不要犹豫寻求专业帮助。",
    critical:
      "你的整体心理健康状况令人担忧。你可能正在经历多方面的困难和痛苦。请务必尽快寻求专业心理帮助，你不需要独自承担这一切。记住，寻求帮助是勇敢的表现。",
  }
  return summaries[overallLevel]
}
