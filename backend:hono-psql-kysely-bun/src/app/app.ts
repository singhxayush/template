import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { TodoRouteGroup } from "@/context/todo";
import createRouter from "@/lib/open-api/create-router";

import { configureOpenAPI } from "./openapi";

export function createApp() {
  const app = createRouter();

  // --- Global Middlewares ---
  app.use(logger());
  app.use(cors());

  // --- Setup OpenAPI & Scalar ---
  configureOpenAPI(app);

  // --- Group Context Routes ---
  const routeGroups = [
    {
      router: TodoRouteGroup,
      path: "/todo",
    },
  ];

  routeGroups.map((rg) => app.route(rg.path, rg.router));

  app.get("/", (c) => {
    return c.json({
      message: "Modular Monolith is running!",
      docs: "/reference",
    });
  });

  return app;
}
