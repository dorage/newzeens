import fs from "fs";
import path from "path";
import moment from "moment";
import { DIR_MIGRATION } from "../constants/path";
import { getLatestMigrationName } from "./utils";

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
import type { DB } from "./${newMigrationName}/index";

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

  const DIR_SCHEMA = path.join(DIR_MIGRATION, newMigrationName, "schemas");
  fs.mkdirSync(DIR_SCHEMA);
  fs.writeFileSync(path.join(DIR_SCHEMA, "versions.ts"), CONTENT_DEFAULT_SCHEMA, {
    encoding: "utf8",
  });
};

const copyLastestMigrationSchema = (newMigrationName: string) => {
  const latestMigrationName = getLatestMigrationName();

  // IF it is the first migration file
  // OR {newMigrationName} folder is not exist
  if (
    latestMigrationName == null ||
    !fs.existsSync(path.join(DIR_MIGRATION, latestMigrationName))
  ) {
    createNewMigrationSchema(newMigrationName);
    return;
  }

  fs.cpSync(
    path.join(DIR_MIGRATION, latestMigrationName),
    path.join(DIR_MIGRATION, newMigrationName),
    { recursive: true }
  );
};

const getNewMigrationName = (prefix: string): string => {
  const now = moment().utc(false).toISOString(false);
  return `${prefix}-${now}`;
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

export const createNewMigration = (prefix = "v0.0.0") => {
  const newMigrationName = getNewMigrationName(prefix);

  /*
   * migrations/
   * ├─ {newMigrationName}/
   * │  ├─ {table}.ts          -- Kysely table interface & Zod schema
   * ├─ {newMigrationName}.ts  -- Migration file, be consume by Kysely migrator
   * */
  copyLastestMigrationSchema(newMigrationName);
  createNewMigrationFile(newMigrationName);

  console.log(`New Migration had generated: ${newMigrationName}`);
};
