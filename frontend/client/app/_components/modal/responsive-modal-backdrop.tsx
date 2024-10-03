import React, { PropsWithChildren, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import GPTMark from "../atoms/gpt-mark"
import { useScrollOverflowHiddenCalcPadding } from "@/app/_hooks/use-scroll-overflow-hidden-calc-padding"
import classNames from "@/app/_utils/class-names"
import { CloseIcon } from "@/public/icons"

interface ResponsiveModalBackdropProps extends PropsWithChildren {
  isOpen?: boolean
  delayOpen?: boolean
  onClose?: () => void
}

const PORTAL_ROOT = "portal"

/**
 * 반응형 모달 프레임
 */
const ResponsiveModalBackdrop = (props: ResponsiveModalBackdropProps) => {
  const { children, isOpen = false, delayOpen = false, onClose } = props

  const ROOT_ELEM = useMemo(() => globalThis.document?.getElementById(PORTAL_ROOT), [])

  useScrollOverflowHiddenCalcPadding()

  if (!ROOT_ELEM) return null

  return createPortal(
    <div
      className={classNames(
        "fixed bottom-0 left-0 xl:inset-0 z-20 h-screen flex rounded-t-[14px] size-full items-center justify-center bg-black/0 transition-colors duration-300 ease-in-out overflow-hidden",
        delayOpen && "bg-black/20",
      )}
      onClick={onClose}
    >
      <div
        className={classNames(
          "rounded-t-[14px] xl:rounded-b-[14px] mx-auto my-auto absolute bottom-0 xl:inset-0 h-[calc(100vh-7.2rem)] xl:h-[80vh] translate-y-full max-w-[96.4rem] w-full transition-transform duration-300 ease-in-out",
          {
            "translate-y-0": delayOpen,
            "translate-y-full": !isOpen,
          },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary-2 text-mBody2 xl:text-body3 rounded-t-[14px] flex h-40 items-center justify-between text-gray-50 xl:h-48">
          <div className="w-40" />
          <div className="flex items-center gap-4">
            아티클 요약
            <GPTMark />
          </div>
          <div className="cursor-pointer p-10" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>

        <div>
          <div className="xl:rounded-b-[14px] h-[calc(100vh-7.2rem-4.0rem)] overflow-y-auto scroll-smooth xl:h-[80vh]">
            {children}
          </div>
        </div>
      </div>
    </div>,
    ROOT_ELEM,
  )
}

export default ResponsiveModalBackdrop
