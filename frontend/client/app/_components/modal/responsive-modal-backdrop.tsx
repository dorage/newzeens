import React, { PropsWithChildren, useEffect, useMemo, useState } from "react"
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
  const { children, isOpen = false, onClose } = props

  const ROOT_ELEM = useMemo(() => globalThis.document?.getElementById(PORTAL_ROOT), [])

  useScrollOverflowHiddenCalcPadding()

  if (!ROOT_ELEM) return null

  return createPortal(
    <div
      className={classNames(
        "fixed bottom-0 left-0 xl:inset-0 z-[21] h-screen flex size-full items-center justify-center bg-black/0 transition-colors duration-250 ease-in-out overflow-hidden",
        isOpen && "bg-black/20",
      )}
      onClick={onClose}
    >
      <div
        className={classNames(
          "rounded-t-[14px] xl:rounded-b-[14px] m-auto absolute bottom-0 xl:inset-0 h-[calc(100vh-7.2rem)] xl:h-[80vh] translate-y-full max-w-[96.4rem] w-full transition-all duration-250 ease-in-out",
          {
            "translate-y-0": isOpen,
            "translate-y-full": !isOpen,
            "xl:opacity-0 xl:translate-y-[-3%]": !isOpen,
            "xl:opacity-100 xl:translate-y-0": isOpen,
          },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary-2 text-mBody2 xl:text-body3 rounded-t-[14px] flex h-[48px] items-center justify-between text-gray-50 xl:h-48">
          <div className="w-40" />
          <div className="flex items-center gap-4">
            아티클 요약
            <GPTMark />
          </div>
          <button className="p-[14px] cursor-pointer" onClick={onClose}>
            <CloseIcon className="size-20" />
          </button>
        </div>

        {/* <div> */}
        <div className="bg-white xl:rounded-b-[14px] h-[calc(100vh-7.2rem-4.8rem)] overflow-y-auto scroll-smooth xl:h-[75vh]">
          {children}
        </div>
        {/* </div> */}
      </div>
    </div>,
    ROOT_ELEM,
  )
}

export default ResponsiveModalBackdrop
