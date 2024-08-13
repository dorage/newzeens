"use client"

import dayjs from "dayjs"
import "dayjs/locale/ko" // 한국어 로케일
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
dayjs.locale("ko") // 한국어 설정

export const dateBeforeNowKo = (date: string): string => {
  if (!date) return ""

  return dayjs(date).fromNow()
}
