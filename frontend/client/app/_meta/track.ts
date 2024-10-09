"use client"

import { GACaptureUTM, sendGA } from "../_ga"
import { initMX, MXCaptureUTM, sendMX } from "../_mixpanel"

export const sendEvent = (event: string, params: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log("send Event!", event, params)
  }

  if (process.env.NODE_ENV !== "production") return

  sendGA(event, params)
  sendMX(event, params)
}

export const initTracking = () => {
  if (globalThis?.window === undefined) return

  initMX()
  GACaptureUTM()
  MXCaptureUTM()
}
