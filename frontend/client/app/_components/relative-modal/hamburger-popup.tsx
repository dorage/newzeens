import React from "react"
import { useRelativeModal } from "@/app/_hooks/use-relative-modal"

interface HamburgerPopupProps {}

const HamburgerPopup = (props: HamburgerPopupProps) => {
  const {} = props

  const { close } = useRelativeModal()

  return (
    <div className="flex w-[190px] flex-col gap-28 bg-white p-20">
      <p className="">홈</p>
      <p className="">홈2</p>
      <p className="">홈3</p>
    </div>
  )
}

export default HamburgerPopup
