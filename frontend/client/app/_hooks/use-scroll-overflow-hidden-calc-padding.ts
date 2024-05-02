"use client"

import { useEffect } from "react"

/**
 * 모달이 켜졌을때 페이지에 스크롤이 있다면 body의 paddingRight 값을 스크롤의 너비만큼 적용시킵니다.
 */
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
