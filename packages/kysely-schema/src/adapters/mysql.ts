import { Kysely, MysqlDialect, ParseJSONResultsPlugin } from "kysely";
import { PoolOptions, createPool } from "mysql2"; // do not use 'mysql2/promises'!

export const MySQLAdapter = <DB>(options: PoolOptions) => {
  const dialect = new MysqlDialect({
    pool: async () => createPool(options),
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
