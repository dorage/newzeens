import { Kysely } from "kysely";
import type { DB } from "./v0.0.0-2024-04-29T07:31:56.202Z/index";

/* add missing columns
 *
 * articles
 *   url
 *
 * publishers
 *   url_main
 */

export async function up(db: Kysely<DB>): Promise<void> {
  // add 'url_main' column on 'publishers'
  await db.schema
    .alterTable("publishers")
    .addColumn("url_main", "varchar(2048)", (eb) => eb.defaultTo(""))
    .execute();

  await db
    .updateTable("publishers")
    .set((eb) => ({
      url_main: eb.ref("url_subscribe"),
    }))
    .execute();

  // add 'url' column on 'articles'

  await db.schema
    .alterTable("articles")
    .addColumn("url", "varchar(2048)", (eb) => eb.defaultTo(""))
    .execute();

  await db
    .updateTable("articles")
    .set((eb) => ({
      url: eb
        .selectFrom("publishers")
        .select("url_main")
        .where((qb) => qb.eb("publishers.id", "=", qb.ref("articles.publisher_id")))
        .limit(1),
    }))
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.alterTable("publishers").dropColumn("url_main").execute();
  await db.schema.alterTable("articles").dropColumn("url").execute();
}
