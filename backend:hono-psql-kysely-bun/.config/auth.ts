import { betterAuth } from "better-auth";
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable node/no-process-env */
import { jwt, magicLink, multiSession, openAPI } from "better-auth/plugins";

import { db } from "./kysely.config";

export const auth = betterAuth({
  database: {
    db,
    type: "postgres",
    casing: "snake", // or "camel" - choose based on your preference
    transaction: true, // PostgreSQL supports transactions
    debugLogs: process.env.NODE_ENV === "development",
  },
  appName: "backend-hono-psql-kysely-bun",
  plugins: [
    multiSession(),
    jwt(),
    openAPI(),
    magicLink({
      sendMagicLink({ email, token, url }, request) {
        // Send email with magic link
      },
    }),
  ],
});
