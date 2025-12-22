import type { ZodType } from "zod/v4";

import jsonContent from "./json-content.js";

function jsonContentRequired<T extends ZodType>(
  schema: T,
  description: string,
) {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
}

export default jsonContentRequired;
