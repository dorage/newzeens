"use client"

import React from "react"
import LabelTag from "@/app/_components/atoms/label-tag"
import { useIdContext } from "@/app/_context/id-context"
import { useGetPublisherQuery } from "@/app/_hooks/use-client-get-queries"
import { keywordByGroup, keywordByGroupExclude } from "@/app/_utils/keyword"

interface DescriptionLayerProps {}

const DescriptionLayer = (props: DescriptionLayerProps) => {
  const {} = props
  const { id } = useIdContext()
  const { data } = useGetPublisherQuery({ publisherId: id })

  return (
    <div className="bg-white px-20 py-28 xl:px-40 xl:py-48">
      <p className="text-gray-80 xl:text-body4 text-mBody1">{data?.publisher?.description}</p>

      <div className="h-28" />

      <div className="text-gray-60 flex gap-12">
        <div className="flex flex-col gap-12">
          {keywordByGroupExclude(data?.publisher?.keywords)?.map((v) => {
            return <p key={v.keyword_group_id}>{v.keyword_group_name}</p>
          })}
        </div>

        <div className="flex flex-col gap-12">
          {keywordByGroupExclude(data?.publisher?.keywords)?.map((v) => {
            return <p key={v.keyword_id}>{v.keyword_name || "ㅤ"}</p>
          })}
        </div>
      </div>

      {/* mobile only */}
      <div className="flex items-center gap-4 pb-12 pt-20 xl:hidden">
        {keywordByGroup(data?.publisher?.keywords)?.map((v) => {
          return (
            <LabelTag isSelected key={v.keyword_id}>
              {v.keyword_name}
            </LabelTag>
          )
        })}
      </div>
    </div>
  )
}

export default DescriptionLayer
