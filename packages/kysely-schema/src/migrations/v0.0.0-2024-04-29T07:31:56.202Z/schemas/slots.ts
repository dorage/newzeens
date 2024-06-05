import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { zMomentDatetime } from "./columns/date";
import { CampaignSchema } from "./campaigns";

export const SlotSchema = z.object({
  id: z.number().int().positive(),
  campaign_id: CampaignSchema.shape.id,
  name: z.string().max(50),
  description: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  preferences: z.number().int().positive().finite().nullable().optional(),
  is_enabled: z.coerce.boolean().optional().default(false),
  created_at: zMomentDatetime,
});

export interface KySlotTable {
  id: Generated<z.infer<typeof SlotSchema.shape.id>>;
  campaign_id: z.infer<typeof SlotSchema.shape.campaign_id>;
  name: z.infer<typeof SlotSchema.shape.name>;
  description: z.infer<typeof SlotSchema.shape.description>;
  comment: z.infer<typeof SlotSchema.shape.comment>;
  preferences: z.infer<typeof SlotSchema.shape.preferences>;
  is_enabled: ColumnType<z.infer<typeof SlotSchema.shape.is_enabled>, number, number>;
  created_at: Generated<z.infer<typeof SlotSchema.shape.created_at>>;
}

export type Slot = Selectable<KySlotTable>;
export type NewSlot = Insertable<KySlotTable>;
export type SlotUpdate = Updateable<KySlotTable>;
