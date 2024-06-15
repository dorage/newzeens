"use client"

import newsLetterApi from "@/app/_api/news-letter"
import { AdminArticleResponse } from "@/app/_api/news-letter.type"
import { Input } from "@/app/_components/ui/input"
import { useDebounce } from "@/app/_hooks/use-debounce"
import useInfiniteScroll from "@/app/_hooks/use-infinite-scroll"
import React, { useCallback, useEffect, useMemo, useState } from "react"

interface ArticleEditProps {
  initialValues?: AdminArticleResponse[]
}

const ArticleEdit = (props: ArticleEditProps) => {
  const { initialValues } = props

  const [search, setSearch] = useState("")
  const debounceSearch = useDebounce(search)

  const params = useMemo(() => ({ page: 0, name: debounceSearch }), [debounceSearch])

  const [initialData, setInitialData] = useState(initialValues)

  const searchFetch = useCallback(async () => {
    const newItems = await newsLetterApi.getAdminArticleList(params)
    setInitialData(newItems) // 검색 결과로 목록을 업데이트
  }, [params])

  useEffect(() => {
    if (!debounceSearch) return
    searchFetch()

    setInitialData(initialValues)
  }, [debounceSearch, initialValues, searchFetch])

  const { data } = useInfiniteScroll({
    initialValues: initialData,
    params,
    apiMethod: (params) => newsLetterApi.getAdminArticleList(params),
  })

  return (
    <div>
      <div className="h-5" />

      <Input
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="뉴스레터 이름으로 검색"
      />

      <div className="h-3" />
      {JSON.stringify(data)}
    </div>
  )
}

export default ArticleEdit
