import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await sql
    .raw(
      `
    CREATE TABLE IF NOT EXISTS todos (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
      summary TEXT,
      completed BOOLEAN DEFAULT TRUE
    )
    `,
    )
    .execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql
    .raw(
      `
    DROP TABLE IF EXISTS users
  `,
    )
    .execute(db);
}
