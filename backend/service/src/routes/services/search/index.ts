import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getSearch from "./base/get";
app.route("/", getSearch);

export default app;
