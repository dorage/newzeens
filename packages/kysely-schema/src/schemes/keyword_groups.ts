import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordGroupSchema = z.object({
  id: z.string(),
});

export interface KyKeywordGroupTable {
  id: z.infer<typeof KeywordGroupSchema.shape.id>;
}

export type KeywordGroup = Selectable<KyKeywordGroupTable>;
export type NewKeywordGroup = Insertable<KyKeywordGroupTable>;
export type KeywordGroupUpdate = Updateable<KyKeywordGroupTable>;
