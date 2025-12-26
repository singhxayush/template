import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await sql
    .raw(
      `
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `,
    )
    .execute(db);

  await sql
    .raw(
      `
    CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
  `,
    )
    .execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql.raw(`DROP INDEX IF EXISTS users_email_idx`).execute(db);
  await sql.raw(`DROP TABLE IF EXISTS users`).execute(db);
}
