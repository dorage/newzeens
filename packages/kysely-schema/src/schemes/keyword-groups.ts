import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const KeywordGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  is_enabled: z.coerce.boolean(),
  created_at: z
    .string()
    .transform((arg) => moment(arg).utc(false))
    .or(z.string()),
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
