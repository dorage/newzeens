import { useCallback, useState } from "react"
import { BottomDrawerState, useBottomDrawerContext } from "./bottom-drawer-context"

const useBottomDrawer = () => {
  const { modalState, setModalState } = useBottomDrawerContext()

  const closeDrawer = useCallback(
    () => setModalState({ isOpen: false, Component: () => null, componentProps: null }),
    [setModalState],
  )

  const openDrawer = useCallback(
    (state: BottomDrawerState) => setModalState((prev) => ({ ...prev, ...state, isOpen: true })),
    [setModalState],
  )

  return { modalState, closeDrawer, openDrawer }
}

export default useBottomDrawer
