import createRouter from "@/lib/open-api/create-router";

import { todoRoutes } from "./api/todo.routes";

export const TodoRouteGroup = createRouter();

const routes = [
  {
    path: "/",
    router: todoRoutes,
  },
];

routes.map((r) => TodoRouteGroup.route(r.path, r.router));
