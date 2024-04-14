import type { Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const JTISchema = z.object({
  jti: z.string().length(36),
  expires_in: z
    .string()
    .transform((arg) => moment(arg).utc(false))
    .or(z.string()),
});

export interface KyJTITable {
  jti: z.infer<typeof JTISchema.shape.jti>;
  expires_in: z.infer<typeof JTISchema.shape.expires_in>;
}

export type JTI = Selectable<KyJTITable>;
export type NewJTI = Insertable<KyJTITable>;
export type JTIUpdate = Updateable<KyJTITable>;
