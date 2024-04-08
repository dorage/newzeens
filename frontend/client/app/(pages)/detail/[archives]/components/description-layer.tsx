import React from "react"

interface DescriptionLayerProps {}

const DescriptionLayer = (props: DescriptionLayerProps) => {
  const {} = props
  return (
    <div className="bg-white px-40 py-48">
      <p className="text-gray-80 text-body4">최신 개발뉴스어쩌구 뉴스레터</p>

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
    </div>
  )
}

export default DescriptionLayer
