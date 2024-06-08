import { testingTransaction } from "@/tests/libs/transaction";
import { TestingMock } from "@/tests/mock";
import { deleteSlot } from "./delete.model";
import SlotProvider from "@/src/providers/slots";
import { controller } from "./delete.controller";

testingTransaction();

describe("delete.model", () => {
  describe("deleteSlot", () => {
    test("must delete slot", async () => {
      const campaign = await TestingMock.insertCampaign();
      await TestingMock.insertSlot(campaign.id);
      await TestingMock.insertSlot(campaign.id);
      await TestingMock.insertSlot(campaign.id);

      const before = await SlotProvider.selectSlots(campaign.id);
      const target = await TestingMock.insertSlot(campaign.id);

      await deleteSlot({ slotId: target.id });

      const after = await SlotProvider.selectSlots(campaign.id);

      expect(before).toEqual(after);
    });
  });
});

describe("delete.controller", () => {
  test("must delete slot", async () => {
    const campaign = await TestingMock.insertCampaign();
    await TestingMock.insertSlot(campaign.id);
    await TestingMock.insertSlot(campaign.id);
    await TestingMock.insertSlot(campaign.id);

    const before = await SlotProvider.selectSlots(campaign.id);
    const target = await TestingMock.insertSlot(campaign.id);

    await controller({ param: { id: target.id } });

    const after = await SlotProvider.selectSlots(campaign.id);

    expect(before).toEqual(after);
  });
});
