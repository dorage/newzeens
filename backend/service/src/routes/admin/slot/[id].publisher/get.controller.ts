import SlotPublisherProvider from "@/src/providers/slot-publishers";
import { zParam, zRes } from "./get";
import { z } from "zod";

export const controller = async (query: { param: z.infer<typeof zParam> }) => {
  return zRes.parse(await SlotPublisherProvider.selectSlotPublishers(query.param.id));
};
