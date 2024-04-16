import { JTISchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { faker } from "@faker-js/faker";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("jtis schema test", () => {
  beforeAll(async () => {
    await Ky.deleteFrom("jtis").execute();
  });

  test("insert, select, and parse", async () => {
    const jtiArbitary = ZodFastCheck()
      .inputOf(JTISchema)
      .map((jti) => ({ ...jti, expires_in: faker.date.anytime().toUTCString() }));

    await fc.assert(
      fc.asyncProperty(jtiArbitary, async (jti) => {
        const result = await Ky.insertInto("jtis")
          .values({
            jti: jti.jti,
            expires_in: jti.expires_in,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(JTISchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("jtis").where("jti", "=", result.jti).execute();
      })
    );
  });
});
