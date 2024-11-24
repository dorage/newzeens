import React from "react"
import Image from "next/image"
import Link from "next/link"
import LabelTag from "../atoms/label-tag"
import { ArticleDto } from "@/app/_apis/main-page/main.type"
import { dateFormat } from "@/app/_utils/date-format"
import { filterByKeywordGroup } from "@/app/_utils/keyword"
import { sendEvent } from "@/app/_meta/track"
import classNames from "@/app/_utils/class-names"

interface ArticleCardProps {
  article: ArticleDto
}

const ArticleCard = (props: ArticleCardProps) => {
  const { article } = props

  return (
    <Link
      href={`/news-letter/${article.publisher.id}/${article.id}`}
      onClick={() => {
        sendEvent("article_click", {
          ...article,
        })
      }}
    >
      <div className="group relative z-10">
        <div
          className={classNames(
            "group-hover:bg-bg-2 bg-transparent transition-colors duration-300 ease-in-out rounded-[22px] absolute -inset-12 z-[-1]",
          )}
        />
        <div className="relative aspect-video w-full shrink-0">
          <Image
            className="rounded-12 object-cover bg-white"
            sizes="600px"
            fill
            src={article.thumbnail || "https://via.placeholder.com/300"}
            alt="테스트이미지"
          />
        </div>

        <p className="text-mBody2 mt-12 text-gray-80 line-clamp-1 text-ellipsis">{article.title}</p>
        <p className="text-mBody3 text-gray-70">
          {article.publisher.name} · {dateFormat(article.created_at) + " 전"}
        </p>
        <div className="mt-16 flex flex-wrap gap-4">
          {filterByKeywordGroup(article.publisher.keywords, ["목적", "고유"]).map((keyword) => {
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
