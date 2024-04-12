import { Kysely, sql } from "kysely";
import { DB } from "@/src/index";
// default schemas

export async function up(db: Kysely<DB>): Promise<void> {
  // keyword groups
  await db.schema
    .createTable("keyword_groups")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "varchar(30)", (col) => col.notNull().unique())
    .addColumn("is_enabled", "boolean", (col) => col.defaultTo(sql`FALSE`))
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();
  await db.schema
    .createIndex("keyword_groups_name")
    .ifNotExists()
    .on("keyword_groups")
    .column("name")
    .execute();

  // keywords
  await db.schema
    .createTable("keywords")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "varchar(30)", (col) => col.notNull())
    .addColumn("is_enabled", "boolean", (col) => col.defaultTo(sql`FALSE`))
    .addColumn("keyword_group_id", "integer", (col) =>
      col.references("keyword_groups.id").notNull()
    )
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .addUniqueConstraint("keyword_group_id_name", ["keyword_group_id", "name"])
    .execute();
  await db.schema
    .createIndex("keywords_name")
    .ifNotExists()
    .on("keywords")
    .column("name")
    .execute();

  // newsletter publishers
  await db.schema
    .createTable("publishers")
    .ifNotExists()
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
    .ifNotExists()
    .on("publishers")
    .column("subscriber")
    .execute();

  // keyword  -  publisher relationship
  await db.schema
    .createTable("keyword_publisher_rels")
    .ifNotExists()
    .addColumn("keyword_group_id", "integer", (col) =>
      col.notNull().references("keyword_groups.id")
    )
    .addColumn("keyword_id", "integer", (col) => col.notNull())
    .addColumn("publisher_id", "char(6)", (col) => col.notNull().references("publishers.id"))
    .addUniqueConstraint("keyword_group_id_publisher_id", ["publisher_id", "keyword_group_id"])
    .execute();
  await db.schema
    .createIndex("keyword_publisher_rels_id")
    .ifNotExists()
    .on("keyword_publisher_rels")
    .columns(["publisher_id", "keyword_group_id"])
    .execute();

  // newletter articles
  await db.schema
    .createTable("articles")
    .ifNotExists()
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
  await db.schema.createIndex("articles_id").ifNotExists().on("articles").column("id").execute();

  // keyword - newsletter article relationship
  await db.schema
    .createTable("keyword_article_rels")
    .ifNotExists()
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
    .ifNotExists()
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
    .ifNotExists()
    .addColumn("slot_id", "integer", (col) => col.references("slots.id").onDelete("cascade"))
    .addColumn("article_id", "char(6)", (col) => col.references("articles.id").onDelete("cascade"))
    .addColumn("preferences", "integer")
    .addUniqueConstraint("slot_id_article_id", ["slot_id", "article_id"])
    .execute();
  await db.schema
    .createIndex("slot_articles_id")
    .ifNotExists()
    .on("slot_articles")
    .columns(["slot_id", "article_id"])
    .execute();

  await db.schema
    .createTable("slot_publishers")
    .ifNotExists()
    .addColumn("slot_id", "integer", (col) => col.references("slots.id").onDelete("cascade"))
    .addColumn("publisher_id", "char(6)", (col) =>
      col.references("publishers.id").onDelete("cascade")
    )
    .addColumn("preferences", "integer")
    .addUniqueConstraint("slot_id_publisher_id", ["slot_id", "publisher_id"])
    .execute();
  await db.schema
    .createIndex("slot_publisher_id")
    .ifNotExists()
    .on("slot_publishers")
    .columns(["slot_id", "publisher_id"])
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("publishers").execute();
  await db.schema.dropTable("articles").execute();
  await db.schema.dropTable("keyword_article_rels").execute();
  await db.schema.dropTable("keyword_publisher_rels").execute();
  await db.schema.dropTable("campaigns").execute();
  await db.schema.dropTable("slots").execute();
  await db.schema.dropTable("slot_articles").execute();
  await db.schema.dropTable("slot_publishers").execute();
  await db.schema.dropTable("keywords").execute();
  await db.schema.dropTable("keyword_groups").execute();
  await db.schema.dropTable("fts_articles").execute();
  await db.schema.dropTable("fts_publishers").execute();
}
