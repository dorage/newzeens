import { PublisherSchema } from "@/src/schemas/publishers";
import { generateMock } from "@anatine/zod-mock";
import { ZodFastCheck } from "zod-fast-check";

// Generated 타입인 컬럼 zod schema에서 제외
const PublisherSchemaWithoutGenerated = PublisherSchema.omit({ created_at: true });

export const getPublisherArbitary = () =>
  ZodFastCheck()
    .inputOf(PublisherSchemaWithoutGenerated)
    // ColumnType의 Insert 타입에 맞게 변환
    .map((publisher) => ({
      ...publisher,
      is_enabled: +publisher.is_enabled,
    }));

export const getMockPublisher = () =>
  generateMock(PublisherSchemaWithoutGenerated, {
    // ColumnType의 Insert 타입에 맞게 변환
    mockeryMapper: (key, faker) => {
      if (key === "is_enabled") return () => +faker.datatype.boolean();
    },
  });
