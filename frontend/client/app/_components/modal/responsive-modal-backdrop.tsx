import React, { PropsWithChildren, useEffect } from "react"
import GPTMark from "../atoms/gpt-mark"
import { useScrollOverflowHiddenCalcPadding } from "@/app/_hooks/use-scroll-overflow-hidden-calc-padding"
import classNames from "@/app/_utils/class-names"
import { CloseIcon } from "@/public/icons"

interface ResponsiveModalBackdropProps extends PropsWithChildren {
  isOpen?: boolean
  delayOpen?: boolean
  onClose?: () => void
}

/**
 * 반응형 모달 프레임
 */
const ResponsiveModalBackdrop = (props: ResponsiveModalBackdropProps) => {
  const { children, isOpen = false, delayOpen = false, onClose } = props

  useScrollOverflowHiddenCalcPadding()

  return (
    <div
      className={classNames(
        "fixed bottom-0 left-0 flex size-full items-center justify-center bg-black/0 transition-colors duration-300 ease-in-out overflow-hidden",
        delayOpen && "bg-black/20",
      )}
      onClick={onClose}
    >
      <div
        className={classNames("translate-y-full max-w-[95.6rem] w-full transition-transform duration-300 ease-in-out", {
          "translate-y-0": delayOpen,
          "translate-y-full": !isOpen,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-t-14 xl:rounded-14 h-[calc(100vh-7.2rem)] flex-col items-center overflow-hidden bg-white xl:mx-auto xl:h-screen xl:max-w-[96.4rem]">
          <div className="bg-primary-2 text-mBody2 flex items-center justify-between text-gray-50">
            <div className="w-40" />
            <div className="flex items-center gap-4">
              아티클 요약
              <GPTMark />
            </div>
            <div className="cursor-pointer p-10" onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ResponsiveModalBackdrop
