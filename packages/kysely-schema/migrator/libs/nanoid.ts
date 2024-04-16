import { customAlphabet } from "nanoid";

const generateNanoId = (length = 6) => customAlphabet("abcdefghkmnopqrstuxyz2345689", length)();

export const generatePublisherId = () => {
  return generateNanoId();
};

export const generateArticleId = () => {
  return generateNanoId();
};
