import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordGroupRelSchema = z.object({
  id: z.string(),
});

export interface KyKeywordGroupRelTable {
  id: z.infer<typeof KeywordGroupRelSchema.shape.id>;
}

export type KeywordGroupRel = Selectable<KyKeywordGroupRelTable>;
export type NewKeywordGroupRel = Insertable<KyKeywordGroupRelTable>;
export type KeywordGroupRelUpdate = Updateable<KyKeywordGroupRelTable>;
