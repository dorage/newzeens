"use client"

import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { AdminKeywordResponse } from "@/app/_api/keyword.type"
import KeywordItem from "./keyword-item"
import { useInitialDataContext } from "../[publisherId]/context/initial-data-context"

interface KeywordsFormProps {
  initialData: AdminKeywordResponse[]
}

/**
 * 키워드 퍼블리셔 객체에 연결하는 폼
 */
const KeywordsForm = (props: KeywordsFormProps) => {
  const { initialData } = props
  const [data] = useState<AdminKeywordResponse[]>(initialData)

  const { keywordGroup } = useInitialDataContext()

  const defaultValues = keywordGroup?.reduce((acc, keywordGroup) => {
    return {
      ...acc,
      [keywordGroup.id]: initialData?.find((keyword) => keyword.keyword_group_id === keywordGroup.id)?.id + "",
    }
  }, {})

  const methods = useForm({
    defaultValues,
  })

  if (!data) return <></>

  return (
    <FormProvider {...methods}>
      <div className="">
        {keywordGroup?.map((keywordGroup) => {
          return <KeywordItem key={keywordGroup.id} keywordGroup={keywordGroup} />
        })}
      </div>
    </FormProvider>
  )
}

export default KeywordsForm
