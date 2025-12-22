/* eslint-disable no-console */
import { serve } from "bun";

import { createBunConfig } from "@/shared/configs/server.config";
import { setupGracefulShutdown } from "@/shared/utils/shutdown";
import env from "@/utils/env";

import { createApp } from "./app";

// 1. Initialize the App
const app = createApp();

// 2. Get Bun Configuration
const bunConfig = createBunConfig(app.fetch);

// 3. Start the Server
const server = serve(bunConfig);

// 4. Logging & Diagnostics
const diagnostics = [
  { Label: "Hostname", Value: server.hostname },
  { Label: "Port", Value: server.port },
  { Label: "Environment", Value: env.NODE_ENV || "development" },
  { Label: "Process PID", Value: process.pid },
  {
    Label: "Docs URL",
    Value: `http://${server.hostname}:${server.port}/reference`,
  },
];

console.log("\n🚀 Hono x Bun Modular Server is live!");
console.table(diagnostics);

// 5. Activate Safety Nets
setupGracefulShutdown(server);
