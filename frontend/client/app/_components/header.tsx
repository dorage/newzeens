import React from "react"
import InteractionIcons from "./header/interaction-icons"
import { useMediaQuery } from "../_hooks/use-media-query"

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const {} = props

  return (
    <>
      {/* mobile */}
      <header className="tablet:flex hidden h-52 items-center justify-between px-20">
        {/* <h3 className="text-h3 text-gray-80 align-middle font-extrabold">maillist</h3> */}
        <div />
        <InteractionIcons />
      </header>

      {/* pc */}
      <header className="tablet:hidden border-gray-40 flex h-60 items-center justify-between border-b bg-white px-40">
        <div className="flex items-center gap-20">
          <h3 className="text-h3 text-gray-80 align-middle font-extrabold">maillist</h3>
          <div className="bg-gray-55 rounded-full px-10 py-16">뉴스레터 검색</div>
        </div>

        <div className="flex items-center gap-64">
          <p className="text-body2">홈</p>
          <p className="text-body2 text-gray-50">랭킹</p>
        </div>

        <button className="rounded-6 border-gray-40 border bg-white px-12 py-8">
          <span className="text-gray-80 text-body7">피드백 보내기</span>
        </button>
      </header>
    </>
  )
}

export default Header

/*

"use client"

import React from "react"
import { useMediaQuery } from "../_hooks/use-media-query"

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const {} = props

  const isDesktop = useMediaQuery("(min-width: 1280px)")

  return (
    <>
      {!isDesktop && <header className="h-52">asdf</header>}

      {isDesktop && (
        <header className="border-gray-40 flex h-60 items-center justify-between border-b bg-white px-40">
          <div className="flex items-center gap-20">
            <h3 className="text-h3 text-gray-80 align-middle font-extrabold">maillist</h3>
            <div className="bg-gray-55 rounded-full px-10 py-16">뉴스레터 검색</div>
          </div>

          <div className="flex items-center gap-64">
            <p className="text-body2">홈</p>
            <p className="text-body2 text-gray-50">랭킹</p>
          </div>

          <button className="rounded-6 border-gray-40 border bg-white px-12 py-8">
            <span className="text-gray-80 text-body7">피드백 보내기</span>
          </button>
        </header>
      )}
    </>
  )
}

export default Header

*/
