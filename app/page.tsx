import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DIMENSIONS } from "@/lib/assessment-data"

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  emotion: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  selfEsteem: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  interpersonal: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  lifeSatisfaction: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>
  ),
  resilience: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  ),
  physicalHealth: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h5l2-7 4 14 2-7h5"/><path d="M6 12H2"/></svg>
  ),
}

const DIMENSION_COLORS: Record<string, string> = {
  emotion: "text-[hsl(173,58%,39%)] bg-[hsl(173,45%,92%)]",
  selfEsteem: "text-[hsl(263,70%,58%)] bg-[hsl(263,60%,94%)]",
  interpersonal: "text-[hsl(36,90%,55%)] bg-[hsl(36,80%,93%)]",
  lifeSatisfaction: "text-[hsl(350,70%,60%)] bg-[hsl(350,60%,94%)]",
  resilience: "text-[hsl(210,75%,55%)] bg-[hsl(210,65%,93%)]",
  physicalHealth: "text-[hsl(155,60%,45%)] bg-[hsl(155,50%,92%)]",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(173,45%,92%)] via-background to-[hsl(210,65%,95%)]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/5 animate-pulse-soft" />
          <div className="absolute top-40 -left-16 h-48 w-48 rounded-full bg-[hsl(263,70%,58%)]/5 animate-pulse-soft animation-delay-300" />
          <div className="absolute bottom-10 right-1/4 h-32 w-32 rounded-full bg-[hsl(36,90%,55%)]/5 animate-pulse-soft animation-delay-600" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-24 text-center md:pt-32 md:pb-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm text-primary animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <span>{"专业 \u00B7 科学 \u00B7 匿名 \u00B7 免费"}</span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-fade-in-up">
            {"青年情绪健康"}
            <br />
            <span className="text-primary">{"综合测评"}</span>
          </h1>

          <p className="mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground animate-fade-in-up animation-delay-200">
            {"基于专业心理学量表，从六大维度全面评估你的情绪健康状况。仅需 5-8 分钟，获取个性化的心理健康报告和改善建议。"}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row animate-fade-in-up animation-delay-300">
            <Button asChild size="lg" className="h-13 rounded-xl px-10 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30">
              <Link href="/assessment">{"开始测评"}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 rounded-xl px-8 text-base">
              <a href="#about">{"了解更多"}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"六大维度，全面了解你的内心世界"}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            {"本测评涵盖情绪健康的核心维度，帮助你从多个角度认识自己的心理状态，找到需要关注和提升的方向。"}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIMENSIONS.map((dim, i) => (
            <div
              key={dim.key}
              className={`group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 animate-fade-in-up animation-delay-${(i + 1) * 100}`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${DIMENSION_COLORS[dim.key]}`}>
                {DIMENSION_ICONS[dim.key]}
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{dim.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{dim.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {"简单三步，开启你的心理自我探索"}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "开始测评",
                desc: "无需注册，点击按钮即可匿名开始。你的隐私完全受到保护。",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                ),
              },
              {
                step: "02",
                title: "回答问题",
                desc: "共 30 道题目，根据你的真实感受逐一作答，每题有 5 个选项。",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
                ),
              },
              {
                step: "03",
                title: "获取报告",
                desc: "立即生成包含雷达图、柱状图和个性化建议的完整心理健康报告。",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {`Step ${item.step}`}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="h-13 rounded-xl px-10 text-base font-semibold shadow-lg shadow-primary/20">
              <Link href="/assessment">{"立即开始测评"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-border/60 bg-card p-8">
          <h3 className="mb-4 text-lg font-semibold text-foreground">{"重要说明"}</h3>
          <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
              {"本测评仅供参考和自我了解之用，不能替代专业心理诊断。如果你正在经历严重的心理困扰，请及时寻求专业心理咨询师或精神科医生的帮助。"}
            </li>
            <li className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              {"你的所有数据完全保存在本地浏览器中，不会上传到任何服务器。我们尊重并保护你的隐私。"}
            </li>
            <li className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              {"心理援助热线：全国心理援助热线 400-161-9995 / 北京心理危机研究与干预中心 010-82951332"}
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <p>{"青年情绪健康综合测评 \u00B7 仅供学习参考"}</p>
      </footer>
    </div>
  )
}
