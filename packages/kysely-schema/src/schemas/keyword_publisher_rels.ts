import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { KeywordGroupSchema } from "./keyword-groups";
import { KeywordSchema } from "./keywords";
import { PublisherSchema } from "./publishers";

export const KeywordPublisherRelSchema = z.object({
  keyword_group_id: KeywordGroupSchema.shape.id,
  keyword_id: KeywordSchema.shape.id,
  publisher_id: PublisherSchema.shape.id,
});

export interface KyKeywordPublisherRelTable {
  keyword_group_id: z.infer<typeof KeywordPublisherRelSchema.shape.keyword_group_id>;
  keyword_id: z.infer<typeof KeywordPublisherRelSchema.shape.keyword_id>;
  publisher_id: z.infer<typeof KeywordPublisherRelSchema.shape.publisher_id>;
}

export type KeywordPublisherRel = Selectable<KyKeywordPublisherRelTable>;
export type NewKeywordPublisherRel = Insertable<KyKeywordPublisherRelTable>;
export type KeywordPublisherRelUpdate = Updateable<KyKeywordPublisherRelTable>;
