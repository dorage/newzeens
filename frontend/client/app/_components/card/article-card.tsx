import React from "react"
import Image from "next/image"
import Link from "next/link"
import LabelTag from "../atoms/label-tag"
import { ArticleDto } from "@/app/_apis/main-page/main.type"
import { dateFormat } from "@/app/_utils/date-format"

interface ArticleCardProps {
  article: ArticleDto
}

const ArticleCard = (props: ArticleCardProps) => {
  const { article } = props

  return (
    <Link href={`/news-letter/${article.publisher.id}/${article.id}`}>
      <div>
        <div className="relative aspect-video w-full shrink-0">
          <Image
            className="rounded-12 object-cover"
            sizes="600px"
            fill
            src={article.thumbnail || "https://via.placeholder.com/300"}
            alt="테스트이미지"
          />
        </div>

        <p className="text-mBody2 mt-12">{article.title}</p>
        <p className="text-mBody3">{article.publisher.name}</p>
        <p className="text-mElement3 mt-8 text-gray-50">{dateFormat("2024-01-15T18:26:57.720993+09:00") + " 전"}</p>
        <div className="mt-16 flex gap-4">
          {article.publisher.keywords.map((keyword) => {
            return (
              <LabelTag key={keyword.keyword_id} isSelected={false}>
                {keyword.keyword_name}
              </LabelTag>
            )
          })}
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
