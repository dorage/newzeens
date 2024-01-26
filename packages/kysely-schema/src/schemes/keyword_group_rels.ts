import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordGroupRelSchema = z.object({
  keyword_id: z.number(),
  keyword_group_id: z.number(),
  preference: z.number().nullable().default(null),
});

export interface KyKeywordGroupRelTable {
  keyword_id: z.infer<typeof KeywordGroupRelSchema.shape.keyword_id>;
  keyword_group_id: z.infer<typeof KeywordGroupRelSchema.shape.keyword_group_id>;
  preference: z.infer<typeof KeywordGroupRelSchema.shape.preference>;
}

export type KeywordGroupRel = Selectable<KyKeywordGroupRelTable>;
export type NewKeywordGroupRel = Insertable<KyKeywordGroupRelTable>;
export type KeywordGroupRelUpdate = Updateable<KyKeywordGroupRelTable>;
