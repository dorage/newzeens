import type { Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const BannerSchema = z.object({
  id: z.number(),
  url: z.string().nullable(),
  is_enabled: z.coerce.boolean(),
  created_at: z
    .string()
    .transform((arg) => moment(arg).utc(false))
    .or(z.string()),
});

export interface KyBannerTable {
  id: z.infer<typeof BannerSchema.shape.id>;
  url: z.infer<typeof BannerSchema.shape.url>;
  is_enabled: z.infer<typeof BannerSchema.shape.is_enabled>;
  created_at: z.infer<typeof BannerSchema.shape.created_at>;
}

export type Banner = Selectable<KyBannerTable>;
export type NewBanner = Insertable<KyBannerTable>;
export type BannerUpdate = Updateable<KyBannerTable>;
