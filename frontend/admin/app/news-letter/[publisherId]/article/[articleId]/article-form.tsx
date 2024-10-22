"use client"

import { FormField, FormItem } from "@/app/_components/ui/form"
import React from "react"
import toast from "react-hot-toast"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "@/app/_components/ui/input"
import { Textarea } from "@/app/_components/ui/textarea"
import { Button } from "@/app/_components/ui/button"
import ClientForm from "@/app/_components/helpers/client-form"
import { putArticle } from "@/app/_actions"
import ArticleThumbnail from "./aritlce-thumbnail"
import { Switch } from "@/app/_components/ui/switch"
import { Label } from "@/app/_components/ui/label"
import { AdminArticleResponse } from "@/app/_api/news-letter.type"
import { useParams, useRouter } from "next/navigation"

interface ArticleFormProps {
  initialValues?: AdminArticleResponse

  action: (formData: FormData) => Promise<void> | Promise<string>
}

const ArticleForm = (props: ArticleFormProps) => {
  const { initialValues, action } = props

  const router = useRouter()

  const params = useParams<{ publisherId: string }>()
  const methods = useForm({
    defaultValues: {
      ...initialValues,
      is_enabled: initialValues?.is_enabled === 1,
    },
  })

  const { control } = methods

  return (
    <div className="">
      <FormProvider {...methods}>
        <ClientForm
          action={action}
          successCb={(id) => {
            if (initialValues) {
              toast.success("수정되었습니다.")
            } else {
              toast.success("생성되었습니다.")
              if (id) {
                router.push(`/news-letter/${params?.publisherId}/article/${id}`)
              }
            }
          }}
        >
          <input type="hidden" name="articleId" value={initialValues?.id} />
          <input type="hidden" name="publisherId" value={params?.publisherId} />

          <div className="flex items-center justify-end">
            <FormField
              name="is_enabled"
              control={control}
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center gap-2">
                    <Label className="min-w-[150px] text-[18px] font-semibold">활성화 여부{field.value}</Label>
                    <Switch
                      className="!mt-0"
                      onClick={() => {
                        field.onChange(!field.value)
                      }}
                      name="is_enabled"
                      checked={field.value}
                    />
                  </FormItem>
                )
              }}
            />
          </div>

          <FormField
            name="title"
            control={control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <Label className="min-w-[150px] text-[18px] font-semibold">
                  아티클<span className="text-[#2141E5]">*</span>
                </Label>
                <Input className="w-[400px]" placeholder="타이틀" {...field} />
              </FormItem>
            )}
          />

          <FormField
            name="url"
            control={control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <Label className="min-w-[150px] text-[18px] font-semibold">
                  링크<span className="text-[#2141E5]">*</span>
                </Label>
                <Input className="w-[400px]" placeholder="https://naver.com" {...field} />
              </FormItem>
            )}
          />

          <FormField
            name="summary"
            control={control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <Label className="min-w-[150px] text-[18px] font-semibold">
                  요약 내용<span className="text-[#2141E5]">*</span>
                </Label>
                <Textarea rows={5} className="" placeholder="요약내용" {...field} />
              </FormItem>
            )}
          />

          <div className="h-10" />

          <div className="h-10" />
          <div className="flex justify-end">
            <Button type="submit" className="w-[300px]" size={"lg"}>
              수정하기
            </Button>
          </div>

          <ArticleThumbnail />
        </ClientForm>
      </FormProvider>
    </div>
  )
}

export default ArticleForm
