import fs from "fs";
import path from "path";
import { DIR_MIGRATION } from "../constants/path";
import { Ky } from "../libs/kysely";

export const getLatestMigrationName = (): string | null => {
  const ls = fs.readdirSync(path.resolve(DIR_MIGRATION));
  ls.sort();
  const lastMigration = ls[ls.length - 1];

  return lastMigration.split(".ts").shift() ?? null;
};

export const getAppliedLatestMigrationName = async (): Promise<string> => {
  const migration = await Ky.selectFrom("kysely_migration")
    .selectAll()
    .orderBy("name desc")
    .limit(1)
    .executeTakeFirstOrThrow();

  return migration.name;
};
