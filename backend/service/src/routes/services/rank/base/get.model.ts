import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import { z } from "@hono/zod-openapi";
import { sql } from "kysely";
import { PublisherSchema } from "kysely-schema";
import { zRes } from "./get";

const getCursor = async (query: { lastPublisherId?: string }) => {
  const cursor = await Ky.selectFrom("publishers")
    .selectAll()
    .where("id", "=", query.lastPublisherId ?? null)
    .executeTakeFirst();

  return cursor;
};

export const getKeyword = async (query: { keyword_id?: number }) => {
  if (query.keyword_id == null) return;

  const keyword = await Ky.selectFrom("keywords")
    .selectAll()
    .where("id", "=", query.keyword_id)
    .executeTakeFirst();

  return keyword;
};

//  '분야' 키워드로 필터링
export const getPublisherRank = async (query: {
  limit: number;
  lastPublisherId?: z.infer<typeof PublisherSchema.shape.id>;
  keyword_id?: number;
}): Promise<z.infer<typeof zRes>> => {
  // 실제 없는 cursor여서 null이여도, 랭크는 해당 cursor를 무시한 결과값을 반환

  const [cursor, keyword] = await Promise.all([getCursor(query), getKeyword(query)]);

  const result = await Ky.selectFrom((eb) => {
    let q = eb
      .selectFrom((eb) => {
        let q = eb.selectFrom("publishers");

        if (keyword != null) {
          q = q
            .leftJoin(
              (eb) =>
                eb
                  .selectFrom("keyword_publisher_rels")
                  .selectAll()
                  .where("keyword_id", "=", query.keyword_id as number)
                  .as("_kpr"),
              (join) => join.onRef("_kpr.publisher_id", "=", "publishers.id")
            )
            .where("keyword_id", "is not", null) as any;
        }

        return q.selectAll().where("publishers.is_enabled", "=", 1).as("_p");
      })
      .selectAll()
      .orderBy("subscriber desc")
      .limit(query.limit)
      .orderBy("id asc");
    if (cursor != null)
      q = q.where(({ eb }) =>
        eb.or([
          eb("subscriber", "<", cursor!.subscriber),
          eb.and([eb("subscriber", "=", cursor!.subscriber), eb("id", ">", cursor!.id)]),
        ])
      );
    return q.as("p");
  })
    .leftJoin(
      (eb) =>
        eb
          .selectFrom((eb) =>
            eb
              .selectFrom("keyword_publisher_rels")
              .selectAll()
              // .where("keyword_group_id", "=", keywordGroup.id)
              .where((qb) =>
                qb.eb(
                  "keyword_publisher_rels.keyword_group_id",
                  "=",
                  qb
                    .selectFrom("keyword_groups")
                    .select("keyword_groups.id")
                    .where("name", "=", "분야")
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
            sql<z.infer<typeof OpenAPISchema.Keyword>[]>`JSON_GROUP_ARRAY(JSON_OBJECT(
						'keyword_id', keywords.id, 'keyword_name', keywords.name, 'keyword_group_id', keyword_groups.id, 'keyword_group_name', keyword_groups.name
						))`.as("keywords"),
          ])
          .as("kpr"),
      (join) => join.onRef("p.id", "=", "kpr.publisher_id")
    )
    .select(["id", "name", "subscriber", "thumbnail", "keywords"])
    .execute();

  return zRes.parse(result ?? []);
};
