"use client"

import React, { ChangeEvent, useState } from "react"
import HamburgerPopup from "../relative-modal/hamburger-popup"
import { useRelativeModal } from "@/app/_hooks/use-relative-modal"
import classNames from "@/app/_utils/class-names"
import { CloseIcon, SearchIcon } from "@/public/icons"
import { useRouter } from "next/navigation"

interface InteractionIconsProps {}

const InteractionIcons = (props: InteractionIconsProps) => {
  const {} = props

  const { isOpen, open, close } = useRelativeModal()

  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState("")
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <div className="flex items-center">
      <div className="cursor-pointer p-10" onClick={() => setSearchOpen(!searchOpen)}>
        {searchOpen ? <></> : <SearchIcon className="size-20" />}
      </div>
      {searchOpen && (
        <div className="bg-bg rounded-full px-16 py-10">
          <div className="flex gap-6 items-center">
            <CloseIcon className="cursor-pointer size-20" onClick={() => setSearchOpen(false)} />
            <input
              className="text-element1 bg-bg text-gray-80 placeholder:text-gray-55"
              placeholder="뉴스레터 검색"
              value={search}
              onChange={onChange}
              onKeyDown={(e) => e.key === "Enter" && router.push(`/search?word=${search}`)}
            />
          </div>
        </div>
      )}

      <div
        className="cursor-pointer p-10"
        onClick={(e) => {
          if (isOpen) {
            close()
          } else {
            open(e)({
              key: "testModal",
              Component: HamburgerPopup,
              props: {},
            })
          }
        }}
      >
        <div className="[&>span]:rounded-2 relative size-20 [&>span]:absolute [&>span]:h-2 [&>span]:w-20 [&>span]:bg-gray-50 [&>span]:transition-all [&>span]:duration-300 [&>span]:ease-in-out">
          <span className={classNames("top-4", { "rotate-45 top-10": isOpen })} />
          <span className={classNames("top-10", { "w-0 opacity-0": isOpen })} />
          <span className={classNames("top-16", { "-rotate-45 top-10": isOpen })} />
        </div>
      </div>
    </div>
  )
}

export default InteractionIcons
