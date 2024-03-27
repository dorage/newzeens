"use client"

import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface InfiniteListProps<TData, KParams> {
  initialData: TData[]
  apiFunction: (params: KParams & { page: number; limit: number }) => Promise<TData[]>
  apiParams?: KParams
  pageSize?: number
  children: (data: TData, index: number) => React.ReactNode
}

const InfiniteList = <TData, KParams>(props: InfiniteListProps<TData, KParams>) => {
  const { apiFunction, apiParams, initialData, pageSize = 10, children } = props

  const [page, setPage] = useState(1)
  const [data, setData] = useState(initialData)
  const { ref, inView } = useInView()

  const fetchNext = async () => {
    const addData = await apiFunction({ ...(apiParams as KParams), page, limit: pageSize })
    setData((prev) => [...prev, ...addData])
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (inView) {
      fetchNext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <>
      {data.map(children)}
      <div ref={ref} />
    </>
  )
}

export default InfiniteList
