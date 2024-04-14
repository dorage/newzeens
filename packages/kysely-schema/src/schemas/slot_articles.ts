import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { SlotSchema } from "./slots";
import { ArticleSchema } from "./articles";

export const SlotArticleSchema = z.object({
  slot_id: SlotSchema.shape.id,
  article_id: ArticleSchema.shape.id,
  preferences: z.number().nullable().optional(),
});

export interface KySlotArticleTable {
  slot_id: z.infer<typeof SlotArticleSchema.shape.slot_id>;
  article_id: z.infer<typeof SlotArticleSchema.shape.article_id>;
  preferences: z.infer<typeof SlotArticleSchema.shape.preferences>;
}

export type SlotArticle = Selectable<KySlotArticleTable>;
export type NewSlotArticle = Insertable<KySlotArticleTable>;
export type SlotArticleUpdate = Updateable<KySlotArticleTable>;
