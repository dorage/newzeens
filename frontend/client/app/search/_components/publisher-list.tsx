"use client"

import NewsLetterItem from "@/app/_components/home/news-letter-list/news-letter-item"
import { useSearchParams } from "next/navigation"
import React from "react"
import { useInView } from "react-intersection-observer"

const mock = [
  {
    keywords: [
      {
        keyword_id: 2,
        keyword_name: "마케팅/브랜딩",
        keyword_group_id: 1,
        keyword_group_name: "분야",
      },
      {
        keyword_id: 8,
        keyword_name: "기획자 · 마케터",
        keyword_group_id: 2,
        keyword_group_name: "직무",
      },
      {
        keyword_id: 12,
        keyword_name: "트렌드",
        keyword_group_id: 3,
        keyword_group_name: "목적",
      },
      {
        keyword_id: 23,
        keyword_name: "인사이트",
        keyword_group_id: 4,
        keyword_group_name: "고유",
      },
      {
        keyword_id: 46,
        keyword_name: "",
        keyword_group_id: 5,
        keyword_group_name: "해외",
      },
      {
        keyword_id: 49,
        keyword_name: "무료",
        keyword_group_id: 6,
        keyword_group_name: "구독비",
      },
      {
        keyword_id: 59,
        keyword_name: "주 2회 이상",
        keyword_group_id: 7,
        keyword_group_name: "발송주기",
      },
    ],
    id: "bvroqu",
    name: "어거스트",
    description: "지금을 읽는 미디어 뉴스레터. 휘발되지 않는 인사이트를 담아 전달하는 뉴스레터",
    thumbnail: "https://picsum.photos/seed/bvroqu/200/300",
  },
  {
    keywords: [
      {
        keyword_id: 1,
        keyword_name: "IT",
        keyword_group_id: 1,
        keyword_group_name: "분야",
      },
      {
        keyword_id: 8,
        keyword_name: "기획자 · 마케터",
        keyword_group_id: 2,
        keyword_group_name: "직무",
      },
      {
        keyword_id: 12,
        keyword_name: "트렌드",
        keyword_group_id: 3,
        keyword_group_name: "목적",
      },
      {
        keyword_id: 18,
        keyword_name: "기술",
        keyword_group_id: 4,
        keyword_group_name: "고유",
      },
      {
        keyword_id: 46,
        keyword_name: "",
        keyword_group_id: 5,
        keyword_group_name: "해외",
      },
      {
        keyword_id: 49,
        keyword_name: "무료",
        keyword_group_id: 6,
        keyword_group_name: "구독비",
      },
      {
        keyword_id: 56,
        keyword_name: "무작위",
        keyword_group_id: 7,
        keyword_group_name: "발송주기",
      },
    ],
    id: "daaccf",
    name: "Yumm-IT",
    description: "삼성SDS의 맛있는 IT 뉴스레터. IT 업계 트렌드부터 필수 상식까지 전해주는 뉴스레터",
    thumbnail: "https://picsum.photos/seed/daaccf/200/300",
  },
  {
    keywords: [
      {
        keyword_id: 1,
        keyword_name: "IT",
        keyword_group_id: 1,
        keyword_group_name: "분야",
      },
      {
        keyword_id: 9,
        keyword_name: "디자이너",
        keyword_group_id: 2,
        keyword_group_name: "직무",
      },
      {
        keyword_id: 11,
        keyword_name: "업무",
        keyword_group_id: 3,
        keyword_group_name: "목적",
      },
      {
        keyword_id: 22,
        keyword_name: "프로덕트",
        keyword_group_id: 4,
        keyword_group_name: "고유",
      },
      {
        keyword_id: 47,
        keyword_name: "해외",
        keyword_group_id: 5,
        keyword_group_name: "해외",
      },
      {
        keyword_id: 49,
        keyword_name: "무료",
        keyword_group_id: 6,
        keyword_group_name: "구독비",
      },
      {
        keyword_id: 57,
        keyword_name: "",
        keyword_group_id: 7,
        keyword_group_name: "발송주기",
      },
    ],
    id: "ewlnnr",
    name: "The UX Collective Newsletter",
    description: "디자이너가 비판적으로 생각할 수 있도록 프로덕트 관련 아티클을 전해주는 뉴스레터",
    thumbnail: "https://picsum.photos/seed/ewlnnr/200/300",
  },
  {
    keywords: [
      {
        keyword_id: 3,
        keyword_name: "라이프스타일",
        keyword_group_id: 1,
        keyword_group_name: "분야",
      },
      {
        keyword_id: 10,
        keyword_name: "누구나",
        keyword_group_id: 2,
        keyword_group_name: "직무",
      },
      {
        keyword_id: 13,
        keyword_name: "취미",
        keyword_group_id: 3,
        keyword_group_name: "목적",
      },
      {
        keyword_id: 30,
        keyword_name: "음식",
        keyword_group_id: 4,
        keyword_group_name: "고유",
      },
      {
        keyword_id: 46,
        keyword_name: "",
        keyword_group_id: 5,
        keyword_group_name: "해외",
      },
      {
        keyword_id: 49,
        keyword_name: "무료",
        keyword_group_id: 6,
        keyword_group_name: "구독비",
      },
      {
        keyword_id: 52,
        keyword_name: "주 1회",
        keyword_group_id: 7,
        keyword_group_name: "발송주기",
      },
    ],
    id: "fknfit",
    name: "주간 배짱이",
    description: "배달의민족'을 '짱' 좋아하는 '이'들, '배짱이'들을 위한 음식 정보 뉴스레터",
    thumbnail: "https://picsum.photos/seed/fknfit/200/300",
  },
  {
    keywords: [
      {
        keyword_id: 3,
        keyword_name: "라이프스타일",
        keyword_group_id: 1,
        keyword_group_name: "분야",
      },
      {
        keyword_id: 10,
        keyword_name: "누구나",
        keyword_group_id: 2,
        keyword_group_name: "직무",
      },
      {
        keyword_id: 13,
        keyword_name: "취미",
        keyword_group_id: 3,
        keyword_group_name: "목적",
      },
      {
        keyword_id: 36,
        keyword_name: "성장",
        keyword_group_id: 4,
        keyword_group_name: "고유",
      },
      {
        keyword_id: 46,
        keyword_name: "",
        keyword_group_id: 5,
        keyword_group_name: "해외",
      },
      {
        keyword_id: 49,
        keyword_name: "무료",
        keyword_group_id: 6,
        keyword_group_name: "구독비",
      },
      {
        keyword_id: 52,
        keyword_name: "주 1회",
        keyword_group_id: 7,
        keyword_group_name: "발송주기",
      },
    ],
    id: "igznks",
    name: "사이드",
    description: "좋아하는 것이 너무 많아 고민인 사람들을 위한 뉴스레터",
    thumbnail: "https://picsum.photos/seed/igznks/200/300",
  },
  {
    keywords: [
      {
        keyword_id: 3,
        keyword_name: "라이프스타일",
        keyword_group_id: 1,
        keyword_group_name: "분야",
      },
      {
        keyword_id: 10,
        keyword_name: "누구나",
        keyword_group_id: 2,
        keyword_group_name: "직무",
      },
      {
        keyword_id: 13,
        keyword_name: "취미",
        keyword_group_id: 3,
        keyword_group_name: "목적",
      },
      {
        keyword_id: 33,
        keyword_name: "반려동물",
        keyword_group_id: 4,
        keyword_group_name: "고유",
      },
      {
        keyword_id: 46,
        keyword_name: "",
        keyword_group_id: 5,
        keyword_group_name: "해외",
      },
      {
        keyword_id: 49,
        keyword_name: "무료",
        keyword_group_id: 6,
        keyword_group_name: "구독비",
      },
      {
        keyword_id: 59,
        keyword_name: "주 2회 이상",
        keyword_group_id: 7,
        keyword_group_name: "발송주기",
      },
    ],
    id: "itzrzz",
    name: "비마이펫",
    description: "반려동물 지식 정보 채널, 비마이펫 라이프가 만드는 반려동물 뉴스레터",
    thumbnail: "https://picsum.photos/seed/itzrzz/200/300",
  },
]

interface PublisherListProps {}

const PublisherList = (props: PublisherListProps) => {
  const {} = props

  const searchParams = useSearchParams()
  const word = searchParams.get("word") as string

  const { ref, inView } = useInView()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-24 md:gap-x-16 md:gap-y-52">
      {mock.map((v) => (
        <NewsLetterItem key={v.id} publisher={v} highlightWord={word} />
      ))}
      <div ref={ref} />
    </div>
  )
}

export default PublisherList
