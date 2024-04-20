import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import image from "./image";
app.route("/image", image);

import publisher from "./publisher";
app.route("/publisher", publisher);

export default app;
