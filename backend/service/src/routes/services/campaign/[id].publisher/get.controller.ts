import { z } from "@hono/zod-openapi";
import { zRes } from "./get";
import { CampaignSchema } from "kysely-schema";
import { getCampaignPublisher } from "./get.model";

export const controller = async (query: {
  campaignId: z.infer<typeof CampaignSchema.shape.id>;
  limit: number;
}): Promise<z.infer<typeof zRes>> => {
  const res = await getCampaignPublisher(query);

  return res;
};
