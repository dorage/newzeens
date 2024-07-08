import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getBase from "./base/get";
app.route("", getBase);

import getDetailKeyword from "./[id].keyword/get";
app.route("/:id/keyword", getDetailKeyword);

export default app;
