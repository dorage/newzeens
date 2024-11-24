import React from "react"
import Skeleton from "./skeleton"

const FallbackSkeleton = () => {
  return (
    <>
      <div className="hidden p-40 xl:block h-full">
        <div className="flex gap-[66px] justify-between">
          <div className="">
            <Skeleton className="h-32 w-[560px]" typo />

            <div className="mt-12 flex flex-col gap-4">
              {[...new Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-[544px] ml-16" typo />
              ))}
            </div>

            <Skeleton typo className="h-12 w-40 mt-12" />
          </div>
          <Skeleton img className="w-[209px] h-[118px] shrink-0" />
        </div>

        <div className="h-28" />

        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            <Skeleton className="rounded-full size-48" />
            <div className="h-[48px] w-[300px]">
              <Skeleton typo />
            </div>
          </div>

          <div className="flex gap-8">
            <Skeleton className="w-[102px] h-40 rounded-full" />
            <Skeleton className="w-[102px] h-40 rounded-full" />
          </div>
        </div>
      </div>
    </>
  )
}

export default FallbackSkeleton
