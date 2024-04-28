import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getBase from "./base/get";
app.route("/", getBase);

export default app;
