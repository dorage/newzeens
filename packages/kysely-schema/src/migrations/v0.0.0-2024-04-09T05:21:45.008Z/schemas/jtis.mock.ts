import { JTISchema } from "@/src/index";
import { faker } from "@faker-js/faker";
import { ZodFastCheck } from "zod-fast-check";

export const getJtiArbitary = () =>
  ZodFastCheck()
    .inputOf(JTISchema)
    // ColumnType의 Insert 타입에 맞게 변환
    .map((jti) => ({ ...jti, expires_in: faker.date.anytime().toUTCString() }));
