import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { zMomentDatetime } from "./columns/date";

export const JTISchema = z.object({
  jti: z.string().uuid(),
  expires_in: zMomentDatetime,
});

export interface KyJTITable {
  jti: z.infer<typeof JTISchema.shape.jti>;
  expires_in: ColumnType<z.infer<typeof JTISchema.shape.expires_in>, string, string>;
}

export type JTI = Selectable<KyJTITable>;
export type NewJTI = Insertable<KyJTITable>;
export type JTIUpdate = Updateable<KyJTITable>;
