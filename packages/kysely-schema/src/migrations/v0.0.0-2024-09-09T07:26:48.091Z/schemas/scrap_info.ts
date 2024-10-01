import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const ScrapInfoSchema = z.object({
  url: z.string().max(256),
});

export interface KyScrapInfoTable {
  url: z.infer<typeof ScrapInfoSchema.shape.url>;
}

export type ScrapInfo = Selectable<KyScrapInfoTable>;
export type NewScrapInfo = Insertable<KyScrapInfoTable>;
export type ScrapInfoUpdate = Updateable<KyScrapInfoTable>;
