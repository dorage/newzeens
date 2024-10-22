"use client"
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google"

declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object | string) => void
  }
}

export const GACaptureUTM = () => {
  const queryString = window.location.search
  const params = new URLSearchParams(queryString)

  if (params.has("utm_trk")) {
    window.gtag("set", "utm_trk", params.get("utm_trk") as string)
  }

  if (params.has("utm_campaign")) {
    window.gtag("set", "utm_id", params.get("utm_campaign") as string)
  }

  if (params.has("utm_source")) {
    window.gtag("set", "campaign_source", params.get("utm_source") as string)
  }

  if (params.has("utm_medium")) {
    window.gtag("set", "campaign_medium", params.get("utm_medium") as string)
  }

  if (params.has("utm_content")) {
    window.gtag("set", "campaign_content", params.get("utm_content") as string)
  }

  if (params.has("utm_term")) {
    window.gtag("set", "campaign_term", params.get("utm_term") as string)
  }
}

export const sendGA = (event: string, params: any) => {
  sendGTMEvent({ event, value: params })
  sendGAEvent({ event, value: params })
  window.gtag("event", event, params)
}
