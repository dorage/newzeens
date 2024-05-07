import { CAMPAIGNS } from "./campaign";

export const SLOTS: {
  [key in (typeof CAMPAIGNS)[number]["name"]]: {
    name: string;
    description: string;
    comment: string;
    preferences: number;
  }[];
} = {
  "추천 아티클": [
    {
      name: "기획자·마케터",
      description: "",
      comment: "",
      preferences: 0,
    },
    {
      name: "개발자",
      description: "",
      comment: "",
      preferences: 1,
    },
    {
      name: "디자이너",
      description: "",
      comment: "",
      preferences: 2,
    },
    {
      name: "누구나",
      description: "",
      comment: "",
      preferences: 3,
    },
  ],
  "뉴스레터 리스트": [
    {
      name: "전체",
      description: "",
      comment: "",
      preferences: 1,
    },
    {
      name: "IT",
      description: "",
      comment: "",
      preferences: 4,
    },
    {
      name: "마케팅/브랜딩",
      description: "",
      comment: "",
      preferences: 5,
    },
    {
      name: "라이프스타일",
      description: "",
      comment: "",
      preferences: 6,
    },
    {
      name: "경제/시사",
      description: "",
      comment: "",
      preferences: 7,
    },
    {
      name: "인문/저널리즘",
      description: "",
      comment: "",
      preferences: 8,
    },
    {
      name: "커리어",
      description: "",
      comment: "",
      preferences: 9,
    },
  ],
};
