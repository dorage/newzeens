"use client"

import { AdminNewsLetterResponse } from "@/app/_api/news-letter.type"
import { createDynamicContext } from "@/app/_context/create-dynamic-context"
import { PropsWithChildren, useState } from "react"

interface SlotPublisherContextProps {
  initialValues: AdminNewsLetterResponse[]
  select: AdminNewsLetterResponse[]
  setSelect: React.Dispatch<React.SetStateAction<AdminNewsLetterResponse[]>>
  isChanged: boolean
}

const { ContextProvider, useContext } = createDynamicContext<SlotPublisherContextProps>()

export const useSlotPublisherContext = useContext

interface SlotPublisherContextProviderProps extends PropsWithChildren {
  initialValues: AdminNewsLetterResponse[]
}
export const SlotPublisherContextProvider = ({ children, initialValues }: SlotPublisherContextProviderProps) => {
  const [select, setSelect] = useState<AdminNewsLetterResponse[]>(initialValues)
  const isChanged = initialValues.length !== select.length || select.some((v) => !!v.is_to_be_deleted)

  return (
    <ContextProvider initialValues={initialValues} isChanged={isChanged} select={select} setSelect={setSelect}>
      <>{children}</>
    </ContextProvider>
  )
}
