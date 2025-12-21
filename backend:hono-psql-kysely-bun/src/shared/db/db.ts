import type { PoolConfig } from "pg";

import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";

import type { DB } from "./db.d";

const { Pool } = pg;

export function createDBPool(config: PoolConfig) {
  const databaseURL = `postgres://${config.user}:${config.password as string}@${
    config.host
  }:${config.port}/${config.database}`;

  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: databaseURL,
    }),
  });

  const db = new Kysely<DB>({
    dialect,
  });

  return db;
}
