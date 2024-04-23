import { Ky } from "@/src/libs/kysely";
import { z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";
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
