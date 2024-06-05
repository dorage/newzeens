import SlotProvider from "@/src/providers/slots";
import { z } from "zod";
import { zJson, zParam, zRes } from "./post";
import { insertNewSlot } from "./post.model";

export const controller = async (query: {
  param: z.infer<typeof zParam>;
  json: z.infer<typeof zJson>;
}) => {
  await insertNewSlot({ campaignId: query.param.id, data: query.json });

  return zRes.parse(await SlotProvider.selectSlots(query.param.id));
};
