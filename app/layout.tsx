import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "青年情绪健康综合测评",
  description:
    "专业的青年情绪健康综合测评工具，涵盖情绪状态、自我认知、人际关系、生活满意度、心理韧性和身心健康六大维度，帮助你全面了解自己的心理健康状况。",
  keywords: "心理测评,情绪健康,青年心理,心理健康,自我评估",
}

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
