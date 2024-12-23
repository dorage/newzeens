import React from "react"
import Image from "next/image"
import Link from "next/link"
import LabelTag from "../../atoms/label-tag"
import { PublisherDto } from "@/app/_apis/main-page/main.type"
import { filterByKeywordGroup } from "@/app/_utils/keyword"
import { sendEvent } from "@/app/_meta/track"
import classNames from "@/app/_utils/class-names"

interface NewsLetterItemProps {
  publisher: PublisherDto
  highlightWord?: string

  aspectSquare?: boolean | null
}

const NewsLetterItem = (props: NewsLetterItemProps) => {
  const { publisher, highlightWord, aspectSquare } = props

  const highlightText = (text: string) => {
    if (!highlightWord) return text

    // 일치하는 단어를 span 태그로 감싸서 텍스트 컬러 변경
    const regex = new RegExp(`(${highlightWord})`, "gi") // 대소문자 무시하고 검색
    const parts = text.split(regex)

    return parts.map((part, i) =>
      part.toLowerCase() === highlightWord.toLowerCase() ? (
        <span key={i} className="text-primary font-extrabold">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <Link
      href={`/news-letter/${publisher.id}`}
      onClick={() => {
        sendEvent("news-letter_click", {
          ...publisher,
        })
      }}
    >
      <div className="group relative z-10">
        <div
          className={classNames(
            "group-hover:bg-bg-2 bg-transparent transition-colors duration-300 ease-in-out rounded-[22px] absolute -inset-12 z-[-1]",
          )}
        />
        <div
          className={classNames("rounded-12 xl:rounded-16 relative shrink-0", {
            "aspect-video": !aspectSquare,
            "aspect-square": aspectSquare,
          })}
        >
          <Image
            className="rounded-12 xl:rounded-16 bg-white object-contain xl:object-cover border border-gray-40"
            src={publisher.thumbnail || "https://via.placeholder.com/300"}
            fill
            alt="테스트이미지"
            quality={100}
          />
        </div>

        <div className="h-12 xl:h-16" />
        <div className="flex flex-col gap-4">
          <p className="text-mBody2 xl:text-body3">{highlightText(publisher.name)}</p>

          <p className="text-gray-70 text-mBody3 xl:text-body5 line-clamp-2 xl:line-clamp-2">
            {highlightText(publisher.description || "")}
          </p>
        </div>

        <div className="h-12" />
        <div className="flex flex-wrap items-center gap-4">
          {filterByKeywordGroup(publisher.keywords, ["직무", "목적", "고유", "해외"])?.map((v) => {
            return (
              <LabelTag key={v.keyword_id} bg4>
                {v.keyword_name}
              </LabelTag>
            )
          })}
        </div>
      </div>
    </Link>
  )
}

export default NewsLetterItem
