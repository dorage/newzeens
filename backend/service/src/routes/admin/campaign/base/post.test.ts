import { Ky } from "@/src/libs/kysely";
import { CampaignSchema } from "kysely-schema";
import { z } from "zod";
import { insertNewCampaign } from "./post.model";
import { controller } from "./post.controller";
import { zRes } from "./post";
import { testingTransaction } from "@/tests/libs/transaction";

const selectCampaign = (id: z.infer<typeof CampaignSchema.shape.id>) => {
  return Ky.selectFrom("campaigns").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
};

testingTransaction({
  beforeEach: async () => {
    await Ky.deleteFrom("campaigns").execute();
  },
});

const campaignData = {
  name: "test",
  description: "test",
  comment: "test",
};

describe("post.model", () => {
  describe("insertNewCampaign", () => {
    test("must return valid campaign id", async () => {
      const insertedCampagin = await insertNewCampaign({
        data: campaignData,
      });
      const selectedCampaign = await selectCampaign(insertedCampagin.id);

      expect(campaignData.name).toEqual(selectedCampaign.name);
      expect(campaignData.description).toEqual(selectedCampaign.description);
      expect(campaignData.comment).toEqual(selectedCampaign.comment);
    });
  });
});

describe("post.controller", () => {
  test("must return without error", async () => {
    const res = await controller({ data: campaignData });

    expect(zRes.safeParse(res).success).toEqual(true);
  });
});
