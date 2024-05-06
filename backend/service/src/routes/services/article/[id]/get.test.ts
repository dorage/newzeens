import { Ky } from "@/src/libs/kysely";
import { sql } from "kysely";
import { zRes } from "./get";
import { getArticleSpec, getPublisherSpec, getRelatedArticles } from "./get.model";
import { queryPublisherWithKeywords } from "@/src/providers/publishers";

const getRandomArticle = async () => {
  const article = await Ky.selectFrom("articles")
    .selectAll()
    .orderBy(sql`RANDOM()`)
    .executeTakeFirstOrThrow();

  return article;
};
const getPublisher = async (publisherId: string) => {
  const query = await queryPublisherWithKeywords();
  const publisher = await query().where("id", "=", publisherId).executeTakeFirstOrThrow();

  return publisher;
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

    expect(zRes.shape.publisher.safeParse(result).success).toEqual(true);
  });

  // TODO: write this test
  test("the result of related article should be length 4", async () => {
    const article = await getRandomArticle();

    const relatedArticles = await getRelatedArticles({ articleId: article.id });

    expect(relatedArticles.length).toEqual(4);
  });

  test("the result of related articles's keywords should not overwrap", async () => {
    const article = await getRandomArticle();
    const publisher = await getPublisher(article.publisher_id);

    const relatedArticles = await getRelatedArticles({ articleId: article.id });
    console.log(JSON.stringify(relatedArticles, null, 2));

    // keyword_id 와 keyword_group_id가 같은 경우가 없어야 한다
    // 분야 = 관계대상과 동일해야함
    // 목적/고유 = 각 선택된 publihser간 하나 이상의 keyword만 겹치지 않아야함
    type InspectKeywordGroup = "목적" | "분야" | "고유";

    const map = new Map<string | null | undefined, string | null | undefined>();
    for (let i = 0; i < relatedArticles.length; i++) {
      const relatedArticle = relatedArticles[i];
      const table: { [key in InspectKeywordGroup]?: null | string } = {};
      for (let i = 0; i < relatedArticle.publisher.keywords.length; i++) {
        const keyword = relatedArticle.publisher.keywords[i];
        switch (keyword.keyword_group_name) {
          case "목적":
            table["목적"] = keyword.keyword_name;
            break;
          case "분야":
            table["분야"] = keyword.keyword_name;
            break;
          case "고유":
            table["고유"] = keyword.keyword_name;
            break;
        }
      } // for r.keyword
      //  동일 분야인지 검사
      expect(publisher["분야"] === table["분야"]).toEqual(true);
      if (table["목적"] == null || table["고유"]) continue;
      // 목적/고유 중복검사
      expect(map.has(table["목적"]) && map.get(table["목적"]) === table["고유"]).toEqual(false);
      map.set(table["목적"], table["고유"]);
    } // for result

    console.log(JSON.stringify(relatedArticles, undefined, 2));
  });
});
