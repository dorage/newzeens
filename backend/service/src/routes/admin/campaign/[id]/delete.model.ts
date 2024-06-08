import { Ky } from "@/src/libs/kysely";
import { CampaignSchema } from "kysely-schema";
import { z } from "zod";

export const deleteCampaign = async (query: { id: z.infer<typeof CampaignSchema.shape.id> }) => {
  await Ky.deleteFrom("campaigns").where("id", "=", query.id).execute();

  return true;
};
