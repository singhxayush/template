import { z } from "@hono/zod-openapi";

export const createTodoPayload = z.object({
  title: z.string().openapi({
    example: "New Todo Title",
    description: "Title of the new todo item",
  }),

  body: z.string().optional().openapi({
    example: "New Todo Body/Description",
    description: "Detailed Description of your new todo item",
  }),
});

export type CreateTodoPayload = z.infer<typeof createTodoPayload>;

export const createTodoPayloadSuccess = z.object({
  message: z.string().default("success"),
  success: z.boolean().default(true),
});

export const createTodoPayloadError = z.object({
  message: z.string().default("Not created"),
  success: z.boolean().default(false),
});

export type SreateTodoPayloadSuccess = z.infer<typeof createTodoPayloadSuccess>;

export const getTodoPayloadSuccess = z.object({
  message: z.string().default("success"),
  success: z.boolean().default(true),
  data: z.array(z.object()),
});

export const getTodoPayloadError = z.object({
  message: z.string().default("Not found"),
  success: z.boolean().default(false),
});
