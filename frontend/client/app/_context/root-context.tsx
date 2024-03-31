"use client"

import { createContext, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Provider>
  )
}

export default RootContext
