"use client"

import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { BottomDrawerContextProvider, BottomDrawerState } from "./bottom-drawer-context"
import ResponsiveModalBackdrop from "./responsive-modal-backdrop"
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
          <ResponsiveModalBackdrop delayOpen={delayOpen} isOpen={isOpen} onClose={forceClose}>
            <Component close={forceClose} {...componentProps} />
          </ResponsiveModalBackdrop>,
          ROOT_ELEM as HTMLElement,
        )}
    </BottomDrawerContextProvider>
  )
}

export default BottomDrawerProvider
