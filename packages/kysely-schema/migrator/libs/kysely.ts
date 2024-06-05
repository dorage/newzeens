import { DB, KyselyAdapter } from "@/src/index";
import { Kysely } from "kysely";
import path from "path";
import { KyKyselyMigrationTable } from "../schemas/kysely-migration";

const dbPath =
  process.env.NODE_ENV === "production" ? process.env.DB_PATH : path.resolve(process.env.DB_NAME);

export const Ky = KyselyAdapter(dbPath, { fileMustExist: true }) as Kysely<
  DB & { kysely_migration: KyKyselyMigrationTable }
>;
