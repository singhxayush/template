import type { AppRouteHandler } from "@/app/types";

import { db } from "@/db";
import { INTERNAL_SERVER_ERROR, OK } from "@/shared/constants/status-codes";

import { TodosRepository } from "../data/todo.repo";

export const getTodosHandler: AppRouteHandler<any> = async (ctx) => {
  const todoRepo = new TodosRepository(db);

  try {
    // if (!userId) {
    //   return ctx.json({ message: "User ID is required", success: false }, 400);
    // }

    // 2. Fetch data via repo
    const todos = await todoRepo.findAllByUserId("1");

    // 3. Return response
    return ctx.json(
      {
        success: true,
        data: todos,
      },
      OK,
    );
  } catch (error) {
    console.error("Fetch Todos Error:", error);
    return ctx.json(
      {
        message: "Internal Server Error.",
        success: false,
      },
      INTERNAL_SERVER_ERROR,
    );
  }
};
