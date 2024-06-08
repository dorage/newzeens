import { Ky } from "@/src/libs/kysely";
import { ArticleSchema, SlotArticleSchema, SlotSchema } from "kysely-schema";
import { z } from "zod";

type SlotArticleModelQuery = {
  slotId: z.infer<typeof SlotSchema.shape.id>;
  articleId: z.infer<typeof ArticleSchema.shape.id>;
  preferences?: z.infer<typeof SlotArticleSchema.shape.preferences>;
};

export const insertSlotArticle = async (query: SlotArticleModelQuery) => {
  await Ky.insertInto("slot_articles")
    .values({
      slot_id: query.slotId,
      article_id: query.articleId,
      preferences: query.preferences,
    })
    .execute();

  return true;
};

export const updateSlotArticle = async (query: SlotArticleModelQuery) => {
  await Ky.updateTable("slot_articles")
    .set({ preferences: query.preferences ?? null })
    .where("slot_id", "=", query.slotId)
    .where("article_id", "=", query.articleId)
    .execute();

  return true;
};

export const deleteSlotArticle = async (query: Omit<SlotArticleModelQuery, "preferences">) => {
  await Ky.deleteFrom("slot_articles")
    .where("slot_id", "=", query.slotId)
    .where("article_id", "=", query.articleId)
    .execute();

  return true;
};
