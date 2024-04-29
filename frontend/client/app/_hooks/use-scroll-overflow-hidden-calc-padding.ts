"use client"

import { useEffect } from "react"

export const useScrollOverflowHiddenCalcPadding = () => {
  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.paddingRight = `${scrollBarWidth}px`
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.paddingRight = "0px"
      document.body.style.overflow = ""
    }
  }, [])
}
