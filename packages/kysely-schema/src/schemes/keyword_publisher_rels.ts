import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordPublisherRelSchema = z.object({
  keyword_group_id: z.number(),
  keyword_id: z.number(),
  publisher_id: z.string(),
});

export interface KyKeywordPublisherRelTable {
  keyword_group_id: z.infer<typeof KeywordPublisherRelSchema.shape.keyword_group_id>;
  keyword_id: z.infer<typeof KeywordPublisherRelSchema.shape.keyword_id>;
  publisher_id: z.infer<typeof KeywordPublisherRelSchema.shape.publisher_id>;
}

export type KeywordPublisherRel = Selectable<KyKeywordPublisherRelTable>;
export type NewKeywordPublisherRel = Insertable<KyKeywordPublisherRelTable>;
export type KeywordPublisherRelUpdate = Updateable<KyKeywordPublisherRelTable>;
