import type { Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordArticleRelSchema = z.object({
  keyword_id: z.number(),
  article_id: z.string().length(6),
  preference: z.number(),
});

export interface KyKeywordArticleRelTable {
  keyword_id: z.infer<typeof KeywordArticleRelSchema.shape.keyword_id>;
  article_id: z.infer<typeof KeywordArticleRelSchema.shape.article_id>;
  preference: Generated<z.infer<typeof KeywordArticleRelSchema.shape.preference>>;
}

export type KeywordArticleRel = Selectable<KyKeywordArticleRelTable>;
export type NewKeywordArticleRel = Insertable<KyKeywordArticleRelTable>;
export type KeywordArticleRelUpdate = Updateable<KyKeywordArticleRelTable>;
