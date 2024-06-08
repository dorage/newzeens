import { testingTransaction } from "@/tests/libs/transaction";
import { TestingMock } from "@/tests/mock";
import { deleteCampaign } from "./delete.model";
import CampaignProvider from "@/src/providers/campaigns";
import { controller } from "./delete.controller";
import { zRes } from "./delete";

testingTransaction();

describe("delete.model", () => {
  describe("deleteCampaign", () => {
    test("must delete campaign", async () => {
      const before = zRes.parse(await CampaignProvider.selectCampaigns());
      const campaign = await TestingMock.insertCampaign();
      // check new campaign has inserted
      await CampaignProvider.selectCampaignById(campaign.id);

      await deleteCampaign({ id: campaign.id });
      const after = zRes.parse(await CampaignProvider.selectCampaigns());

      expect(after).toEqual(before);
    });
  });
});

describe("delete.controller", () => {
  test("must return rest of campaigns", async () => {
    const before = zRes.parse(await CampaignProvider.selectCampaigns());

    const campaign = await TestingMock.insertCampaign();
    // check new campaign has inserted
    await CampaignProvider.selectCampaignById(campaign.id);

    const res = await controller({ param: { id: campaign.id } });

    expect(res).toEqual(before);
  });
});
