import { promises as _fs } from "fs";
import fs from "fs";
import { FileMigrationProvider, MigrationResultSet, Migrator } from "kysely";
import * as path from "path";
import { Ky as db } from "./kysely";
import { DIR_MIGRATION } from "../constants/path";

const updateExportVersion = (newMigrationName: string) => {
  const DIR_SRC_INDEX = path.resolve("src", "index.ts");

  const content = fs.readFileSync(DIR_SRC_INDEX, { encoding: "utf8" });
  console.log(content);
  // import type { DB as _DB } from "./migrations/v0.0.0-2024-04-09T05:21:45.008Z/index";
  const fromStmt = content.match(/from "(.+?)"/i);
  if (fromStmt == null) {
    console.error(`Failed to update export version to ${newMigrationName}`);
    return;
  }
  console.log(fromStmt);
  const latestMigrationName = fromStmt[1].split("/").at(-2);
  console.log("latestMigrationName", latestMigrationName);
  console.log("newMigrationName", newMigrationName);
  if (latestMigrationName == null) {
    console.error(`Failed to update export version to ${newMigrationName}`);
    return;
  }
  console.log(content.replaceAll(latestMigrationName, newMigrationName));

  fs.writeFileSync(DIR_SRC_INDEX, content.replaceAll(latestMigrationName, newMigrationName), {
    encoding: "utf8",
  });
  console.log(`update export version to ${newMigrationName}`);
};

const migrate = async (migrate: (migrator: Migrator) => Promise<MigrationResultSet>) => {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs: _fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: DIR_MIGRATION,
    }),
  });

  const { error, results } = await migrate(migrator);
  let newMigrationName: string | null = null;

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
      newMigrationName = it.migrationName;
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  if (newMigrationName != null) updateExportVersion(newMigrationName);

  await db.destroy();
};

export const migrator = {
  toLatest: () => migrate((migrator) => migrator.migrateToLatest()),
  up: () => migrate((migrator) => migrator.migrateUp()),
  down: () => migrate((migrator) => migrator.migrateDown()),
};
