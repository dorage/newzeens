import React from "react"
import Image from "next/image"
import LabelTag from "@/app/_components/atoms/label-tag"

interface SuggestNewsLettersProps {}

const SuggestNewsLetters = (props: SuggestNewsLettersProps) => {
  const {} = props
  return (
    <div className="flex flex-col gap-16 px-20 py-40">
      <h4 className="text-gray-80 text-h2">추천 뉴스레터</h4>

      <div className="tablet:grid-cols-2 mobile:grid-cols-1 grid grid-cols-4 gap-16">
        {[...new Array(10)].map((_, index) => (
          <div key={index} className="flex flex-col gap-16">
            <Image
              src={"https://via.placeholder.com/200"}
              width={600}
              height={400}
              alt="테스트이미지"
              className="aspect-video shrink-0"
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
        ))}
      </div>
    </div>
  )
}

export default SuggestNewsLetters
