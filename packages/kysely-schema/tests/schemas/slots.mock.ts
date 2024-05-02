import { SlotSchema } from "@/src/index";
import { ZodFastCheck } from "zod-fast-check";

const SlotSchemaWithoutGenerated = SlotSchema.omit({ created_at: true });

export const getSlotArbitary = (campaignId: number) =>
  ZodFastCheck()
    .inputOf(SlotSchemaWithoutGenerated)
    .map((slot) => ({ ...slot, campaign_id: campaignId, is_enabled: +slot.is_enabled }));
