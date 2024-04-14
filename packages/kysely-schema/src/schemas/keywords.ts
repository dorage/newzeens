import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { zMomentDatetime } from "./columns/date";

export const KeywordSchema = z.object({
  id: z.number().int().positive().finite(),
  name: z.string().max(30),
  is_enabled: z.coerce.boolean(),
  keyword_group_id: z.number(),
  created_at: zMomentDatetime,
});

export interface KyKeywordTable {
  id: Generated<z.infer<typeof KeywordSchema.shape.id>>;
  name: z.infer<typeof KeywordSchema.shape.name>;
  is_enabled: ColumnType<z.infer<typeof KeywordSchema.shape.is_enabled>, number, number>;
  keyword_group_id: z.infer<typeof KeywordSchema.shape.keyword_group_id>;
  created_at: Generated<z.infer<typeof KeywordSchema.shape.created_at>>;
}

export type Keyword = Selectable<KyKeywordTable>;
export type NewKeyword = Insertable<KyKeywordTable>;
export type KeywordUpdate = Updateable<KyKeywordTable>;
