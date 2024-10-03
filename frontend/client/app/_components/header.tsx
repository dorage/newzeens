"use client"

import React, { ChangeEvent, useState } from "react"
import Link from "next/link"
import InteractionIcons from "./header/interaction-icons"
import { SearchIcon } from "@/public/icons"
import { useRouter } from "next/navigation"

const Header = () => {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <>
      {/* mobile */}
      <header className="flex h-52 items-center justify-between bg-white px-20 xl:hidden">
        <Link href="/">
          <h3 className="align-middle text-h3 font-extrabold text-gray-80">maillist</h3>
        </Link>

        <div />
        <InteractionIcons />
      </header>

      {/* pc */}
      <header className="hidden h-60 items-center justify-between border-b border-gray-40 bg-white px-40 xl:flex">
        <div className="flex items-center gap-20">
          <Link href="/">
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
                onKeyDown={(e) => e.key === "Enter" && router.push(`/search?word=${search}`)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-64">
          <Link href="/" className="text-body2">
            홈
          </Link>
          <Link href="/ranking" className="text-body2 text-gray-50">
            랭킹
          </Link>
        </div>

        <button className="rounded-6 border border-gray-40 bg-white px-12 py-8">
          <span className="text-body7 text-gray-80">피드백 보내기</span>
        </button>
      </header>
    </>
  )
}

export default Header
