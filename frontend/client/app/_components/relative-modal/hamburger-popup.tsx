import React from "react"
import Link from "next/link"
import { useRelativeModal } from "@/app/_hooks/use-relative-modal"
import { sendEvent } from "@/app/_meta/track"

const HamburgerPopup = () => {
  const { forceClose } = useRelativeModal()

  return (
    <div className="text-mBody3 flex w-[190px] flex-col bg-white">
      <Link
        href="/"
        className="hover:bg-bg-2 px-20 py-[14px]"
        onClick={() => {
          forceClose()
          sendEvent("mobile_more_home", {})
        }}
      >
        <p>홈</p>
      </Link>
      <Link
        href="/ranking"
        className="hover:bg-bg-2 px-20 py-[14px]"
        onClick={() => {
          forceClose()
          sendEvent("mobile_more_ranking", {})
        }}
      >
        <p className="">랭킹</p>
      </Link>
      <Link
        href="/"
        className="hover:bg-bg-2 px-20 py-[14px]"
        onClick={() => {
          forceClose()
          sendEvent("mobile_send_feedback", {})
        }}
      >
        <p className="">피드백 보내기</p>
      </Link>
    </div>
  )
}

export default HamburgerPopup
