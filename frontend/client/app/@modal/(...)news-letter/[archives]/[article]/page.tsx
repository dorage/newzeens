"use client"

import { useRouter } from "next/navigation"
import ArticleInfo from "@/app/_components/modal/article-info"
import ResponsiveModalBackdrop from "@/app/_components/modal/responsive-modal-backdrop"

export default function Page() {
  const router = useRouter()
  return (
    <ResponsiveModalBackdrop isOpen delayOpen onClose={router.back}>
      <ArticleInfo />
    </ResponsiveModalBackdrop>
  )
}
