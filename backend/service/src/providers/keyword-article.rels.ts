import { z } from "@hono/zod-openapi";
import { ArticleSchema, PublisherSchema } from "kysely-schema";
import { Ky } from "../libs/kysely";

const selectKeywords = async (articleId: z.infer<typeof ArticleSchema.shape.id>) => {
  const query = Ky.selectFrom((eb) =>
    eb.selectFrom("keyword_article_rels").selectAll().where("article_id", "=", articleId).as("kgr")
  )
    .leftJoin("keywords", "id", "kgr.keyword_id")
    .selectAll();

  const keywords = await query.execute();

  return keywords;
};

const KeywordArticleRelsProvider = {
  selectKeywords,
};

export default KeywordArticleRelsProvider;
