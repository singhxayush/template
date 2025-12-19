// import { type OpenAPIHono } from "@hono/zod-openapi";
// import { Scalar } from "@scalar/hono-api-reference";

// export function configureOpenAPI(app: OpenAPIHono) {
//   // OpenAPI JSON Endpoint (The "Contract")
//   app.doc("/doc", {
//     openapi: "3.0.0",
//     info: {
//       version: "1.0.0",
//       title: "Modular Monolith API",
//       description: "Enterprise-grade Bun x Hono Backend",
//     },
//   });

//   // Scalar UI (The Documentation Interface)
//   app.get(
//     "/reference",
//     Scalar({
//       pageTitle: "API Reference",
//       theme: "purple", // Options: 'purple', 'moon', 'solar', etc.
//     })
//   );
// }