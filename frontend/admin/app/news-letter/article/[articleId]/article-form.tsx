"use client"

import ClientForm from "@/app/_components/helpers/client-form"
import { FormField, FormItem } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { Switch } from "@/app/_components/ui/switch"
import { Cross1Icon } from "@radix-ui/react-icons"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"

interface ArticleFormProps {}

const ArticleForm = (props: ArticleFormProps) => {
  const {} = props

  const methods = useForm({
    defaultValues: {
      is_enabled: true,
      title: "",
      summary: "",
      thumbnail: "",
    },
  })

  const { control } = methods

  return (
    <div>
      <FormProvider {...methods}>
        <ClientForm action={async () => {}}>
          <FormField
            name="is_enabled"
            control={control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <Label className="min-w-[150px] text-[18px] font-semibold">활성화 여부</Label>
                <Switch
                  className="!mt-0"
                  onClick={() => {
                    field.onChange(!field.value)
                  }}
                  name="is_enabled"
                  checked={field.value}
                  //   value={field.value}
                />
              </FormItem>
            )}
          />

          <FormField
            name="title"
            control={control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <Label className="min-w-[150px] text-[18px] font-semibold">
                  아티클명<span className="text-[#2141E5]">*</span>
                </Label>
                <Input className="w-[400px]" placeholder="아티클 제목" {...field} />
              </FormItem>
            )}
          />

          <FormField
            name="summary"
            control={control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <Label className="min-w-[150px] text-[18px] font-semibold">
                  요약<span className="text-[#2141E5]">*</span>
                </Label>
                <Input className="" placeholder="요약을 입력해 주세요(띄어쓰기 포함 53자 이내)" {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="thumbnail"
            render={({ field }) => {
              if (field.value) {
                return (
                  <FormItem className="flex flex-col gap-2">
                    <Label className="min-w-[150px] text-[18px] font-semibold">썸네일 이미지</Label>
                    <div className="relative aspect-video w-[250px] shrink-0 overflow-hidden rounded-[12px]">
                      <img src={field.value} className="size-full object-cover" />
                      <div
                        className="absolute right-2 top-2 cursor-pointer rounded-full bg-white p-1"
                        onClick={() => field.onChange("")}
                      >
                        <Cross1Icon className="size-4" />
                      </div>
                    </div>
                    <input type="hidden" {...field} />
                  </FormItem>
                )
              }

              return (
                <FormItem className="flex flex-col gap-2">
                  <Label className="min-w-[150px] text-[18px] font-semibold">메인 이미지</Label>

                  <Label htmlFor="thumbnail" className="w-fit">
                    <div className="aspect-video w-[250px] rounded-[12px] bg-gray-100"></div>
                  </Label>
                  <Input id="thumbnail" type="file" className="hidden" placeholder="썸네일을 입력해주세요" {...field} />
                </FormItem>
              )
            }}
          />
        </ClientForm>
      </FormProvider>
    </div>
  )
}

export default ArticleForm
