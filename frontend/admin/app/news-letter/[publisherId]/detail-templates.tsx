"use client"

import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams } from "next/navigation"
import ClientForm from "@/app/_components/helpers/client-form"
import { Button } from "@/app/_components/ui/button"
import { useInitialDataContext } from "./context/initial-data-context"
import PublisherForm from "../form/publisher-form"

interface DetailTemplatesProps {
  action: any
}

const DetailTemplates = (props: DetailTemplatesProps) => {
  const { action } = props

  const { publisher } = useInitialDataContext()

  const { publisherId } = useParams()

  const methods = useForm({
    defaultValues: {
      ...publisher,
      is_enabled: publisher.is_enabled == 1 ? true : false,
    },
  })

  return (
    <FormProvider {...methods}>
      <ClientForm
        action={action}
        successCb={() => {
          toast.success("수정되었습니다.")
        }}
      >
        <input type="hidden" name="publisherId" value={publisherId as string} />
        <PublisherForm isEdit />
        <div className="h-10" />
        <div className="flex justify-end">
          <Button type="submit" className="w-[300px]" size={"lg"}>
            수정하기
          </Button>
        </div>
      </ClientForm>
    </FormProvider>
  )
}

export default DetailTemplates
