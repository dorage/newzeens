"use client"

import { Dispatch, SetStateAction, createContext, useState } from "react"
import { Toaster } from "react-hot-toast"
import { createDynamicContext } from "./create-dynamic-context"
import ProtectedScreen from "../_components/layout/protected-screen"
import { LOCAL_STORAGE_KEY } from "../_constants/storage"
import useIsServerSide from "../_hooks/use-is-server-side"

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

  const [isAllow, setIsAllow] = useState(
    isServerSide ? true : window?.localStorage?.getItem(LOCAL_STORAGE_KEY.ACCESS_ALLOW) === "0224" || false,
  )

  return (
    <Provider value={null}>
      <Toaster
      //  containerStyle={{ top: 80 }}
      />
      <ProtectedContextProvider isAllow={isAllow} setIsAllow={setIsAllow}>
        <div className="flex min-h-screen items-center justify-center">
          <ProtectedScreen>{children}</ProtectedScreen>
        </div>
      </ProtectedContextProvider>
    </Provider>
  )
}

export default RootContext
