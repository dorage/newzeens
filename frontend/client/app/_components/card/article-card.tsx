import React from "react"
import Image from "next/image"
import Link from "next/link"
import LabelTag from "../atoms/label-tag"
import { dateFormat } from "@/app/_utils/date-format"

interface ArticleCardProps {}

const ArticleCard = (props: ArticleCardProps) => {
  const {} = props
  return (
    <Link href="/news-letter/2ctyc9">
      <div>
        <div className="relative aspect-video w-full shrink-0">
          <Image
            className="rounded-12 object-cover"
            sizes="600px"
            fill
            src="https://via.placeholder.com/300"
            alt="테스트이미지"
          />
        </div>

        <p className="text-mBody2 mt-12">
          지난 11월 배달앱 3사 결제추정금액 3년만에 최저!최저!최저!최저!최저!최저!최저!
        </p>
        <p className="text-mBody3">뉴닉</p>
        <p className="text-mElement3 mt-8 text-gray-50">{dateFormat("2024-01-15T18:26:57.720993+09:00") + " 전"}</p>
        <div className="mt-16 flex gap-4">
          <LabelTag>트렌드</LabelTag>
          <LabelTag>인사이트</LabelTag>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
