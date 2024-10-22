"use client"

import React from "react"
import Link from "next/link"
import { useIdContext } from "@/app/_context/id-context"
import { useGetPublisherQuery } from "@/app/_hooks/use-client-get-queries"
import { sendEvent } from "@/app/_meta/track"

interface TabletFixedButtonProps {}

/**
 * 뷰포트 1278px 까지일때 보이는 fixed button
 */
const TabletFixedButton = (props: TabletFixedButtonProps) => {
  const {} = props

  const { id } = useIdContext()
  const { data } = useGetPublisherQuery({ publisherId: id })

  return (
    <>
      <div className="fixed bottom-0 flex w-full bg-white p-20 xl:hidden">
        <Link
          href={data?.publisher?.url_subscribe || ""}
          target="_blank"
          className="flex w-full"
          onClick={() => {
            sendEvent("mobile_subscribe", {
              ...data?.publisher,
            })
          }}
        >
          <button className="bg-primary text-body1 flex-1 items-center justify-center rounded-full py-20 leading-none text-white">
            구독
          </button>
        </Link>
      </div>
      <div className="h-98 xl:hidden" />
    </>
  )
}

export default TabletFixedButton
