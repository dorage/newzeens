"use client"

import React, { useState } from "react"
import classNames from "@/app/_utils/class-names"
import { SearchIcon } from "@/public/icons"

interface InteractionIconsProps {}

const InteractionIcons = (props: InteractionIconsProps) => {
  const {} = props

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  return (
    <div className="flex items-center">
      <div className="cursor-pointer p-10">
        <SearchIcon className="size-20" />
      </div>

      <div className="cursor-pointer p-10" onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <div className="[&>span]:rounded-2 relative size-20 [&>span]:absolute [&>span]:h-2 [&>span]:w-20 [&>span]:bg-gray-50 [&>span]:transition-all [&>span]:duration-300 [&>span]:ease-in-out">
          <span className={classNames("top-4", { "rotate-45 top-10": isOpenMenu })} />
          <span className={classNames("top-10", { "w-0 opacity-0": isOpenMenu })} />
          <span className={classNames("top-16", { "-rotate-45 top-10": isOpenMenu })} />
        </div>
      </div>
    </div>
  )
}

export default InteractionIcons
