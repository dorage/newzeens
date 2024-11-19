"use client"

import Link from "next/link"
import React from "react"
import { Tooltip } from "react-tooltip"

const Footer = () => {
  return (
    <footer className="border border-gray-40 bg-bg select-text">
      <div className="max-w-[128rem] mx-auto px-40 flex flex-col xl:flex-row gap-12 xl:gap-40 py-[4.4rem]">
        <Link
          href="https://dent-kitten-aab.notion.site/12e30a2dbf6f80f89823d9ebae8cc32d"
          target="_blank"
          className="text-gray-65 xl:basis-[269px] leading-[1] text-[22px] font-extrabold tracking-[0.22px] hover:text-blue-600 hover:underline"
        >
          <span className="w-fit" data-tooltip-id={`maillist-notion`} data-tooltip-content="메일리스트 노션페이지">
            maillist
          </span>
        </Link>
        <Tooltip id={`maillist-notion`} />

        <div className="flex gap-4 xl:gap-[6.2rem] xl:flex-row flex-col">
          <p className="text-body3 text-gray-65">
            메일리스트
            <span className="ml-8 font-normal leading-[1]">직무 트렌드 뉴스레터 아카이빙 서비스</span>
          </p>

          <p className="text-body3 text-gray-65">
            문의
            <Link href="mailto:keepsideproject@gmail.com" className="ml-8 font-normal leading-[1]">
              keepsideproject@gmail.com
            </Link>
          </p>

          <p className="text-body6 text-gray-65">
            <span className="font-normal leading-[22.4px]">Copyright© 2024 Code & Canvas.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
