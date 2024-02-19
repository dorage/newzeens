import { Ky } from "../libs/kysely";

const selectAll = (keywordGroupId: number) => {
  return Ky.selectFrom("keywords")
    .selectAll()
    .where("keyword_group_id", "=", keywordGroupId)
    .execute();
};

const KeywordProvider = { selectAll };

export default KeywordProvider;
