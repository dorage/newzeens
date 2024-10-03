import { useCallback } from "react"
import { Modal, useRelativeModalContext } from "../_components/portal/relative-modal-context"

export const useRelativeModal = () => {
  const { modalState, setModalState, isOpen, targetRef, closeTransition } = useRelativeModalContext()

  const updateTarget = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (!e.currentTarget) return
    targetRef.current = e.currentTarget
  }

  const open = (e: React.MouseEvent<Element, MouseEvent>) => {
    updateTarget(e)
    return (modalState: Modal) => {
      setModalState(modalState)
    }
  }

  // 200ms 트랜지션이 적용된 close
  const close = useCallback(() => {
    closeTransition(() => setModalState(null))
  }, [closeTransition, setModalState])

  // 즉시 close
  const forceClose = useCallback(() => {
    setModalState(null)
  }, [])

  return {
    isOpen,
    open,
    close,
    forceClose,
  }
}
