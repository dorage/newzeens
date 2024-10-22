"use client"

import React, { ChangeEvent, useState } from "react"
import Link from "next/link"
import InteractionIcons from "./header/interaction-icons"
import { SearchIcon } from "@/public/icons"
import { usePathname, useRouter } from "next/navigation"
import classNames from "../_utils/class-names"
import { sendEvent } from "../_meta/track"

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
      <header className="hidden h-60 items-center justify-between border-b border-gray-40 bg-white px-40 xl:flex">
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

        <div className="flex items-center gap-64">
          <Link
            href="/"
            onClick={() => {
              sendEvent("pc_header_home", {})
            }}
            className={classNames("text-body2", { "text-gray-50": !isHome })}
          >
            홈
          </Link>
          <Link
            href="/ranking"
            onClick={() => {
              sendEvent("pc_header_ranking", {})
            }}
            className={classNames("text-body2", { "text-gray-50": !isRank })}
          >
            랭킹
          </Link>
        </div>

        <button
          className="rounded-6 border border-gray-40 bg-white px-12 py-8"
          onClick={() => {
            sendEvent("pc_send_feedback", {})
          }}
        >
          <span className="text-body7 text-gray-80">피드백 보내기</span>
        </button>
      </header>
    </>
  )
}

export default Header
