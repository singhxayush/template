import type { AppRouteHandler } from "@/app/types";
import type { CreateTodoRouteType } from "@/context/todo/api/todo.routes";

import {
  CREATED,
  INTERNAL_SERVER_ERROR,
} from "@/shared/constants/status-codes";

export const createTodoHandler: AppRouteHandler<CreateTodoRouteType> = async (
  ctx,
) => {
  try {
    const raw = ctx.req.valid("json");

    console.log(raw);

    return ctx.json(
      {
        message: "Todo Created",
        success: true,
      },
      CREATED,
    );
  } catch (error) {
    console.error(error);
    return ctx.json(
      {
        message: "Iternal Server Error.",
        success: false,
      },
      INTERNAL_SERVER_ERROR,
    );
  }
};
