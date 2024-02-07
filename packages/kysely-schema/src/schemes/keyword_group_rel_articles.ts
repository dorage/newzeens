import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordGroupRelArticleSchema = z.object({
  keyword_group_rel_id: z.number(),
  article_id: z.string(),
  preference: z.number().nullable().default(null),
});

export interface KyKeywordGroupRelArticleTable {
  keyword_group_rel_id: z.infer<typeof KeywordGroupRelArticleSchema.shape.keyword_group_rel_id>;
  article_id: z.infer<typeof KeywordGroupRelArticleSchema.shape.article_id>;
  preference: z.infer<typeof KeywordGroupRelArticleSchema.shape.preference>;
}

export type KeywordGroupRelArticle = Selectable<KyKeywordGroupRelArticleTable>;
export type NewKeywordGroupRelArticle = Insertable<KyKeywordGroupRelArticleTable>;
export type KeywordGroupRelArticleUpdate = Updateable<KyKeywordGroupRelArticleTable>;
