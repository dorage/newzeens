import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { PublisherSchema } from "./publishers";
import { SlotSchema } from "./slots";

export const SlotPublisherSchema = z.object({
  slot_id: SlotSchema.shape.id,
  publisher_id: PublisherSchema.shape.id,
  preferences: z.number().int().positive().finite().nullable().optional(),
});

export interface KySlotPublisherTable {
  slot_id: z.infer<typeof SlotPublisherSchema.shape.slot_id>;
  publisher_id: z.infer<typeof SlotPublisherSchema.shape.publisher_id>;
  preferences: z.infer<typeof SlotPublisherSchema.shape.preferences>;
}

export type SlotPublisher = Selectable<KySlotPublisherTable>;
export type NewSlotPublisher = Insertable<KySlotPublisherTable>;
export type SlotPublisherUpdate = Updateable<KySlotPublisherTable>;
