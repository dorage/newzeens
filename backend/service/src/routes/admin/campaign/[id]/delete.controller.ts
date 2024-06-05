import CampaignProvider from "@/src/providers/campaigns";
import { z } from "zod";
import { zParam, zRes } from "./delete";
import { deleteCampaign } from "./delete.model";

export const controller = async (query: { param: z.infer<typeof zParam> }) => {
  await deleteCampaign({ id: query.param.id });

  return zRes.parse(await CampaignProvider.selectCampaigns());
};
