import { Ky } from "@/src/libs/kysely";
import SlotArticleProvider from "@/src/providers/slot-articles";
import { testingTransaction } from "@/tests/libs/transaction";
import { TestingMock } from "@/tests/mock";
import { controller } from "./put.controller";
import { deleteSlotArticle, insertSlotArticle, updateSlotArticle } from "./put.model";

testingTransaction({
  beforeEach: async () => {
    await Ky.deleteFrom("publishers").execute();
    await Ky.deleteFrom("articles").execute();
  },
});

describe("put.model", () => {
  describe("insertSlotArticle", () => {
    test("must insert new one without preferences", async () => {
      const slot = await TestingMock.insertSlot();
      const article = await TestingMock.insertArticle();

      await insertSlotArticle({ slotId: slot.id, articleId: article.id });

      const slotArticles = await SlotArticleProvider.selectSlotArticles(slot.id);
      expect(slotArticles.length).toEqual(1);
      expect(slotArticles[0].id).toEqual(article.id);
    });
    test("must insert new one with preferences", async () => {
      const slot = await TestingMock.insertSlot();
      const article = await TestingMock.insertArticle();

      await insertSlotArticle({ slotId: slot.id, articleId: article.id, preferences: 1 });

      const slotArticles = await SlotArticleProvider.selectSlotArticles(slot.id);
      expect(slotArticles.length).toEqual(1);
      expect(slotArticles[0].preferences).toEqual(1);
    });
  });
  describe("updateSlotArticle", () => {
    test("must update preferences", async () => {
      const slot = await TestingMock.insertSlot();
      const article = await TestingMock.insertArticle();

      await insertSlotArticle({ slotId: slot.id, articleId: article.id });

      // update by number
      {
        await updateSlotArticle({ slotId: slot.id, articleId: article.id, preferences: 1 });

        const slotArticles = await SlotArticleProvider.selectSlotArticles(slot.id);
        expect(slotArticles.length).toEqual(1);
        expect(slotArticles[0].preferences).toEqual(1);
      }
      // update by null
      {
        await updateSlotArticle({ slotId: slot.id, articleId: article.id, preferences: null });

        const slotArticles = await SlotArticleProvider.selectSlotArticles(slot.id);
        expect(slotArticles.length).toEqual(1);
        expect(slotArticles[0].preferences).toEqual(null);
      }
      // update by undefined
      {
        await updateSlotArticle({ slotId: slot.id, articleId: article.id, preferences: undefined });

        const slotArticles = await SlotArticleProvider.selectSlotArticles(slot.id);
        expect(slotArticles.length).toEqual(1);
        expect(slotArticles[0].preferences).toEqual(null);
      }
    });
  });
  describe("deleteSlotArticle", () => {
    test("must delete", async () => {
      const slot = await TestingMock.insertSlot();
      const article = await TestingMock.insertArticle();

      await insertSlotArticle({ slotId: slot.id, articleId: article.id });
      {
        const slotArticles = await SlotArticleProvider.selectSlotArticles(slot.id);
        expect(slotArticles.length).toEqual(1);
      }

      await deleteSlotArticle({ slotId: slot.id, articleId: article.id });
      {
        const slotArticles = await SlotArticleProvider.selectSlotArticles(slot.id);
        expect(slotArticles.length).toEqual(0);
      }
    });
  });
});

describe("put.controller", () => {
  test("combination", async () => {
    const slot = await TestingMock.insertSlot();

    const articles = await Promise.all(
      Array(5)
        .fill(null)
        .map(() => TestingMock.insertArticle())
    );

    const [
      willBeStay,
      willBeDeletedByNull,
      willBeDeletedByUndefined,
      willBeDeletedByFalse,
      willBeUpdated,
    ] = articles;

    // insert articles in slot
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

    // check articles are inserted
    expect(insertResult.length).toEqual(5);
    expect(
      insertResult.every((article) => articles.map((article) => article.id).includes(article.id))
    ).toEqual(true);

    // update slot_articles
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
        (article) =>
          (article.id === willBeStay.id && article.preferences == null) ||
          (article.id === willBeUpdated.id && article.preferences === 3)
      )
    ).toEqual(true);
  });
});
