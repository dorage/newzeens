import { PublisherSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getPublisherArbitary } from "./publishers.mock";

testingTransaction();

describe("zod schema test", () => {
  beforeAll(async () => {
    await Ky.deleteFrom("publishers").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(getPublisherArbitary(), async (publisher) => {
        const result = await Ky.insertInto("publishers")
          .values(publisher)
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(PublisherSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("publishers").where("id", "=", publisher.id).execute();
      })
    );
  });
});
