import React, { useEffect } from "react"
import { useSlotArticleContext } from "../_context/slot-article-context"
import { cn } from "@/app/_lib/utils"
import Image from "next/image"
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { putSlotPublisherPreferences } from "@/app/_actions/campaign"
import { useIdContext } from "../_context/id-context"
import toast from "react-hot-toast"

interface SlotArticleFormProps {}

const SlotArticleForm = (props: SlotArticleFormProps) => {
  const {} = props

  const { slotId } = useIdContext()
  const { initialValues } = useSlotArticleContext()

  const inputsRef = React.useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (!initialValues) return

    initialValues.forEach((v, i) => {
      if (!inputsRef.current[i]) return
      inputsRef.current[i].value = v.preferences + ""
    })
  }, [initialValues])

  const actionWithAlert = async (formData: FormData) => {
    await putSlotPublisherPreferences(formData, initialValues)
      .then(() => {
        toast.success("저장되었습니다.")
      })
      .catch((err) => {
        alert(JSON.stringify(err))
      })
  }

  return (
    <form action={actionWithAlert}>
      <input type="hidden" name="slotId" value={slotId} />

      <div className="flex items-center justify-between">
        <p>현재 선택: {initialValues.length}개</p>

        <Button type="submit" className={cn({})}>
          저장
        </Button>
      </div>
      <div className="h-2" />

      <div className="grid grid-cols-5 gap-x-2 gap-y-3">
        {initialValues.map((publisher, i) => {
          return (
            <div
              key={publisher.id}
              className={cn("flex flex-col gap-2", {
                // "opacity-50": publisher.is_to_be_deleted,
              })}
            >
              <div className="flex gap-2">
                <Image
                  src={publisher.thumbnail || ""}
                  width={40}
                  height={40}
                  alt="썸네일"
                  className="size-10 shrink-0"
                />
                <p className="text-sm font-bold">{publisher.title}</p>
              </div>
              <label className="px-2 text-sm font-medium">
                우선도(선택)
                <Input
                  ref={(el) => {
                    if (el) {
                      inputsRef.current[i] = el
                    }
                  }}
                  name={`${publisher.id}_preferences`}
                  type="number"
                  className="px-2"
                />
              </label>
            </div>
          )
        })}
      </div>
    </form>
  )
}

export default SlotArticleForm
