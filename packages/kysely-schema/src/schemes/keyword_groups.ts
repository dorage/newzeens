import type { Generated, Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const KeywordGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().transform((arg) => moment(arg).utc(false)),
});

export interface KyKeywordGroupTable {
  id: Generated<z.infer<typeof KeywordGroupSchema.shape.id>>;
  name: z.infer<typeof KeywordGroupSchema.shape.name>;
  created_at: Generated<z.infer<typeof KeywordGroupSchema.shape.created_at>>;
}

export type KeywordGroup = Selectable<KyKeywordGroupTable>;
export type NewKeywordGroup = Insertable<KyKeywordGroupTable>;
export type KeywordGroupUpdate = Updateable<KyKeywordGroupTable>;
