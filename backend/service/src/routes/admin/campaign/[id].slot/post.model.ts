import { Ky } from "@/src/libs/kysely";
import { CampaignSchema } from "kysely-schema";
import { z } from "zod";
import { zJson } from "./post";

export const insertNewSlot = async (query: {
  campaignId: z.infer<typeof CampaignSchema.shape.id>;
  data: z.infer<typeof zJson>;
}) => {
  const slot = await Ky.insertInto("slots")
    .values({
      ...query.data,
      campaign_id: query.campaignId,
      is_enabled: Number(query.data.is_enabled),
    })
    .returning("id")
    .executeTakeFirstOrThrow();

  return slot;
};
