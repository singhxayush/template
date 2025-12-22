import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "@/app/types";

import { defaultHook } from "@/lib/open-api/default-hook";

export default function createRouter() {
  return new OpenAPIHono<AppBindings>({
    // Attach the global validator here
    defaultHook,

    // Strict mode: throws 404 if a route doesn't match perfectly
    strict: false,
  });
}
