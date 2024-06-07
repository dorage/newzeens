import SlotProvider from "@/src/providers/slots";
import { z } from "zod";
import { zJson, zQuery, zRes } from "./post";
import { insertNewSlot } from "./post.model";

export const controller = async (query: {
  query: z.infer<typeof zQuery>;
  json: z.infer<typeof zJson>;
}) => {
  await insertNewSlot({ campaignId: query.query.campaign_id, data: query.json });

  return zRes.parse(await SlotProvider.selectSlots(query.query.campaign_id));
};
