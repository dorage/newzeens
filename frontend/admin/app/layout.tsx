import type { Metadata } from "next"
import RootContext from "./_context/root-context"

import { cn } from "./_lib/utils"
import Header from "./_components/layout/header"
import "./globals.css"

export const metadata: Metadata = {
  title: "메일리스트 어드민!",
  description: "비밀리에 공개합니다",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cn("min-h-screen bg-[#E0E5F7]")}>
        <Header />
        <RootContext>{children}</RootContext>
      </body>
    </html>
  )
}
