import { z } from "zod";
import { zJson, zParam, zRes } from "./put";
import SlotProvider from "@/src/providers/slots";
import { putSlot } from "./put.model";

export const controller = async (query: {
  param: z.infer<typeof zParam>;
  json: z.infer<typeof zJson>;
}) => {
  const slot = await SlotProvider.selectSlotById(query.param.id);
  await putSlot({ slotId: query.param.id, data: query.json });

  return zRes.parse(await SlotProvider.selectSlots(slot.campaign_id));
};
