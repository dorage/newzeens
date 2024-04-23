import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import { z } from "@hono/zod-openapi";
import { sql } from "kysely";
import { PublisherSchema } from "kysely-schema";
import { zRes } from "./get";

//  '분야' 키워드로 필터링
export const getPublisherRank = async (query: {
  limit: number;
  lastPublisherId?: z.infer<typeof PublisherSchema.shape.id>;
}): Promise<z.infer<typeof zRes>> => {
  const cursor = await Ky.selectFrom("publishers")
    .selectAll()
    .where("id", "=", query.lastPublisherId ?? null)
    .executeTakeFirst();

  const result = await Ky.selectFrom((eb) => {
    let q = eb
      .selectFrom("publishers")
      .selectAll()
      .orderBy("subscriber desc")
      .orderBy("id asc")
      .limit(query.limit);
    if (query.lastPublisherId)
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
