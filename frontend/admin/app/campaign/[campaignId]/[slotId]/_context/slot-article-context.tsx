"use client"

import { AdminArticleResponse } from "@/app/_api/news-letter.type"
import { createDynamicContext } from "@/app/_context/create-dynamic-context"
import { PropsWithChildren, useEffect, useRef, useState } from "react"

interface SlotArticleContextProps {
  initialValues: AdminArticleResponse[]
  select: AdminArticleResponse[]
  setSelect: React.Dispatch<React.SetStateAction<AdminArticleResponse[]>>
  isChanged: boolean
}

const { ContextProvider, useContext } = createDynamicContext<SlotArticleContextProps>()

export const useSlotArticleContext = useContext

interface SlotArticleContextProviderProps extends PropsWithChildren {
  initialValues: AdminArticleResponse[]
}
export const SlotArticleContextProvider = ({ children, initialValues }: SlotArticleContextProviderProps) => {
  const [select, setSelect] = useState<AdminArticleResponse[]>(initialValues)

  const prevRef = useRef<AdminArticleResponse[]>([])

  useEffect(() => {
    prevRef.current = initialValues
  }, [initialValues])

  const isChanged = initialValues.length !== select.length

  return (
    <ContextProvider initialValues={initialValues} isChanged={isChanged} select={select} setSelect={setSelect}>
      <>{children}</>
    </ContextProvider>
  )
}
