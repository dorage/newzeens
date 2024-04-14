import { KyselyAdapter } from "@/src/index";
import { sql } from "kysely";
import path from "path";

const db = process.env.DB_NAME;
export const Ky = KyselyAdapter(path.resolve(db), { fileMustExist: true });

export const testingTransaction = () => {
  beforeAll(async () => {
    await sql`BEGIN TRANSACTION;`.execute(Ky);
  });

  afterAll(async () => {
    await sql`ROLLBACK TRANSACTION;`.execute(Ky);
  });
};
