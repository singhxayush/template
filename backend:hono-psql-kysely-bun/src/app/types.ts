import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

export interface User {
  id: string;
  email: string;
  role: "user" | "admin" | "super-admin";
}

export interface AppBindings {
  // 1. DATA THAT LIVES IN THE CLOUD / OS (.env)
  Bindings: {
    PORT: string;
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    LOG_LEVEL: "info" | "debug" | "error";
  };

  // 2. DATA THAT LIVES FOR THE DURATION OF A SINGLE REQUEST
  Variables: {
    user: User | null; // Authenticated user
    traceId: string; // Unique ID for this specific request
    requestId: string; // Often used for headers
    isBot: boolean; // Added by a User-Agent middleware
    metrics: {
      // To track performance per request
      startTime: number;
    };
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
