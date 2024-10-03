"use client"

import React from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import Button from "../atoms/button"
import LabelTag from "../atoms/label-tag"
import ShareButton from "../atoms/share-button"
import ArticleCard from "../card/article-card"
import { Article, Publisher } from "@/app/_apis/detail-page/index.type"
import { useGetArticleQuery } from "@/app/_hooks/use-client-get-queries"
import { dateFormat } from "@/app/_utils/date-format"
import { filterByKeywordGroup } from "@/app/_utils/keyword"

const ArticleInfo = () => {
  const { article } = useParams()

  const { data } = useGetArticleQuery({ articleId: article as string })

  if (!data) return <></>
  if (!data.related_articles) return <></>

  const { related_articles } = data

  return (
    <div>
      <PC publisher={data.publisher} article={data.article} />
      <Mobile publisher={data.publisher} article={data.article} />
      <div className="bg-bg-4 h-screen px-20 py-40">
        <h4 className="text-mH3">관련 아티클</h4>

        <div className="h-16" />
        <div className="flex flex-col gap-28 md:grid md:grid-cols-4 md:gap-16">
          {related_articles.map((v) => {
            // TODO: 타입체크
            return <ArticleCard key={v.title} article={v as any} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ArticleInfo

interface DetailProps {
  publisher: Publisher
  article: Article
}

const PC = (props: DetailProps) => {
  const { article, publisher } = props

  return (
    <div className="hidden bg-white p-40 xl:block">
      <div className="gap-[66px] flex justify-between">
        <div className="flex flex-col gap-12">
          <h3 className="text-h4 flex items-center">
            {article.title} &nbsp;
            <ShareButton />
          </h3>

          <ul className="text-body5 li-marker-style flex list-disc flex-col gap-4">{article.summary}</ul>

          <span className="text-element2 text-gray-50">{dateFormat(article.created_at) + " 전"}</span>
        </div>

        <div className="rounded-16 relative h-[118px] w-[209px] shrink-0">
          <Image
            className="rounded-16 object-cover"
            src={article.thumbnail || "https://via.placeholder.com/400"}
            sizes="300px"
            fill
            alt="테스트 이미지"
          />
        </div>
      </div>

      <div className="h-28" />

      <div className="flex items-center justify-between">
        <div className="flex gap-8">
          <Image
            src={publisher.thumbnail || "https://via.placeholder.com/100"}
            alt="테스트 프로필"
            className="size-48 shrink-0 rounded-full object-cover"
            width={100}
            height={100}
          />

          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-6">
              <p className="text-body7 text-gray-80">{publisher.name}</p>
              {filterByKeywordGroup(publisher.keywords, ["직무", "목적", "고유", "해외"]).map((v) => (
                <LabelTag key={v.keyword_id}>{v.keyword_name}</LabelTag>
              ))}
            </div>

            <div className="text-gray-60 text-element2">{publisher.description}</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <Button color="white" className="w-[101px] h-40">
            <span className="text-body7 text-gray-80">{publisher.publisher_main}</span>
          </Button>
          <Button
            color="primary"
            className="w-[101px] h-40"
            onClick={() => globalThis?.window?.open(publisher.url_subscribe)}
          >
            <span className="text-body7 text-white">구독</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

const Mobile = (props: DetailProps) => {
  const { article, publisher } = props
  console.log("🚀 ~ Mobile ~ article, publisher:", article, publisher)

  return (
    <div className="block bg-white px-20 py-40 xl:hidden">
      <div className="rounded-20 relative shrink-0">
        <Image
          className="rounded-20 aspect-video w-full object-cover"
          src={article.thumbnail || "https://via.placeholder.com/400"}
          width={300}
          height={300}
          alt="테스트 이미지"
        />
      </div>

      <div className="h-16" />

      <h3 className="text-mH4 xl:text-h4 xl:flex xl:items-center">
        {article.title} &nbsp;
        <ShareButton />
      </h3>

      <div className="h-8" />

      <ul className="text-mBody3 li-marker-style flex list-disc flex-col gap-4 pl-10">
        {article.summary}

        {/* <li className="">2024년 개인정보 보호 트렌드: 광고 업계 변화</li>
        <li className="">구글 프라이버시 샌드박스: 새로운 개인정보 보호 방식 도입, 서드 파티 쿠키</li>
        <li className="">40대 이상 사용자 비중 증가하며, 주요 앱은 캐시워크, 타임스프레드, 발로소발로소득발로소득</li> */}
      </ul>

      <div className="h-16" />

      <span className="text-mElement1 text-gray-50">{dateFormat(article?.created_at) + " 전"}</span>

      <div className="h-32" />
      <div className="flex gap-8">
        <Image
          src={publisher.thumbnail || "https://via.placeholder.com/100"}
          alt="테스트 프로필"
          className="size-48 shrink-0 rounded-full object-cover"
          width={100}
          height={100}
        />

        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-mBody5 text-gray-80">{publisher.name}</p>
            {filterByKeywordGroup(publisher.keywords, ["직무", "목적", "고유", "해외"]).map((v) => (
              <LabelTag key={v.keyword_id}>{v.keyword_name}</LabelTag>
            ))}
          </div>

          <div className="text-gray-60 text-mElement1">{publisher.description}</div>
        </div>
      </div>
      <div className="h-16" />
      <div className="flex w-full items-center justify-center gap-8">
        <Button color="white" className="h-40 flex-1">
          <span className="text-mBody5 text-gray-80">{publisher.publisher_main}</span>
        </Button>
        <Button
          color="primary"
          className="h-40 flex-1"
          onClick={() => globalThis?.window?.open(publisher.url_subscribe)}
        >
          <span className="text-mBody5 text-white">구독</span>
        </Button>
      </div>
    </div>
  )
}
