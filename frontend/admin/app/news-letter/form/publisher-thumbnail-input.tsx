import { revalidateTagPublisher } from "@/app/_actions"
import newsLetterApi from "@/app/_api/news-letter"
import { FormField, FormItem } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"

interface PublisherThumbnailInputProps {}

const PublisherThumbnailInput = (props: PublisherThumbnailInputProps) => {
  const {} = props

  const { publisherId } = useParams()
  const { control, setValue } = useFormContext()

  const [isLoading, setIsLoading] = useState(false)

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (!file) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      await newsLetterApi.postAdminPublisherUpload({ id: publisherId as string, file: formData })
      revalidateTagPublisher(publisherId as string)

      setIsLoading(false)
    } catch (e) {
      console.log(`e`, e)
    }
  }

  return (
    <div className="flex items-start justify-between gap-10">
      {isLoading && <>Loading...</>}
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
              <Input
                id="thumbnail"
                type="file"
                className="hidden"
                placeholder="썸네일을 입력해주세요"
                {...field}
                onChange={handleThumbnailChange}
              />
            </FormItem>
          )
        }}
      />
    </div>
  )
}

export default PublisherThumbnailInput
