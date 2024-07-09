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
  articleId: string
}

export async function generateMetadata({ params }: NextPageProps<ArticlePageProps>): Promise<Metadata> {
  try {
    const { articleId } = params

    const response = await fetchArticle(articleId)

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

  const { articleId } = params

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: detailQueryKey.article.detail({ articleId }),
    queryFn: () => fetchArticle(articleId),
  })

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
