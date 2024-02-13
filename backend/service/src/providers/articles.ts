import { Ky } from "../libs/kysely";

const selectArticlesByKeywords = (keywords: number[]) => {
  return Ky.selectFrom((eb) =>
    eb
      .selectFrom("keyword_article_rels")
      .select("article_id")
      .where("keyword_id", "in", keywords)
      .as("kar")
  )
    .leftJoin("articles as a", "kar.article_id", "a.id")
    .selectAll()
    .execute();
};

const ArticleProvider = { selectArticlesByKeywords };

export default ArticleProvider;
