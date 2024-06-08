import { z } from "zod";
import { Ky } from "../libs/kysely";
import { ArticleSchema, SlotSchema } from "kysely-schema";

const selectSlotArticles = (slotId: number) =>
  Ky.selectFrom((eq) =>
    eq.selectFrom("slot_articles").selectAll().where("slot_id", "=", slotId).as("sa")
  )
    .leftJoin("articles", "sa.article_id", "articles.id")
    .selectAll()
    .orderBy("preferences desc")
    .execute();

const selectSlotArticleById = (query: {
  slotId: z.infer<typeof SlotSchema.shape.id>;
  articleId: z.infer<typeof ArticleSchema.shape.id>;
}) =>
  Ky.selectFrom("slot_articles")
    .selectAll()
    .where("slot_id", "=", query.slotId)
    .where("article_id", "=", query.articleId)
    .executeTakeFirstOrThrow();

const SlotArticleProvider = {
  selectSlotArticles,
  selectSlotArticleById,
};

export default SlotArticleProvider;
