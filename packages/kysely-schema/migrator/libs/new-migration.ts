import fs from "fs";
import path from "path";
import moment from "moment";

const DIR_MIGRATION = path.resolve(process.cwd(), "migrator", "migrations");
const CONTENT = `
import { Kysely, sql } from 'kysely'
import { DB } from "@/src/index";

/* 
*/

export async function up(db: Kysely<DB>): Promise<void> {
}

export async function down(db: Kysely<DB>): Promise<void> {
}
`;

export const createNewMigration = () => {
  const now = moment().utc(false).toISOString(false);
  const fileName = `${now}.ts`;
  fs.writeFileSync(path.resolve(DIR_MIGRATION, fileName), CONTENT, {
    encoding: "utf8",
  });
  console.log(`New Migration had generated: ${fileName}`);
};
