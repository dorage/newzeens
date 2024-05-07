import React from "react"
import Image from "next/image"
import LabelTag from "@/app/_components/atoms/label-tag"
import { ArrowRightIcon } from "@/public/icons"

interface NewsLetterTitleProps {}

const NewsLetterTitle = (props: NewsLetterTitleProps) => {
  const {} = props
  return (
    <div className="border-gray-40 border-b bg-white px-20 pb-16 pt-28 xl:px-40">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-16 xl:flex-row">
          <Image
            src="https://via.placeholder.com/300"
            width={68}
            height={68}
            className="rounded-14 shrink-0"
            alt="테스트이미지"
          />

          <div className="flex flex-col gap-8">
            <div className="flex gap-8 xl:gap-10">
              <h2 className="text-h1 line-clamp-2 break-words xl:line-clamp-1">뉴스레터명</h2>

              {/* ~ pc only */}
              <div className="hidden items-center gap-4 xl:flex">
                <LabelTag isSelected>기획자 · 마케터</LabelTag>
                <LabelTag>트렌드</LabelTag>
                <LabelTag>인사이트</LabelTag>
              </div>
            </div>

            <div className="text-body6 text-gray-60">분야 카테고리 · 구독자 {"12.6천"}명</div>
          </div>
        </div>

        <button className="bg-primary w-102 hidden h-44 items-center justify-center gap-4 rounded-full text-white xl:flex">
          <div className="w-2" />
          <span className="text-body4">구독</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  )
}

export default NewsLetterTitle
