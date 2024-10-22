import React from "react"
import Link from "next/link"
import newsLetterApi from "@/app/_api/news-letter"
import { NextPageProps } from "@/app/_types/next"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"

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
      <div className="flex items-center justify-between">
        <h6 className="text-2xl font-bold">
          아티클 관리 <span className="text-[#2141E5]">{articleList?.length}</span>
        </h6>

        <Link href={`/news-letter/${publisherId}/article/create`}>
          <Button variant="default">생성</Button>
        </Link>
      </div>

      <div className="flex gap-4 overflow-auto">
        {articleList?.map((article) => (
          <Link key={article.id} href={`/news-letter/${publisherId}/article/${article.id}`}>
            <div className="flex flex-col gap-2">
              <div className="relative aspect-video h-auto w-[253px] shrink-0 overflow-hidden">
                <Image
                  fill
                  className="shrink-0 object-cover"
                  src={article.thumbnail ?? "https://via.placeholder.com/300"}
                  sizes="400px"
                  alt={article.title}
                />
              </div>
              <p className="text-xl">{article.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ArticleListInterceptor
