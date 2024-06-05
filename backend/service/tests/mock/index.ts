import { Ky } from "@/src/libs/kysely";
import { generateMock } from "@anatine/zod-mock";
import { CampaignSchema, SlotSchema } from "kysely-schema";
import { z } from "zod";

const insertCampaign = async (): Promise<z.infer<typeof CampaignSchema>> => {
  const mock = generateMock(CampaignSchema.pick({ name: true, description: true, comment: true }));

  return Ky.insertInto("campaigns")
    .values({
      ...mock,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
};

const insertSlot = async (): Promise<z.infer<typeof SlotSchema>> => {
  const campaign = await insertCampaign();

  const mock = generateMock(
    SlotSchema.pick({ name: true, description: true, comment: true, is_enabled: true })
  );

  return Ky.insertInto("slots")
    .values({ ...mock, campaign_id: campaign.id, is_enabled: Number(mock.is_enabled) })
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const TestingMock = { insertCampaign, insertSlot };
