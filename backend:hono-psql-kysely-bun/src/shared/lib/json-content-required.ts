import { ZodType } from "zod/v4";
import jsonContent from "./json-content.js";

const jsonContentRequired = <T extends ZodType>(
  schema: T,
  description: string,
) => {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
};

export default jsonContentRequired;
