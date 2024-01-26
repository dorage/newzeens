import type { Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const BannerSchema = z.object({
  id: z.number(),
  url: z.string().nullable(),
  enabled: z.coerce.boolean(),
  created_at: z.string().transform((arg) => moment(arg).utc(false)),
});

export interface KyBannerTable {
  id: z.infer<typeof BannerSchema.shape.id>;
  url: z.infer<typeof BannerSchema.shape.url>;
  enabled: z.infer<typeof BannerSchema.shape.enabled>;
  created_at: z.infer<typeof BannerSchema.shape.created_at>;
}

export type Banner = Selectable<KyBannerTable>;
export type NewBanner = Insertable<KyBannerTable>;
export type BannerUpdate = Updateable<KyBannerTable>;
