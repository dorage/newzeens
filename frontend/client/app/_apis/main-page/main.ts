import { CAMPAIGN } from "./constants"
import { CampaignArticlesResponse, CampaignPublishersResponse } from "./main.type"
import fetch from "../fetch"

export const getCampaignArticles = (id: number) => `/campaign/${id}/article`
export const getCampaignPublisher = (id: number) => `/campaign/${id}/publisher?limit=6`

const mainApi = {
  getRecommendArticles: async () => {
    const response = await fetch(getCampaignArticles(CAMPAIGN.top))
    return response as CampaignArticlesResponse
  },

  getRecommendPublishers: async () => {
    const response = await fetch(getCampaignPublisher(CAMPAIGN.bottom))
    return response as CampaignPublishersResponse
  },
}

export default mainApi

const test = {
  name: "추천 아티클",
  slots: [
    {
      articles: [
        {
          publisher: {
            keywords: [
              { keyword_id: 44, keyword_name: "마케팅/브랜딩", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 65, keyword_name: "인사이트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 102, keyword_name: "격주", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "ddfyhf",
            name: "DGQ",
          },
          id: "2abr2e",
          title: "👀[디지큐] 34조 가치, 캔바의 포지셔닝 & GTM 전략",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/2abr2e/1728822759084-2abr2e.jpg",
          created_at: "2024-10-13T12:32:38.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 44, keyword_name: "마케팅/브랜딩", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 66, keyword_name: "빅데이터", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "sgpktm",
            name: "와이즈앱리테일굿즈",
          },
          id: "4hs465",
          title: "올리브영, 앱 사용자 700만 명 돌파하며 역대 최대 기록",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/4hs465/1728823217874-4hs465.png",
          created_at: "2024-10-13T12:40:17.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 64, keyword_name: "프로덕트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 98, keyword_name: "무작위", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "odsljy",
            name: "요즘IT",
          },
          id: "bekyz6",
          title: "앞으로 마케팅의 미래는 어떻게 될까?",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/bekyz6/1728823261103-bekyz6.png",
          created_at: "2024-10-13T12:41:00.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 44, keyword_name: "마케팅/브랜딩", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 54, keyword_name: "트렌드", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 65, keyword_name: "인사이트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 101, keyword_name: "주 2회 이상", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "acsfnx",
            name: "트렌드어워드",
          },
          id: "r6x8zh",
          title: "[Trend A Word #342] 제목은 흑백요리사로 하겠습니다. 그런데 이제 최강록을 곁들인,, ",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/r6x8zh/1728823135972-r6x8zh.jpeg",
          created_at: "2024-10-13T12:38:55.000Z",
        },
      ],
      name: "기획자 · 마케터",
    },
    {
      articles: [
        {
          publisher: {
            keywords: [
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 64, keyword_name: "프로덕트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 98, keyword_name: "무작위", keyword_group_id: 14, keyword_group_name: "발송주기" },
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 64, keyword_name: "프로덕트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 98, keyword_name: "무작위", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "odsljy",
            name: "요즘IT",
          },
          id: "dza3xk",
          title: "[파이콘 한국 2024 미리보기] 10번째 파이콘은 어떤 모습일까?",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/dza3xk/1728823236142-dza3xk.png",
          created_at: "2024-10-13T12:40:35.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 49, keyword_name: "개발자", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 61, keyword_name: "보안", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "yygpsz",
            name: "팀코코넛",
          },
          id: "eqch9h",
          title: "[코코넛 뉴스] 개인정보 국외 이전 미고지…‘알리’ 과징금 19억7천만 원",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/eqch9h/1728823036711-eqch9h.jpg",
          created_at: "2024-10-13T12:37:16.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 60, keyword_name: "기술", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 90, keyword_name: "", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 99, keyword_name: "", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "ynmecs",
            name: "Daily Prompt",
          },
          id: "gy2uou",
          title: "🔎 #360: 영상 생성 AI Pika 1.5 업데이트",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/gy2uou/1728822631263-gy2uou.jpeg",
          created_at: "2024-10-13T12:30:31.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 64, keyword_name: "프로덕트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 98, keyword_name: "무작위", keyword_group_id: 14, keyword_group_name: "발송주기" },
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 64, keyword_name: "프로덕트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 98, keyword_name: "무작위", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "odsljy",
            name: "요즘IT",
          },
          id: "hdo6cy",
          title: "웹사이트는 어떻게 찾아갈까? IP, DNS, URL 개념 잡기",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/hdo6cy/1728823248744-hdo6cy.jpeg",
          created_at: "2024-10-13T12:40:48.000Z",
        },
      ],
      name: "개발자",
    },
    {
      articles: [
        {
          publisher: {
            keywords: [
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 62, keyword_name: "요약", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 62, keyword_name: "요약", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "yffaji",
            name: "일분톡",
          },
          id: "634azk",
          title: "👍 AI의 50억 달러 가치",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/634azk/1728822956736-634azk.png",
          created_at: "2024-10-13T12:35:55.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 62, keyword_name: "요약", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 62, keyword_name: "요약", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "yffaji",
            name: "일분톡",
          },
          id: "kofnmu",
          title: "👍 애플 이렇게 변신한다",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/kofnmu/1728822950081-kofnmu.JPG",
          created_at: "2024-10-13T12:35:49.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 44, keyword_name: "마케팅/브랜딩", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 66, keyword_name: "빅데이터", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "sgpktm",
            name: "와이즈앱리테일굿즈",
          },
          id: "monpyp",
          title: "숏폼 vs OTT : 사용자 및 사용시간 트렌드 분석",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/monpyp/1728823200846-monpyp.png",
          created_at: "2024-10-13T12:39:59.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 43, keyword_name: "IT", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 65, keyword_name: "인사이트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 90, keyword_name: "", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 99, keyword_name: "", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "frmwzy",
            name: "아웃스탠딩",
          },
          id: "xhaxrb",
          title: "🧐 8400억 스타트업 펀드, 어느 VC가 받았을까? 선정사 20곳, 탈락사 20곳 총정리",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/xhaxrb/1728823068734-xhaxrb.png",
          created_at: "2024-10-13T12:37:48.000Z",
        },
      ],
      name: "디자이너",
    },
    {
      articles: [
        {
          publisher: {
            keywords: [
              { keyword_id: 45, keyword_name: "라이프스타일", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 52, keyword_name: "누구나", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 55, keyword_name: "취미", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 71, keyword_name: "음악", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "vowkuv",
            name: "FAPER",
          },
          id: "3fefu6",
          title: "😭 덕후 과몰입 유발하는 레전드 밴드",
          thumbnail:
            "https://api.maillist.site/image/maillis-production/articles/3fefu6/1728822817042-3fefu6.jpg%3Fv%3D1660439179",
          created_at: "2024-10-13T12:33:36.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 44, keyword_name: "마케팅/브랜딩", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 66, keyword_name: "빅데이터", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "sgpktm",
            name: "와이즈앱리테일굿즈",
          },
          id: "ppukpy",
          title: "한국인 숏폼 앱 월평균 사용시간, OTT 앱보다 7배 길어",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/ppukpy/1728823209913-ppukpy.png",
          created_at: "2024-10-13T12:40:09.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 44, keyword_name: "마케팅/브랜딩", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 54, keyword_name: "트렌드", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 65, keyword_name: "인사이트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 101, keyword_name: "주 2회 이상", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "acsfnx",
            name: "트렌드어워드",
          },
          id: "r6x8zh",
          title: "[Trend A Word #342] 제목은 흑백요리사로 하겠습니다. 그런데 이제 최강록을 곁들인,, ",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/r6x8zh/1728823135972-r6x8zh.jpeg",
          created_at: "2024-10-13T12:38:55.000Z",
        },
        {
          publisher: {
            keywords: [
              { keyword_id: 44, keyword_name: "마케팅/브랜딩", keyword_group_id: 8, keyword_group_name: "분야" },
              { keyword_id: 50, keyword_name: "기획자 · 마케터", keyword_group_id: 9, keyword_group_name: "직무" },
              { keyword_id: 53, keyword_name: "업무", keyword_group_id: 10, keyword_group_name: "목적" },
              { keyword_id: 65, keyword_name: "인사이트", keyword_group_id: 11, keyword_group_name: "고유" },
              { keyword_id: 88, keyword_name: "", keyword_group_id: 12, keyword_group_name: "해외" },
              { keyword_id: 91, keyword_name: "무료", keyword_group_id: 13, keyword_group_name: "구독비" },
              { keyword_id: 94, keyword_name: "주 1회", keyword_group_id: 14, keyword_group_name: "발송주기" },
            ],
            id: "qodcvv",
            name: "돌멩이레터",
          },
          id: "zgqmsp",
          title: "#95. 한글과자 - 타일러와 니디가 만든 '한글과자'를 아시나요?",
          thumbnail: "https://api.maillist.site/image/maillis-production/articles/zgqmsp/1728822774311-zgqmsp.png",
          created_at: "2024-10-13T12:32:54.000Z",
        },
      ],
      name: "누구나",
    },
  ],
}
