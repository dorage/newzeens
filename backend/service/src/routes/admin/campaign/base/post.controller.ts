import CampaignProvider from "@/src/providers/campaigns";
import { z } from "zod";
import { zJson, zRes } from "./post";
import { insertNewCampaign } from "./post.model";

export const controller = async (query: { data: z.infer<typeof zJson> }) => {
  await insertNewCampaign(query);

  return zRes.parse(await CampaignProvider.selectCampaigns());
};
