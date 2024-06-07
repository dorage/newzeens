import SlotProvider from "@/src/providers/slots";
import { z } from "zod";
import { zParam, zRes } from "./delete";
import { deleteSlot } from "./delete.model";

export const controller = async (query: { param: z.infer<typeof zParam> }) => {
  const slot = await SlotProvider.selectSlotById(query.param.id);
  await deleteSlot({ slotId: query.param.id });

  return zRes.parse(await SlotProvider.selectSlots(slot.campaign_id));
};
