import React from "react"
import Image from "next/image"
import LabelTag from "../../atoms/label-tag"
import { PublisherDto } from "@/app/_apis/main-page/main.type"

interface NewsLetterItemProps {
  publisher: PublisherDto
}

const NewsLetterItem = (props: NewsLetterItemProps) => {
  const { publisher } = props
  return (
    <div className="flex flex-col gap-12">
      <div className="rounded-12 xl:rounded-16 relative aspect-square shrink-0 xl:aspect-video">
        <Image
          className="rounded-12 xl:rounded-16"
          src={publisher.thumbnail || "https://via.placeholder.com/300"}
          fill
          alt="테스트이미지"
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-mBody2 xl:text-body3">{publisher.name}</p>

        <p className="text-gray-70 text-mBody3 xl:text-body5 line-clamp-2 xl:line-clamp-2">{publisher.description}</p>
      </div>

      <div className="flex items-center gap-4">
        {publisher.keywords?.map((v) => {
          return <LabelTag key={v.keyword_id}>{v.keyword_name}</LabelTag>
        })}
      </div>
    </div>
  )
}

export default NewsLetterItem
