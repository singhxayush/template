/* eslint-disable node/no-process-env */
import { Kysely, PostgresDialect } from "kysely";
import { defineConfig } from "kysely-ctl";
import { Pool } from "pg";

// Create your Kysely instance
export const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "mydb",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 5432,
    }),
  }),
});

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "../src/db/migrations",
  },
});
