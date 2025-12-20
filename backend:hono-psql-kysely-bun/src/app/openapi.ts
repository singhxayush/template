import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json";
import env from "@/shared/utils/env";

export function configureOpenAPI(app: AppOpenAPI) {
  // OpenAPI JSON Endpoint (The "Contract")
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Modular Monolith API - Todo Template",
      description: "Enterprise-grade Bun x Hono Backend with Todo example",
    },
  });

  // Scalar UI (The Documentation Interface)
  app.get(
    "/reference",
    Scalar({
      url: "/doc",
      pageTitle: "API Reference",
      layout: "modern",
      isLoading: true,
      theme: "mars", // Options: 'purple', 'moon', 'solar', etc.
      darkMode: true,
      proxyUrl:
        env.NODE_ENV === "development" ? "https://proxy.scalar.com" : undefined,
    }),
  );
}
