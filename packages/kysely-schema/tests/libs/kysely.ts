import { KyselyAdapter } from "@/src/index";
import { sql } from "kysely";
import path from "path";

const dbPath =
  process.env.NODE_ENV === "production" ? process.env.DB_PATH : path.resolve(process.env.DB_NAME);

export const Ky = KyselyAdapter(dbPath, { fileMustExist: true });

export const testingTransaction = () => {
  beforeAll(async () => {
    await sql`BEGIN TRANSACTION;`.execute(Ky);
  });

  afterAll(async () => {
    await sql`ROLLBACK TRANSACTION;`.execute(Ky);
  });
};
