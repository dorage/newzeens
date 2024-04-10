import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { createDynamicContext } from "@/app/_context/create-dynamic-context"

export interface Modal {
  key: string
  Component: (props?: any) => JSX.Element
  props?: any
}

interface RelativeModalContextProps {
  isOpen: boolean // close transition 을 고려한 boolean state
  modalState: Modal | null
  setModalState: Dispatch<SetStateAction<Modal | null>>
  targetRef: MutableRefObject<any>
  closeTransition: (callback: () => void) => void
}

const { ContextProvider, useContext } = createDynamicContext<RelativeModalContextProps>()

export const useRelativeModalContext = useContext
export const RelativeModalContextProvider = ContextProvider
