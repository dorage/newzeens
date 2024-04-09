import { promises as fs } from "fs";
import { FileMigrationProvider, MigrationResultSet, Migrator } from "kysely";
import * as path from "path";
import { Ky as db } from "./kysely";

const migrate = async (migrate: (migrator: Migrator) => Promise<MigrationResultSet>) => {
	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			// This needs to be an absolute path.
			migrationFolder: path.resolve("src", "migrations"),
		}),
	});

	const { error, results } = await migrate(migrator);

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
};

export const migrator = {
	toLatest: () => migrate((migrator) => migrator.migrateToLatest()),
	down: () => migrate((migrator) => migrator.migrateDown()),
};
