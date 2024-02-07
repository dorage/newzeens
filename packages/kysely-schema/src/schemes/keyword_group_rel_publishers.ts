import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const KeywordGroupRelPublisherSchema = z.object({
  keyword_group_rel_id: z.number(),
  publisher_id: z.string(),
  preference: z.number().nullable().default(null),
});

export interface KyKeywordGroupRelPublisherTable {
  keyword_group_rel_id: z.infer<typeof KeywordGroupRelPublisherSchema.shape.keyword_group_rel_id>;
  publisher_id: z.infer<typeof KeywordGroupRelPublisherSchema.shape.publisher_id>;
  preference: z.infer<typeof KeywordGroupRelPublisherSchema.shape.preference>;
}

export type KeywordGroupRelPublisher = Selectable<KyKeywordGroupRelPublisherTable>;
export type NewKeywordGroupRelPublisher = Insertable<KyKeywordGroupRelPublisherTable>;
export type KeywordGroupRelPublisherUpdate = Updateable<KyKeywordGroupRelPublisherTable>;
