import { Response } from "supertest";
import { expect } from "vitest";
import { z } from "zod";

export const zE2E =
  (supertestTest: Response) =>
  <T extends z.ZodType>(zType: T) => {
    const res = supertestTest;
    if (res.status !== 200) console.error(res.body);

    expect(zType.safeParse(res.body).success).toBe(true);

    return { res, parsed: zType.parse(res.body) as z.infer<typeof zType> };
  };
