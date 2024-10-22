"use client"

import toast from "react-hot-toast"

interface ClientFormProps {
  children: React.ReactNode
  action: (formData: FormData) => Promise<void> | Promise<string>

  successCb?: (result: any) => void
  errorCb?: () => void
}

const ClientForm = (props: ClientFormProps) => {
  const { action, children, successCb, errorCb } = props

  return (
    <form
      action={async (formData) => {
        try {
          const a = await action(formData)

          successCb && successCb(a)
        } catch (e) {
          toast.error(JSON.stringify(e))
          errorCb && errorCb()
        }
      }}
    >
      {children}
    </form>
  )
}

export default ClientForm
