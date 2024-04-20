import { Ky } from "@/src/libs/kysely";
import { getPublisherSpec, getRelatedPublishers } from "./get.query";
import { controller } from "./get.controller";
import { zRes } from "./get";

describe("get.query", () => {
  test("publisher load well", async () => {
    const publisher = await Ky.selectFrom("publishers")
      .selectAll()
      .limit(1)
      .executeTakeFirstOrThrow();
    const publisherId = publisher.id;

    const promises = [getPublisherSpec({ publisherId }), getRelatedPublishers({ publisherId })];

    const [pub, relPub] = await Promise.all(promises);
    console.log(pub, relPub);
  });
});

describe("get.controller", () => {
  it("should be success", async () => {
    const publisher = await Ky.selectFrom("publishers")
      .selectAll()
      .limit(1)
      .executeTakeFirstOrThrow();

    const res = await controller({ publisherId: publisher.id });
    console.log(res);
    expect(zRes.safeParse(res).success).toEqual(true);
  });
});
