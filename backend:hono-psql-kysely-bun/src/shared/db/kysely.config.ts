import { Kysely, PostgresDialect } from "kysely";
import { defineConfig } from "kysely-migrate";
import { Pool } from "pg";

import env from "../utils/env";

export default defineConfig({
  db: new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: env.DATABASE_URL,
      }),
    }),
  }),

  migrationFolder: "src/db/migrations",
  codegen: { dialect: "postgres", out: "src/db/types.ts" },
});
