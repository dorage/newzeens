import React from "react"
import WidthWrapper from "@/app/_components/layout/width-wrapper"

export default async function Layout({ children }: { children: React.ReactNode; articleList: any; keywordForm: any }) {
  return <WidthWrapper>{children}</WidthWrapper>
}
