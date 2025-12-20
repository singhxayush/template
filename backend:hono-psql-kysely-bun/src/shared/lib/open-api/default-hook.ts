import type { Hook } from "@hono/zod-openapi";

import type { AppBindings } from "@/app/types";

// We define a standardized error response type
// so your frontend knows exactly what to expect.
interface ValidationError {
  success: false;
  error: {
    code: "VALIDATION_ERROR";
    message: string;
    issues: Array<{
      path: string;
      message: string;
      code: string;
    }>;
  };
}

// <any, any, any, any> is implied here by the 'Hook' generic
// if we don't pass specific route types.
// Ideally, a global hook *must* accept any route.
export const defaultHook: Hook<any, AppBindings, any, any> = (result, c) => {
  // 1. If validation passed, do nothing (let the request proceed)
  if (result.success) {
    return;
  }

  // 2. Format the Zod Error into a clean structure
  // 'result.error' is a generic ZodError object
  const formattedIssues = result.error.issues.map((issue) => ({
    path: issue.path.join("."), // e.g., "user.email"
    message: issue.message, // e.g., "Invalid email address"
    code: issue.code, // e.g., "invalid_string"
  }));

  // 3. Return the 422 Unprocessable Entity response
  return c.json(
    {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "The data provided is invalid.",
        issues: formattedIssues,
      },
    } satisfies ValidationError,
    422,
  );
};
