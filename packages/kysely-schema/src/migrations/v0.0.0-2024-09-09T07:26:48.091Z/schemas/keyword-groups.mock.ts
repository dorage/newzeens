import { KeywordGroupSchema } from "./keyword-groups";
import { ZodFastCheck } from "zod-fast-check";
import { generateMock } from "@anatine/zod-mock";

const KeywordGroupSchemaWithoutGenerated = KeywordGroupSchema.omit({ created_at: true });

export const getKeywordGroupArbitary = () =>
  ZodFastCheck()
    .inputOf(KeywordGroupSchemaWithoutGenerated)
    .map((keywordGroup) => ({ ...keywordGroup, is_enabled: +keywordGroup.is_enabled }));

export const getMockKeywordGroup = () => generateMock(KeywordGroupSchemaWithoutGenerated);
