import type { Context } from "hono";

import type { AppBindings } from "@/app/types";

export class TodosRepository {
  private datastore: AppBindings["Variables"]["datastore"];

  constructor(ctx: Context<AppBindings>) {
    this.datastore = ctx.var.datastore;
  }

  async getEntry() {
    const txn = this.datastore;
    const todos = await txn.selectFrom("todos").selectAll().execute();
    return todos;
  }
}
