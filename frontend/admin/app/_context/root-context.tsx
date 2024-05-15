"use client"

import { Dispatch, SetStateAction, createContext, useState } from "react"
import { Toaster } from "react-hot-toast"
import { createDynamicContext } from "./create-dynamic-context"
import ProtectedScreen from "../_components/layout/protected-screen"
import { LOCAL_STORAGE_KEY } from "../_constants/storage"
import useIsServerSide from "../_hooks/use-is-server-side"
import authApi from "../_api/auth"

interface useProtectedContextProps {
  isAllow: boolean
  setIsAllow: Dispatch<SetStateAction<boolean>>
}

const { ContextProvider, useContext } = createDynamicContext<useProtectedContextProps>()
export const useProtectedContext = useContext
const ProtectedContextProvider = ContextProvider

/**
 * ClientSide에 종속되는 전역 컨텍스트 컨테이너입니다.
 */
const RootContext = ({ children }: React.PropsWithChildren): JSX.Element => {
  const { Provider } = createContext(null)

  const { isServerSide } = useIsServerSide()

  return (
    <Provider value={null}>
      <Toaster />
      <div className="flex min-h-screen items-center justify-center">{children}</div>
    </Provider>
  )
}

export default RootContext
