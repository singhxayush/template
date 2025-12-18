import { OpenAPIHono } from "@hono/zod-openapi";
import { serve } from "bun";

import env from "./lib/utils/env";

const app = new OpenAPIHono();

const port = env.PORT;

app.get("/", ctx => ctx.json(
  {
    ok: true,
  },
));

const server = serve({
  fetch: app.fetch,
  port,
  reusePort: true,
  maxRequestBodySize: 1024 * 1024 * 5,
  idleTimeout: 5,
});

// eslint-disable-next-line no-console
console.log(`
  🚀 Hono x Bun Server is live!
  ----------------------------
  Port: ${server.port}
  Mode: ${env.NODE_ENV || "development"}
  PID:  ${process.pid}
`);
