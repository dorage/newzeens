import type { Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const KeywordSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string().transform((arg) => moment(arg).utc(false)),
});

export interface KyKeywordTable {
  id: z.infer<typeof KeywordSchema.shape.id>;
  name: z.infer<typeof KeywordSchema.shape.name>;
  created_at: z.infer<typeof KeywordSchema.shape.created_at>;
}

export type Keyword = Selectable<KyKeywordTable>;
export type NewKeyword = Insertable<KyKeywordTable>;
export type KeywordUpdate = Updateable<KyKeywordTable>;
