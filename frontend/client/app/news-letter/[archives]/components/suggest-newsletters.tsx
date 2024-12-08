"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import LabelTag from "@/app/_components/atoms/label-tag"
import { useIdContext } from "@/app/_context/id-context"
import { useGetPublisherQuery } from "@/app/_hooks/use-client-get-queries"
import classNames from "@/app/_utils/class-names"
import { isField, keywordByGroup } from "@/app/_utils/keyword"
import { sendEvent } from "@/app/_meta/track"

const SuggestNewsLetters = () => {
  const { id } = useIdContext()
  const { data } = useGetPublisherQuery({ publisherId: id })

  if (!data?.related_publishers || data?.related_publishers?.length === 0) return <></>

  return (
    <div className="flex flex-col gap-16 px-20 py-40 xl:px-40 pb-5 xl:pb-40 bg-white">
      <h4 className="text-gray-80 text-h2">비슷한 뉴스레터</h4>

      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 xl:grid-cols-4">
        {data?.related_publishers?.map((v) => {
          return (
            <Link
              key={v.id}
              href={`/news-letter/${v.id}`}
              onClick={() => {
                sendEvent(`suggest_newsletter`, {
                  ...v,
                })
              }}
            >
              <div className="group relative z-10">
                <div
                  className={classNames(
                    "group-hover:bg-bg-2 bg-transparent transition-colors duration-300 ease-in-out rounded-[22px] absolute -inset-12 z-[-1]",
                  )}
                />
                <div className="flex flex-col gap-16">
                  <Image
                    src={v?.thumbnail || "https://via.placeholder.com/200"}
                    width={600}
                    height={400}
                    alt="테스트이미지"
                    className="rounded-16 aspect-video shrink-0 bg-white border border-gray-40"
                    quality={90}
                  />

                  <div className="flex flex-col gap-4">
                    <p className="text-body3 text-gray-80">{v?.name}</p>
                    <p className="text-body5 text-gray-70">{v?.description}</p>

                    <div className="mt-8 flex gap-4">
                      {keywordByGroup(v?.keywords)?.map((keyword) => {
                        const isActive = isField(keyword)
                        return (
                          <LabelTag key={keyword.keyword_id} isSelected={isActive}>
                            {keyword.keyword_name}
                          </LabelTag>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SuggestNewsLetters
