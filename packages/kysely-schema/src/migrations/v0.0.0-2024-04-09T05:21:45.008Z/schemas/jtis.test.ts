import { JTISchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getJtiArbitary } from "./jtis.mock";

testingTransaction();

describe("zod schema test", () => {
  beforeAll(async () => {
    await Ky.deleteFrom("jtis").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(getJtiArbitary(), async (jti) => {
        const result = await Ky.insertInto("jtis")
          .values(jti)
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(JTISchema.strict().safeParse(result).success).toEqual(true);

        await Ky.deleteFrom("jtis").where("jti", "=", result.jti).execute();
      })
    );
  });
});
