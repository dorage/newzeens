import { Ky } from "@/src/libs/kysely";
import { z } from "@hono/zod-openapi";
import { sql } from "kysely";
import { PublisherSchema } from "kysely-schema";
import { zRes } from "./get";

export const getPublisherSpec = async (query: {
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
}): Promise<z.infer<typeof zRes.shape.publisher>> => {
  const publisher = await Ky.selectFrom("publishers")
    .selectAll()
    .where("id", "=", query.publisherId)
    .executeTakeFirstOrThrow();

  return publisher;
};

export const getKeywordsOfPublisher = async (query: {
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
}): Promise<z.infer<typeof zRes.shape.keywords>> => {
  // const publisherKeywords = await getPublisherKeywords(query);

  const keywords = await Ky.selectFrom("keyword_publisher_rels")
    .leftJoin("keyword_groups", "keyword_publisher_rels.keyword_group_id", "keyword_groups.id")
    .leftJoin("keywords", "keyword_publisher_rels.keyword_id", "keywords.id")
    .select(["keyword_groups.name as keyword_group_name", "keywords.name as keyword_name"])
    .where("publisher_id", "=", query.publisherId)
    .execute();

  const publisherKeywords = keywords.reduce((a, c) => {
    if (c.keyword_group_name == null) return a;
    a[c.keyword_group_name] = c.keyword_name;
    return a;
  }, {} as any);

  return publisherKeywords;
};

// 최근순 4개 필요
export const getRecentArticleOfPublisher = async (query: {
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
}): Promise<z.infer<typeof zRes.shape.recent_articles.element>[]> => {
  const recentArticles = await Ky.selectFrom("articles")
    .select(["id", "title", "summary", "created_at", "thumbnail"])
    .where("publisher_id", "=", query.publisherId)
    .orderBy("created_at desc")
    .limit(4)
    .execute();

  return recentArticles;
};

type RelatedPublisher = z.infer<typeof zRes.shape.related_publishers.element>;

// 직무/목적/고유 keyword_group 만 사용
// 직무 = 관계대상과 동일해야함
// 목적/고유 = 각 선택된 publihser간 하나 이상의 keyword만 겹치지 않아야함
// 노출시 직무/목적/고유 키워드 노출 필요
export const getRelatedPublishers = async (query: {
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
}): Promise<RelatedPublisher[]> => {
  const keywordGroups = await getPublisherKeywords({ publisherId: query.publisherId });

  const publisherKeywordIds = keywordGroups.reduce((a, c) => {
    if (c.keyword_group_name === "목적") a["목적"] = c.keyword_id;
    else if (c.keyword_group_name === "고유") a["고유"] = c.keyword_id;
    else if (c.keyword_group_name === "직무") a["직무"] = c.keyword_id;
    return a;
  }, {} as { 목적: number; 고유: number; 직무: number });

  if (publisherKeywordIds["목적"] == null) throw Error("It is not possible to join");
  if (publisherKeywordIds["직무"] == null) throw Error("It is not possible to join");
  if (publisherKeywordIds["고유"] == null) throw Error("It is not possible to join");

  const relatedPublishers: (RelatedPublisher & {
    직무_id: number;
    목적_id: number;
    고유_id: number;
  })[] = [];

  while (relatedPublishers.length < 4) {
    const random = await Ky.selectFrom((eb) =>
      eb
        .selectFrom("keyword_publisher_rels")
        .where("publisher_id", "!=", query.publisherId)
        .where("keyword_id", "==", publisherKeywordIds["목적"])
        .leftJoin("keywords", "keyword_publisher_rels.keyword_id", "keywords.id")
        .select(["publisher_id", `keyword_id as 목적_id`, "keywords.name as 목적"])
        .as("kpr1")
    )
      .leftJoin(
        (eb) =>
          eb
            .selectFrom("keyword_publisher_rels")
            .where("keyword_publisher_rels.keyword_group_id", "=", publisherKeywordIds["고유"])
            .leftJoin("keywords", "keyword_publisher_rels.keyword_id", "keywords.id")
            .select(["publisher_id", `keyword_id as 고유_id`, `keywords.name as 고유`])
            .as("kpr2"),
        (join) => join.onRef("kpr1.publisher_id", "=", "kpr2.publisher_id")
      )
      .leftJoin(
        (eb) =>
          eb
            .selectFrom("keyword_publisher_rels")
            .where("keyword_publisher_rels.keyword_group_id", "=", publisherKeywordIds["직무"])
            .leftJoin("keywords", "keyword_publisher_rels.keyword_id", "keywords.id")
            .select(["publisher_id", `keyword_id as 직무_id`, `keywords.name as 직무`])
            .as("kpr3"),
        (join) => join.onRef("kpr1.publisher_id", "=", "kpr3.publisher_id")
      )
      .leftJoin("publishers", "kpr1.publisher_id", "publishers.id")
      .where((eb) =>
        eb.not((eb) =>
          eb.and([
            eb("고유_id", "=", publisherKeywordIds["고유"]),
            eb("직무_id", "=", publisherKeywordIds["직무"]),
          ])
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(1)
      .select([
        "id",
        "name",
        "thumbnail",
        "description",
        "목적",
        "직무",
        "직무_id",
        "고유",
        "고유_id",
      ])
      .executeTakeFirstOrThrow();

    if (
      relatedPublishers.some(
        (e) => random["고유_id"] === e["고유_id"] && random["직무_id"] === e["직무_id"]
      )
    )
      continue;
    relatedPublishers.push(random as any);
  }

  return relatedPublishers;
};

// publisher의 모든 keyword_group의 keyword를 배열로 가져옵니다
// filter를 이용해서 필요한 keyword_group의 값을 찾아 작업
export const getPublisherKeywords = async (query: {
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
}) => {
  const keywords = await Ky.selectFrom((eb) =>
    eb
      .selectFrom("keyword_publisher_rels")
      .where("publisher_id", "=", query.publisherId)
      .selectAll()
      .as("kpr")
  )
    .leftJoin("keyword_groups as kg", "kpr.keyword_group_id", "kg.id")
    .leftJoin("keywords as k", "kpr.keyword_id", "k.id")
    .select([
      "kpr.keyword_group_id",
      "kg.name as keyword_group_name",
      "kpr.keyword_id",
      "k.name as keyword_name",
    ])
    .execute();
  return keywords;
};
