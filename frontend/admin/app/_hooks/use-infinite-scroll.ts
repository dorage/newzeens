import { useState, useEffect, useCallback } from "react"
import { useInView } from "react-intersection-observer"

interface UseInfiniteScrollParams<KData, TParams> {
  initialValues?: KData[]
  params?: TParams & { page: number }
  apiMethod: (params: TParams & { page: number }) => Promise<KData[]>
}

interface UseInfiniteScrollResult<TData> {
  data: TData[]
  ref: (node?: Element | null | undefined) => void
}

const useInfiniteScroll = <KData, TParams>({
  initialValues = [],
  params = { page: 0 } as TParams & { page: number },
  apiMethod,
}: UseInfiniteScrollParams<KData, TParams>): UseInfiniteScrollResult<KData> => {
  const [page, setPage] = useState<number>(params?.page || 0)
  const [data, setData] = useState(initialValues)
  const { ref, inView } = useInView()

  useEffect(() => {
    setData(initialValues)
  }, [initialValues])

  const fetchNext = useCallback(async () => {
    const newItems = await apiMethod({ ...params, page })
    setData((prev) => [...prev, ...newItems])
    setPage((prev) => prev + 1)
  }, [apiMethod, params])

  useEffect(() => {
    if (inView) {
      fetchNext()
    }
  }, [inView, fetchNext])

  return { data, ref }
}

export default useInfiniteScroll
