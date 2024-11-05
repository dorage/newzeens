import type { Metadata } from "next"
import RootContext from "./_context/root-context"
import { Analytics } from "@vercel/analytics/react"
import GaScript from "./_ga/ga-script"
import { OG_IMAGE } from "./_meta/constant"
import localFont from "next/font/local"
import "./_styles/globals.css"
import Footer from "./_components/footer"

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

/**
 * @see https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/README.md#nextjs
 */
const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
})

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
      <body className={`${pretendard.variable} font-pretendard`}>
        <div id="portal" />
        <RootContext>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">{children}</div>
            {modal}
            <Footer />
          </div>
        </RootContext>
        <Analytics />
      </body>
    </html>
  )
}
