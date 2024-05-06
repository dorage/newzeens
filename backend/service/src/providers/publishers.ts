import { Ky } from "@/src/libs/kysely";
import { z } from "@hono/zod-openapi";
import { ExpressionBuilder, sql } from "kysely";
import { DB, PublisherSchema } from "kysely-schema";
import OpenAPISchema from "../openapi/schemas";

// publisher의 모든 keyword_group의 keyword를 배열로 가져옵니다
// filter를 이용해서 필요한 keyword_group의 값을 찾아 작업
export const getPublisherKeywords = async (query: {
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
}): Promise<z.infer<typeof OpenAPISchema.Keyword>[]> => {
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

// keyword 에 keyword_group 조인 { keyword_group : keyword } as _kg
// publisher에 keyword_publisher_rels, _kg  조인

export const queryPublisherWithKeywords = async (eb?: ExpressionBuilder<DB, "publishers">) => {
  const ky = eb ?? (Ky as any as ExpressionBuilder<DB, "publishers">);

  const keywordGroups = await Ky.selectFrom("keyword_groups").select(["id", "name"]).execute();

  let query = ky.selectFrom((eb) => eb.selectFrom("publishers").select(["id"]).as("publishers"));

  for (let i = 0; i < keywordGroups.length; i++) {
    const keywordGroup = keywordGroups[i];

    query = query.leftJoin(
      (eb) =>
        eb
          .selectFrom("keyword_publisher_rels")
          .leftJoin(
            "keyword_groups",
            "keyword_groups.id",
            "keyword_publisher_rels.keyword_group_id"
          )
          .leftJoin("keywords", "keywords.id", "keyword_publisher_rels.keyword_id")
          .select(() => [
            sql<number>`keyword_publisher_rels.publisher_id`.as("publisher_id"),
            sql<string>`keywords.name`.as(keywordGroup.name),
          ])
          .where("keyword_publisher_rels.keyword_group_id", "=", keywordGroup.id)
          .as(`${keywordGroup.name}`),
      (join) => join.onRef("publishers.id", "=", `${keywordGroup.name}.publisher_id`)
    ) as any;
  }

  // return query.selectAll().executeTakeFirst();
  return () =>
    query
      // join keywords
      .leftJoin(
        (eb) =>
          eb
            .selectFrom("keyword_publisher_rels as _kpr")
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
        (join) => join.onRef("publishers.id", "=", "kpr.publisher_id")
      )
      .select(() => [
        // publisher id
        sql<string>`id`.as("id"),
        sql<z.infer<typeof OpenAPISchema.Keyword>>`kpr.keywords`.as("keywords"),
        // keyword_group_name : keyword_name
        ...keywordGroups.map((keywordGroup) => Ky.dynamic.ref<string>(`${keywordGroup.name}`)),
      ]);
};
