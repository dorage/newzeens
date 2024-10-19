import type { Metadata } from "next"
import { Inter } from "next/font/google"
import RootContext from "./_context/root-context"
import { Analytics } from "@vercel/analytics/react"
import GaScript from "./_ga/ga-script"
import { OG_IMAGE } from "./_meta/constant"
import "./_styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "메일리스트",
    template: `메일리스트 | %s`,
  },
  description:
    "기획자, 개발자, 디자이너에게 꼭 필요한 뉴스레터를 놓치지 마세요. 다양한 직군별 트렌드 뉴스레터를 한곳에서 쉽게 찾아보세요.",
  openGraph: {
    type: "website",
    title: "메일리스트 | 직무 트렌드 뉴스레터 모아보기",
    images: [OG_IMAGE],
    url: "https://www.maillist.site",
    siteName: "메일리스트",
  },
}

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
  }>,
) {
  const { children, modal } = props
  return (
    <html lang="ko">
      <head>
        <GaScript />
        {/* search advisor */}
        <meta name="naver-site-verification" content="402f9ae3e19b80a1937687b96beb2b54645c7c7d" />
      </head>
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
