import React from "react"
import Image from "next/image"

interface NewsLetterTitleProps {}

const NewsLetterTitle = (props: NewsLetterTitleProps) => {
  const {} = props
  return (
    <div className="px-40 py-8">
      <div className="flex items-center justify-between">
        <div className="gap-17 flex">
          <Image
            src="https://via.placeholder.com/300"
            width={68}
            height={68}
            className="rounded-14 shrink-0"
            alt="테스트이미지"
          />

          <div className="">
            <h2 className="text-h1">뉴스레터명</h2>
          </div>
        </div>

        <button className="bg-primary w-102 flex h-44 items-center justify-center gap-4 rounded-full text-white">
          <div className="w-2" />
          {/* TODO: 아이콘 */}
          <span className="text-body4">구독</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 3.33268L10.6667 7.99935L6 12.666"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NewsLetterTitle
