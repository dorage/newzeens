import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import image from "./image";
app.route("/image", image);

export default app;
