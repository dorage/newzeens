import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import LabelTag from "@/app/_components/atoms/label-tag"
import classNames from "@/app/_utils/class-names"

interface SuggestNewsLettersProps {}

const SuggestNewsLetters = (props: SuggestNewsLettersProps) => {
  const {} = props

  return (
    <div className="tablet:px-20 flex flex-col gap-16 p-40">
      <h4 className="text-gray-80 text-h2">추천 뉴스레터</h4>

      <Link href="/news-letter/2ctyc9/test" scroll={false}>
        모달켜기
      </Link>

      <div className="tablet:grid-cols-2 mobile:grid-cols-1 grid grid-cols-4 gap-16">
        {[...new Array(10)].map((_, index) => (
          <div key={index} className="group relative">
            <div
              className={classNames(
                "group-hover:bg-bg-2 bg-transparent transition-colors duration-300 ease-in-out rounded-22 absolute -inset-12 z-[-1]",
              )}
            />
            <div className="flex flex-col gap-16">
              <Image
                src={"https://via.placeholder.com/200"}
                width={600}
                height={400}
                alt="테스트이미지"
                className="rounded-16 aspect-video shrink-0"
              />

              <div className="flex flex-col gap-4">
                <p className="text-body3 text-gray-80">뉴스레터명</p>
                <p className="text-body5 text-gray-70">뉴스레터명</p>

                <div className="mt-8 flex gap-4">
                  <LabelTag>트렌드</LabelTag>
                  <LabelTag>인사이트</LabelTag>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuggestNewsLetters
