"use client"

import { createDynamicContext } from "@/app/_context/create-dynamic-context"

interface IdContextProps {
  id: string
}

const { ContextProvider, useContext } = createDynamicContext<IdContextProps>()

export const useIdContext = useContext
export const IdContextProvider = ContextProvider
