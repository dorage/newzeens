import SlotProvider from "@/src/providers/slots";
import { z } from "zod";
import { zQuery, zRes } from "./get";

export const controller = async (query: { query: z.infer<typeof zQuery> }) => {
  return zRes.parse(await SlotProvider.selectSlots(query.query.campaign_id));
};
