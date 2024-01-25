import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string(),
});

export interface KyArticleTable {
  id: z.infer<typeof ArticleSchema.shape.id>;
}

export type Article = Selectable<KyArticleTable>;
export type NewArticle = Insertable<KyArticleTable>;
export type ArticleUpdate = Updateable<KyArticleTable>;
