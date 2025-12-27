import { createRoute } from "@hono/zod-openapi";

import {
  createTodoPayload,
  createTodoPayloadError,
  createTodoPayloadSuccess,
  getTodoPayloadError,
  getTodoPayloadSuccess,
} from "@/context/todo/data/todo.schema";
import jsonContent from "@/lib/json-content";
import jsonContentRequired from "@/lib/json-content-required";
import createRouter from "@/lib/open-api/create-router";
import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from "@/shared/constants/status-codes";

import { createTodoHandler } from "../core/create-todo.handler";
import { getTodosHandler } from "../core/get-todos.handler";

export const todoRoutes = createRouter();

const createTodoRoute = createRoute({
  tags: ["Todos"],
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

const getTodosRoute = createRoute({
  tags: ["Todos"],
  method: "get",
  path: "/",
  summary: "Get Todos",
  description: "Get todo list of a user",
  responses: {
    [OK]: jsonContent(getTodoPayloadSuccess, "Todo List"),
    [INTERNAL_SERVER_ERROR]: jsonContent(
      getTodoPayloadError,
      "Todo Creation Failed",
    ),
  },
});

todoRoutes.openapi(getTodosRoute, getTodosHandler);
export type GetTodosRouteType = typeof getTodosRoute;
