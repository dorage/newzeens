import { zRes } from "./get";
import { controller } from "./get.controller";
import { getCampaignArticles } from "./get.model";

describe("GET /campaign/:id/article", () => {
  test("the result of the campaign articles should return well-formatted json", async () => {
    const campaignArticles = await getCampaignArticles({ campaignId: 2, limit: 4 });

    expect(zRes.safeParse(campaignArticles).success).toEqual(true);
  });

  test("the result of the campaign articles should include length of articles by limit query", async () => {
    const limit = 1;
    const campaignArticles = await getCampaignArticles({ campaignId: 1, limit });

    expect(campaignArticles.slots[0].articles.length <= limit).toEqual(true);
  });
});

describe("GET /campaign/:id/article", () => {
  test("the result of controller should return well-formatted json", async () => {
    const campaignArticles = await controller({ campaignId: 1, limit: 4 });

    expect(zRes.safeParse(campaignArticles).success).toEqual(true);
  });
});
