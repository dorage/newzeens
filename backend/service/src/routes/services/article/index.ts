import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getDetail from "./[id]/get";
app.route("/", getDetail);

export default app;
