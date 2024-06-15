import { putSlotPublisher } from "@/app/_actions/campaign"
import React, { useEffect, useState } from "react"
import { useSlotPublisherContext } from "../_context/slot-publisher-context"
import { AdminNewsLetterResponse } from "@/app/_api/news-letter.type"
import { Button } from "@/app/_components/ui/button"
import { useIdContext } from "../_context/id-context"
import Image from "next/image"
import { Input } from "@/app/_components/ui/input"
import { cn } from "@/app/_lib/utils"

interface SlotPublisherFormProps {}

const SlotPublisherForm = (props: SlotPublisherFormProps) => {
  const {} = props

  const { slotId } = useIdContext()
  const { initialValues, isChanged, select, setSelect } = useSlotPublisherContext()

  const inputsRef = React.useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (!initialValues) return

    initialValues.forEach((v, i) => {
      if (!inputsRef.current[i]) return
      inputsRef.current[i].value = v.preferences + ""
    })
  }, [initialValues])

  const actionWithAlert = async (formData: FormData) => {
    await putSlotPublisher(formData, select)

    alert("저장되었습니다.")
  }

  return (
    <form action={actionWithAlert}>
      <div className="flex items-center justify-between">
        <p>현재 선택: {select.length}개</p>

        <Button
          type="submit"
          className={cn({
            invisible: !isChanged,
            visible: isChanged,
          })}
        >
          저장
        </Button>
      </div>
      <div className="h-2" />
      <input type="hidden" name="slotId" value={slotId} />

      <div className="grid grid-cols-5 gap-2">
        {select.map((publisher, i) => {
          return (
            <div
              key={publisher.id}
              className={cn("flex flex-col gap-2", {
                "opacity-50": publisher.is_to_be_deleted,
              })}
            >
              <div className="flex gap-2">
                <Image src={publisher.thumbnail} width={40} height={40} alt="썸네일" className="size-10 shrink-0" />
                <p className="text-sm font-bold">{publisher.name}</p>
              </div>
              <label className="text-sm font-medium">
                우선도(선택)
                <Input
                  ref={(el) => {
                    if (el) {
                      inputsRef.current[i] = el
                    }
                  }}
                  name={`${publisher.id}_preferences`}
                  type="number"
                  className=""
                />
              </label>
            </div>
          )
        })}
      </div>
    </form>
  )
}

export default SlotPublisherForm
