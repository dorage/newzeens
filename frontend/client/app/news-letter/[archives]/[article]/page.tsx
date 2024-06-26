import React from "react"
import Header from "@/app/_components/header"
import ArticleInfo from "@/app/_components/modal/article-info"

interface ArticlePageProps {}

const ArticlePage = (props: ArticlePageProps) => {
  const {} = props
  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-xl">
        <ArticleInfo />
      </div>
    </>
  )
}

export default ArticlePage
