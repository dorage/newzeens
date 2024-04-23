import { Ky } from "@/src/libs/kysely";
import { z } from "@hono/zod-openapi";
import { sql } from "kysely";
import { PublisherSchema } from "kysely-schema";
import { zRes } from "./get";
import OpenAPISchema from "@/src/openapi/schemas";
import { getPublisherKeywords } from "@/src/providers/publishers";

export const getPublisherSpec = async (query: {
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
}): Promise<z.infer<typeof zRes.shape.publisher>> => {
  const publisher = await Ky.selectFrom((eb) =>
    eb.selectFrom("publishers").selectAll().where("id", "=", query.publisherId).as("p")
  )
    .leftJoin(
      (eb) =>
        eb
          .selectFrom((eb) =>
            eb
              .selectFrom("keyword_publisher_rels")
              .selectAll()
              .where("publisher_id", "=", query.publisherId)
              .as("_kpr")
          )
          .leftJoin("keywords", "keywords.id", "_kpr.keyword_id")
          .leftJoin("keyword_groups", "keyword_groups.id", "_kpr.keyword_group_id")
          .groupBy("publisher_id")
          .select(() => [
            sql<string>`publisher_id`.as("publisher_id"),
            sql<z.infer<typeof OpenAPISchema.Keyword>>`JSON_GROUP_ARRAY(JSON_OBJECT(
						'keyword_id', keywords.id, 'keyword_name', keywords.name, 'keyword_group_id', keyword_groups.id, 'keyword_group_name', keyword_groups.name
						))`.as("keywords"),
          ])
          .as("kpr"),
      (join) => join.onRef("p.id", "=", "kpr.publisher_id")
    )
    .selectAll()
    .executeTakeFirstOrThrow();

  return zRes.shape.publisher.parse(publisher);
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
  // select all publisher whose is_enabled is true
  // join keyword_publisher_rels where 목적 is same with publisherId
  // filter keyword_id is same with publisherId
  // join 직무 and 고유 on same publisher_id
  // order random
  // groupby 직무_id and 고유_id
  // limit4

  const keywordGroups = await getPublisherKeywords({ publisherId: query.publisherId });

  const publisherKeywordIds = keywordGroups.reduce((a, c) => {
    if (c.keyword_group_name === "목적") a["목적"] = c;
    else if (c.keyword_group_name === "고유") a["고유"] = c;
    else if (c.keyword_group_name === "직무") a["직무"] = c;
    return a;
  }, {} as { 목적: z.infer<typeof OpenAPISchema.Keyword>; 고유: z.infer<typeof OpenAPISchema.Keyword>; 직무: z.infer<typeof OpenAPISchema.Keyword> });

  if (publisherKeywordIds["목적"] == null) throw Error("It is not possible to join");
  if (publisherKeywordIds["직무"] == null) throw Error("It is not possible to join");
  if (publisherKeywordIds["고유"] == null) throw Error("It is not possible to join");

  const publishers = await Ky.selectFrom((eb) =>
    eb
      .selectFrom((eb) =>
        eb
          .selectFrom("publishers")
          .selectAll()
          .where("is_enabled", "=", sql`TRUE`)
          .where("id", "!=", query.publisherId)
          .as("_p")
      )
      .leftJoin("keyword_publisher_rels", "_p.id", "keyword_publisher_rels.publisher_id")
      .where("keyword_id", "=", publisherKeywordIds["목적"].keyword_id)
      .select(["id", "name", "thumbnail", "description", "keyword_id as 목적_id"])
      .as("p")
  )
    .leftJoin(
      (eb) =>
        eb
          .selectFrom((eb) =>
            eb
              .selectFrom("keyword_publisher_rels")
              .selectAll()
              .where("keyword_id", "=", publisherKeywordIds["목적"].keyword_id)
              .as("_kpr1")
          )
          .leftJoin("keywords", "_kpr1.keyword_id", "keywords.id")
          .select(() => [
            sql<string>`publisher_id`.as("publisher_id"),
            sql<z.infer<typeof OpenAPISchema.Keyword>>`JSON_OBJECT(
						'keyword_id', keywords.id, 'keyword_name', keywords.name, 'keyword_group_id', ${publisherKeywordIds["목적"].keyword_group_id}, 'keyword_group_name', '목적')`.as(
              "목적"
            ),
          ])
          .as("kpr1"),
      (join) => join.onRef("kpr1.publisher_id", "=", "p.id")
    )
    .leftJoin(
      (eb) =>
        eb
          .selectFrom((eb) =>
            eb
              .selectFrom("keyword_publisher_rels")
              .selectAll()
              .where("keyword_group_id", "=", publisherKeywordIds["고유"].keyword_group_id)
              .as("_kpr2")
          )
          .leftJoin("keywords", "_kpr2.keyword_id", "keywords.id")
          .select(() => [
            sql<string>`publisher_id`.as("publisher_id"),
            sql<z.infer<typeof OpenAPISchema.Keyword>>`JSON_OBJECT(
						'keyword_id', keywords.id, 'keyword_name', keywords.name, 'keyword_group_id', ${publisherKeywordIds["고유"].keyword_group_id}, 'keyword_group_name', '고유')`.as(
              "고유"
            ),
          ])
          .as("kpr2"),
      (join) => join.onRef("kpr2.publisher_id", "=", "p.id")
    )
    .leftJoin(
      (eb) =>
        eb
          .selectFrom((eb) =>
            eb
              .selectFrom("keyword_publisher_rels")
              .selectAll()
              .where("keyword_group_id", "=", publisherKeywordIds["직무"].keyword_group_id)
              .as("_kpr3")
          )
          .leftJoin("keywords", "_kpr3.keyword_id", "keywords.id")
          .select(() => [
            sql<string>`publisher_id`.as("publisher_id"),
            sql<
              z.infer<typeof OpenAPISchema.Keyword>
            >`JSON_OBJECT('keyword_id', keywords.id, 'keyword_name', keywords.name, 'keyword_group_id', ${publisherKeywordIds["직무"].keyword_group_id}, 'keyword_group_name', '직무')`.as(
              "직무"
            ),
          ])
          .as("kpr3"),
      (join) => join.onRef("kpr3.publisher_id", "=", "p.id")
    )
    .select(() => [
      sql<z.infer<typeof PublisherSchema.shape.id>>`id`.as("id"),
      sql<z.infer<typeof PublisherSchema.shape.name>>`name`.as("name"),
      sql<z.infer<typeof PublisherSchema.shape.thumbnail>>`thumbnail`.as("thumbnail"),
      sql<z.infer<typeof PublisherSchema.shape.description>>`description`.as("description"),
      sql<z.infer<typeof OpenAPISchema.Keyword>[]>`JSON_ARRAY(고유, 직무, 목적)`.as("keywords"),
    ])
    .orderBy(sql`RANDOM()`)
    .limit(4)
    .execute();

  return publishers;
};
