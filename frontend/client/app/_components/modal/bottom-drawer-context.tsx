import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { createDynamicContext } from "@/app/_context/create-dynamic-context"

export interface BottomDrawerState {
  isOpen?: boolean
  Component: (props: any) => JSX.Element | null
  componentProps: any | null
}

interface BottomDrawerContextProps {
  modalState: BottomDrawerState
  setModalState: Dispatch<SetStateAction<BottomDrawerState>>
}

const { ContextProvider, useContext } = createDynamicContext<BottomDrawerContextProps>()

export const useBottomDrawerContext = useContext
export const BottomDrawerContextProvider = ContextProvider
