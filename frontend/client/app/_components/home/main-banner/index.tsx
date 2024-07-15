"use client"

import React, { useEffect } from "react"

interface MainBannerProps {}

const MainBanner = (props: MainBannerProps) => {
  const {} = props

  useEffect(() => {
    const now = new Date()
    console.log(`/asdf?date=${now}`)
    fetch(`/asdf?date=${now}`)
  }, [])

  return <div className="h-237 bg-bg-2 flex w-full items-center justify-center">배너영역</div>
}

export default MainBanner
