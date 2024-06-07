import SlotProvider from "@/src/providers/slots";
import { testingTransaction } from "@/tests/libs/transaction";
import { TestingMock } from "@/tests/mock";
import { SlotSchema } from "kysely-schema";
import { z } from "zod";
import { zJson } from "./put";
import { controller } from "./put.controller";
import { putSlot } from "./put.model";

testingTransaction();

describe("put.model", () => {
  describe("putSlot", () => {
    test("must edit", async () => {
      const editSlot = async (
        slotId: z.infer<typeof SlotSchema.shape.id>,
        data: z.infer<typeof zJson>
      ) => {
        const original = await SlotProvider.selectSlotById(slotId);
        await putSlot({
          slotId,
          data: data,
        });

        const edited = await SlotProvider.selectSlotById(slotId);
        expect({ ...original, ...data }).toEqual(edited);

        const keys = Object.getOwnPropertyNames(data);
        for (const key of keys) {
          expect(edited[key as keyof typeof edited]).toEqual(data[key as keyof typeof data]);
        }
      };
      const slot = await TestingMock.insertSlot();

      await editSlot(slot.id, { name: "new name" });
      await editSlot(slot.id, { description: "new description" });
      await editSlot(slot.id, { comment: "new comment" });
      await editSlot(slot.id, { preferences: 2 });
    });
  });
});

describe("put.controller", () => {
  test("must edit", async () => {
    const editSlot = async (
      slotId: z.infer<typeof SlotSchema.shape.id>,
      data: z.infer<typeof zJson>
    ) => {
      const original = await SlotProvider.selectSlotById(slotId);
      await controller({
        param: { id: slot.id },
        json: data,
      });

      const edited = await SlotProvider.selectSlotById(slotId);
      expect({ ...original, ...data }).toEqual(edited);

      const keys = Object.getOwnPropertyNames(data);
      for (const key of keys) {
        expect(edited[key as keyof typeof edited]).toEqual(data[key as keyof typeof data]);
      }
    };

    const slot = await TestingMock.insertSlot();

    await editSlot(slot.id, { name: "new name" });
    await editSlot(slot.id, { description: "new description" });
    await editSlot(slot.id, { comment: "new comment" });
    await editSlot(slot.id, { preferences: 2 });
  });
});
