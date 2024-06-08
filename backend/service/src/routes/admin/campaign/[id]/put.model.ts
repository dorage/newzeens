import { Ky } from "@/src/libs/kysely";
import { zJson } from "./put";
import { CampaignSchema } from "kysely-schema";
import { z } from "zod";

export const putCampaign = async (query: {
  id: z.infer<typeof CampaignSchema.shape.id>;
  data: z.infer<typeof zJson>;
}) => {
  await Ky.updateTable("campaigns")
    .set({ ...query.data })
    .where("id", "=", query.id)
    .execute();

  return true;
};
