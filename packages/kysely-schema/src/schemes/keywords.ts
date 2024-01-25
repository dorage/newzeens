import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordSchema = z.object({
  id: z.string(),
});

export interface KyKeywordTable {
  id: z.infer<typeof KeywordSchema.shape.id>;
}

export type Keyword = Selectable<KyKeywordTable>;
export type NewKeyword = Insertable<KyKeywordTable>;
export type KeywordUpdate = Updateable<KyKeywordTable>;
