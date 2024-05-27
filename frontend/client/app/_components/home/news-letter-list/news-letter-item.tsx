import React from "react"
import Image from "next/image"
import LabelTag from "../../atoms/label-tag"

interface NewsLetterItemProps {}

const NewsLetterItem = (props: NewsLetterItemProps) => {
  const {} = props
  return (
    <div className="flex flex-col gap-12">
      <div className="rounded-12 xl:rounded-16 relative aspect-square shrink-0 xl:aspect-video">
        <Image className="rounded-12 xl:rounded-16" src="https://via.placeholder.com/300" fill alt="테스트이미지" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-mBody2 xl:text-body3">뉴스레터명</p>

        <p className="text-gray-70 text-mBody3 xl:text-body5 line-clamp-2 xl:line-clamp-2">
          최신 개발(Dev) 뉴스, IT 이슈 등 개발자의 일과 성장에 도움되는 정보를 전해주는 뉴스레터 최신 개발(Dev) 뉴스, IT
          이슈 등 개발자의 일과 성장에 도움되는 정보를 전해주는 뉴스레터
        </p>
      </div>

      <div className="flex items-center gap-4">
        <LabelTag>트렌드</LabelTag>
        <LabelTag>인사이트</LabelTag>
      </div>
    </div>
  )
}

export default NewsLetterItem
