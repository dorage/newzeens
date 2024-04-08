import React, { useRef, useState } from "react"

interface Modal {
  key: string
  Component: React.FC<React.PropsWithChildren>
  props: any
}

interface RelativeModalProviderProps {}

const RelativeModalProvider = (props: RelativeModalProviderProps) => {
  const {} = props

  const [modalState, setModalState] = useState<Modal | null>(null)

  const targetRef = useRef<any>(null)

  return (
    <div className="fixed" ref={targetRef}>
      {modalState && <modalState.Component {...modalState.props} />}
    </div>
  )
}

export default RelativeModalProvider
