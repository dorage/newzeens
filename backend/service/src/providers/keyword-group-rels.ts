import { Ky } from "../libs/kysely";

const selectKeywords = async (keywordGroupId: number) => {
  const query = Ky.selectFrom((eb) =>
    eb
      .selectFrom("keyword_group_rels")
      .selectAll()
      .where("keyword_group_id", "=", keywordGroupId)
      .as("kgr")
  )
    .leftJoin("keywords", "id", "kgr.keyword_id")
    .selectAll()
    .orderBy("preference desc");

  if (process.env.MODE === "test") console.debug("🚀 ~ ep ~ query.compile():", query.compile());

  const keywords = await query.execute();

  return keywords;
};

const KeywordGroupRelsProvider = {
  selectKeywords,
};

export default KeywordGroupRelsProvider;
