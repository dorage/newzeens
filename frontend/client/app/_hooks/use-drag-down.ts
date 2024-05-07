import { RefObject, useCallback, useEffect } from "react"

interface useDragDownProps {
  modalRef: RefObject<HTMLDivElement>
  handleRef: RefObject<HTMLDivElement>
  threshold?: number
  duration?: number
  close?: () => void
}

export const createDragDownHelper = () => {
  const data: ActionData = { touch: false, dy: 0, y: 0, identifier: null }
  // set 방지
  const proxy = new Proxy(data, {
    get(target, prop, receiver) {
      return target[prop as keyof typeof target]
    },
    set() {
      return false
    },
  })

  /**
   * 최초 마우스/터치 이벤트 시작지점의 Y좌표와 touchId를 저장합니다
   * @param sy
   * @param identifier
   */
  const start = (sy: number, identifier?: number) => {
    data.touch = true
    data.y = sy
    if (identifier != null) data.identifier = identifier
  }

  /**
   * 연속된 마우스/터치 이동 이벤트의 현재 Y좌표를 저장합니다
   * @param dy
   */
  const move = (dy: number) => {
    data.dy = dy
  }

  /**
   * touchId를 삭제합니다
   */
  const leave = () => {
    data.touch = false
    data.identifier = null
  }

  return { start, move, leave, data: proxy }
}

const { start, move, leave, data } = createDragDownHelper()

const useDragDown = ({ modalRef, handleRef, close, threshold = 70, duration = 300 }: useDragDownProps) => {
  // 모달을 닫는 함수
  const closeModal = useCallback(() => {
    if (modalRef.current == null) return
    const { height } = modalRef.current.getBoundingClientRect()
    const bottom = modalRef.current.style.bottom.match(/(\d+)/g)?.shift() as number | undefined

    const keyframes = [{ bottom: `-${bottom}px` }, { bottom: `-${height}px` }]
    const options = { duration: Math.max(((height - (bottom ?? 0)) / duration) * duration, 0) }
    const animation = modalRef.current.animate(keyframes, options)
    animation.play()
    animation.addEventListener("finish", () => {
      if (modalRef.current == null) return
      // modal close action
      if (close) close()
    })
  }, [modalRef])

  // click action

  useEffect(() => {
    if (handleRef.current == null) return
    // click start
    const onMouseDown = (e: MouseEvent) => {
      start(e.clientY)
    }

    handleRef.current.addEventListener("mousedown", onMouseDown)
    return () => {
      if (handleRef.current == null) return
      handleRef.current.removeEventListener("mousedown", onMouseDown)
    }
  }, [handleRef.current])

  useEffect(() => {
    // click move
    const onMouseMove = (e: MouseEvent) => {
      if (!data.touch) return
      if (modalRef.current == null) return
      const dy = data.y - e.clientY
      if (dy > 0) return
      move(dy)
      modalRef.current.style.bottom = `${dy}px`
    }
    // click end
    const onMouseUp = (e: MouseEvent) => {
      if (modalRef.current == null) return
      if (!data.touch) return
      leave()

      if (data.dy < -threshold) {
        closeModal()
        return
      }
      modalRef.current.style.bottom = `0px`
    }
    document.body.addEventListener("mousemove", onMouseMove)
    document.body.addEventListener("mouseup", onMouseUp)
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }
  }, [])

  // touch action
  useEffect(() => {
    if (handleRef.current == null) return
    // touch start
    const onTouchStart = (e: TouchEvent) => {
      const { identifier, clientY } = e.changedTouches[0]
      start(clientY, identifier)
    }

    handleRef.current.addEventListener("touchstart", onTouchStart)
    return () => {
      if (handleRef.current == null) return
      handleRef.current.removeEventListener("touchstart", onTouchStart)
    }
  }, [handleRef.current])

  useEffect(() => {
    // touch move
    const onTouchMove = (e: TouchEvent) => {
      if (!data.touch) return
      if (modalRef.current == null) return
      const touch = Array.from(e.touches).find((touch) => touch.identifier === data.identifier)
      // touch가 없다면
      if (touch == null) {
        closeModal()
        return
      }
      const dy = data.y - touch.clientY
      if (dy > 0) return
      move(dy)
      modalRef.current.style.bottom = `${dy}px`
    }
    // touch end
    const onTouchEnd = () => {
      if (!data.touch) return
      if (modalRef.current == null) return
      leave()

      if (data.dy < -threshold) {
        closeModal()
        return
      }
      modalRef.current.style.bottom = `0px`
    }
    document.body.addEventListener("touchmove", onTouchMove)
    document.body.addEventListener("touchend", onTouchEnd)
    return () => {
      document.body.removeEventListener("touchmove", onTouchMove)
      document.body.removeEventListener("touchend", onTouchEnd)
    }
  }, [])
}

export default useDragDown

interface ActionData {
  touch: boolean
  dy: number
  y: number
  identifier: number | null
}
