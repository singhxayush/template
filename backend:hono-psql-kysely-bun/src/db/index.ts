import type { Transaction } from "kysely";
import type { PoolConfig } from "pg";

import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";

import env from "@/shared/utils/env";

import type { DB } from "./db";

const { Pool } = pg;

export type DbContext = Kysely<DB> | Transaction<DB>;

export function createDBPool() {
  const poolConfig: PoolConfig = {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    max: 10,
  };

  const dialect = new PostgresDialect({
    pool: new Pool(poolConfig),
  });

  const db = new Kysely<DB>({
    dialect,
  });

  return db;
}
