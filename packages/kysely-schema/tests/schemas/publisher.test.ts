import { PublisherSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { faker } from "@faker-js/faker";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("publishers schema test", () => {
  beforeAll(async () => {
    await Ky.deleteFrom("publishers").execute();
  });

  test("insert, select and parse", async () => {
    const publisherArbitary = ZodFastCheck()
      .inputOf(PublisherSchema)
      .map((publisher) => ({
        ...publisher,
        id: faker.string.nanoid(6),
        is_enabled: +publisher.is_enabled,
      }));

    await fc.assert(
      fc.asyncProperty(publisherArbitary, async (publisher) => {
        publisher.id = faker.string.nanoid(6);

        const result = await Ky.insertInto("publishers")
          .values({
            id: publisher.id,
            thumbnail: publisher.thumbnail,
            name: publisher.name,
            description: publisher.description,
            subscriber: publisher.subscriber,
            url_subscribe: publisher.url_subscribe,
            publisher_main: publisher.publisher_main,
            publisher_spec: publisher.publisher_spec,
            is_enabled: publisher.is_enabled,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(PublisherSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("publishers").where("id", "=", publisher.id).execute();
      })
    );
  });
});
