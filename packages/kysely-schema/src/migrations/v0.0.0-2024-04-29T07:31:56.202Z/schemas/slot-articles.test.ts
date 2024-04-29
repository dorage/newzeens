import { SlotArticleSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getArticleArbitary } from "./articles.mock";
import { getMockCampaign } from "./campaign.mock";
import { getMockPublisher } from "./publishers.mock";
import { getSlotArbitary } from "./slots.mock";

testingTransaction();

describe("zod schema test", () => {
  const mockPublisher = getMockPublisher();
  const mockCampaign = getMockCampaign();

  beforeAll(async () => {
    await Ky.insertInto("publishers")
      .values({
        ...mockPublisher,
        is_enabled: +mockPublisher.is_enabled,
      })
      .execute();
    await Ky.insertInto("campaigns").values(mockCampaign).execute();

    await Ky.deleteFrom("articles").execute();
    await Ky.deleteFrom("slots").execute();
    await Ky.deleteFrom("slot_articles").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(
        getArticleArbitary(mockPublisher.id),
        getSlotArbitary(mockCampaign.id),
        async (article, slot) => {
          await Ky.insertInto("articles").values(article).execute();
          await Ky.insertInto("slots").values(slot).execute();

          const result = await Ky.insertInto("slot_articles")
            .values({
              slot_id: slot.id,
              article_id: article.id,
            })
            .returningAll()
            .executeTakeFirstOrThrow();

          expect(SlotArticleSchema.strict().safeParse(result).success).toEqual(true);

          await Ky.deleteFrom("articles").where("id", "=", result.article_id).execute();
          await Ky.deleteFrom("slots").where("id", "=", result.slot_id).execute();
        }
      )
    );
  });
});
