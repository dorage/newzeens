import { ArticleSchema } from "@/src/schemas/articles";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";
import { generateMock } from "@anatine/zod-mock";
import { PublisherSchema } from "@/src/schemas/publishers";
import { faker } from "@faker-js/faker";
import { z } from "zod";

// Generated 타입인 컬럼 제외하고 전달
const ArticleSchemaWithoutGenerated = ArticleSchema.omit({ created_at: true });

export const getArticleArbitary = (publisher_id: z.infer<typeof PublisherSchema.shape.id>) =>
  ZodFastCheck()
    .outputOf(ArticleSchemaWithoutGenerated)
    // ColumnType의 Insert 타입에 맞게 변환
    .map((article) => ({
      ...article,
      is_enabled: +article.is_enabled,
      publisher_id: publisher_id,
    }));
