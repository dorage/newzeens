"use client"

import mixpanel from "mixpanel-browser"
import { getMXToken, isProduction } from "../_utils/env"

export const utmKeys = [
  "utm_trk",
  "utm_id",
  "utm_campaign",
  "utm_source",
  "utm_medium",
  "utm_content",
  "utm_term",
] as const

export const MXCaptureUTM = async () => {
  const queryString = window.location.search
  const params = new URLSearchParams(queryString)

  let superProperties: Partial<any> = {}
  utmKeys.forEach((key) => {
    if (params.has(key)) {
      superProperties[key] = params.get(key) as string
    }
  })

  mixpanel.register(superProperties)
}

export const trackSend = (event: string, params: any) => {
  mixpanel.track(event, params)
}

export const initMX = () => {
  if (isProduction()) {
    const token = getMXToken()
    mixpanel.init(token, {
      track_pageview: true,
    })

    MXCaptureUTM()
  }
}
