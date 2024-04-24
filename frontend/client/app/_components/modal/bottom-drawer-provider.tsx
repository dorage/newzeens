"use client"

import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { BottomDrawerContextProvider, BottomDrawerState } from "./bottom-drawer-context"
import classNames from "@/app/_utils/class-names"

interface BottomDrawerProviderProps extends PropsWithChildren {}

const PORTAL_ROOT = "portal"

const BottomDrawerProvider = (props: BottomDrawerProviderProps) => {
  const { children } = props

  const ROOT_ELEM = useMemo(() => globalThis.document?.getElementById(PORTAL_ROOT), [])

  const [modalState, setModalState] = useState<BottomDrawerState>({
    isOpen: false,
    Component: () => null,
    componentProps: null,
  })

  const { isOpen, Component, componentProps } = modalState

  const [delayOpen, setDelayOpen] = useState(false)

  const forceClose = useCallback(
    () => setModalState({ isOpen: false, Component: () => null, componentProps: null }),
    [setModalState],
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setDelayOpen(true)
    }

    if (!isOpen) {
      document.body.style.overflow = ""
      setTimeout(() => setDelayOpen(false), 300)
    }
  }, [isOpen])

  const handleOutsideClick = (e: any) => {
    if (e.currentTarget !== e.target) return
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <BottomDrawerContextProvider modalState={modalState} setModalState={setModalState}>
      {children}

      {(isOpen || delayOpen) &&
        createPortal(
          <div
            className={classNames(
              "fixed bottom-0 left-0 z-[19] flex size-full items-center justify-center bg-black/0 transition-colors duration-300 ease-in-out",
              delayOpen && "bg-black/20",
            )}
            onClick={handleOutsideClick}
          >
            <div
              className={classNames("translate-y-full mt-auto w-full transition-transform duration-300 ease-in-out", {
                "translate-y-0": delayOpen,
                "translate-y-full": !isOpen,
              })}
            >
              <div className="rounded-t-14 h-[calc(100vh-7.2rem)] flex-col items-center overflow-hidden bg-white">
                <Component close={forceClose} {...componentProps} />
              </div>
            </div>
          </div>,
          ROOT_ELEM as HTMLElement,
        )}
    </BottomDrawerContextProvider>
  )
}

export default BottomDrawerProvider
