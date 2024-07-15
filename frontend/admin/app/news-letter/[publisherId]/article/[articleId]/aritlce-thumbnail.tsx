import React from "react"
import { useFormContext } from "react-hook-form"
import { FormField, FormItem } from "@/app/_components/ui/form"
import { Label } from "@radix-ui/react-label"
import { Cross1Icon } from "@radix-ui/react-icons"
import { Input } from "@/app/_components/ui/input"
import articleApi from "@/app/_api/article"
import { useParams } from "next/navigation"

interface ArticleThumbnailProps {}

const ArticleThumbnail = (props: ArticleThumbnailProps) => {
  const {} = props

  const { articleId } = useParams()

  const { control, setValue } = useFormContext()

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    await articleApi.postAdminArticleUpload({ id: articleId as string, file: formData })
  }

  return (
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={field.value} className="size-full object-cover" alt="" />
                  <div
                    className="absolute right-2 top-2 cursor-pointer rounded-full bg-white p-1"
                    onClick={() => field.onChange("")}
                  >
                    <Cross1Icon className="size-4" />
                  </div>
                </div>
                <input type="hidden" accept="image/*" {...field} value={field.value || ""} />
              </FormItem>
            )
          }

          return (
            <FormItem className="flex flex-col gap-2">
              <Label className="min-w-[150px] text-[18px] font-semibold">메인 이미지</Label>

              <Label htmlFor="thumbnail" className="">
                <div className="aspect-video w-[250px] rounded-[12px] bg-gray-100"></div>
              </Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                placeholder="썸네일을 입력해주세요"
                {...field}
                onChange={handleThumbnailChange}
                value={field.value || ""}
              />
            </FormItem>
          )
        }}
      />
    </div>
  )
}

export default ArticleThumbnail
