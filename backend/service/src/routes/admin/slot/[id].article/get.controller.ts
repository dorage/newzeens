import { z } from "zod";
import { zParam, zRes } from "./get";
import SlotArticleProvider from "@/src/providers/slot-articles";

export const controller = async (query: { param: z.infer<typeof zParam> }) => {
  return zRes.parse(await SlotArticleProvider.selectSlot(query.param.id));
};
