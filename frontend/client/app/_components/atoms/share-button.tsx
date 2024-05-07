import React from "react"
import { ShareIcon } from "@/public/icons"

interface ShareButtonProps {
  label?: string
  outLink?: string
}

const ShareButton = (props: ShareButtonProps) => {
  const { label, outLink } = props

  if (outLink) {
    return (
      <a className="text-gray-70 text-mElement1 border-gray-40 flex shrink-0 items-center justify-center gap-2 rounded-full border px-12 py-8">
        <ShareIcon />
        {label ?? "원본"}
      </a>
    )
  }

  return (
    <button className="text-gray-70 text-mElement1 border-gray-40 flex shrink-0 items-center justify-center gap-2 rounded-full border px-12 py-8">
      <ShareIcon />
      {label ?? "원본"}
    </button>
  )
}

export default ShareButton
