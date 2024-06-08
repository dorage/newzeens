import { CampaignSchema } from "kysely-schema";
import { Ky } from "../libs/kysely";
import { z } from "zod";

const selectCampaigns = () => Ky.selectFrom("campaigns").selectAll().execute();

const selectCampaignById = (id: z.infer<typeof CampaignSchema.shape.id>) =>
  Ky.selectFrom("campaigns").selectAll().where("id", "=", id).executeTakeFirstOrThrow();

const CampaignProvider = {
  selectCampaigns,
  selectCampaignById,
};

export default CampaignProvider;
