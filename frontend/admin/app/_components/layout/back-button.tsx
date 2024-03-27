"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

interface BackButtonProps {
  className?: string
}

const BackButton = (props: BackButtonProps) => {
  const { className } = props
  const router = useRouter()

  return (
    <div>
      <Button className={className} onClick={() => router.back()} variant="outline">
        {"<"}
      </Button>
    </div>
  )
}

export default BackButton
