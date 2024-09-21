import React from "react"
import Link from "next/link"
import InteractionIcons from "./header/interaction-icons"

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const {} = props

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
          {/* <div className="bg-gray-55 rounded-full px-10 py-16">뉴스레터 검색</div> */}
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
