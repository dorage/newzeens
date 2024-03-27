import React from "react"
import WidthWrapper from "@/app/_components/layout/width-wrapper"

export default async function Layout({
  children,
  keywordForm,
  articleList,
}: {
  children: React.ReactNode
  keywordForm: React.ReactNode
  articleList: React.ReactNode
}) {
  return (
    <WidthWrapper>
      {children}
      <div className="h-10" />
      {keywordForm}

      <div className="h-12" />
      {articleList}
    </WidthWrapper>
  )
}
