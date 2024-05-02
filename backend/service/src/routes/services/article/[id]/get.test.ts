import { Ky } from "@/src/libs/kysely";
import { sql } from "kysely";
import { getArticleSpec, getPublisherSpec, getRelatedArticles } from "./get.model";
import { zRes } from "./get";

const getRandomArticle = async () => {
  const article = await Ky.selectFrom("articles")
    .selectAll()
    .orderBy(sql`RANDOM()`)
    .executeTakeFirstOrThrow();

  return article;
};

describe("GET /article/:id get.query", () => {
  test("the result of select article spec should be parsed successfully", async () => {
    const article = await getRandomArticle();

    const result = await getArticleSpec({ articleId: article.id });

    expect(zRes.shape.article.safeParse(result).success).toEqual(true);
  });

  test("the result of select publisher spec should be parsed successfully", async () => {
    const article = await getRandomArticle();

    const result = await getPublisherSpec({ articleId: article.id });
    console.log(JSON.stringify(result, undefined, 2));

    expect(zRes.shape.publisher.safeParse(result).success).toEqual(true);
  });

  // TODO: write this test
  test("the result of related articles", async () => {
    const article = await getRandomArticle();

    const result = await getRelatedArticles({ articleId: article.id });
    console.log(JSON.stringify(result, undefined, 2));
  });
});
