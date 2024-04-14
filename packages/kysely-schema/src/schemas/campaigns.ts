import type { Generated, Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";
import { zMomentDatetime } from "./columns/date";

export const CampaignSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  created_at: zMomentDatetime,
});

export interface KyCampaignTable {
  id: Generated<z.infer<typeof CampaignSchema.shape.id>>;
  name: z.infer<typeof CampaignSchema.shape.name>;
  description: z.infer<typeof CampaignSchema.shape.description>;
  comment: z.infer<typeof CampaignSchema.shape.comment>;
  created_at: Generated<z.infer<typeof CampaignSchema.shape.created_at>>;
}

export type Campaign = Selectable<KyCampaignTable>;
export type NewCampaign = Insertable<KyCampaignTable>;
export type CampaignUpdate = Updateable<KyCampaignTable>;
