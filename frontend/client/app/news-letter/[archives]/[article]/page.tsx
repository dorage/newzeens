import { Metadata } from "next"
import React from "react"
import detailQueryKey from "@/app/_apis/_query-key/detail"
import detailApi from "@/app/_apis/detail-page"
import Header from "@/app/_components/header"
import ArticleInfo from "@/app/_components/modal/article-info"
import { NextPageProps } from "@/app/_types/next"
import getQueryClient from "@/app/_utils/query-client"
import { OG_IMAGE } from "@/app/_meta/constant"

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

    const { article: articleData, publisher, related_articles } = response

    const title = articleData.title
    const description = (articleData?.summary || "").slice(0, 120)
    const images = [articleData.thumbnail || publisher.thumbnail || OG_IMAGE]

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images,
      },
    }
  } catch (e) {
    console.log(e)
    console.log("error")

    return {}
  }
}

const ArticlePage = async (props: NextPageProps<ArticlePageProps>) => {
  const { params } = props
  const { article } = params
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: detailQueryKey.article.detail({ articleId: article }),
    queryFn: () => fetchArticle(article),
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
