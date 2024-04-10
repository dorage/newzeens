"use client"

import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Modal, RelativeModalContextProvider } from "./relative-modal-context"
import classNames from "@/app/_utils/class-names"

interface RelativeModalProviderProps extends PropsWithChildren {}

const PORTAL_ROOT = "portal"

const CLOSE_DURATION = 180

const RelativeModalProvider = (props: RelativeModalProviderProps) => {
  const { children } = props

  const ROOT_ELEM = useMemo(() => globalThis.document?.getElementById(PORTAL_ROOT), [])

  const [modalState, setModalState] = useState<Modal | null>(null)

  const parentRef = useRef<any>(null)
  const targetRef = useRef<any>(null)

  const [transitionOut, setTransitionOut] = useState(false)

  const closeTransition = useCallback((close: () => void) => {
    setTransitionOut(true)
    setTimeout(() => {
      close()
      setTransitionOut(false)
    }, CLOSE_DURATION)
  }, [])

  /**
   * 기준 타겟으로 포지션 잡기
   */
  useEffect(() => {
    if (!modalState) return

    const { top, left, width: targetWidth, height: targetHeight } = targetRef.current?.getBoundingClientRect()
    const { width, height } = parentRef.current.getBoundingClientRect()

    parentRef.current.style.right = `${targetWidth / 2}px`
    parentRef.current.style.top = `${targetHeight}px`
  }, [modalState])

  /**
   * clickOutside
   */
  useEffect(() => {
    if (!modalState) return
    const handleClickOutside = (e: MouseEvent) => {
      if (!parentRef.current) return
      if (!parentRef.current.contains(e.target as Node)) {
        closeTransition(() => setModalState(null))
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [modalState, closeTransition])

  const isOpen = transitionOut ? false : !!modalState

  return (
    <RelativeModalContextProvider
      isOpen={isOpen}
      modalState={modalState}
      setModalState={setModalState}
      targetRef={targetRef}
      closeTransition={closeTransition}
    >
      {children}

      {modalState &&
        createPortal(
          <div
            ref={parentRef}
            className={classNames("absolute animate-fade-in shadow-[-4px_4px_16px_0px_rgba(0,0,0,0.08)]", {
              "animate-fade-out": transitionOut,
            })}
          >
            <modalState.Component {...(modalState?.props || {})} />
          </div>,
          ROOT_ELEM as HTMLElement,
        )}
    </RelativeModalContextProvider>
  )
}

export default RelativeModalProvider
