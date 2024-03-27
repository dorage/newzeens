import React from "react"
import Link from "next/link"
import newsLetterApi from "@/app/_api/news-letter"
import { NextPageProps } from "@/app/_types/next"

interface ArticleListInterceptorProps {
  publisherId: string
}

const ArticleListInterceptor = async (props: NextPageProps<ArticleListInterceptorProps>) => {
  const {
    params: { publisherId },
  } = props

  const articleList = await newsLetterApi.getAdminArticleList({ publisher_id: publisherId })

  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-2xl font-bold">
        아티클 관리 <span className="text-[#2141E5]">{articleList?.length}</span>
      </h6>

      <div className="flex gap-4 overflow-auto">
        {articleList?.map((article) => (
          <Link key={article.id} href={`/news-letter/${publisherId}/article/${article.id}`}>
            <div className="flex flex-col gap-2">
              {/* <Image
              width={253}
              height={160}
              className="shrink-0"
              src={article.thumbnail ?? "https://via.placeholder.com/300"}
              alt={article.name}
            /> */}
              <div className="aspect-video w-[253px] shrink-0 bg-gray-300" />
              <p className="text-xl">{article.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ArticleListInterceptor
