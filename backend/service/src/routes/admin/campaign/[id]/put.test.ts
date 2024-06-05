import { Ky } from "@/src/libs/kysely";
import { testingTransaction } from "@/tests/libs/transaction";
import { generateMock } from "@anatine/zod-mock";
import { CampaignSchema } from "kysely-schema";
import { z } from "zod";
import { controller } from "./put.controller";
import { putCampaign } from "./put.model";
import { zRes } from "./put";

testingTransaction();

const generateMockCampaign = async (): Promise<z.infer<typeof CampaignSchema>> => {
  const mock = generateMock(CampaignSchema.pick({ name: true, description: true, comment: true }));

  return Ky.insertInto("campaigns")
    .values({
      ...mock,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
};

const selectCampaign = (id: z.infer<typeof CampaignSchema.shape.id>) =>
  Ky.selectFrom("campaigns").selectAll().where("id", "=", id).executeTakeFirstOrThrow();

describe("put.model", () => {
  describe("putCampaign", () => {
    test("must patch existig campaign", async () => {
      const testingPutCampaign = async (
        original: z.infer<typeof CampaignSchema>,
        edited: z.infer<typeof CampaignSchema>
      ) => {
        await putCampaign({ id: original.id, data: edited });

        expect(await selectCampaign(original.id)).toEqual(edited);

        return edited;
      };

      let campaign = await generateMockCampaign();

      campaign = await testingPutCampaign(campaign, { ...campaign, name: "new name" });
      campaign = await testingPutCampaign(campaign, {
        ...campaign,
        description: "new description",
      });
      campaign = await testingPutCampaign(campaign, { ...campaign, comment: "new comment" });
    });
  });
});

describe("put.controller", () => {
  test("must patch existig campaign and return campaign arrays", async () => {
    const testingPutCampaign = async (
      original: z.infer<typeof CampaignSchema>,
      edited: z.infer<typeof CampaignSchema>
    ) => {
      const res = await controller({ param: { id: campaign.id }, json: edited });

      expect(await selectCampaign(original.id)).toEqual(edited);
      expect(zRes.safeParse(res).success).toEqual(true);

      return edited;
    };

    let campaign = await generateMockCampaign();

    campaign = await testingPutCampaign(campaign, { ...campaign, name: "new name" });
    campaign = await testingPutCampaign(campaign, {
      ...campaign,
      description: "new description",
    });
    campaign = await testingPutCampaign(campaign, { ...campaign, comment: "new comment" });
  });
});
