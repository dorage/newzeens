import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

import getDetail from "./[id]/get";
app.route("/:id", getDetail);

import postDetail from "./[id]/post";
app.route("/:id", postDetail);

import deleteDetail from "./[id]/delete";
app.route("/:id", deleteDetail);

export default app;
