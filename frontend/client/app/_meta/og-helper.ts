import { OpenGraph, OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types"
import { Twitter } from "next/dist/lib/metadata/types/twitter-types"

interface OGProps {
  title?: string
  description?: string
  images?: string[]
  type?: OpenGraphType
  addUrl?: string
  card?: "summary_large_image" | "summary" | "player" | "app"
  authors?: null | string | URL | Array<string | URL>
}

/** ------------------------------------------------------------------------------
 * 
 * 오픈그래프와 트위터 메타태그를 만족시켜주는 객체를 만드는 함수
 * 
 * @usage
 * ```
 * export async function generateMetadata() {
 *  ...
 *  return {
 *    title: "제목",
 *    description: "설명",
 *    ...OG({...props}),
 *  }
 * }
 * ```
 * 
 ------------------------------------------------------------------------------ */
export const OG = (props: OGProps) => {
  const {
    type = "website",
    card = "summary_large_image",
    title = "메일리스트",
    description = "세상의 모든 뉴스레터, 여기에 다있다!",
    addUrl = "",
    images = [],
    authors = "승모근보톡스",
  } = props

  return {
    openGraph: {
      title,
      description,
      images,
      url: process.env.NEXT_PUBLIC_SENSE_WEB_URL + addUrl,
      type,
      siteName: "maillist | 메일리스트",
      countryName: "Seongnam-si, Gyeonggi-do, Korea",
      authors,
    } satisfies OpenGraph,
    twitter: {
      title,
      description,
      images,
      card,
    } satisfies Twitter,
  }
}
