import type { Metadata } from "next"
import { Inter } from "next/font/google"
import RootContext from "./_context/root-context"
import "./_styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
  }>,
) {
  const { children, modal } = props
  console.log("root layout: ", props)
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="portal" />

        <RootContext>
          {children}
          {modal}
        </RootContext>
      </body>
    </html>
  )
}
