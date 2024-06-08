import { Ky } from "@/src/libs/kysely";
import { z } from "zod";
import { zJson } from "./post";

export const insertNewCampaign = async (query: { data: z.infer<typeof zJson> }) => {
  const campaign = await Ky.insertInto("campaigns")
    .values({ ...query.data })
    .returning("id")
    .executeTakeFirstOrThrow();

  return campaign;
};
