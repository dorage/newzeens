import { useEffect, useState } from "react"

const useIsServerSide = () => {
  const [isServerSide, setIsServerSide] = useState<boolean>(true)

  useEffect(() => {
    setIsServerSide(false)
  }, [])

  return { isServerSide }
}

export default useIsServerSide
