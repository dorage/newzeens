"use client"

import React from "react"
import { useForm } from "react-hook-form"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { Button } from "@/app/_components/ui/button"
import { Form } from "@/app/_components/ui/form"
import PublisherForm from "../form/publisher-form"

const NewsLetterCreatePage = () => {
  const methods = useForm()

  return (
    <WidthWrapper>
      <h1 className="text-[30px] font-bold">뉴스레터 등록하기</h1>

      <div className="h-12" />

      <Form {...methods}>
        <form className="flex flex-col gap-4">
          <PublisherForm />

          <div className="h-10" />
          <div className="flex justify-end">
            <Button type="submit" className="w-[300px]" size={"lg"}>
              등록하기
            </Button>
          </div>
        </form>
      </Form>
    </WidthWrapper>
  )
}

export default NewsLetterCreatePage
