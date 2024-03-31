import React from "react"

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const {} = props
  return (
    <header className="h-60 border-b border-gray-40 bg-white flex justify-between items-center px-40">
      <div className="flex gap-20 items-center">
        <h3 className="text-h3 text-gray-80 font-extrabold align-middle">maillist</h3>

        <div className="bg-gray-55 rounded-full px-10 py-16">뉴스레터 검색</div>
      </div>

      <div className="flex gap-64 items-center">
        <p className="text-body2">홈</p>
        <p className="text-body2 text-gray-50">랭킹</p>
      </div>

      <button className="bg-white rounded-6 border border-gray-40 py-8 px-12">
        <span className="text-gray-80 text-body7">
        피드백 보내기
        </span>
      </button>
    </header>
  )
}

export default Header
