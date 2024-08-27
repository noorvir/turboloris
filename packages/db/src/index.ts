import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB as Schema } from "./types";
const pool = new Pool({
  connectionString: process.env.DB_URL!,
  max: 10,
});

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<Schema>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
