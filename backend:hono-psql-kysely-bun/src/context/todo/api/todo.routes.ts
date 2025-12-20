import { createRoute } from "@hono/zod-openapi";

import {
  createTodoPayload,
  createTodoPayloadError,
  createTodoPayloadSuccess,
} from "@/context/todo/data/todo.schema";
import {
  CREATED,
  INTERNAL_SERVER_ERROR,
} from "@/shared/constants/status-codes";
import jsonContent from "@/shared/lib/json-content";
import jsonContentRequired from "@/shared/lib/json-content-required";
import createRouter from "@/shared/lib/open-api/create-router";

import { createTodoHandler } from "../core/create-todo.handler";

export const todoRoutes = createRouter();

const createTodoRoute = createRoute({
  tags: ["todo"],
  method: "post",
  path: "/",
  summary: "Create Todo",
  description: "Add a new todo item to the list",
  request: {
    body: jsonContentRequired(createTodoPayload, ""),
  },
  responses: {
    [CREATED]: jsonContent(createTodoPayloadSuccess, "Todo Item Created"),
    [INTERNAL_SERVER_ERROR]: jsonContent(
      createTodoPayloadError,
      "Todo Creation Failed",
    ),
  },
});

todoRoutes.openapi(createTodoRoute, createTodoHandler);
export type CreateTodoRouteType = typeof createTodoRoute;
