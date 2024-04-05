import { Kysely, sql } from "kysely";
import { DB } from "kysely-schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("admins")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("nickname", "varchar(99)", (col) => col.notNull())
    .addColumn("password", "varchar(99)", (col) => col.notNull())
    .execute();

  // keyword groups
  await db.schema
    .createTable("keyword_groups")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "varchar(30)", (col) => col.defaultTo(sql`FALSE`))
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();
  await db.schema.createIndex("keyword_groups_name").on("keyword_groups").column("name").execute();

  // keywords
  await db.schema
    .createTable("keywords")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "varchar(30)", (col) => col.notNull())
    .addColumn("is_enabled", "boolean", (col) => col.defaultTo(sql`FALSE`))
    .addColumn("keyword_group_id", "integer", (col) =>
      col.references("keyword_groups.id").notNull()
    )
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .addUniqueConstraint("keyword_group_id_name", ["keyword_group_id", "name"])
    .execute();
  await db.schema.createIndex("keywords_name").on("keywords").column("name").execute();

  // newsletter publishers
  await db.schema
    .createTable("publisher")
    .addColumn("id", "char(6)", (col) => col.primaryKey())
    .addColumn("thumbnail", "text")
    .addColumn("name", "varchar(99)", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("subscriber", "integer", (col) => col.defaultTo(sql`0`))
    .addColumn("url_subscribe", "text", (col) => col.notNull())
    .addColumn("publisher_main", "text", (col) => col.notNull())
    .addColumn("publisher_spec", "text", (col) => col.notNull())
    .addColumn("is_enabled", "boolean", (col) => col.defaultTo(sql`FALSE`))
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();
  await db.schema
    .createIndex("publisher_subscriber")
    .on("publisher")
    .column("subscriber")
    .execute();

  // keyword  -  publisher relationship
  await db.schema
    .createTable("keyword_publisher_rels")
    .addColumn("keyword_group_id", "integer", (col) =>
      col.notNull().references("keyword_groups.id")
    )
    .addColumn("keyword_id", "integer", (col) => col.notNull())
    .addColumn("publisher_id", "char(6)", (col) => col.notNull().references("publishers.id"))
    .addUniqueConstraint("keyword_group_id_publisher_id", ["publisher_id", "keyword_group_id"])
    .execute();
  await db.schema
    .createIndex("keyword_publisher_rels_id")
    .on("keyword_publisher_rels")
    .columns(["publisher_id", "keyword_group_id"])
    .execute();

  // newletter articles
  await db.schema
    .createTable("articles")
    .addColumn("id", "char(6)", (col) => col.primaryKey())
    .addColumn("thumbnail", "text")
    .addColumn("title", "varchar(99)", (col) => col.notNull())
    .addColumn("summary", "text", (col) => col.notNull())
    .addColumn("publisher_id", "char(6)", (col) =>
      col.notNull().references("publishers.id").onDelete("cascade")
    )
    .addColumn("created_at", "datetime", (col) => col.defaultTo("CURRENT_TIMESTAMP"))
    .addColumn("is_enabled", "boolean", (col) => col.defaultTo(sql`FALSE`))
    .execute();
  await db.schema.createIndex("articles_id").on("articles").column("id").execute();

  // keyword - newsletter article relationship
  await db.schema
    .createTable("keyword_article_rels")
    .addColumn("keyword_id", "integer", (col) =>
      col.notNull().references("keywords.id").onDelete("cascade")
    )
    .addColumn("article_id", "char(6)", (col) =>
      col.notNull().references("articles.id").onDelete("cascade")
    )
    .addUniqueConstraint("keyword_id_article_id", ["keyword_id", "article_id"])
    .execute();
  await db.schema
    .createIndex("keyword_article_rels_id")
    .ifNotExists()
    .on("keyword_article_rels")
    .columns(["article_id", "keyword_id"])
    .execute();

  // campaign
  await db.schema
    .createTable("campaigns")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "char(50)")
    .addColumn("description", "text")
    .addColumn("comment", "text")
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // slots
  await db.schema
    .createTable("slots")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("campaign_id", "integer", (col) =>
      col.references("campaigns.id").onDelete("cascade")
    )
    .addColumn("name", "char(50)")
    .addColumn("description", "text")
    .addColumn("comment", "text")
    .addColumn("preferences", "integer")
    .addColumn("is_enabled", "boolean", (col) => col.defaultTo(sql`FALSE`))
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .addUniqueConstraint("id_campaign_id", ["id", "campaign_id"])
    .execute();

  await db.schema
    .createTable("slot_articles")
    .addColumn("slot_id", "integer", (col) => col.references("slots.id").onDelete("cascade"))
    .addColumn("article_id", "char(6)", (col) => col.references("articles.id").onDelete("cascade"))
    .addColumn("preferences", "integer")
    .addUniqueConstraint("slot_id_article_id", ["slot_id", "article_id"])
    .execute();
  await db.schema
    .createIndex("slot_articles_id")
    .on("slot_articles")
    .columns(["slot_id", "article_id"])
    .execute();

  await db.schema
    .createTable("slot_publishers")
    .addColumn("slot_id", "integer", (col) => col.references("slots.id").onDelete("cascade"))
    .addColumn("publisher_id", "char(6)", (col) =>
      col.references("publishers.id").onDelete("cascade")
    )
    .addColumn("preferences", "integer")
    .addUniqueConstraint("slot_id_publisher_id", ["slot_id", "publisher_id"])
    .execute();
  await db.schema
    .createIndex("slot_publisher_id")
    .on("slot_publishers")
    .columns(["slot_id", "publisher_id"])
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("admins").execute();
}
