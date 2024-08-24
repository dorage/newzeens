"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { Cross1Icon } from "@radix-ui/react-icons"
import { FormField, FormItem } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { Switch } from "@/app/_components/ui/switch"
import newsLetterApi from "@/app/_api/news-letter"
import { useParams } from "next/navigation"
import { revalidateTag } from "next/cache"
import newsLetterKey from "@/app/_api/fetch-key/news-letter"
import PublisherThumbnailInput from "./publisher-thumbnail-input"

interface PublisherFormProps {
  isEdit?: boolean
}

const PublisherForm = (props: PublisherFormProps) => {
  const { isEdit } = props
  const { control } = useFormContext()

  const { publisherId } = useParams()

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    await newsLetterApi.postAdminPublisherUpload({ id: publisherId as string, file: formData })
    revalidateTag(newsLetterKey.publisherDetail(publisherId as string))
  }

  return (
    <div className="">
      <div className="flex items-center justify-end">
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
                value={field.value}
              />
            </FormItem>
          )}
        />
      </div>

      <FormField
        name="name"
        control={control}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <Label className="min-w-[150px] text-[18px] font-semibold">
              뉴스레터명<span className="text-[#2141E5]">*</span>
            </Label>
            <Input className="w-[400px]" placeholder="뉴스레터명을 입력해주세요" {...field} />
          </FormItem>
        )}
      />

      <FormField
        name="publisher_main"
        control={control}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <Label className="min-w-[150px] text-[18px] font-semibold">
              발행인<span className="text-[#2141E5]">*</span>
            </Label>
            <Input className="w-[400px]" placeholder="발행인을 입력해주세요" {...field} />
          </FormItem>
        )}
      />

      <FormField
        name="publisher_spec"
        control={control}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <Label className="min-w-[150px] text-[18px] font-semibold">
              발행 스펙<span className="text-[#2141E5]">*</span>
            </Label>
            <Input className="w-[400px]" placeholder="발행스펙을 입력해주세요" {...field} />
          </FormItem>
        )}
      />

      <FormField
        name="description"
        control={control}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <Label className="min-w-[150px] text-[18px] font-semibold">
              소개글<span className="text-[#2141E5]">*</span>
            </Label>
            <Input className="" placeholder="소개글을 입력해 주세요(띄어쓰기 포함 53자 이내)" {...field} />
          </FormItem>
        )}
      />

      <div className="h-10" />

      {isEdit && <PublisherThumbnailInput />}

      <FormField
        name="url_subscribe"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <Label className="min-w-[150px] text-[18px] font-semibold">구독하기 링크</Label>
            <Input className="" placeholder="URL을 입력해주세요" {...field} />
          </FormItem>
        )}
      />
    </div>
  )
}

export default PublisherForm
