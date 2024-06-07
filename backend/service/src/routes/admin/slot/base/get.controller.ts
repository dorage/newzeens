import SlotProvider from "@/src/providers/slots";
import { z } from "zod";
import { zQuery, zRes } from "./get";

export const controller = async (query: { query: z.infer<typeof zQuery> }) => {
  const slot = await SlotProvider.selectSlotById(query.query.campaign_id);

  return zRes.parse(await SlotProvider.selectSlots(slot.campaign_id));
};
