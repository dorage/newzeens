import React from "react"
import LabelTag from "@/app/_components/atoms/label-tag"

interface DescriptionLayerProps {}

const DescriptionLayer = (props: DescriptionLayerProps) => {
  const {} = props
  return (
    <div className="tablet:px-20 tablet:py-28 bg-white px-40 py-48">
      <p className="text-gray-80 text-body4 tablet:text-mBody1">
        최신 개발(Dev) 뉴스, IT 이슈 등 개발자의 일과 성장에 도움되는 정보를 전해주는 뉴스레터
      </p>

      <div className="h-28" />

      <div className="text-gray-60 flex gap-12">
        <div className="flex flex-col gap-12">
          <p className="text-body7">발행인</p>
          <p className="text-body7">발송주기</p>
          <p className="text-body7">구독비</p>
        </div>

        <div className="flex flex-col gap-12">
          <p className="text-body6">asdfasdfasdfasf</p>
          <p className="text-body6">주 1회</p>
          <p className="text-body6">무료</p>
        </div>
      </div>

      {/* mobile only */}
      <div className="tablet:flex hidden items-center gap-4 pb-12 pt-20">
        <LabelTag isSelected>기획자 · 마케터</LabelTag>
        <LabelTag>트렌드</LabelTag>
        <LabelTag>인사이트</LabelTag>
      </div>
    </div>
  )
}

export default DescriptionLayer
