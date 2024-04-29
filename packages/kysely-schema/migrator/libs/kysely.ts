import { DB, KyselyAdapter } from "@/src/index";
import { Kysely } from "kysely";
import path from "path";
import { KyKyselyMigrationTable } from "../schemas/kysely-migration";

const db = process.env.DB_NAME;
export const Ky = KyselyAdapter(path.resolve(db), { fileMustExist: true }) as Kysely<
  DB & { kysely_migration: KyKyselyMigrationTable }
>;
