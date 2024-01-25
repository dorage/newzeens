import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordPublisherRelSchema = z.object({
  id: z.string(),
});

export interface KyKeywordPublisherRelTable {
  id: z.infer<typeof KeywordPublisherRelSchema.shape.id>;
}

export type KeywordPublisherRel = Selectable<KyKeywordPublisherRelTable>;
export type NewKeywordPublisherRel = Insertable<KyKeywordPublisherRelTable>;
export type KeywordPublisherRelUpdate = Updateable<KyKeywordPublisherRelTable>;
