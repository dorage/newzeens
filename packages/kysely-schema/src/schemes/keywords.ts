import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const KeywordSchema = z.object({
  id: z.number(),
  name: z.string(),
  is_enabled: z.coerce.boolean(),
  created_at: z
    .string()
    .transform((arg) => moment(arg).utc(false))
    .or(z.string()),
});

export interface KyKeywordTable {
  id: Generated<z.infer<typeof KeywordSchema.shape.id>>;
  name: z.infer<typeof KeywordSchema.shape.name>;
  is_enabled: ColumnType<z.infer<typeof KeywordSchema.shape.is_enabled>, number, number>;
  created_at: Generated<z.infer<typeof KeywordSchema.shape.created_at>>;
}

export type Keyword = Selectable<KyKeywordTable>;
export type NewKeyword = Insertable<KyKeywordTable>;
export type KeywordUpdate = Updateable<KyKeywordTable>;
