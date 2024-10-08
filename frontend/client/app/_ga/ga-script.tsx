import React from "react"
import { GoogleAnalytics } from "@next/third-parties/google"

/** ------------------------------------------------------------------------------
 * 
 * Google Analytics Init 스크립트입니다.
 * 
 ------------------------------------------------------------------------------ */
const GaScript = () => {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

  return (
    <>
      {/* <GoogleTagManager gtmId={GTM_ID} /> */}
      <GoogleAnalytics gaId={GA_ID} />
    </>
  )
}

export default GaScript
