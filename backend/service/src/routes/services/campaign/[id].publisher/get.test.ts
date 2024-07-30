import { zRes } from "./get";
import { controller } from "./get.controller";
import { getCampaignPublisher, getPublishersWithKeywords } from "./get.model";

describe("GET /campaign/:id/publisher", () => {
  test("the result of the campaign publishers should return well-formatted json", async () => {
    const campaignArticles = await getCampaignPublisher({ campaignId: 2, limit: 4 });

    expect(zRes.safeParse(campaignArticles).success).toEqual(true);
  });

  test("the result of the campaign publishers should include length of publishers by limit query", async () => {
    const limit = 1;
    const campaignArticles = await getCampaignPublisher({ campaignId: 2, limit });

    expect(campaignArticles.slots[0].publishers.length <= limit).toEqual(true);
  });
});

describe("GET /campaign/:id/publisher", () => {
  test("the result of controller should return well-formatted json", async () => {
    const campaignArticles = await controller({ campaignId: 1, limit: 4 });

    expect(zRes.safeParse(campaignArticles).success).toEqual(true);
  });
});
