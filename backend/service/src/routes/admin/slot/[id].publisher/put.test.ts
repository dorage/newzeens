import { Ky } from "@/src/libs/kysely";
import SlotPublisherProvider from "@/src/providers/slot-publishers";
import { testingTransaction } from "@/tests/libs/transaction";
import { TestingMock } from "@/tests/mock";
import { controller } from "./put.controller";
import { deleteSlotPublisher, insertSlotPublisher, updateSlotPublisher } from "./put.model";

testingTransaction({
  beforeEach: async () => {
    await Ky.deleteFrom("publishers").execute();
  },
});

describe("put.model", () => {
  describe("insertSlotPublisher", () => {
    test("must insert new one without preferences", async () => {
      const slot = await TestingMock.insertSlot();
      const publisher = await TestingMock.insertPublisher();

      await insertSlotPublisher({ slotId: slot.id, publisherId: publisher.id });

      const slotPublishers = await SlotPublisherProvider.selectSlotPublishers(slot.id);
      expect(slotPublishers.length).toEqual(1);
      expect(slotPublishers[0].id).toEqual(publisher.id);
    });
    test("must insert new one with preferences", async () => {
      const slot = await TestingMock.insertSlot();
      const publisher = await TestingMock.insertPublisher();

      await insertSlotPublisher({ slotId: slot.id, publisherId: publisher.id, preferences: 1 });

      const slotPublishers = await SlotPublisherProvider.selectSlotPublishers(slot.id);
      expect(slotPublishers.length).toEqual(1);
      expect(slotPublishers[0].preferences).toEqual(1);
    });
  });
  describe("updateSlotPublisher", () => {
    test("must update preferences", async () => {
      const slot = await TestingMock.insertSlot();
      const publisher = await TestingMock.insertPublisher();

      await insertSlotPublisher({ slotId: slot.id, publisherId: publisher.id });

      // update by number
      {
        await updateSlotPublisher({ slotId: slot.id, publisherId: publisher.id, preferences: 1 });

        const slotPublishers = await SlotPublisherProvider.selectSlotPublishers(slot.id);
        expect(slotPublishers.length).toEqual(1);
        expect(slotPublishers[0].preferences).toEqual(1);
      }
      // update by null
      {
        await updateSlotPublisher({
          slotId: slot.id,
          publisherId: publisher.id,
          preferences: null,
        });

        const slotPublishers = await SlotPublisherProvider.selectSlotPublishers(slot.id);
        expect(slotPublishers.length).toEqual(1);
        expect(slotPublishers[0].preferences).toEqual(null);
      }
      // update by undefined
      {
        await updateSlotPublisher({
          slotId: slot.id,
          publisherId: publisher.id,
          preferences: undefined,
        });

        const slotPublishers = await SlotPublisherProvider.selectSlotPublishers(slot.id);
        expect(slotPublishers.length).toEqual(1);
        expect(slotPublishers[0].preferences).toEqual(null);
      }
    });
  });
  describe("deleteSlotPublisher", () => {
    test("must delete", async () => {
      const slot = await TestingMock.insertSlot();
      const publisher = await TestingMock.insertPublisher();

      await insertSlotPublisher({ slotId: slot.id, publisherId: publisher.id });
      {
        const slotPublishers = await SlotPublisherProvider.selectSlotPublishers(slot.id);
        expect(slotPublishers.length).toEqual(1);
      }

      await deleteSlotPublisher({ slotId: slot.id, publisherId: publisher.id });
      {
        const slotPublishers = await SlotPublisherProvider.selectSlotPublishers(slot.id);
        expect(slotPublishers.length).toEqual(0);
      }
    });
  });
});

describe("put.controller", () => {
  test("combination", async () => {
    const slot = await TestingMock.insertSlot();

    const publishers = await Promise.all(
      Array(5)
        .fill(null)
        .map(() => TestingMock.insertPublisher())
    );

    const [
      willBeStay,
      willBeDeletedByNull,
      willBeDeletedByUndefined,
      willBeDeletedByFalse,
      willBeUpdated,
    ] = publishers;

    // insert publishers in slot
    const insertResult = await controller({
      param: { id: slot.id },
      json: {
        [willBeStay.id]: true,
        [willBeDeletedByNull.id]: true,
        [willBeDeletedByUndefined.id]: true,
        [willBeDeletedByFalse.id]: true,
        [willBeUpdated.id]: true,
      },
    });

    // check publishers are inserted
    expect(insertResult.length).toEqual(5);
    expect(
      insertResult.every((publisher) =>
        publishers.map((publisher) => publisher.id).includes(publisher.id)
      )
    ).toEqual(true);

    // update slot_publishers
    const updateResult = await controller({
      param: { id: slot.id },
      json: {
        [willBeDeletedByNull.id]: null,
        [willBeDeletedByUndefined.id]: undefined,
        [willBeDeletedByFalse.id]: false,
        [willBeUpdated.id]: 3,
      },
    });

    expect(updateResult.length).toEqual(2);
    expect(
      updateResult.every(
        (publisher) =>
          (publisher.id === willBeStay.id && publisher.preferences == null) ||
          (publisher.id === willBeUpdated.id && publisher.preferences === 3)
      )
    ).toEqual(true);
  });
});
