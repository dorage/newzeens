"use client"

import { AdminKeywordGroupResponse, AdminKeywordResponse } from "@/app/_api/keyword.type"
import { AdminNewsLetterResponse } from "@/app/_api/news-letter.type"
import { createDynamicContext } from "@/app/_context/create-dynamic-context"

interface InitialDataContextProps {
  publisher?: AdminNewsLetterResponse[]
  keyword?: AdminKeywordResponse[]
  keywordGroup?: AdminKeywordGroupResponse[]
}

const { ContextProvider, useContext } = createDynamicContext<InitialDataContextProps>()

export const useInitialDataContext = useContext
export const InitialDataContextProvider = ContextProvider
