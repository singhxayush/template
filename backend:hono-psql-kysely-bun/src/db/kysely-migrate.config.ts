import { Kysely, PostgresDialect } from "kysely";
import { defineConfig } from "kysely-migrate";
import { Pool } from "pg";

import env from "@/shared/utils/env";

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: env.DATABASE_URL,
    }),
  }),
});

export default defineConfig({
  db: db as any,
  migrationFolder: "src/db/migrations",
  codegen: {
    dialect: "postgres",
    out: "src/db/types.ts",
  },
});
