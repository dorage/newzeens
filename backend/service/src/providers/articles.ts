import { z } from "zod";
import { Ky } from "../libs/kysely";
import { ArticleSchema } from "kysely-schema";

const selectArticleById = (articleId: z.infer<typeof ArticleSchema.shape.id>) =>
  Ky.selectFrom("articles").selectAll().where("id", "=", articleId).executeTakeFirstOrThrow();

const selectArticlesByKeywords = (keywords: number[]) => {
  return Ky.selectFrom((eb) =>
    eb
      .selectFrom("keyword_article_rels")
      .select("article_id")
      .where("keyword_id", "in", keywords)
      .as("kar")
  )
    .leftJoin("articles as a", "kar.article_id", "a.id")
    .selectAll()
    .execute();
};

const ArticleProvider = { selectArticleById, selectArticlesByKeywords };

export default ArticleProvider;
