import { defineConfig } from "drizzle-kit";

import env from "@/shared/utils/env";

export default defineConfig({
  schema: "./src/db/migrations/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
});
