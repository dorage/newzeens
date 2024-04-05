import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator } from "kysely";
import * as path from "path";
import { Ky as db } from "./libs/kysely";
import { createNewMigration } from "./libs/create";

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

async function migrateDown() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });

  const { results, error } = await migrator.migrateDown();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migrate down "${it.migrationName}" was undo successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migrate down before "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate down");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

const main = async () => {
  if (process.argv.includes("latest")) {
    await migrateToLatest();
    console.log("migrate to latest done");
  } else if (process.argv.includes("down")) {
    await migrateDown();
    console.log("migrate down done");
  } else if (process.argv.includes("up")) {
    console.log("not prepared yet");
  } else if (process.argv.includes("new")) {
    createNewMigration();
  } else {
    console.log("not prepared yet");
  }
};

main();
