import { expect } from "vitest";
import { z } from "zod";

export const assertSafeParse = (type: z.ZodType, body: any) => {
  expect(type.safeParse(body).success).toBe(true);
};
