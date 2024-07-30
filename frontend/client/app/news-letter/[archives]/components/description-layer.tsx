"use client"

import React from "react"
import LabelTag from "@/app/_components/atoms/label-tag"
import { useIdContext } from "@/app/_context/id-context"
import { useGetPublisherQuery } from "@/app/_hooks/use-client-get-queries"

interface DescriptionLayerProps {}

const DescriptionLayer = (props: DescriptionLayerProps) => {
  const {} = props
  const { id } = useIdContext()
  const { data } = useGetPublisherQuery({ publisherId: id })

  return (
    <div className="bg-white px-20 py-28 xl:px-40 xl:py-48">
      <p className="text-gray-80 xl:text-body4 text-mBody1">
        {data?.publisher?.description ||
          "최신 개발(Dev) 뉴스, IT 이슈 등 개발자의 일과 성장에 도움되는 정보를 전해주는 뉴스레터"}
      </p>

      <div className="h-28" />

      <div className="text-gray-60 flex gap-12">
        <div className="flex flex-col gap-12">
          {data?.publisher?.keywords?.map((v) => {
            return <p key={v.keyword_group_id}>{v.keyword_group_name}</p>
          })}
          {/* <p className="text-body7">발행인</p>
          <p className="text-body7">발송주기</p>
          <p className="text-body7">구독비</p> */}
        </div>

        <div className="flex flex-col gap-12">
          {data?.publisher?.keywords?.map((v) => {
            return <p key={v.keyword_id}>{v.keyword_name}</p>
          })}
          {/* <p className="text-body6">asdfasdfasdfasf</p>
          <p className="text-body6">주 1회</p>
          <p className="text-body6">무료</p> */}
        </div>
      </div>

      {/* mobile only */}
      <div className="flex items-center gap-4 pb-12 pt-20 xl:hidden">
        {data?.publisher?.keywords?.map((v) => {
          return (
            <LabelTag isSelected key={v.keyword_id}>
              {v.keyword_name}
            </LabelTag>
          )
        })}
        {/* <LabelTag isSelected>기획자 · 마케터</LabelTag>
        <LabelTag>트렌드</LabelTag>
        <LabelTag>인사이트</LabelTag> */}
      </div>
    </div>
  )
}

export default DescriptionLayer
