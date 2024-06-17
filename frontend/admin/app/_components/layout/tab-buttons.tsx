"use client"

import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"

const TABS = [
  {
    label: "키워드",
    value: "/keywords",
    include: "keyword",
  },
  {
    label: "뉴스레터",
    value: "/news-letters",
    include: "news-letter",
  },
  {
    label: "캠페인",
    value: "/campaign",
    include: "campaign",
  },
]

const TabButtons = () => {
  const pathname = usePathname()

  return (
    <div className="flex gap-4">
      {TABS.map((tab) => (
        <Link key={tab.value} href={tab.value}>
          <Button variant={pathname.includes(tab.include) ? "default" : "secondary"} type="submit" className="">
            {tab.label}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default TabButtons
