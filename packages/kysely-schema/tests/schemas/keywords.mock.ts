import { KeywordGroupSchema } from "@/src/schemas/keyword-groups";
import { KeywordSchema } from "@/src/schemas/keywords";
import { z } from "zod";
import { ZodFastCheck } from "zod-fast-check";

export const KeywordSchemaWithoutGenerated = KeywordSchema.omit({ created_at: true });

export const getKeywordArbitary = (keywordGroupId: z.infer<typeof KeywordGroupSchema.shape.id>) =>
  ZodFastCheck()
    .inputOf(KeywordSchemaWithoutGenerated)
    .map((keyword) => ({
      ...keyword,
      is_enabled: +keyword.is_enabled,
      keyword_group_id: keywordGroupId,
    }));
