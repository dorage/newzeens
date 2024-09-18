import type { Metadata } from "next"
import { Inter } from "next/font/google"
import RootContext from "./_context/root-context"
import { Analytics } from "@vercel/analytics/react"
import "./_styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "메일리스트 | 뉴스레터 정보 한눈에 보기",
  description: "메일리스트에서 나에게 맞는 뉴스레터를 한번에 보고 구독해보세요.",
}

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
  }>,
) {
  const { children, modal } = props
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="portal" />
        <RootContext>
          {children}
          {modal}
        </RootContext>
        <Analytics />
      </body>
    </html>
  )
}
