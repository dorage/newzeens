import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordPublisherRelSchema = z.object({
  keyword_id: z.number(),
  publisher_id: z.string(),
  preference: z.number().nullable().default(null),
});

export interface KyKeywordPublisherRelTable {
  keyword_id: z.infer<typeof KeywordPublisherRelSchema.shape.keyword_id>;
  publisher_id: z.infer<typeof KeywordPublisherRelSchema.shape.publisher_id>;
  preference: z.infer<typeof KeywordPublisherRelSchema.shape.preference>;
}

export type KeywordPublisherRel = Selectable<KyKeywordPublisherRelTable>;
export type NewKeywordPublisherRel = Insertable<KyKeywordPublisherRelTable>;
export type KeywordPublisherRelUpdate = Updateable<KyKeywordPublisherRelTable>;
