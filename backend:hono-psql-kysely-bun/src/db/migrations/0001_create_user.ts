import { Kysely, sql } from "kysely";
import { DB } from "@/shared/db/types";

export const up: (db: Kysely<DB>) => Promise<void> = async (db) => {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .addColumn("email", "text", (col) => col.notNull().unique())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  // Optional: Add an index for faster email lookups
  await db.schema
    .createIndex("users_email_idx")
    .on("users")
    .column("email")
    .execute();
};

export const down: (db: Kysely<DB>) => Promise<void> = async (db) => {
  await db.schema.dropIndex("users_email_idx").execute();
  await db.schema.dropTable("users").execute();
};
