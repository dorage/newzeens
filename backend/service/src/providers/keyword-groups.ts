import { Ky } from "../libs/kysely";

const selectAll = () => {
  return Ky.selectFrom("keyword_groups").selectAll().execute();
};

const KeywordGroupProvider = {
  selectAll,
};

export default KeywordGroupProvider;
