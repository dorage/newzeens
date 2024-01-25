import Database from "better-sqlite3";

import { Kysely, ParseJSONResultsPlugin, SqliteDialect } from "kysely";

export const SQLiteAdapter = <DB>(
  filename: string | Buffer,
  options?: Database.Options | undefined
) => {
  const dialect = new SqliteDialect({
    database: async () => new Database(filename, options),
  });

  // Database interface is passed to Kysely's constructor, and from now on, Kysely
  // knows your database structure.
  // Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
  // to communicate with your database.
  return new Kysely<DB>({
    dialect,
    plugins: [new ParseJSONResultsPlugin()],
  });
};
