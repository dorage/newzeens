import React from "react"
import Header from "@/app/_components/header"
import ArticleInfo from "@/app/_components/modal/article-info"

interface ArticlePageProps {}

const ArticlePage = (props: ArticlePageProps) => {
  const {} = props
  return (
    <div>
      <Header />
      <ArticleInfo />
    </div>
  )
}

export default ArticlePage
