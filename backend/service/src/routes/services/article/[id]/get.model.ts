import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import { queryPublisherWithKeywords } from "@/src/providers/publishers";
import { z } from "@hono/zod-openapi";
import { sql } from "kysely";
import { ArticleSchema } from "kysely-schema";
import { zRes } from "./get";

// publisher의 분야/목적/고유/해외 키워드 필요
export const getArticleSpec = async (query: {
  articleId: z.infer<typeof ArticleSchema.shape.id>;
}) => {
  const article = await Ky.selectFrom((eb) =>
    eb.selectFrom("articles").selectAll().where("id", "=", query.articleId).as("a")
  )
    .selectAll()
    .executeTakeFirstOrThrow();

  return zRes.shape.article.parse(article);
};

export const getPublisherSpec = async (query: {
  articleId: z.infer<typeof ArticleSchema.shape.id>;
}) => {
  const publisher = await Ky.selectFrom((eb) =>
    eb
      .selectFrom("publishers")
      .selectAll()
      .where((qb) =>
        qb.eb(
          "id",
          "=",
          qb
            .selectFrom("articles")
            .select("publisher_id")
            .where("id", "=", query.articleId)
            .limit(1)
        )
      )
      .as("p")
  )
    .leftJoin(
      (eb) =>
        eb
          .selectFrom((eb) =>
            eb
              .selectFrom("keyword_publisher_rels")
              .selectAll()
              .where((qb) =>
                qb.eb(
                  "publisher_id",
                  "=",
                  qb
                    .selectFrom("articles")
                    .select("publisher_id")
                    .where("id", "=", query.articleId)
                    .limit(1)
                )
              )
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

// 분야/목적/고유 keyword_group 만 사용
// 분야 = 관계대상과 동일해야함
// 목적/고유 = 각 선택된 publihser간 하나 이상의 keyword만 겹치지 않아야함
// 노출시 분야/목적/고유 키워드 노출 필요
export const getRelatedArticles = async (query: { articleId: string }) => {
  const publisherQuery = await queryPublisherWithKeywords();

  const targetPublisher = await publisherQuery()
    .where((qb) =>
      qb.eb(
        "id",
        "=",
        qb.selectFrom("articles").select("publisher_id").where("id", "=", query.articleId)
      )
    )
    .executeTakeFirstOrThrow();

  const relatedArticles = await Ky.selectFrom((eb) =>
    publisherQuery(eb)
      .where("분야" as any, "=", targetPublisher["분야"])
      .where("id", "!=", targetPublisher.id)
      .orderBy(sql`RANDOM()`)
      .limit(4)
      .as("p")
  )
    .leftJoin(
      (eb) =>
        eb
          .selectFrom("articles")
          .selectAll()
          .orderBy(sql`RANDOM()`)
          .as("a"),
      (join) => join.onRef("p.id", "=", "a.publisher_id")
    )
    .leftJoin(
      (eb) => eb.selectFrom("publishers").selectAll().as("ps"),
      (join) => join.onRef("p.id", "=", "ps.id")
    )
    .groupBy("p.id")
    .select(() => [
      sql<string>`a.id`.as("id"),
      sql<string>`a.title`.as("title"),
      sql<string>`a.created_at`.as("created_at"),
      sql<string>`JSON_OBJECT(
				'id', ps.id,
				'name', ps.name,
				'keywords', p.keywords
			)`.as("publisher"),
    ])
    .execute();

  return zRes.shape.related_articles.parse(relatedArticles);
};

export const getAnyArticles = async (query: { articleId: string; limit: number }) => {
  const publisherQuery = await queryPublisherWithKeywords();

  const targetPublisher = await publisherQuery()
    .where((qb) =>
      qb.eb(
        "id",
        "=",
        qb.selectFrom("articles").select("publisher_id").where("id", "=", query.articleId)
      )
    )
    .executeTakeFirstOrThrow();

  const relatedArticles = await Ky.selectFrom((eb) =>
    publisherQuery(eb)
      .orderBy(sql`RANDOM()`)
      .limit(4)
      .as("p")
  )
    .leftJoin(
      (eb) =>
        eb
          .selectFrom("articles")
          .selectAll()
          .where("id", "!=", query.articleId)
          .orderBy(sql`RANDOM()`)
          .as("a"),
      (join) => join.onRef("p.id", "=", "a.publisher_id")
    )
    .leftJoin(
      (eb) => eb.selectFrom("publishers").selectAll().as("ps"),
      (join) => join.onRef("p.id", "=", "ps.id")
    )
    .groupBy("p.id")
    .select(() => [
      sql<string>`a.id`.as("id"),
      sql<string>`a.title`.as("title"),
      sql<string>`a.created_at`.as("created_at"),
      sql<string>`JSON_OBJECT(
				'id', ps.id,
				'name', ps.name,
				'keywords', p.keywords
			)`.as("publisher"),
    ])
    .execute();

  return zRes.shape.related_articles.parse(relatedArticles);
};
