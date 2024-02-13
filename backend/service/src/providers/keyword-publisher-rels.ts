import { z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";
import { Ky } from "../libs/kysely";

const selectKeywords = async (publisherId: z.infer<typeof PublisherSchema.shape.id>) => {
  const query = Ky.selectFrom((eb) =>
    eb
      .selectFrom("keyword_publisher_rels")
      .selectAll()
      .where("publisher_id", "=", publisherId)
      .as("kgr")
  )
    .leftJoin("keywords", "id", "kgr.keyword_id")
    .selectAll();

  const keywords = await query.execute();

  return keywords;
};

const KeywordPublisherRelsProvider = {
  selectKeywords,
};

export default KeywordPublisherRelsProvider;
