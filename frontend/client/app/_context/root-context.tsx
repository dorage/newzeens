"use client"

import { createContext, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import BottomDrawerProvider from "../_components/modal/bottom-drawer-provider"
import RelativeModalProvider from "../_components/portal/relative-modal-provider"
import { initMX } from "../_mixpanel"

const RootContext = ({ children }: React.PropsWithChildren): JSX.Element => {
  const { Provider } = createContext(null)

  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  )

  useEffect(() => {
    initMX()
  }, [])

  return (
    <Provider value={null}>
      <QueryClientProvider client={client}>
        <BottomDrawerProvider>
          <RelativeModalProvider>{children}</RelativeModalProvider>
        </BottomDrawerProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default RootContext
