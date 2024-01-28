import { customAlphabet } from "nanoid";

export const createUniqueId = customAlphabet("abcdefghkmnopqrstuxyz2345689", 6);
