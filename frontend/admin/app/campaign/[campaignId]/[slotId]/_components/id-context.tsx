"use client"

import { createDynamicContext } from "@/app/_context/create-dynamic-context"

interface IdContextProps {
  campaignId: number
  slotId: number
}

const { ContextProvider, useContext } = createDynamicContext<IdContextProps>()

export const useIdContext = useContext
export const IdContextProvider = ContextProvider
