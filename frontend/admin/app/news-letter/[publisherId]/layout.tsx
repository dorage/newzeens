import React from "react"
import WidthWrapper from "@/app/_components/layout/width-wrapper"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <WidthWrapper>{children}</WidthWrapper>
}
