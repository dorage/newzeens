import { Kysely, sql } from "kysely";
import type { DB } from "./v0.0.0-2024-09-09T07:26:48.091Z/index";

/*
 * add scrap_info table
 * - scrapped url
 */

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("scrap_info")
    .addColumn("url", "varchar(128)", (col) => col.notNull().unique())
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("scrap_info").execute();
}
