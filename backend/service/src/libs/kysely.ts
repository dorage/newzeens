import { KyselyAdapter } from "kysely-schema";
import path from "path";

const dbPath =
  process.env.NODE_ENV === "production" ? process.env.DB_PATH : path.resolve(process.cwd(), "db");

export const Ky = KyselyAdapter(dbPath, { fileMustExist: true });
