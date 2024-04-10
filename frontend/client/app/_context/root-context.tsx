"use client"

import { createContext, useState } from "react"
import { createPortal } from "react-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import RelativeModalProvider from "../_components/portal/relative-modal-provider"

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

  return (
    <Provider value={null}>
      <QueryClientProvider client={client}>
        <RelativeModalProvider>{children}</RelativeModalProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default RootContext
