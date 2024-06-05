import { Ky } from "@/src/libs/kysely";
import { generateMock } from "@anatine/zod-mock";
import { CampaignSchema } from "kysely-schema";
import { z } from "zod";

export const insertCampaign = async (): Promise<z.infer<typeof CampaignSchema>> => {
  const mock = generateMock(CampaignSchema.pick({ name: true, description: true, comment: true }));

  return Ky.insertInto("campaigns")
    .values({
      ...mock,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const TestingMock = { insertCampaign };
