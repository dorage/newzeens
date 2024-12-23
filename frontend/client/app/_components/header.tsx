"use client"

import React, { ChangeEvent, useState } from "react"
import Link from "next/link"
import InteractionIcons from "./header/interaction-icons"
import { FlightIcon, SearchIcon } from "@/public/icons"
import { usePathname, useRouter } from "next/navigation"
import classNames from "../_utils/class-names"
import { sendEvent } from "../_meta/track"

export const feedbackLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSdOBCdWIxWZkwICD-86I4YJLiJ_Q06gdPX1m_SZq-FQHIhpxg/viewform"
export const registerLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSddekwW_i29D8FuBxWfxpEQiYoAtSUIYZmh-EModqcWTAY5fA/viewform"

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState("")
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  const isHome = pathname === "/"
  const isRank = pathname === "/ranking"

  return (
    <>
      {/* mobile */}
      <header className="flex h-52 items-center justify-between bg-white px-20 xl:hidden">
        <Link
          href="/"
          onClick={() => {
            sendEvent("mobile_header_click", {})
          }}
        >
          <h3 className="align-middle text-h3 font-extrabold text-gray-80">maillist</h3>
        </Link>

        <div />
        <InteractionIcons />
      </header>

      {/* pc */}
      <header className="hidden relative h-60 items-center justify-between border-b border-gray-40 bg-white px-40 xl:flex">
        <div className="flex items-center gap-20">
          <Link
            href="/"
            onClick={() => {
              sendEvent("pc_header_click", {})
            }}
          >
            <h3 className="align-middle text-h3 font-extrabold text-gray-80">maillist</h3>
          </Link>

          {/* search bar */}
          <div className="bg-bg rounded-full px-16 py-10">
            <div className="flex gap-6 items-center">
              <SearchIcon className="size-[14px]" />
              <input
                className="text-element1 bg-bg text-gray-80 placeholder:text-gray-55"
                placeholder="뉴스레터 검색"
                value={search}
                onChange={onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(`/search?word=${search}`)

                    sendEvent("pc_search", {
                      searchWord: search,
                    })
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-64">
          <Link
            href="/"
            onClick={() => {
              sendEvent("pc_header_home", {})
            }}
            className={classNames("text-body2 font-semibold text-gray-80", { "text-gray-50": !isHome })}
          >
            홈
          </Link>
          <Link
            href="/ranking"
            onClick={() => {
              sendEvent("pc_header_ranking", {})
            }}
            className={classNames("text-body2 font-semibold", { "text-gray-50": !isRank })}
          >
            랭킹
          </Link>
        </div>

        <div className="flex items-center gap-12">
          <button
            className="rounded-6 border-[0.7px] border-gray-80 bg-white px-12 py-8 flex items-center justify-center gap-8"
            onClick={() => {
              sendEvent("pc_send_feedback", {})
              window.open(feedbackLink, "_blank")
            }}
          >
            {/* <FlightIcon className="size-[14px] text-gray-80" /> */}
            <span className="text-body7 font-medium text-[1.5rem] leading-[24px] text-gray-80">피드백 보내기</span>
          </button>

          <button
            className="rounded-6 bg-primary px-12 py-8 flex items-center justify-center gap-8"
            onClick={() => {
              sendEvent("pc_register_newsletter", {})
              window.open(registerLink, "_blank")
            }}
          >
            {/* <FlightIcon className="size-[14px] text-gray-80" /> */}
            <span className="text-body7 text-white font-medium text-[1.5rem] leading-[24px] text-gray-80">
              뉴스레터 등록하기
            </span>
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
