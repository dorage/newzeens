import type { Generated, Insertable, Selectable, Updateable } from "kysely";
import moment from "moment";
import { z } from "zod";

export const SlotSchema = z.object({
	id: z.number(),
	campaign_id: z.number(),
	name: z.string().max(50),
	description: z.string().nullable().optional(),
	comment: z.string().nullable().optional(),
	preferences: z.number().nullable().optional(),
	is_enabled: z.coerce.boolean(),
	created_at: z
		.string()
		.transform((arg) => moment(arg).utc(false))
		.or(z.string()),
});

export interface KySlotTable {
	id: Generated<z.infer<typeof SlotSchema.shape.id>>;
	campaign_id: z.infer<typeof SlotSchema.shape.campaign_id>;
	name: z.infer<typeof SlotSchema.shape.name>;
	description: z.infer<typeof SlotSchema.shape.description>;
	comment: z.infer<typeof SlotSchema.shape.comment>;
	preferences: z.infer<typeof SlotSchema.shape.preferences>;
	is_enabled: Generated<z.infer<typeof SlotSchema.shape.is_enabled>>;
	created_at: Generated<z.infer<typeof SlotSchema.shape.created_at>>;
}

export type Slot = Selectable<KySlotTable>;
export type NewSlot = Insertable<KySlotTable>;
export type SlotUpdate = Updateable<KySlotTable>;
