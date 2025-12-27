/* eslint-disable no-console */
import type { Server } from "bun";

// Fix for "Namespace 'bun' has no exported member 'Signal'"
type Signal = "SIGINT" | "SIGTERM";

export function setupGracefulShutdown(server: Server<never>) {
  const signals: Signal[] = ["SIGINT", "SIGTERM"];

  for (const signal of signals) {
    process.on(signal, () => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

      // 1. Stop accepting new connections
      server.stop();

      // 2. (Optional) Close DB connections
      // await db.end();

      console.log("✅ Server stopped cleanly. Goodbye!");
      process.exit(0);
    });
  }
}
