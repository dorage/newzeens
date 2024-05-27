import React from "react"
import Image from "next/image"
import Button from "../atoms/button"
import GPTMark from "../atoms/gpt-mark"
import LabelTag from "../atoms/label-tag"
import ShareButton from "../atoms/share-button"
import withModalProps from "@/app/_hoc/with-modal-props"
import { dateFormat } from "@/app/_utils/date-format"
import { CloseIcon } from "@/public/icons"

interface ArticleInfoProps {}

const ArticleInfo = (props: ArticleInfoProps) => {
  return (
    <div>
      <PC />
      <Mobile />
      <div className="bg-bg-4 h-screen px-20 py-40">리스트 영역</div>
    </div>
  )
}

export default ArticleInfo

const PC = () => {
  return (
    <div className="hidden bg-white p-40 xl:block">
      <div className="gap-66 flex justify-between">
        <div className="flex flex-col gap-12">
          <h3 className="text-h4 flex items-center">
            마케터라면 반드시 알아야 할 2024 개인정보 보호 변화 &nbsp;
            <ShareButton />
          </h3>

          <ul className="text-body5 li-marker-style flex list-disc flex-col gap-4">
            <li className="">2024년 개인정보 보호 트렌드: 광고 업계 변화</li>
            <li className="">구글 프라이버시 샌드박스: 새로운 개인정보 보호 방식 도입, 서드 파티 쿠키</li>
            <li className="">
              40대 이상 사용자 비중 증가하며, 주요 앱은 캐시워크, 타임스프레드, 발로소발로소득발로소득
            </li>
            <li className="">
              40대 이상 사용자 비중 증가하며, 주요 앱은 캐시워크, 타임스프레드, 발로소발로소득발로소득
            </li>
            <li className="">
              40대 이상 사용자 비중 증가하며, 주요 앱은 캐시워크, 타임스프레드, 발로소발로소득발로소득
            </li>
            <li className="">
              40대 이상 사용자 비중 증가하며, 주요 앱은 캐시워크, 타임스프레드,
              발로소발로소득발로소득발로소발로소득발로소득발로소발로소득발로소득발로소발로소득발로소득
            </li>
          </ul>

          <span className="text-element2 text-gray-50">{dateFormat("2024-01-15T18:26:57.720993+09:00") + " 전"}</span>
        </div>

        <div className="rounded-16 relative h-[11.8rem] w-[20.9rem] shrink-0">
          <Image
            className="rounded-16 object-cover"
            src={"https://via.placeholder.com/400"}
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
            src={"https://via.placeholder.com/100"}
            alt="테스트 프로필"
            className="size-48 shrink-0 rounded-full object-cover"
            width={100}
            height={100}
          />

          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-6">
              <p className="text-body7 text-gray-80">뉴스레터명</p>
              <LabelTag>트렌드</LabelTag>
              <LabelTag>인사이트</LabelTag>
            </div>

            <div className="text-gray-60 text-element2">뉴스레터 소개글 (description)</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <Button color="white" className="w-101 h-40">
            <span className="text-body7 text-gray-80">뉴스레터 홈</span>
          </Button>
          <Button color="primary" className="w-101 h-40">
            <span className="text-body7 text-white">구독</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

const Mobile = () => {
  return (
    <div className="block bg-white px-20 py-40 xl:hidden">
      <div className="rounded-20 relative shrink-0">
        <Image
          className="rounded-20 aspect-video w-full object-cover"
          src={"https://via.placeholder.com/400"}
          width={300}
          height={300}
          alt="테스트 이미지"
        />
      </div>

      <div className="h-16" />

      <h3 className="text-mH4 xl:text-h4 xl:flex xl:items-center">
        마케터라면 반드시 알아야 할 2024 개인정보 보호 변화 &nbsp;
        <ShareButton />
      </h3>

      <div className="h-8" />

      <ul className="text-mBody3 li-marker-style flex list-disc flex-col gap-4 pl-10">
        <li className="">2024년 개인정보 보호 트렌드: 광고 업계 변화</li>
        <li className="">구글 프라이버시 샌드박스: 새로운 개인정보 보호 방식 도입, 서드 파티 쿠키</li>
        <li className="">40대 이상 사용자 비중 증가하며, 주요 앱은 캐시워크, 타임스프레드, 발로소발로소득발로소득</li>
      </ul>

      <div className="h-16" />

      <span className="text-mElement1 text-gray-50">{dateFormat("2024-01-15T18:26:57.720993+09:00") + " 전"}</span>

      <div className="h-32" />
      <div className="flex gap-8">
        <Image
          src={"https://via.placeholder.com/100"}
          alt="테스트 프로필"
          className="size-48 shrink-0 rounded-full object-cover"
          width={100}
          height={100}
        />

        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-mBody5 text-gray-80">뉴스레터명</p>
            <LabelTag>트렌드</LabelTag>
            <LabelTag>인사이트</LabelTag>
          </div>

          <div className="text-gray-60 text-mElement1">뉴스레터 소개글 (description)</div>
        </div>
      </div>
      <div className="h-16" />
      <div className="flex w-full items-center justify-center gap-8">
        <Button color="white" className="h-40 flex-1">
          <span className="text-mBody5 text-gray-80">뉴스레터 홈</span>
        </Button>
        <Button color="primary" className="h-40 flex-1">
          <span className="text-mBody5 text-white">구독</span>
        </Button>
      </div>
    </div>
  )
}
