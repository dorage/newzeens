import { TestingMock } from "@/tests/mock";
import { controller } from "./get.controller";
import { testingTransaction } from "@/tests/libs/transaction";
import { zRes } from "./get";

testingTransaction();

describe("get.controller", () => {
  test("must parse", async () => {
    const campain = await TestingMock.insertCampaign();
    await TestingMock.insertSlot(campain.id);
    await TestingMock.insertSlot(campain.id);
    await TestingMock.insertSlot(campain.id);

    const res = await controller({ query: { campaign_id: campain.id } });
    console.log(res);

    expect(res.length).toEqual(3);
    expect(zRes.safeParse(res).success).toEqual(true);
  });
});
