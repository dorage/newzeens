import { Ky } from "@/src/libs/kysely";
import { sql } from "kysely";

type Trigger = () => Promise<void> | void;

export const testingTransaction = (
  options?: Partial<{
    beforeEach: Trigger;
    beforeAll: Trigger;
    afterEach: Trigger;
    afterAll: Trigger;
  }>
) => {
  beforeEach(async () => {
    await sql`BEGIN TRANSACTION;`.execute(Ky);
    if (options?.beforeEach) await options.beforeEach();
  });

  beforeAll(async () => {
    if (options?.beforeAll) await options.beforeAll();
  });

  afterEach(async () => {
    await sql`ROLLBACK TRANSACTION;`.execute(Ky);
    if (options?.afterEach) await options.afterEach();
  });

  afterAll(async () => {
    if (options?.afterAll) await options.afterAll();
  });
};
