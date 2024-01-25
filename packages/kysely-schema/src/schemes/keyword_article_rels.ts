import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordArticleRelSchema = z.object({
  id: z.string(),
});

export interface KyKeywordArticleRelTable {
  id: z.infer<typeof KeywordArticleRelSchema.shape.id>;
}

export type KeywordArticleRel = Selectable<KyKeywordArticleRelTable>;
export type NewKeywordArticleRel = Insertable<KyKeywordArticleRelTable>;
export type KeywordArticleRelUpdate = Updateable<KyKeywordArticleRelTable>;
