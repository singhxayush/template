import type { ZodType } from "zod/v4";

function jsonContent<T extends ZodType>(schema: T, description: string) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
}

export default jsonContent;
