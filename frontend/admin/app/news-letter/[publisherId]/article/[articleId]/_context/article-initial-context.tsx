"use client"

import { AdminArticleResponse } from "@/app/_api/news-letter.type"
import { createDynamicContext } from "@/app/_context/create-dynamic-context"

interface ArticleInitialContextProps {
  initialValues: AdminArticleResponse
}

const { ContextProvider, useContext } = createDynamicContext<ArticleInitialContextProps>()

export const useArticleInitialContext = useContext
export const ArticleInitialContextProvider = ContextProvider
