import { z } from "@hono/zod-openapi";
import { zRes } from "./get";
import { getCampaignArticles } from "./get.model";
import { CampaignSchema } from "kysely-schema";

export const controller = async (query: {
  campaignId: z.infer<typeof CampaignSchema.shape.id>;
  limit: number;
}): Promise<z.infer<typeof zRes>> => {
  const res = await getCampaignArticles(query);

  return res;
};
