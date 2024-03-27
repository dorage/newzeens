"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { Cross1Icon } from "@radix-ui/react-icons"
import { FormField, FormItem } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { Switch } from "@/app/_components/ui/switch"

interface PublisherFormProps {
  isEdit?: boolean
}

const PublisherForm = (props: PublisherFormProps) => {
  const { isEdit } = props
  const { control } = useFormContext()

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
            <Input className="w-[400px]" placeholder="발행인을 입력해주세요" {...field} />
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

      <div className="flex items-start justify-between gap-10">
        <FormField
          control={control}
          name="thumbnail"
          render={({ field }) => {
            if (field.value) {
              return (
                <FormItem className="flex flex-col gap-2">
                  <Label className="min-w-[150px] text-[18px] font-semibold">메인 이미지</Label>
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

                <Label htmlFor="thumbnail" className="">
                  <div className="aspect-video w-[250px] rounded-[12px] bg-gray-100"></div>
                </Label>
                <Input id="thumbnail" type="file" className="hidden" placeholder="썸네일을 입력해주세요" {...field} />
              </FormItem>
            )
          }}
        />
      </div>

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
