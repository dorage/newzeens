"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import LabelTag from "@/app/_components/atoms/label-tag"
import { useIdContext } from "@/app/_context/id-context"
import { useGetPublisherQuery } from "@/app/_hooks/use-client-get-queries"
import { getField, isField, keywordByGroup } from "@/app/_utils/keyword"
import { ArrowRightIcon } from "@/public/icons"

interface NewsLetterTitleProps {}

const NewsLetterTitle = (props: NewsLetterTitleProps) => {
  const {} = props

  const { id } = useIdContext()
  const { data } = useGetPublisherQuery({ publisherId: id })

  return (
    <div className="border-gray-40 border-b bg-white px-20 pb-16 pt-28 xl:px-40">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-16 xl:flex-row">
          <Image
            src={data?.publisher?.thumbnail || "https://via.placeholder.com/300"}
            width={68}
            height={68}
            className="rounded-14 shrink-0"
            alt="테스트이미지"
          />

          <div className="flex flex-col gap-8">
            <div className="flex gap-8 xl:gap-10">
              <h2 className="text-h1 line-clamp-2 break-words xl:line-clamp-1">{data?.publisher?.name}</h2>

              {/* ~ pc only */}
              <div className="hidden items-center gap-4 xl:flex">
                {keywordByGroup(data?.publisher?.keywords)?.map((v, i) => {
                  const active = isField(v)
                  return (
                    <LabelTag key={v.keyword_id} isSelected={active}>
                      {v.keyword_name}
                    </LabelTag>
                  )
                })}
              </div>
            </div>

            <div className="text-body6 text-gray-60">
              {getField(data?.publisher?.keywords).keyword_name}
              {/* · 구독자 {"12.6천"}명 */}
            </div>
          </div>
        </div>

        <Link href={data?.publisher?.url_subscribe || ""} target="_blank">
          <button className="bg-primary w-102 hidden h-44 items-center justify-center gap-4 rounded-full text-white xl:flex">
            <div className="w-2" />
            <span className="text-body4">구독</span>
            <ArrowRightIcon />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NewsLetterTitle
