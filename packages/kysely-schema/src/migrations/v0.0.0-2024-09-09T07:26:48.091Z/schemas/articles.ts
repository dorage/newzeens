import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { zMomentDatetime } from "./columns/date";
import { PublisherSchema } from "./publishers";

export const ArticleSchema = z.object({
  id: z.string().length(6),
  thumbnail: z.string().url().max(2048).nullable(),
  title: z.string().max(99),
  summary: z.string(),
  is_enabled: z.coerce.boolean(),
  publisher_id: PublisherSchema.shape.id,
  created_at: zMomentDatetime,
  url: z.string().url().max(2048),
});

export interface KyArticleTable {
  id: z.infer<typeof ArticleSchema.shape.id>;
  thumbnail: z.infer<typeof ArticleSchema.shape.thumbnail>;
  title: z.infer<typeof ArticleSchema.shape.title>;
  summary: z.infer<typeof ArticleSchema.shape.summary>;
  is_enabled: ColumnType<z.infer<typeof ArticleSchema.shape.is_enabled>, number, number>;
  publisher_id: z.infer<typeof ArticleSchema.shape.publisher_id>;
  created_at: Generated<z.infer<typeof ArticleSchema.shape.created_at>>;
  url: z.infer<typeof ArticleSchema.shape.url>;
}

export type Article = Selectable<KyArticleTable>;
export type NewArticle = Insertable<KyArticleTable>;
export type ArticleUpdate = Updateable<KyArticleTable>;
