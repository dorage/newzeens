"use client"

import { createContext, useState } from "react"
import { createPortal } from "react-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import RelativeModalProvider from "../_components/portal/relative-modal-provider"

const PORTAL_ROOT = "portal"

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
        {children}

        <Portal>
          <RelativeModalProvider />
        </Portal>
      </QueryClientProvider>
    </Provider>
  )
}

export default RootContext

const Portal = ({ children }: React.PropsWithChildren) => {
  const el = document.getElementById(PORTAL_ROOT)

  if (!el) {
    return null
  }

  el.style.zIndex = "100"
  el.style.position = "fixed"
  return createPortal(children, el)
}
