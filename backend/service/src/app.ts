import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

declare module "hono" {
  interface ContextVariableMap {}
}

const app = new OpenAPIHono();

app.use("*", logger());

// cors
app.use(
  "*",
  cors({
    origin: (origin) => origin,
    credentials: true,
  })
);

app.onError(async (err, c) => {
  console.error("[ERROR] ", c.req.method, c.req.path);
  console.error("Headers: ", c.req.header());
  console.error("Params: ", c.req.param());
  console.error("Json: ", await c.req.json());
  console.error(err);
  if (err instanceof HTTPException) {
    throw err;
  }
  if (err instanceof ZodError) {
    throw err;
  }
  return c.text("Not found.", 404);
});

app.get("/", async (c) => {
  return c.json({ okay: true });
});

app.notFound(async (c) => {
  return c.text("Not found.", 404);
});

// register a securtiy component, OpenAPI
app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});
// The OpenAPI documentation will be available at /doc
app.doc("/open-api", {
  openapi: "3.0.0",
  info: {
    version: "1.1.0",
    title: "Newzeens API",
  },
});
// SwaggerUI
app.get("/doc", swaggerUI({ url: "/open-api" }));

import admin from "./routes/admin";

app.route("/admin", admin);

export default app;
