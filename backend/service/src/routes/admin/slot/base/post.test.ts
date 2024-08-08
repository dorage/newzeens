import SlotProvider from "@/src/providers/slots";
import { TestingMock } from "@/tests/mock";
import { generateMock } from "@anatine/zod-mock";
import { zJson, zRes } from "./post";
import { insertNewSlot } from "./post.model";
import { testingTransaction } from "@/tests/libs/transaction";
import { controller } from "./post.controller";

testingTransaction();

describe("post.model", () => {
  describe("insertNewSlot", () => {
    test("must generate new slot", async () => {
      const slotData = generateMock(zJson);
      const campaign = await TestingMock.insertCampaign();
      const slot = await insertNewSlot({ campaignId: campaign.id, data: slotData });

      const selectedSlot = await SlotProvider.selectSlotById(slot.id);
      expect(selectedSlot.name).toEqual(slotData.name);
      expect(selectedSlot.description).toEqual(slotData.description);
      expect(selectedSlot.comment).toEqual(slotData.comment);
      expect(selectedSlot.preferences).toEqual(slotData.preferences);
      expect(Number(selectedSlot.is_enabled)).toEqual(Number(slotData.is_enabled));
    });
  });
});

describe("post.controller", () => {
  test("must return slots", async () => {
    const slotData = generateMock(zJson);
    const campaign = await TestingMock.insertCampaign();
    const res = await controller({
      query: { campaign_id: campaign.id },
      json: slotData,
    });

    expect(zRes.safeParse(res).success).toEqual(true);
    expect(res.length).toEqual(1);
  });
});
