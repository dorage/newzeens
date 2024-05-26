"use client"

import { createContext } from "react"
import { Toaster } from "react-hot-toast"

/**
 * ClientSide에 종속되는 전역 컨텍스트 컨테이너입니다.
 */
const RootContext = ({ children }: React.PropsWithChildren): JSX.Element => {
  const { Provider } = createContext(null)

  return (
    <Provider value={null}>
      <Toaster />
      {children}
    </Provider>
  )
}

export default RootContext
