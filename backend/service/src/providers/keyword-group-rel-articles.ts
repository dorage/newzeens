import { Ky } from "../libs/kysely";

const selectArticles = async (keywordGroupRelId: number) => {
  return Ky.selectFrom((eb) =>
    eb
      .selectFrom("keyword_group_rel_articles")
      .selectAll()
      .where("keyword_group_rel_id", "=", keywordGroupRelId)
      .as("kgra")
  )
    .leftJoin("articles as a", "kgra.article_id", "a.id")
    .selectAll()
    .execute();
};

const KeywordGroupRelArticlesProvider = {
  selectArticles,
};

export default KeywordGroupRelArticlesProvider;
