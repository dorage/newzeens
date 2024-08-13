import { Metadata } from "next"
import React from "react"
import detailQueryKey from "@/app/_apis/_query-key/detail"
import detailApi from "@/app/_apis/detail-page"
import Header from "@/app/_components/header"
import ArticleInfo from "@/app/_components/modal/article-info"
import { NextPageProps } from "@/app/_types/next"
import getQueryClient from "@/app/_utils/query-client"

const fetchArticle = async (articleId: string) => {
  return await detailApi.getArticle({ articleId })
}

interface ArticlePageProps {
  article: string
}

export async function generateMetadata({ params }: NextPageProps<ArticlePageProps>): Promise<Metadata> {
  try {
    const { article } = params

    const response = await fetchArticle(article)

    return {
      title: "test",
    }
  } catch (e) {
    console.log(e)
    console.log("error")

    // TODO: add sentry
    return {}
  }
}

const ArticlePage = async (props: NextPageProps<ArticlePageProps>) => {
  const { params } = props

  const { article } = params

  const queryClient = getQueryClient()

  const fetch = await queryClient.fetchQuery({
    queryKey: detailQueryKey.article.detail({ articleId: article }),
    queryFn: () => fetchArticle(article),
  })
  console.log(`fetch`, fetch)

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
