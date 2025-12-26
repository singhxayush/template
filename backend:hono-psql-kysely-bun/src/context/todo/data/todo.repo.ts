import type { Kysely } from "kysely";

import type { DbContext } from "@/db";
import type { DB, TodosInsertable, TodosSelectable } from "@/db/types";

export class TodosRepository {
  constructor(private readonly db: Kysely<DB>) {}

  private trx(trx?: DbContext): DbContext {
    return trx || this.db;
  }

  async create(
    todo: TodosInsertable,
    trx?: DbContext,
  ): Promise<TodosSelectable> {
    return await this.trx(trx)
      .insertInto("todos")
      .values(todo)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(
    id: string | number,
    trx?: DbContext,
  ): Promise<TodosSelectable | undefined> {
    return await this.trx(trx)
      .selectFrom("todos")
      .selectAll()
      // We cast the ID because Codegen says it can be string|number|bigint
      .where("id", "=", id as any)
      .executeTakeFirst();
  }

  async findAllByUserId(
    userId: string | number,
    trx?: DbContext,
  ): Promise<TodosSelectable[]> {
    return await this.trx(trx)
      .selectFrom("todos")
      .selectAll()
      .where("user_id", "=", userId as any)
      .orderBy("id", "desc")
      .execute();
  }

  /**
   * Domain specific method: Get all todos for a user.
   */
  async findByUserId(
    userId: string | number,
    trx?: DbContext,
  ): Promise<TodosSelectable[]> {
    return await this.trx(trx)
      .selectFrom("todos")
      .selectAll()
      .where("user_id", "=", userId as any)
      .orderBy("id", "desc") // Newest first
      .execute();
  }

  async markComplete(id: string | number, trx?: DbContext): Promise<boolean> {
    const result = await this.trx(trx)
      .updateTable("todos")
      .set({ completed: true })
      .where("id", "=", id as any)
      .executeTakeFirst();

    return Number(result.numUpdatedRows) > 0;
  }
}
