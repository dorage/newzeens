import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { ArticleSchema } from "./articles";
import { KeywordSchema } from "./keywords";

export const KeywordArticleRelSchema = z.object({
  keyword_id: KeywordSchema.shape.id,
  article_id: ArticleSchema.shape.id,
});

export interface KyKeywordArticleRelTable {
  keyword_id: z.infer<typeof KeywordArticleRelSchema.shape.keyword_id>;
  article_id: z.infer<typeof KeywordArticleRelSchema.shape.article_id>;
}

export type KeywordArticleRel = Selectable<KyKeywordArticleRelTable>;
export type NewKeywordArticleRel = Insertable<KyKeywordArticleRelTable>;
export type KeywordArticleRelUpdate = Updateable<KyKeywordArticleRelTable>;
