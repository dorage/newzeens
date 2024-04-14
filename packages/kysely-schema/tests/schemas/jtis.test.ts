import { JTISchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("jtis schema test", () => {
  test("Insert", async () => {
    const jtiArbitary = ZodFastCheck().inputOf(JTISchema);

    await fc.assert(
      fc.asyncProperty(jtiArbitary, async (jti) => {
        await expect(
          Ky.insertInto("jtis").values({
            jti: jti.jti,
            expires_in: jti.expires_in,
          }).execute
        ).rejects.toThrow(undefined);
      })
    );
  });

  test("Select", async () => {
    const jtis = await Ky.selectFrom("jtis").selectAll().execute();

    expect(jtis.every((jti) => JTISchema.safeParse(jti).success)).toBe(true);
  });
});
