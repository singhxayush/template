/* eslint-disable no-console */
import { OpenAPIHono } from "@hono/zod-openapi";
import { serve } from "bun";
import { logger } from "hono/logger";

import env from "./shared/config/env.config";

const app = new OpenAPIHono();

const port = env.PORT;

app.use(logger());

app.get("/", (ctx) => {

  return ctx.json(
    {
      ok: true,
    },
  );
});

// setupDB();
// setupOpenAPI();
// setupCommonMiddlewares(); // logger, cors, etc
// setupRateLimiter(); // route based
// setupAuthMiddleware(); // route based

const server = serve({
  fetch: app.fetch,
  port,
  reusePort: true,
  maxRequestBodySize: 1024 * 1024 * 5,
  idleTimeout: 5,
});

const live = [
  { ACTION: "hostname", Detail: server.hostname, active: true },
  { ACTION: "env", Detail: env.NODE_ENV, active: true },
  { ACTION: "PID", Detail: process.pid, active: true },
  { ACTION: "Pending Requests", Detail: server.pendingRequests },
  { ACTION: "Pending Websockets", Detail: server.pendingWebSockets },
];

console.log("🚀 Hono x Bun Server is live!");
console.table(live);
