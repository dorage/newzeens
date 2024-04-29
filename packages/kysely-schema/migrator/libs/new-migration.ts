import fs from "fs";
import path from "path";
import moment from "moment";
import { DIR_MIGRATION } from "../constants/path";

const CONTENT_DEFAULT_SCHEMA = `
import type { Insertable, Selectable, Updateable } from "kysely";
import { z } from "zod";

export const VersionSchema = z.object({
  version: z.string(),
  is_enabled: z.coerce.boolean(),
});

export interface KyVersionTable {
  version: z.infer<typeof VersionSchema.shape.version>;
  is_enabled: z.infer<typeof VersionSchema.shape.is_enabled>;
}

export type Version = Selectable<KyVersionTable>;
export type NewVersion = Insertable<KyVersionTable>;
export type VersionUpdate = Updateable<KyVersionTable>;
`;

const CONTENT_DEFAULT_DB = `
import type { KyVersionTable } from "./schemas/versions";
import { VersionSchema as _VersionSchema } from "./schemas/versions";

export interface DB {
  versions: KyVersionTable;
}

export const VersionSchema = _VersionSchema;
`;

const CONTENT_MIGRATION = (newMigrationName: string) => `
import { Kysely, sql } from 'kysely'
import { DB } from "./${newMigrationName}";

/* 
*/

export async function up(db: Kysely<DB>): Promise<void> {
}

export async function down(db: Kysely<DB>): Promise<void> {
}
`;

const createNewMigrationSchema = (newMigrationName: string) => {
  fs.mkdirSync(path.join(DIR_MIGRATION, newMigrationName));
  fs.writeFileSync(path.join(DIR_MIGRATION, newMigrationName, "index.ts"), CONTENT_DEFAULT_DB, {
    encoding: "utf8",
  });
  fs.mkdirSync(path.join(DIR_MIGRATION, newMigrationName, "schema"));
  fs.writeFileSync(
    path.join(DIR_MIGRATION, newMigrationName, "schemas", "versions.ts"),
    CONTENT_DEFAULT_SCHEMA,
    { encoding: "utf8" }
  );
};

const copyLastestMigrationSchema = (newMigrationName: string) => {
  const latestMigrationName = getLatestMigrationName();

  // IF it is the first migration file
  // OR there has no {newMigrationName} folder to copy
  if (latestMigrationName == null || fs.existsSync(path.join(DIR_MIGRATION, latestMigrationName))) {
    createNewMigrationSchema(newMigrationName);
    return;
  }

  fs.cpSync(
    path.join(DIR_MIGRATION, latestMigrationName),
    path.join(DIR_MIGRATION, newMigrationName)
  );
};

const getLatestMigrationName = (): string | null => {
  const ls = fs.readdirSync(path.resolve(DIR_MIGRATION));
  ls.sort();
  const lastMigration = ls[ls.length - 1];

  return lastMigration ?? null;
};

const getNewMigrationName = (version: string): string => {
  const now = moment().utc(false).toISOString(false);
  return `${version}-${now}`;
};

const createNewMigrationFile = (newMigrationName: string) => {
  fs.writeFileSync(
    path.resolve(DIR_MIGRATION, `${newMigrationName}.ts`),
    CONTENT_MIGRATION(newMigrationName),
    {
      encoding: "utf8",
    }
  );
};

export const createNewMigration = (version = "0.0.0") => {
  const newMigrationName = getNewMigrationName(version);

  /*
   * migrations/
   * ├─ {newMigrationName}/
   * │  ├─ {table}.ts          -- Kysely table interface & Zod schema
   * ├─ {newMigrationName}.ts  -- Migration file, be consume by Kysely migrator
   * */
  createNewMigrationFile(newMigrationName);
  copyLastestMigrationSchema(newMigrationName);

  console.log(`New Migration had generated: ${newMigrationName}`);
};
