import type { ServeOptions } from "bun";

import env from "@/shared/utils/env";

export function createBunConfig(
  fetchHandler: (req: Request) => Response | Promise<Response>,
) {
  const config: ServeOptions = {
    fetch: fetchHandler,
    port: env.PORT || 8000, // Fallback if env missing

    // Bun Optimizations
    reusePort: true,
    maxRequestBodySize: 1024 * 1024 * 5, // 5MB
    idleTimeout: 30, // Reduced from default for faster resource freeing

    // Error handling for the server itself (not the app)
    error(error) {
      console.error("🔥 Fatal Server Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    },
  };

  return config;
}
