import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { zMomentDatetime } from "./columns/date";

export const KeywordGroupSchema = z.object({
  id: z.number().int().positive().finite(),
  name: z.string().max(30),
  is_enabled: z.coerce.boolean(),
  created_at: zMomentDatetime,
});

export interface KyKeywordGroupTable {
  id: Generated<z.infer<typeof KeywordGroupSchema.shape.id>>;
  name: z.infer<typeof KeywordGroupSchema.shape.name>;
  is_enabled: ColumnType<z.infer<typeof KeywordGroupSchema.shape.is_enabled>, number, number>;
  created_at: Generated<z.infer<typeof KeywordGroupSchema.shape.created_at>>;
}

export type KeywordGroup = Selectable<KyKeywordGroupTable>;
export type NewKeywordGroup = Insertable<KyKeywordGroupTable>;
export type KeywordGroupUpdate = Updateable<KyKeywordGroupTable>;
