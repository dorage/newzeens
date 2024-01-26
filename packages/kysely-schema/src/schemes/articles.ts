import type { Generated, Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string().length(6),
  thumbnail: z.string().nullable(),
  title: z.string(),
  summary: z.string(),
  published_in: z.string().transform((arg) => moment(arg).utc(false)),
  created_at: z.string().transform((arg) => moment(arg).utc(false)),
  publisher_id: z.string().length(6),
});

export interface KyArticleTable {
  id: z.infer<typeof ArticleSchema.shape.id>;
  thumbnail: z.infer<typeof ArticleSchema.shape.thumbnail>;
  title: z.infer<typeof ArticleSchema.shape.title>;
  summary: z.infer<typeof ArticleSchema.shape.summary>;
  published_in: z.infer<typeof ArticleSchema.shape.published_in>;
  created_at: Generated<z.infer<typeof ArticleSchema.shape.created_at>>;
  publisher_id: z.infer<typeof ArticleSchema.shape.publisher_id>;
}

export type Article = Selectable<KyArticleTable>;
export type NewArticle = Insertable<KyArticleTable>;
export type ArticleUpdate = Updateable<KyArticleTable>;
