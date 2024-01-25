import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const BannerSchema = z.object({
  id: z.string(),
});

export interface KyBannerTable {
  id: z.infer<typeof BannerSchema.shape.id>;
}

export type Banner = Selectable<KyBannerTable>;
export type NewBanner = Insertable<KyBannerTable>;
export type BannerUpdate = Updateable<KyBannerTable>;
