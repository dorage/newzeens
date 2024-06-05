import CampaignProvider from "@/src/providers/campaigns";
import { zJson, zParam, zRes } from "./put";
import { z } from "zod";
import { putCampaign } from "./put.model";

export const controller = async (query: {
  param: z.infer<typeof zParam>;
  json: z.infer<typeof zJson>;
}) => {
  await putCampaign({ id: query.param.id, data: query.json });

  return zRes.parse(await CampaignProvider.selectCampaigns());
};
