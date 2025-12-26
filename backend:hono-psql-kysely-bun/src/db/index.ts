import type { Transaction } from "kysely";

import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";

import type { DB } from "@/db/types";

import env from "@/shared/utils/env";

const { Pool } = pg;

const poolConfig = {
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

export const db = new Kysely<DB>({
  dialect,
});

export type DbContext = Kysely<DB> | Transaction<DB>;
