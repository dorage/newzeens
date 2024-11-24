"use client"

import { useRouter } from "next/navigation"
import ArticleInfo from "@/app/_components/modal/article-info"
import ResponsiveModalBackdrop from "@/app/_components/modal/responsive-modal-backdrop"
import { Suspense, useEffect, useState } from "react"
import FallbackSkeleton from "./_components/fallback-skeleton"

export default function Page() {
  const router = useRouter()

  const [isTransition, setIsTransition] = useState(false)

  useEffect(() => {
    setIsTransition(true)
  }, [])

  return (
    <ResponsiveModalBackdrop isOpen={isTransition} delayOpen onClose={router.back}>
      <Suspense fallback={<FallbackSkeleton />}>
        <ArticleInfo />
      </Suspense>
    </ResponsiveModalBackdrop>
  )
}
