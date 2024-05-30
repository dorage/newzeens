"use client"

import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"

const TABS = [
  {
    label: "키워드",
    value: "/keywords",
  },
  {
    label: "뉴스레터",
    value: "/news-letters",
  },
  {
    label: "캠페인",
    value: "/campaign",
  },
]

const TabButtons = () => {
  const pathname = usePathname()

  return (
    <div className="flex gap-4">
      {TABS.map((tab) => (
        <Link key={tab.value} href={tab.value}>
          <Button variant={pathname === tab.value ? "default" : "secondary"} type="submit" className="">
            {tab.label}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default TabButtons
