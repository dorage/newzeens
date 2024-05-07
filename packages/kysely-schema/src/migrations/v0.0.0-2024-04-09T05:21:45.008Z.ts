import { Kysely } from "kysely";
import { DB } from "@/src/index";

/* add jti table to validate refresh token
 */

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("jtis")
    .ifNotExists()
    .addColumn("jti", "char(36)", (col) => col.primaryKey())
    .addColumn("expires_in", "datetime", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("jtis").execute();
}
