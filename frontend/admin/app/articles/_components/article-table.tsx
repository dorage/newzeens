"use client"

import { deleteArticle, deleteArticles } from "@/app/_actions"
import { AdminArticleResponse } from "@/app/_api/news-letter.type"
import { Button } from "@/app/_components/ui/button"
import { Checkbox } from "@/app/_components/ui/checkbox"
import { Input } from "@/app/_components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react"
import toast from "react-hot-toast"

interface ArticleTableProps {
  initialValues: AdminArticleResponse[]
  initialPage: number
  initialLimit: number
}

const ArticleTable = (props: ArticleTableProps) => {
  const { initialValues: data, initialLimit, initialPage } = props

  const [searchWord, setSearchWord] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : initialPage
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : initialLimit

  const handlePrev = () => {
    if (page > 0) {
      router.replace(`/articles?page=${page - 1}&limit=${limit}`)
    }
  }

  const handleNext = () => {
    router.replace(`/articles?page=${page + 1}&limit=${limit}`)
  }

  const [selectedRows, setSelectedRows] = useState<AdminArticleResponse[]>([])
  const allToggle = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(data)
    }
  }

  const [pageInput, setPageInput] = useState(String(page))
  const [limitInput, setLimitInput] = useState(String(limit))

  const handleDelete = async () => {
    deleteArticles(selectedRows.map((item) => item.id))
    toast("일괄삭제 되었습니다!")
  }

  return (
    <div>
      <div className="flex gap-5">
        <div>
          페이지사이즈 조절
          <Input
            className="max-w-[200px]"
            value={limitInput}
            onChange={(e) => {
              setLimitInput(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (limitInput === "") return
                router.replace(`/articles?page=${page}&limit=${limitInput}`)
              }
            }}
          />
        </div>

        <div>
          페이지 이동
          <Input
            value={pageInput}
            onChange={(e) => {
              setPageInput(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (pageInput === "") return

                router.replace(`/articles?page=${pageInput}&limit=${limit}`)
              }
            }}
          />
        </div>
        <div>
          검색
          <Input
            className="max-w-[200px]"
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (searchWord === "") {
                  router.replace(`/articles?page=${page}&limit=${limit}&name=`)
                } else {
                  router.replace(`/articles?page=${page}&limit=${limit}&name=${searchWord}`)
                }
              }
            }}
          />
        </div>
      </div>
      <table>
        <colgroup>
          <col width={"5%"} />
          <col width={"7%"} />
          <col width={"8%"} />
          <col width={"14%"} />
          <col width={"12%"} />
          <col width={"8%"} />
        </colgroup>
        <thead className="bg-gray-100">
          <tr>
            <th className="py-6">
              <Checkbox
                checked={selectedRows.length > 0 && selectedRows.length === data.length}
                onCheckedChange={allToggle}
              />
            </th>
            <th>뉴스레터로 이동</th>

            <th>썸네일</th>
            <th>아티클 제목</th>
            <th>요약</th>
            <th className="">
              {selectedRows.length > 0 && (
                <Button onClick={handleDelete} variant="destructive">
                  선택 삭제
                </Button>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((v) => (
            <tr key={v.id}>
              <td className="text-center">
                <Checkbox
                  checked={selectedRows.some((s) => s.id === v.id) || false}
                  onCheckedChange={() => {
                    if (selectedRows.some((s) => s.id === v.id)) {
                      setSelectedRows(selectedRows.filter((s) => s.id !== v.id))
                    } else {
                      setSelectedRows([...selectedRows, v])
                    }
                  }}
                />
              </td>
              <td className="text-center">
                <Link href={`/news-letter/${v.publisher_id}`} className="text-blue-600 hover:underline">
                  {v.publisher_id}
                </Link>
              </td>

              <td className="flex items-center justify-center">
                <Image src={v.thumbnail || "https://via.placeholder.com/48"} width={40} height={40} alt="" />
              </td>
              <td>{v.title}</td>
              <td>{v.summary?.slice(0, 20)}...</td>
              <td className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push(`/news-letter/${v.publisher_id}/article/${v.id}`)
                  }}
                >
                  수정
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteArticle(v.id)
                    toast("삭제되었습니다.")
                  }}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button onClick={handlePrev} disabled={page === 0}>
            PREV
          </Button>

          <span className="whitespace-nowrap">
            현재 페이지: <b>{searchParams.get("page")}</b>
          </span>

          <Button onClick={handleNext}>NEXT</Button>
        </div>
      </div>
    </div>
  )
}

export default ArticleTable
