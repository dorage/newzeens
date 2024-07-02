"use client"

import React, { useState } from "react"
import HamburgerPopup from "../relative-modal/hamburger-popup"
import { useRelativeModal } from "@/app/_hooks/use-relative-modal"
import classNames from "@/app/_utils/class-names"
import { SearchIcon } from "@/public/icons"

interface InteractionIconsProps {}

const InteractionIcons = (props: InteractionIconsProps) => {
  const {} = props

  const { isOpen, open, close } = useRelativeModal()

  return (
    <div className="flex items-center">
      <div className="cursor-pointer p-10">
        <SearchIcon className="size-20" onClick={() => window.alert("준비중입니다!")} />
      </div>

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
